import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/FormatDate';
import Loading from '../loading/Loading';
import ThreadError from '../error/Error';

export default function ThreadList({ threads, usersById, loading, error }) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ThreadError />;
  }

  if (!threads || threads.length === 0) {
    return <p style={{ padding: 16 }}>Tidak ada thread.</p>;
  }

  return (
    <ul className="thread-list">
      {threads.map((thread) => {
        const user = usersById?.[thread.ownerId];

        return (
          <li key={thread.id} className="thread-card">
            <div className="thread-header">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.name || 'User'}`
                }
                alt={user?.name || 'Anonymous'}
                className="thread-avatar"
              />

              <div className="thread-info">
                <strong>{user?.name || 'Anonymous'}</strong>
                <div className="thread-time">
                  {formatDate(thread.createdAt)}
                </div>
              </div>
            </div>

            <Link to={`/threads/${thread.id}`} className="thread-title">
              {thread.title}
            </Link>

            <p className="thread-body">
              {(thread.body || '').replace(/<[^>]*>?/gm, '').slice(0, 120)}
              ...
            </p>

            <div className="thread-meta">
              <span>#{thread.category || 'General'}</span>
              <span>{thread.totalComments || 0} komentar</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
