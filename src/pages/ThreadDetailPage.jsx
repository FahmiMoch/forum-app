import { useParams, useNavigate } from "react-router-dom";

import ThreadDetailContent from "../components/thread/ThreadDetailContent";
import Loading from "../components/loading/Loading";
import ThreadError from "../components/error/Error";

import useThreadDetailData from "../features/hooks/thread/useThreadDetailData";
import useAuthGuard from "../features/hooks/auth/useAuthGuard";
import useThreadDetailActions from "../features/hooks/thread/useThreadDetailActions";

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const { threadDetail, loading, error } =
    useThreadDetailData(threadId);

  const { token, requireLogin } = useAuthGuard();

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

  if (loading) return <Loading />;
  if (error) return <ThreadError />;
  if (!threadDetail) return null;

  return (
    <ThreadDetailContent
      threadDetail={threadDetail}
      threadId={threadId}
      isOwner={isOwner}
      isUpVoted={isUpVoted}
      isDownVoted={isDownVoted}
      token={token}
      onVote={handleVote}
      onDeleteThread={() => handleDeleteThread(navigate)}
      onAddComment={handleAddComment}
      onRequireLogin={requireLogin}
    />
  );
}
