import React, { useEffect, useState } from "react";
import { getLeaderboards } from "../api/leaderboardApi";
import Loading from "../components/Loading";

export default function LeaderboardPage() {
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
        setError(err.message || "Failed to fetch leaderboards");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="leaderboard-container">
      <ul className="leaderboard-list">
        {leaderboards.map((item, index) => (
          <li
            key={item.user.id}
            className={`leaderboard-item ${index < 3 ? "top-rank" : ""}`}
          >
            <span className={`rank rank-${index + 1}`}>{index + 1}</span>

            <img
              src={item.user.avatar || "https://via.placeholder.com/40"}
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
