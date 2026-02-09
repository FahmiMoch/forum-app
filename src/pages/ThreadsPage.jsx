import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchThreads } from '../features/threads/threadsSlice';
import { fetchUsers } from '../features/users/usersSlice';

import LeaderboardPage from './LeaderboardPage';
import ThreadList from '../components/ThreadList';
import CategoryList from '../components/CategoryList';

export default function ThreadsPage() {
  const dispatch = useDispatch();

  /* ===== REDUX STATE ===== */
  const {
    threads,
    loading: threadsLoading,
    error: threadsError,
  } = useSelector((state) => state.threads);

  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);

  const [categoryFilter, setCategoryFilter] = useState('All');

  /* ===== FETCH ===== */
  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  /* ===== USERS MAP ===== */
  const usersById = useMemo(() => {
    if (!Array.isArray(users)) return {};
    return users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});
  }, [users]);

  /* ===== CATEGORIES ===== */
  const categories = useMemo(() => {
    if (!Array.isArray(threads)) return ['All'];
    return [
      'All',
      ...new Set(threads.map((t) => t.category || 'General')),
    ];
  }, [threads]);

  /* ===== FILTER THREADS ===== */
  const filteredThreads = useMemo(() => {
    if (!Array.isArray(threads)) return [];
    if (categoryFilter === 'All') return threads;
    return threads.filter((t) => t.category === categoryFilter);
  }, [threads, categoryFilter]);

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
        <ThreadList
          threads={filteredThreads}
          usersById={usersById}
          loading={threadsLoading || usersLoading}
          error={threadsError || usersError}
        />
      </main>

      {/* RIGHT */}
      <h3 className="section-title right">Category</h3>
      <aside className="forum-right">
        <CategoryList
          categories={categories}
          activeCategory={categoryFilter}
          onSelect={setCategoryFilter}
          loading={threadsLoading}
        />
      </aside>
    </div>
  );
}
