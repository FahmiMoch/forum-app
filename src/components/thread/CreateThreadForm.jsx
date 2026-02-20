export default function CreateThreadForm({
  register,
  loading,
  onSubmit,
}) {
  return (
    <div className="create-thread-page">
      <div className="create-thread-card">
        <h2>Membuat Thread Baru</h2>

        <form onSubmit={onSubmit}>
          <input
            {...register("title", { required: true })}
            placeholder="Masukkan Judul Thread"
          />

          <input
            {...register("category")}
            placeholder="Masukkan Kategori"
          />

          <textarea
            {...register("body", { required: true })}
            rows={6}
            placeholder="Tulis isi thread"
          />

          <button disabled={loading}>
            {loading ? "Send..." : "Kirim"}
          </button>
        </form>
      </div>
    </div>
  );
}