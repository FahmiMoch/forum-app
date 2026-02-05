import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import '../../styles/styles.css';

export default function Navbar() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🌗 THEME
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">

      {/* 🔥 LOGO */}
      <div
        className="navbar-logo"
        onClick={() => navigate('/')}
      >
        <i className="fas fa-comments"></i>
        <span>ForumApp</span>
      </div>

      {/* ACTION */}
      <div className="navbar-action">

        {/* ✍️ CREATE THREAD */}
        {token && (
          <button
            className="create-thread-btn"
            onClick={() => navigate('/threads/create')}
            title="Create Thread"
          >
            <i className="fas fa-plus"></i>
            <span>Thread</span>
          </button>
        )}

        {/* 🌗 THEME */}
        <button className="theme-toggle" onClick={toggleTheme}>
          <i
            className={`fas ${
              theme === 'light' ? 'fa-moon' : 'fa-sun'
            }`}
          ></i>
        </button>

        {/* AUTH */}
        {token ? (
          <img
            src={user?.avatar || 'https://via.placeholder.com/30'}
            alt={user?.name}
            className="navbar-avatar"
            onClick={handleLogout}
            title="Logout"
          />
        ) : (
          <i
            className="fas fa-sign-in-alt navbar-login-icon"
            onClick={() => navigate('/login')}
            title="Login"
          ></i>
        )}
      </div>
    </nav>
  );
}
