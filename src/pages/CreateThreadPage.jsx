import { useForm } from 'react-hook-form';
import useRequireAuth from '../features/hooks/auth/useRequireAuth';
import useCreateThread from '../features/hooks/thread/useCreateThread';
import CreateThreadForm from '../components/thread/CreateThreadForm';
import Loading from '../components/loading/Loading';

export default function CreateThreadPage() {
  useRequireAuth();

  const { loading, handleCreateThread } = useCreateThread();
  const { register, handleSubmit } = useForm();

  if (loading) return <Loading />;

  return (
    <CreateThreadForm
      register={register}
      onSubmit={handleSubmit(handleCreateThread)}
      loading={loading}
    />
  );
}