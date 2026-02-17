import React from "react";
import { useSelector } from "react-redux";

import ThreadHeader from "./ThreadHeader";
import ThreadBody from "./ThreadBody";
import ThreadComments from "./ThreadComments";

export default function ThreadDetailContent({
  threadDetail,
  threadId,
  isOwner,
  isUpVoted,
  isDownVoted,
  onVote,
  onVoteComment,
  onDeleteThread,
  onAddComment,
  onRequireLogin,
}) {
  const comments = useSelector(
    (state) => state.comments.commentsByThread[threadId] || []
  );

  return (
    <div className="thread-detail">
      <ThreadHeader
        threadDetail={threadDetail}
        isOwner={isOwner}
        onDelete={onDeleteThread}
      />

      <ThreadBody
        threadDetail={threadDetail}
        threadId={threadId}
        isUpVoted={isUpVoted}
        isDownVoted={isDownVoted}
        onVote={onVote}
      />

      <ThreadComments
        comments={comments}
        threadId={threadId}
        onAddComment={onAddComment}
        onRequireLogin={onRequireLogin}
        onVote={onVoteComment}
      />
    </div>
  );
}
