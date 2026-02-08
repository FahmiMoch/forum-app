import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function ThreadsError({ message }) {
  return (
    <div className="threads-error">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="threads-error-icon"
      />

      <h3>Terjadi Kesalahan</h3>
      <p>{message || 'Gagal memuat data'}</p>
    </div>
  );
}
