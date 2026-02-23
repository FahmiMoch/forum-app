import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

export default function Navbar() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleCreateThread = () => {
    if (!token) navigate('/login');
    else navigate('/threads/create');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <i className="fas fa-comments"></i>
        <span>ForumApp</span>
      </div>

      <div className="navbar-action">
        <button
          className="icon-btn"
          onClick={handleCreateThread}
          title={token ? 'Create Thread' : 'Login untuk membuat thread'}
        >
          <i className="fas fa-plus"></i>
        </button>

        <button className="icon-btn" onClick={toggleTheme}>
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} />
        </button>

        <div className="user-menu" ref={dropdownRef}>
          <button
            className="icon-btn"
            onClick={() =>
              token ? setOpenDropdown(!openDropdown) : navigate('/login')
            }
          >
            <i className="fas fa-user-circle"></i>
          </button>

          {token && openDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-user">
                <i className="fas fa-user"></i>
                <span>{user?.name}</span>
              </div>

              <button className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
