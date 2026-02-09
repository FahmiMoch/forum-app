import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchThreads } from '../features/threads/threadsSlice';
import { fetchUsers } from '../features/users/usersSlice';

import { formatDate } from '../utils/FormatDate';

import LeaderboardPage from './LeaderboardPage';
import ThreadsLoading from '../components/Loading/ThreadPageLoading';
import ThreadError from '../components/Error/ThreadError';

export default function ThreadsPage() {
  const dispatch = useDispatch();

  const threads = useSelector((state) => state.threads.threads);
  const users = useSelector((state) => state.users.users);

  const loading = useSelector((state) => state.threads.loadingThreads);
  const error = useSelector((state) => state.threads.error);

  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  // 🔄 mapping user by id
  const usersById = useMemo(() => {
    const map = {};
    users.forEach((u) => {
      map[u.id] = u;
    });
    return map;
  }, [users]);

  // 📂 kategori
  const categories = useMemo(
    () => ['All', ...new Set(threads.map((t) => t.category || 'General'))],
    [threads]
  );

  // 🔍 filter kategori
  const filteredThreads =
    categoryFilter === 'All'
      ? threads
      : threads.filter((t) => t.category === categoryFilter);

  if (loading) return <ThreadsLoading />;
  if (error) return <ThreadError />;

  return (
    <div className="forum-layout">
      {/* LEFT */}
      <h3 className="section-title left">Leaderboards</h3>
      <aside className="forum-left">
        <LeaderboardPage />
      </aside>

      {/* CENTER */}
      <h3 className="section-title center">Forum Threads</h3>
      <main className="forum-center">
        <ul className="thread-list">
          {filteredThreads.map((thread) => {
            const user = usersById[thread.ownerId];

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
                    <strong>{user?.name || 'Anonymous'}</strong>
                    <div className="thread-time">
                      {formatDate(thread.createdAt)}
                    </div>
                  </div>
                </div>

                {/* TITLE */}
                <Link
                  to={`/threads/${thread.id}`}
                  className="thread-title"
                >
                  {thread.title}
                </Link>

                {/* BODY PREVIEW */}
                <p className="thread-body">
                  {(thread.body || '')
                    .replace(/<[^>]*>?/gm, '')
                    .slice(0, 120)}
                  ...
                </p>

                {/* META */}
                <div className="thread-meta">
                  <span>#{thread.category || 'General'}</span>
                  <span>{thread.totalComments || 0} komentar</span>
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      {/* RIGHT */}
      <h3 className="section-title right">Category</h3>
      <aside className="forum-right">
        <ul className="category-list">
          {categories.map((cat) => (
            <li
              key={cat}
              className={categoryFilter === cat ? 'active' : ''}
              onClick={() => setCategoryFilter(cat)}
            >
              #{cat}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
