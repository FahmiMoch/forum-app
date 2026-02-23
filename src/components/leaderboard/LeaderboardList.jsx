import LeaderboardItem from './LeaderboardItem';

export default function LeaderboardList({ leaderboards }) {
  return (
    <ul className="leaderboard-list">
      {leaderboards.map((item, index) => (
        <LeaderboardItem
          key={item.user.id}
          item={item}
          index={index}
        />
      ))}
    </ul>
  );
}
