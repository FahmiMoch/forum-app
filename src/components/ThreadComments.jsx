import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../utils/FormatDate";

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
}) {
  return (
    <>
      <h4>Komentar</h4>

      <ul className="comment-list">
        {comments.map((c) => (
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
