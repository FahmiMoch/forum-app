import React from 'react';
export default function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="loading-box">
        <div className="ring">
          <div className="ring-inner"></div>
        </div>
        <h3 className="loading-title">Sedang Memuat</h3>
        <p className="loading-subtitle">Harap tunggu beberapa saat</p>
      </div>
    </div>
  );
}
