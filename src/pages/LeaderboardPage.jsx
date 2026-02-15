import Loading from "../components/loading/Loading";
import useLeaderboards from "../features/hooks/leaderboard/useLeaderboards";
import LeaderboardList from "../components/leaderboard/LeaderboardList";
import ThreadError from "../components/error/Error";

export default function LeaderboardPage() {
  const { leaderboards, loading, error } = useLeaderboards();

  if (loading) return <Loading />;
   if (error) return <ThreadError />;
  return (
    <div className="leaderboard-container">
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}
