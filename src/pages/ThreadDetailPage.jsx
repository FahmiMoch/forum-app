import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ThreadDetailContent from "../components/thread/ThreadDetailContent";
import Loading from "../components/loading/Loading";
import ThreadError from "../components/error/Error";

import useThreadDetailData from "../features/hooks/thread/useThreadDetailData";
import useAuthGuard from "../features/hooks/auth/useAuthGuard";
import useThreadDetailActions from "../features/hooks/thread/useThreadDetailActions";

import { voteOnComment } from "../features/comments/commentsSlice";

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { threadDetail, loading, error } =
    useThreadDetailData(threadId);

  const { token, requireLogin, loginModal } = useAuthGuard();
  const { user } = useSelector((state) => state.auth);

  const {
    isOwner,
    isUpVoted,
    isDownVoted,
    handleVote,
    handleAddComment,
    handleDeleteThread,
  } = useThreadDetailActions(
    threadDetail,
    threadId,
    requireLogin
  );

  const handleVoteComment = (commentId, voteType) => {
    if (!token) return requireLogin();

    dispatch(
      voteOnComment({
        threadId,
        commentId,
        voteType,
        userId: user.id,
      })
    );
  };

  if (loading) return <Loading />;
  if (error) return <ThreadError />;
  if (!threadDetail) return null;

  return (
    <>
      {loginModal}

      <ThreadDetailContent
        threadDetail={threadDetail}
        threadId={threadId}
        isOwner={isOwner}
        isUpVoted={isUpVoted}
        isDownVoted={isDownVoted}
        token={token}
        onVote={handleVote}
        onVoteComment={handleVoteComment}
        onDeleteThread={() => handleDeleteThread(navigate)}
        onAddComment={handleAddComment}
        onRequireLogin={requireLogin}
      />
    </>
  );
}
