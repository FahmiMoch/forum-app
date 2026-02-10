import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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

export default function ThreadHeader({ threadDetail, isOwner, onDelete }) {
  return (
    <div className="thread-header-detail">
      <div className="thread-main-detail">
        <div className="thread-owner-detail">
          <div className="avatar-detail">
            <Avatar user={threadDetail.owner} />
          </div>

          <div>
            <h2>{threadDetail.title}</h2>
            <div className="thread-meta-detail">
              <span>
                by <strong>{threadDetail.owner?.name}</strong>
              </span>
              <span>• {formatDate(threadDetail.createdAt)}</span>
            </div>
          </div>
        </div>

        {isOwner && (
          <button className="btn-delete" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} /> Hapus
          </button>
        )}
      </div>
    </div>
  );
}
