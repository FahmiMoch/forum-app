import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import useRegister from '../features/hooks/auth/useRegister';

export default function RegisterPage() {
  const { handleRegister, loading } = useRegister();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    handleRegister(data);
  };

  return (
    <AuthForm
      title="Daftar"
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      buttonText={loading ? 'Registering...' : 'Register'}
      inputs={[
        {
          name: 'name',
          type: 'text',
          placeholder: 'Masukkan Nama',
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Masukkan Email',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Masukkan Password',
        },
      ]}
      footer={
        <>
          Sudah punya akun?{' '}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </>
      }
    />
  );
}