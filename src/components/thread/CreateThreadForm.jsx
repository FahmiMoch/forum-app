export default function CreateThreadForm({
  title,
  category,
  body,
  loading,
  onTitleChange,
  onCategoryChange,
  onBodyChange,
  onSubmit,
}) {
  return (
    <div className="create-thread-page">
      <div className="create-thread-card">
        <h2>Create New Thread</h2>

        <form onSubmit={onSubmit}>
          <input
            value={title}
            onChange={onTitleChange}
            placeholder="Judul thread"
            required
          />

          <input
            value={category}
            onChange={onCategoryChange}
            placeholder="Kategori (opsional)"
          />

          <textarea
            value={body}
            onChange={onBodyChange}
            rows={6}
            placeholder="Isi thread"
            required
          />

          <button disabled={loading}>
            {loading ? "Posting..." : "Post Thread"}
          </button>
        </form>
      </div>
    </div>
  );
}
