import React from 'react';

export default function VoteButton({ currentVote, onVote }) {
  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <button
        style={{ color: currentVote === 1 ? 'green' : 'gray' }}
        onClick={() => onVote(currentVote === 1 ? 0 : 1)}
      >
        ▲
      </button>
      <button
        style={{ color: currentVote === -1 ? 'red' : 'gray' }}
        onClick={() => onVote(currentVote === -1 ? 0 : -1)}
      >
        ▼
      </button>
    </div>
  );
}
