import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchThreads } from '../features/threads/threadsSlice';
import { Link } from 'react-router-dom';
import LeaderboardPage from './LeaderboardPage'; // import Leaderboard
import '../styles/styles.css'

export default function ThreadsPage() {
  const dispatch = useDispatch();
  const threads = useSelector(state => state.threads?.threads || []);
  const loading = useSelector(state => state.threads?.loading);
  const error = useSelector(state => state.threads?.error);

  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  // Ambil daftar kategori unik dari threads
  const categories = ['All', ...new Set(threads.map(t => t.category || 'General'))];

  // Filter threads sesuai kategori
  const filteredThreads = categoryFilter === 'All'
    ? threads
    : threads.filter(t => t.category === categoryFilter);

  if (loading) return <p>Loading threads...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Forum Threads</h2>

      {/* Filter Category */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Thread List */}
      <ul>
        {filteredThreads.map(thread => (
          <li key={thread.id}>
            <Link to={`/threads/${thread.id}`}>
              <h3>{thread.title}</h3>
            </Link>
            <p>{thread.body.slice(0, 100)}...</p>
            <p>Category: {thread.category || 'General'}</p>
            <p>Comments: {thread.totalComments}</p>
          </li>
        ))}
      </ul>

      {/* Leaderboard di bawah threads */}
      <div style={{ marginTop: '50px' }}>
        <LeaderboardPage />
      </div>
    </div>
  );
}
