import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/loading/Loading";
import LeaderboardList from "../components/leaderboard/LeaderboardList";
import ThreadError from "../components/error/Error";

import { fetchLeaderboards } from "../features/leaderboard/leaderboardSlice";

export default function LeaderboardPage() {

  const dispatch = useDispatch();

  const {
    leaderboards,
    loading,
    error
  } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  if (loading) return <Loading />;

  if (error) return <ThreadError />;

  return (
    <div className="leaderboard-container">
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}