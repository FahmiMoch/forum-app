import React from "react";
import VoteButton from "./VoteButton";

export default function ThreadBody({
  threadDetail,
  isUpVoted,
  isDownVoted,
  onVote,
}) {
  return (
    <>
      <div
        className="thread-body"
        dangerouslySetInnerHTML={{
          __html: threadDetail.body,
        }}
      />

      <VoteButton
        upVotes={threadDetail.upVotesBy.length}
        downVotes={threadDetail.downVotesBy.length}
        isUpVoted={isUpVoted}
        isDownVoted={isDownVoted}
        onVote={onVote}
      />
    </>
  );
}
