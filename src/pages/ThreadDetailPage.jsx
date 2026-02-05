import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchThreadDetail,
  voteOnThread,
  clearThreadDetail,
} from '../features/threads/threadsSlice';
import { addComment } from '../features/comments/commentsSlice';

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { threadDetail, loading } = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
    return () => dispatch(clearThreadDetail());
  }, [dispatch, threadId]);

  if (loading || !threadDetail) {
    return <p className="loading-text">Loading thread...</p>;
  }

  const comments = threadDetail.comments || [];

  const isUpVoted =
    authUser && threadDetail.upVotesBy?.includes(authUser.id);

  const isDownVoted =
    authUser && threadDetail.downVotesBy?.includes(authUser.id);

  const handleVote = (type) => {
    if (!token) {
      alert('Login dulu buat vote');
      return;
    }

    dispatch(
      voteOnThread({
        threadId,
        voteType: type,
      })
    );
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!token) {
      alert('Login dulu buat komentar');
      return;
    }

    const content = e.target.comment.value.trim();
    if (!content) return;

    dispatch(
      addComment({
        threadId,
        content,
      })
    );

    e.target.reset();
  };

  return (
    <div className="thread-detail">

      {/* ===== TITLE ===== */}
      <h2 className="thread-detail-title">
        <i className="fas fa-file-alt"></i>
        {threadDetail.title}
      </h2>

      {/* ===== AUTHOR ===== */}
      <p className="thread-detail-author">
        <i className="fas fa-user-circle"></i>
        {threadDetail.owner?.name || 'Anonymous'}
      </p>

      {/* ===== BODY ===== */}
      <div
        className="thread-detail-body"
        dangerouslySetInnerHTML={{ __html: threadDetail.body }}
      />

      {/* ===== VOTE ===== */}
      <div className="vote-section">
        <button
          className={`vote-btn up ${isUpVoted ? 'active' : ''}`}
          onClick={() => handleVote('up-vote')}
          disabled={!token}
        >
          <i className="fas fa-thumbs-up"></i>
          <span>{threadDetail.upVotesBy?.length || 0}</span>
        </button>

        <button
          className={`vote-btn down ${isDownVoted ? 'active' : ''}`}
          onClick={() => handleVote('down-vote')}
          disabled={!token}
        >
          <i className="fas fa-thumbs-down"></i>
          <span>{threadDetail.downVotesBy?.length || 0}</span>
        </button>

        {!token && (
          <span className="login-hint">
            <i className="fas fa-lock"></i>
            Login dulu buat vote
          </span>
        )}
      </div>

      {/* ===== COMMENTS ===== */}
      <h4 className="comment-title">
        <i className="fas fa-comments"></i>
        Comments ({comments.length})
      </h4>

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.id} className="comment-item">
            <div className="comment-header">
              <i className="fas fa-user"></i>
              <strong>{c.owner?.name || 'Anonymous'}</strong>
            </div>
            <p>{c.content}</p>
          </li>
        ))}
      </ul>

      {/* ===== COMMENT FORM ===== */}
      {token ? (
        <form className="comment-form" onSubmit={handleAddComment}>
          <i className="fas fa-pen"></i>
          <input
            name="comment"
            placeholder="Tulis komentar..."
            autoComplete="off"
            required
          />
          <button type="submit">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      ) : (
        <p className="login-hint">
          <i className="fas fa-lock"></i>
          Login dulu buat nambah komentar
        </p>
      )}
    </div>
  );
}
