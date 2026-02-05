import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getThreadById } from '../api/threadsApi';
import { addComment } from '../features/comments/commentsSlice';
import { voteThread } from '../api/threadsApi';
import { voteComment } from '../api/commentsApi';
import VoteButton from '../components/VoteButton/VoteButton';

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comments);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchThread = async () => {
      setLoading(true);
      const data = await getThreadById(threadId);
      setThread(data);
      dispatch({ type: 'comments/setComments', payload: data.comments });
      setLoading(false);
    };
    fetchThread();
  }, [threadId, dispatch]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!token) return alert('Login required!');
    dispatch(addComment({ threadId, content: newComment, token }));
    setNewComment('');
  };

  // Thread vote handler
  const handleThreadVote = async (voteType) => {
    if (!token) return alert('Login required!');
    // Optimistic UI update
    const prevUpVotes = thread.upVotesBy || [];
    const prevDownVotes = thread.downVotesBy || [];

    if (voteType === 1) {
      thread.upVotesBy = prevUpVotes.includes('me') ? prevUpVotes : [...prevUpVotes, 'me'];
      thread.downVotesBy = prevDownVotes.filter(u => u !== 'me');
    } else if (voteType === -1) {
      thread.downVotesBy = prevDownVotes.includes('me') ? prevDownVotes : [...prevDownVotes, 'me'];
      thread.upVotesBy = prevUpVotes.filter(u => u !== 'me');
    } else {
      // neutral
      thread.upVotesBy = prevUpVotes.filter(u => u !== 'me');
      thread.downVotesBy = prevDownVotes.filter(u => u !== 'me');
    }

    setThread({ ...thread });
    await voteThread(threadId, voteType, token);
  };

  // Comment vote handler
  const handleCommentVote = async (commentId, voteType) => {
    if (!token) return alert('Login required!');
    await voteComment(threadId, commentId, voteType, token);
    // Optional: fetch comments again or optimistic update similar to thread
  };

  if (loading) return <p>Loading thread...</p>;
  if (!thread) return <p>Thread not found</p>;

  // Determine current vote for thread
  const currentThreadVote = thread.upVotesBy.includes('me') ? 1 :
                            thread.downVotesBy.includes('me') ? -1 : 0;

  return (
  <div className="thread-detail">
    <h2>{thread.title}</h2>
    <p className="thread-owner">By: {thread.owner.name}</p>
    <p>{thread.body}</p>

    {/* Voting */}
    {token && (
      <div className="vote-container">
        <VoteButton currentVote={currentThreadVote} onVote={handleThreadVote} />
      </div>
    )}

    <p>Comments ({thread.comments.length})</p>
    <ul>
      {comments.map(c => {
        const currentCommentVote = c.upVotesBy?.includes('me') ? 1 :
                                   c.downVotesBy?.includes('me') ? -1 : 0;
        return (
          <li key={c.id}>
            <span>
              <strong>{c.owner.name}:</strong> {c.content}
            </span>
            {token && (
              <VoteButton
                currentVote={currentCommentVote}
                onVote={(vote) => handleCommentVote(c.id, vote)}
              />
            )}
          </li>
        );
      })}
    </ul>

    {/* Add Comment */}
    {token && (
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    )}
  </div>
);
}
