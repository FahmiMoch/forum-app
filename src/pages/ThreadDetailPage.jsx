import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchThreadDetail,
  voteOnThread,
  clearThreadDetail,
  deleteThreadAsync,
} from '../features/threads/threadsSlice';

import { addComment } from '../features/comments/commentsSlice';
import { formatDate } from '../utils/FormatDate';

import VoteButton from '../components/VoteButton/VoteButton';
import Loading from '../components/Loading/Loading';
import ThreadError from '../components/Error/ThreadError';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';

/* =====================
   SMALL REUSABLE UI
===================== */
function Avatar({ user }) {
  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className="avatar-img"
      />
    );
  }

  return (
    <div className="avatar-fallback">
      {user?.name?.charAt(0).toUpperCase()}
    </div>
  );
}

/* =====================
   PAGE
===================== */
export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    threadDetail,
    loading,
    error,
  } = useSelector((state) => state.threads);

  const { user: authUser, token } = useSelector(
    (state) => state.auth
  );

  const userId = authUser?.id;

  /* =====================
     FETCH
  ===================== */
  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
    return () => dispatch(clearThreadDetail());
  }, [dispatch, threadId]);

  /* =====================
     GUARDS
  ===================== */
  const requireLogin = useCallback(() => {
    alert('Login dulu ya 🙂');
    navigate('/login', {
      replace: true,
      state: { from: location },
    });
  }, [navigate, location]);

  /* =====================
     UI STATE
  ===================== */
  if (loading) return <Loading />;
  if (error) return <ThreadError />;
  if (!threadDetail) return null;

  /* =====================
     DERIVED STATE
  ===================== */
  const isOwner = userId === threadDetail.owner?.id;
  const isUpVoted = userId
    ? threadDetail.upVotesBy.includes(userId)
    : false;
  const isDownVoted = userId
    ? threadDetail.downVotesBy.includes(userId)
    : false;

  /* =====================
     HANDLERS
  ===================== */
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

  const handleDeleteThread = async () => {
    if (!window.confirm('Hapus thread ini?')) return;
    await dispatch(deleteThreadAsync(threadId));
    navigate('/');
  };

  /* =====================
     RENDER
  ===================== */
  return (
    <div className="thread-detail">
      {/* HEADER */}
      <div className="thread-header-detail">
        <div className="thread-main">
          <div className="thread-owner">
            <div className="avatar">
              <Avatar user={threadDetail.owner} />
            </div>

            <div>
              <h2>{threadDetail.title}</h2>
              <div className="thread-meta">
                <span>
                  by <strong>{threadDetail.owner?.name}</strong>
                </span>
                <span>• {formatDate(threadDetail.createdAt)}</span>
              </div>
            </div>
          </div>

          {isOwner && (
            <button
              className="btn-delete"
              onClick={handleDeleteThread}
            >
              <FontAwesomeIcon icon={faTrash} /> Hapus
            </button>
          )}
        </div>
      </div>

      {/* BODY */}
      <div
        className="thread-body"
        dangerouslySetInnerHTML={{
          __html: threadDetail.body,
        }}
      />

      {/* VOTE */}
      <VoteButton
        upVotes={threadDetail.upVotesBy.length}
        downVotes={threadDetail.downVotesBy.length}
        isUpVoted={isUpVoted}
        isDownVoted={isDownVoted}
        onVote={handleVote}
      />

      {/* COMMENTS */}
      <h4>Komentar</h4>
      <ul className="comment-list">
        {threadDetail.comments.map((c) => (
          <li key={c.id} className="comment-item">
            <div className="avatar">
              <Avatar user={c.owner} />
            </div>

            <div className="comment-content">
              <strong>{c.owner?.name}</strong>
              <span>{formatDate(c.createdAt)}</span>
              <p>{c.content}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* ADD COMMENT */}
      {token ? (
        <form
          className="comment-form"
          onSubmit={handleAddComment}
        >
          <input
            name="comment"
            placeholder="Tulis komentar..."
            required
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      ) : (
        <div className="comment-login-hint">
          <p>
            💬 <strong>Login dulu</strong> untuk ikut komentar
          </p>
          <button onClick={requireLogin}>
            Login sekarang
          </button>
        </div>
      )}
    </div>
  );
}
