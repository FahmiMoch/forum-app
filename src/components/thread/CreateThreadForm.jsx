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
        <h2>Membuat Thread Baru</h2>

        <form onSubmit={onSubmit}>
          <input
            value={title}
            onChange={onTitleChange}
            placeholder="Masukkan Judul Thread"
            required
          />

          <input
            value={category}
            onChange={onCategoryChange}
            placeholder="Masukkan Kategori"
          />

          <textarea
            value={body}
            onChange={onBodyChange}
            rows={6}
            placeholder="Tulis isi thread"
            required
          />

          <button disabled={loading}>
            {loading ? "Send..." : "Kirim"}
          </button>
        </form>
      </div>
    </div>
  );
}
