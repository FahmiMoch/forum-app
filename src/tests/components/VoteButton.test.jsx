/**
 * Skenario:
 * - should render vote counts correctly
 * - should call onVote(1) when upvote clicked and not voted yet
 * - should call onVote(0) when upvote clicked and already upvoted
 * - should call onVote(-1) when downvote clicked and not voted yet
 * - should call onVote(0) when downvote clicked and already downvoted
 * - should apply active class when upvoted
 * - should apply active class when downvoted
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import VoteButton from '../../components/thread/VoteButton';

describe('VoteButton Component', () => {
  const defaultProps = {
    upVotes: 10,
    downVotes: 3,
    isUpVoted: false,
    isDownVoted: false,
    onVote: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render vote counts correctly', () => {
    render(<VoteButton {...defaultProps} />);

    expect(screen.getByText(/Vote Up \(10\)/)).toBeInTheDocument();
    expect(screen.getByText(/Vote Down \(3\)/)).toBeInTheDocument();
  });

  it('should call onVote(1) when upvote clicked and not voted yet', () => {
    render(<VoteButton {...defaultProps} />);

    const upButton = screen.getByText(/Vote Up/).closest('button');
    fireEvent.click(upButton);

    expect(defaultProps.onVote).toHaveBeenCalledWith(1);
  });

  it('should call onVote(0) when upvote clicked and already upvoted', () => {
    render(
      <VoteButton
        {...defaultProps}
        isUpVoted={true}
      />
    );

    const upButton = screen.getByText(/Vote Up/).closest('button');
    fireEvent.click(upButton);

    expect(defaultProps.onVote).toHaveBeenCalledWith(0);
  });

  it('should call onVote(-1) when downvote clicked and not voted yet', () => {
    render(<VoteButton {...defaultProps} />);

    const downButton = screen.getByText(/Vote Down/).closest('button');
    fireEvent.click(downButton);

    expect(defaultProps.onVote).toHaveBeenCalledWith(-1);
  });

  it('should call onVote(0) when downvote clicked and already downvoted', () => {
    render(
      <VoteButton
        {...defaultProps}
        isDownVoted={true}
      />
    );

    const downButton = screen.getByText(/Vote Down/).closest('button');
    fireEvent.click(downButton);

    expect(defaultProps.onVote).toHaveBeenCalledWith(0);
  });

  it('should apply active class when upvoted', () => {
    render(
      <VoteButton
        {...defaultProps}
        isUpVoted={true}
      />
    );

    const upButton = screen.getByText(/Vote Up/).closest('button');
    expect(upButton.className).toMatch(/active/);
  });

  it('should apply active class when downvoted', () => {
    render(
      <VoteButton
        {...defaultProps}
        isDownVoted={true}
      />
    );

    const downButton = screen.getByText(/Vote Down/).closest('button');
    expect(downButton.className).toMatch(/active/);
  });
  });