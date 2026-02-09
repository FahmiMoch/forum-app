import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

export default function FooterPage() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-logo" onClick={() => navigate("/")}>
          <i className="fas fa-comments"></i> ForumApp
        </span>
      </div>

      <div className="footer-center">
        <button onClick={() => navigate("/")}>Threads</button>
        <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
        <button onClick={() => navigate("/about")}>About</button>
      </div>

      <div className="footer-right">
        <span>© {new Date().getFullYear()} ForumApp</span>
      </div>
    </footer>
  );
}
