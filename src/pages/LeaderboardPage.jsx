import React, { useEffect, useState } from 'react';
import { getLeaderboards } from '../api/leaderboardApi';
import { Link } from 'react-router-dom';

export default function LeaderboardPage({ limit }) {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboards();
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

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const displayed = limit ? leaderboards.slice(0, limit) : leaderboards;

  return (
    <div className={`leaderboard-container ${limit ? 'compact' : ''}`}>
      <h2 className="leaderboard-title">Leaderboard</h2>

      <ul className="leaderboard-list">
        {displayed.map((item, index) => (
          <li
            key={item.user.id}
            className={`leaderboard-item ${index < 3 ? 'top-rank' : ''}`}
          >
            <span className={`rank rank-${index + 1}`}>
              {index + 1}
            </span>

            <img
              src={item.user.avatar || 'https://via.placeholder.com/40'}
              alt={item.user.name}
              className="avatar"
            />

            <span className="name">{item.user.name}</span>
            <span className="score">{item.score}</span>
          </li>
        ))}
      </ul>

      {limit && (
        <Link to="/leaderboard" className="see-all">
          Lihat semua →
        </Link>
      )}
    </div>
  );
}
