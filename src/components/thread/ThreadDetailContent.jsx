import React from "react";
import ThreadHeader from "./ThreadHeader";
import ThreadBody from "./ThreadBody";
import ThreadComments from "./ThreadComments";

export default function ThreadDetailContent({
  threadDetail,
  threadId,
  isOwner,
  isUpVoted,
  isDownVoted,
  token,
  onVote,
  onVoteComment,
  onDeleteThread,
  onAddComment,
  onRequireLogin,
}) {
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
  comments={threadDetail.comments}
  token={token}
  onAddComment={onAddComment}
  onRequireLogin={onRequireLogin}
  onVote={onVoteComment}
/>

    </div>
  );
}
