import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, fetchMe } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ login → token
      await dispatch(login({ email, password })).unwrap();

      // 2️⃣ ambil user
      await dispatch(fetchMe()).unwrap();

      // 3️⃣ close modal (kalau ada)
      if (onLoginSuccess) onLoginSuccess();

      // 4️⃣ redirect ke threads
      navigate('/threads');
    } catch (err) {
      alert('Login failed: ' + err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="auth-button" type="submit">
          Login
        </button>

        <p className="auth-footer">
          Belum punya akun?{' '}
          <span
            className="auth-link"
            onClick={() => navigate('/register')}
          >
            Daftar
          </span>
        </p>
      </form>
    </div>
  );
}
