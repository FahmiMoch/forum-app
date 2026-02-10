export default function LeaderboardItem({ item, index }) {
  return (
    <li
      className={`leaderboard-item ${index < 3 ? "top-rank" : ""}`}
    >
      <span className={`rank rank-${index + 1}`}>
        {index + 1}
      </span>

      <img
        src={item.user.avatar || "https://via.placeholder.com/40"}
        alt={item.user.name}
        className="avatar"
      />

      <span className="name">{item.user.name}</span>
      <span className="score">{item.score}</span>
    </li>
  );
}
