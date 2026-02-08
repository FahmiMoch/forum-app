import React, { useEffect } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchThreadDetail,
  voteOnThread,
  clearThreadDetail,
  deleteThreadAsync,
} from '../features/threads/threadsSlice';

import { addComment } from '../features/comments/commentsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faPaperPlane,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { threadDetail, loadingDetail } = useSelector(
    (state) => state.threads
  );
  const authUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
    return () => dispatch(clearThreadDetail());
  }, [dispatch, threadId]);

  if (loadingDetail || !threadDetail) {
    return <p>Loading thread...</p>;
  }

  const userId = authUser?.id;

  const isOwner = userId === threadDetail.owner?.id;
  const isUpVoted = userId
    ? threadDetail.upVotesBy.includes(userId)
    : false;
  const isDownVoted = userId
    ? threadDetail.downVotesBy.includes(userId)
    : false;

  const upVoteCount = threadDetail.upVotesBy.length;
  const downVoteCount = threadDetail.downVotesBy.length;

  // 🔐 WAJIB LOGIN
  const requireLogin = () => {
    alert('Login dulu ya 🙂');
    navigate('/login', {
      replace: true,
      state: { from: location },
    });
  };

  const handleVote = (voteType) => {
    if (!token) {
      requireLogin();
      return;
    }
    dispatch(voteOnThread({ threadId, voteType }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!token) {
      requireLogin();
      return;
    }

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

  const renderAvatar = (user) => {
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
  };

  return (
    <div className="thread-detail">
      {/* HEADER */}
      <div className="thread-header-detail">
        <div className="thread-main">
          <div className="thread-owner">
            <div className="avatar">
              {renderAvatar(threadDetail.owner)}
            </div>

            <div>
              <h2>{threadDetail.title}</h2>
              <p className="thread-author">
                by <strong>{threadDetail.owner?.name}</strong>
              </p>
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
        dangerouslySetInnerHTML={{ __html: threadDetail.body }}
      />

      {/* VOTE SECTION */}
      <div className="thread-vote-section">
        {/* VOTE UP */}
        <div className="vote-box up">
          <span className="vote-label">Vote Up</span>
          <button
            className={`vote-btn up ${isUpVoted ? 'active' : ''}`}
            onClick={() => handleVote(isUpVoted ? 0 : 1)}
          >
            <FontAwesomeIcon icon={faChevronUp} />
            <span className="vote-score">{upVoteCount}</span>
          </button>
        </div>

        {/* VOTE DOWN */}
        <div className="vote-box down">
          <span className="vote-label">Vote Down</span>
          <button
            className={`vote-btn down ${isDownVoted ? 'active' : ''}`}
            onClick={() => handleVote(isDownVoted ? 0 : -1)}
          >
            <FontAwesomeIcon icon={faChevronDown} />
            <span className="vote-score">{downVoteCount}</span>
          </button>
        </div>
      </div>

      {/* COMMENTS */}
      <h4>Komentar</h4>

      <ul className="comment-list">
        {threadDetail.comments.map((c) => (
          <li key={c.id} className="comment-item">
            <div className="avatar">
              {renderAvatar(c.owner)}
            </div>

            <div className="comment-content">
              <strong>{c.owner?.name}</strong>
              <p>{c.content}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* COMMENT FORM */}
      <form
        className="comment-form"
        onSubmit={handleAddComment}
      >
        <input
          name="comment"
          placeholder={
            token
              ? 'Tulis komentar...'
              : 'Login dulu untuk komentar'
          }
          disabled={!token}
          required
        />
        <button
          className="send-btn"
          type="submit"
          disabled={!token}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
