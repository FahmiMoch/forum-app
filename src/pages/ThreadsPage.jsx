import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads } from '../features/threads/threadsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import { Link } from 'react-router-dom';
import LeaderboardPage from './LeaderboardPage';

export default function ThreadsPage() {
  const dispatch = useDispatch();

  // ===== REDUX STATE =====
  const threads = useSelector(state => state.threads?.threads || []);
  const users = useSelector(state => state.users?.users || []);
  const authUser = useSelector(state => state.auth.user);

  const loading = useSelector(state => state.threads?.loading);
  const error = useSelector(state => state.threads?.error);

  const [categoryFilter, setCategoryFilter] = useState('All');

  // ===== FETCH DATA =====
  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  // ===== MAP USERS BY ID =====
  const usersById = useMemo(() => {
    const map = {};
    users.forEach(user => {
      map[user.id] = user;
    });
    return map;
  }, [users]);

  // ===== CATEGORY =====
  const categories = ['All', ...new Set(
    threads.map(t => t.category || 'General')
  )];

  const filteredThreads =
    categoryFilter === 'All'
      ? threads
      : threads.filter(t => t.category === categoryFilter);

  // ===== FORMAT TIME =====
  const formatTime = (date) =>
    new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  if (loading) return <p>Loading threads...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="forum-layout">

      {/* LEFT */}
      <aside className="forum-left">
        <LeaderboardPage limit={5} />
      </aside>

      {/* CENTER */}
      <main className="forum-center">
        <h2>Forum Threads</h2>

        <ul className="thread-list">
          {filteredThreads.map(thread => {
            const user = usersById[thread.ownerId];

            const isUpVoted =
              authUser && thread.upVotesBy?.includes(authUser.id);

            const isDownVoted =
              authUser && thread.downVotesBy?.includes(authUser.id);

            return (
              <li key={thread.id} className="thread-card">

                {/* HEADER */}
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
                    <div className="thread-author">
                      Dibuat oleh{' '}
                      <strong>{user?.name || 'Anonymous'}</strong>
                    </div>

                    <div className="thread-time">
                      {formatTime(thread.createdAt)}
                    </div>
                  </div>
                </div>

                {/* TITLE */}
                <Link to={`/threads/${thread.id}`} className="thread-title">
                  {thread.title}
                </Link>

                {/* BODY */}
                <p className="thread-body">
                  {thread.body
                    .replace(/<[^>]*>?/gm, '')
                    .slice(0, 120)}...
                </p>

                {/* META */}
             {/* META */}
<div className="thread-meta">
  <span>
    <i className="fas fa-tag"></i> {thread.category}
  </span>
  <span>
    <i className="fas fa-comments"></i> {thread.totalComments}
  </span>
</div>

{/* VOTES */}
<div className="thread-votes">
  <button
    className={`vote-btn up ${isUpVoted ? 'active' : ''}`}
    disabled={!authUser}
  >
    <i className="fas fa-thumbs-up"></i>
    <span>{thread.upVotesBy?.length || 0}</span>
  </button>

  <button
    className={`vote-btn down ${isDownVoted ? 'active' : ''}`}
    disabled={!authUser}
  >
    <i className="fas fa-thumbs-down"></i>
    <span>{thread.downVotesBy?.length || 0}</span>
  </button>
</div>


              </li>
            );
          })}
        </ul>
      </main>

      {/* RIGHT */}
      <aside className="forum-right">
        <h4>
  <i className="fas fa-filter"></i> Categories
</h4>

<ul>
  {categories.map(cat => (
    <li
      key={cat}
      className={categoryFilter === cat ? 'active' : ''}
      onClick={() => setCategoryFilter(cat)}
    >
      <i className="fas fa-hashtag"></i> {cat}
    </li>
  ))}
</ul>

      </aside>

    </div>
  );
}
