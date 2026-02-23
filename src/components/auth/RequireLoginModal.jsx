import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RequireLoginModal({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!open) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login', {
      state: { from: location },
    });
  };

  return (
    <div className="login-modal-backdrop">
      <div className="login-modal">
        <h3>Akses dibatasi</h3>
        <p>Kamu harus login untuk melakukan aksi ini.</p>

        <div className="login-modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Batal
          </button>

          <button className="btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
