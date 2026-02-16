import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/FormatDate";

function Avatar({ user }) {
  if (user?.avatar) {
    return <img src={user.avatar} alt={user.name} className="avatar-img" />;
  }

  return (
    <div className="avatar-fallback">
      {user?.name?.charAt(0).toUpperCase()}
    </div>
  );
}

export default function ThreadComments({
  comments,
  token,
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
                  {c.content.replace(/<br\s*\/?>/gi, "\n")}
                </p>

                {/* 🔥 VOTE SECTION */}
                <div className="comment-vote">
                  <button
                    className={`vote-btn up ${isUpVoted ? "active" : ""}`}
                    onClick={() =>
                      token
                        ? onVote(c.id, isUpVoted ? 0 : 1)
                        : onRequireLogin()
                    }
                  >
                    <FontAwesomeIcon icon={faChevronUp} />
                    <span>{c.upVotesBy?.length || 0}</span>
                  </button>

                  <button
                    className={`vote-btn down ${
                      isDownVoted ? "active" : ""
                    }`}
                    onClick={() =>
                      token
                        ? onVote(c.id, isDownVoted ? 0 : -1)
                        : onRequireLogin()
                    }
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                    <span>{c.downVotesBy?.length || 0}</span>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {token ? (
        <form className="comment-form" onSubmit={onAddComment}>
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
            <strong>Login dulu</strong> untuk ikut komentar
          </p>
          <button onClick={onRequireLogin}>Login sekarang</button>
        </div>
      )}
    </>
  );
}
