import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

export default function VoteButton({
  upVotes,
  downVotes,
  isUpVoted,
  isDownVoted,
  onVote,
}) {
  return (
    <div className="thread-vote-section">
      <button
        className={`vote-btn up ${isUpVoted ? 'active' : ''}`}
        onClick={() => onVote(isUpVoted ? 0 : 1)}
      >
        <FontAwesomeIcon icon={faChevronUp} />
        <span>{upVotes}</span>
      </button>

      <button
        className={`vote-btn down ${isDownVoted ? 'active' : ''}`}
        onClick={() => onVote(isDownVoted ? 0 : -1)}
      >
        <FontAwesomeIcon icon={faChevronDown} />
        <span>{downVotes}</span>
      </button>
    </div>
  );
}
