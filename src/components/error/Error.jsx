import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Error({ message, onRetry }) {
  return (
    <div className="threads-error">
      <div className="threads-error-card">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="threads-error-icon"
        />

        <h3>Terjadi Kesalahan</h3>
        <p>{message || 'Gagal memuat data'}</p>

        {onRetry && (
          <button className="threads-error-button" onClick={onRetry}>
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}
