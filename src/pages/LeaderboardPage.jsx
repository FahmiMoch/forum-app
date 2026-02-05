import React, { useEffect, useState } from 'react';
import { getLeaderboards } from '../api/leaderboardApi';
import '../styles/styles.css';

export default function LeaderboardPage() {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await getLeaderboards();
        // sort descending by score
        const sorted = data.leaderboards.sort((a, b) => b.score - a.score);
        setLeaderboards(sorted);
      } catch (err) {
        setError(err.message || 'Failed to fetch leaderboards');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p className="loading">Loading leaderboards...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <ul className="leaderboard-list">
        {leaderboards.map((item, index) => (
          <li
            key={item.user.id}
            className={`leaderboard-item ${index === 0 ? 'top-rank' : ''}`}
          >
            <span className="rank">{index + 1}</span>
            <img
              src={item.user.avatar || 'https://via.placeholder.com/50'}
              alt={item.user.name}
              className="avatar"
            />
            <span className="name">{item.user.name}</span>
            <span className="score">{item.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
