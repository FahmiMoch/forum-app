import useRequireAuth from "../features/hooks/auth/useRequireAuth";
import useCreateThread from "../features/hooks/thread/useCreateThread";
import CreateThreadForm from "../components/thread/CreateThreadForm";

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
