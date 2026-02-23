import ForumLeft from '../components/forum/ForumLeft';
import ForumCenter from '../components/forum/ForumCenter';
import ForumRight from '../components/forum/ForumRight';

import useThreadsData from '../features/hooks/thread/useThreadsData';
import useThreadDerivedData from '../features/hooks/thread/useThreadDerivedData';
import useCategoryFilter from '../features/hooks/forum/useCategoryFilter';

export default function ThreadsPage() {
  const {
    threads,
    users,
    threadsLoading,
    usersLoading,
    threadsError,
    usersError,
  } = useThreadsData();

  const { categoryFilter, setCategoryFilter } = useCategoryFilter();

  const { usersById, categories, filteredThreads } =
    useThreadDerivedData(threads, users, categoryFilter);

  return (
    <div className="forum-layout">
      <ForumLeft />

      <ForumCenter
        threads={filteredThreads}
        usersById={usersById}
        loading={threadsLoading || usersLoading}
        error={threadsError || usersError}
      />

      <ForumRight
        categories={categories}
        activeCategory={categoryFilter}
        onSelect={setCategoryFilter}
        loading={threadsLoading}
      />
    </div>
  );
}
