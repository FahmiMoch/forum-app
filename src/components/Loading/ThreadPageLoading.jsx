import React from 'react';

export default function ThreadPageLoading() {
  return (
    <div className="forum-layout loading">
      <h3 className="section-title">Leaderboards</h3>
      <aside className="forum-left">
        <div className="skeleton-box large"></div>
      </aside>

      <h3 className="section-title center">Forum Threads</h3>
      <main className="forum-center">
        <ul className="thread-list">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="thread-card skeleton-card">
              <div className="thread-header">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-info">
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line tiny"></div>
                </div>
              </div>

              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>

              <div className="skeleton-meta">
                <div className="skeleton-line tiny"></div>
                <div className="skeleton-line tiny"></div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <h3 className="section-title right">Category</h3>
      <aside className="forum-right">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton-line short"></div>
        ))}
      </aside>
    </div>
  );
}
