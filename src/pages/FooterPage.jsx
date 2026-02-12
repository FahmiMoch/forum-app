import React from "react";
import { useNavigate } from "react-router-dom";

export default function FooterPage() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
         <div className="footer-right">
        <span>© {new Date().getFullYear()} ForumApp</span>
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
