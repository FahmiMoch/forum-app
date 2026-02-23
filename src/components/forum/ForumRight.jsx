import CategoryList from './CategoryList';

export default function ForumRight({
  categories,
  activeCategory,
  onSelect,
  loading,
}) {
  return (
    <aside className="forum-right">
      <h3 className="section-title right">Category</h3>

      <CategoryList
        categories={categories}
        activeCategory={activeCategory}
        onSelect={onSelect}
        loading={loading}
      />
    </aside>
  );
}
