import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  deleteThreadAsync,
  voteOnThread,
} from '../../thread/threadsSlice';
import { addComment } from '../../comments/commentsSlice';

export default function useThreadDetailActions(
  threadDetail,
  threadId,
  requireLogin
) {
  const dispatch = useDispatch();
  const { user: authUser, token } = useSelector((state) => state.auth);

  const userId = authUser?.id;

  const isOwner = useMemo(
    () => userId === threadDetail?.owner?.id,
    [userId, threadDetail]
  );

  const isUpVoted = useMemo(
    () => (userId ? threadDetail?.upVotesBy.includes(userId) : false),
    [userId, threadDetail]
  );

  const isDownVoted = useMemo(
    () => (userId ? threadDetail?.downVotesBy.includes(userId) : false),
    [userId, threadDetail]
  );

  const handleVote = (voteType) => {
    if (!token) return requireLogin();
    dispatch(voteOnThread({ threadId, voteType }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!token) return requireLogin();

    dispatch(
      addComment({
        threadId,
        content: e.target.comment.value,
      })
    );

    e.target.reset();
  };

  const handleDeleteThread = async (navigate) => {
    if (!window.confirm('Hapus thread ini?')) return;
    await dispatch(deleteThreadAsync(threadId));
    navigate('/');
  };

  return {
    isOwner,
    isUpVoted,
    isDownVoted,
    handleVote,
    handleAddComment,
    handleDeleteThread,
  };
}
