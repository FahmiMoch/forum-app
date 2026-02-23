import React from 'react';
import { useSelector } from 'react-redux';
import VoteButton from './VoteButton';
import { formatDate } from '../../utils/FormatDate';

function Avatar({ user }) {
  if (user?.avatar) {
    return <img src={user.avatar} alt={user.name} className="avatar-img" />;
  }

  return (
    <div className="avatar-fallback">
      {user?.name?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
}

export default function ThreadComments({
  comments = [],
  threadId,
  onAddComment,
  onRequireLogin,
  onVote,
}) {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <h4>Komentar</h4>

      <ul className="comment-list">
        {comments.map((c) => {
          const isUpVoted = c.upVotesBy?.includes(user?.id);
          const isDownVoted = c.downVotesBy?.includes(user?.id);

          return (
            <li key={c.id} className="comment-item">
              <div className="avatar">
                <Avatar user={c.owner} />
              </div>

              <div className="comment-content">
                <strong>{c.owner?.name}</strong>
                <span>{formatDate(c.createdAt)}</span>

                <p>
                  {c.content?.replace(/<br\s*\/?>/gi, '\n')}
                </p>

                <VoteButton
                  upVotes={c.upVotesBy?.length || 0}
                  downVotes={c.downVotesBy?.length || 0}
                  isUpVoted={isUpVoted}
                  isDownVoted={isDownVoted}
                  onVote={(voteType) => {

                    if (!user) {
                      if (onRequireLogin) onRequireLogin();
                      return;
                    }

                    if (!onVote) {
                      return;
                    }

                    onVote(threadId, c.id, voteType);
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {user ? (
        <form
          className="comment-form"
          onSubmit={(e) => {
            e.preventDefault();

            if (!onAddComment) {
              return;
            }

            onAddComment(e);
          }}
        >
          <input
            name="comment"
            placeholder="Tulis komentar..."
            required
          />
          <button type="submit">Kirim</button>
        </form>
      ) : (
        <div className="comment-login-hint">
          <p>
            <strong>Login dulu</strong> untuk ikut komentar
          </p>
          <button
            type="button"
            onClick={() => {
              if (onRequireLogin) onRequireLogin();
            }}
          >
            Login sekarang
          </button>
        </div>
      )}
    </>
  );
}
