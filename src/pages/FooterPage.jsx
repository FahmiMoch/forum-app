import React from "react";
import { useNavigate } from "react-router-dom";
import FooterLoading from "../components/loading/FooterLoading";

export default function FooterPage({ loading }) {
  const navigate = useNavigate();

  if (loading) {
    return <FooterLoading />;
  }

  return (
    <footer className="footer">
      <div className="footer-right">
        <span>© {new Date().getFullYear()} Made by Fahmi</span>
      </div>
      <div className="footer-center">
        <a
          href="https://www.linkedin.com/in/mochamad-fahmi-fadillah-83b524334"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a
          href="https://github.com/FahmiMoch"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </div>

      <div className="footer-left">
        <span className="footer-logo" onClick={() => navigate("/")}>
          <i className="fas fa-comments"></i> ForumApp
        </span>
      </div>
    </footer>
  );
}
