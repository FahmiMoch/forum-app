import { useMemo } from "react";

export default function useThreadDerivedData(
  threads,
  users,
  categoryFilter
) {
  const usersById = useMemo(() => {
    if (!Array.isArray(users)) return {};
    return users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});
  }, [users]);

  const categories = useMemo(() => {
    if (!Array.isArray(threads)) return ["All"];
    return ["All", ...new Set(threads.map((t) => t.category || "General"))];
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!Array.isArray(threads)) return [];
    if (categoryFilter === "All") return threads;
    return threads.filter((t) => t.category === categoryFilter);
  }, [threads, categoryFilter]);

  return {
    usersById,
    categories,
    filteredThreads,
  };
}
