import useRequireAuth from "../features/hooks/auth/useRequireAuth";
import useCreateThread from "../features/hooks/thread/useCreateThread";
import CreateThreadForm from "../components/thread/CreateThreadForm";
import Loading from "../components/loading/Loading";
export default function CreateThreadPage() {
  useRequireAuth();

  const {
    title,
    category,
    body,
    loading,
    setTitle,
    setCategory,
    setBody,
    handleSubmit,
  } = useCreateThread();

   if (loading) return <Loading />;

  return (
    <CreateThreadForm
      title={title}
      category={category}
      body={body}
      loading={loading}
      onTitleChange={(e) => setTitle(e.target.value)}
      onCategoryChange={(e) => setCategory(e.target.value)}
      onBodyChange={(e) => setBody(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
}
