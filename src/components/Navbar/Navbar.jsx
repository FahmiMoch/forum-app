import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import LoginPage from '../../pages/LoginPage';
import '../../styles/styles.css';

export default function Navbar() {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => window.location.href = '/'}>
          ForumLogo
        </div>

        <div className="navbar-action">
          {token ? (
            <img
              src={user.avatar || 'https://via.placeholder.com/30'}
              alt={user.name}
              className="navbar-avatar"
              onClick={handleLogout}
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/709/709579.png"
              alt="Login"
              className="navbar-login-icon"
              onClick={() => setShowLogin(true)}
            />
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowLogin(false)}>
              X
            </button>
            <LoginPage onLoginSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </>
  );
}
