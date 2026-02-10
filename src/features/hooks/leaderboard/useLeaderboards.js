import { useEffect, useState } from "react";
import { getLeaderboards } from "../../../api/leaderboardApi";

export default function useLeaderboards() {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboards();
        const sorted = [...data.leaderboards].sort(
          (a, b) => b.score - a.score
        );
        setLeaderboards(sorted);
      } catch (err) {
        setError(err.message || "Failed to fetch leaderboards");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return {
    leaderboards,
    loading,
    error,
  };
}
