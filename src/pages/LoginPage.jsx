import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, fetchMe } from '../features/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/styles.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 ambil halaman asal (kalau ada)
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password })).unwrap();
      await dispatch(fetchMe()).unwrap();

      // ✅ balik ke halaman sebelumnya
      navigate(from, { replace: true });
    } catch (err) {
      alert('Login gagal');
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
