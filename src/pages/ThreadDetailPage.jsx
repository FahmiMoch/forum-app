import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ThreadDetailContent from '../components/thread/ThreadDetailContent';
import Loading from '../components/loading/Loading';
import ThreadError from '../components/error/Error';

import useThreadDetailData from '../features/hooks/thread/useThreadDetailData';
import useAuthGuard from '../features/hooks/auth/useAuthGuard';
import useThreadDetailActions from '../features/hooks/thread/useThreadDetailActions';

import {
  voteOnComment,
  setCommentsForThread,
} from '../features/comments/commentsSlice';

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { threadDetail, loading, error } =
    useThreadDetailData(threadId);

  const { token, requireLogin, loginModal } = useAuthGuard();

  const {
    isOwner,
    isUpVoted,
    isDownVoted,
    handleVote,
    handleAddComment,
  } = useThreadDetailActions(
    threadDetail,
    threadId,
    requireLogin
  );


  useEffect(() => {
    if (threadDetail?.comments) {
      dispatch(
        setCommentsForThread({
          threadId,
          comments: threadDetail.comments,
        })
      );
    }
  }, [threadDetail, threadId, dispatch]);

  const handleVoteComment = (threadId, commentId, voteType) => {
    if (!token) return requireLogin();

    dispatch(
      voteOnComment({
        threadId,
        commentId,
        voteType,
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
        onAddComment={handleAddComment}
        onRequireLogin={requireLogin}
      />
    </>
  );
}
