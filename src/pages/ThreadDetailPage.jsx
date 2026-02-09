import React, { useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchThreadDetail,
  clearThreadDetail,
  deleteThreadAsync,
  voteOnThread,
} from "../features/threads/threadsSlice";

import { addComment } from "../features/comments/commentsSlice";
import ThreadDetailContent from "../components/ThreadDetailContent";
import Loading from "../components/Loading";
import ThreadError from "../components/Error";

/* =====================
   PAGE
===================== */
export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { threadDetail, loading, error } = useSelector(
    (state) => state.threads
  );
  const { user: authUser, token } = useSelector((state) => state.auth);

  const userId = authUser?.id;

  /* =====================
     FETCH
  ===================== */
  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
    return () => dispatch(clearThreadDetail());
  }, [dispatch, threadId]);

  /* =====================
     LOGIN GUARD
  ===================== */
  const requireLogin = useCallback(() => {
    alert("Login dulu ya 🙂");
    navigate("/login", {
      replace: true,
      state: { from: location },
    });
  }, [navigate, location]);

  /* =====================
     UI STATE
  ===================== */
  if (loading) return <Loading />;
  if (error) return <ThreadError />;
  if (!threadDetail) return null;

  /* =====================
     DERIVED STATE
  ===================== */
  const isOwner = userId === threadDetail.owner?.id;
  const isUpVoted = userId
    ? threadDetail.upVotesBy.includes(userId)
    : false;
  const isDownVoted = userId
    ? threadDetail.downVotesBy.includes(userId)
    : false;

  /* =====================
     HANDLERS
  ===================== */
  const handleVote = (voteType) => {
    if (!token) return requireLogin();
    dispatch(voteOnThread({ threadId, voteType }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!token) return requireLogin();

    dispatch(
      addComment({
        threadId,
        content: e.target.comment.value,
      })
    );

    e.target.reset();
  };

  const handleDeleteThread = async () => {
    if (!window.confirm("Hapus thread ini?")) return;
    await dispatch(deleteThreadAsync(threadId));
    navigate("/");
  };

  /* =====================
     RENDER
  ===================== */
  return (
    <ThreadDetailContent
      threadDetail={threadDetail}
      threadId={threadId}
      isOwner={isOwner}
      isUpVoted={isUpVoted}
      isDownVoted={isDownVoted}
      token={token}
      onVote={handleVote}
      onDeleteThread={handleDeleteThread}
      onAddComment={handleAddComment}
      onRequireLogin={requireLogin}
    />
  );
}
