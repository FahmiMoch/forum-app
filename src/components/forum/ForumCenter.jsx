import ThreadList from "../thread/ThreadList";

export default function ForumCenter({
  threads,
  usersById,
  loading,
  error,
}) {
  return (
    <main className="forum-center">
      <h3 className="section-title center">Forum Threads</h3>

      <ThreadList
        threads={threads}
        usersById={usersById}
        loading={loading}
        error={error}
      />
    </main>
  );
}
