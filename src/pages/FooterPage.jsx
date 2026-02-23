import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FooterPage() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-left">
        <span
          className="footer-logo"
          onClick={() => navigate('/')}
          role="button"
        >
          <i className="fas fa-comments"></i>
          <span>ForumApp</span>
        </span>
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

      <div className="footer-right">
        <span className="footer-made">
          © {new Date().getFullYear()} Made by Fahmi
        </span>
      </div>
    </footer>
  );
}
