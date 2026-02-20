import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import useRegister from "../features/hooks/auth/useRegister";

export default function RegisterPage() {
  const { handleRegister, loading } = useRegister();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    handleRegister(data);
  };

  return (
    <AuthForm
      title="Daftar"
      onSubmit={handleSubmit(onSubmit)}
      buttonText={loading ? "Registering..." : "Register"}
      inputs={[
        {
          type: "text",
          placeholder: "Masukkan Nama",
          ...register("name", { required: true }),
        },
        {
          type: "email",
          placeholder: "Masukkan Email",
          ...register("email", { required: true }),
        },
        {
          type: "password",
          placeholder: "Masukkan Password",
          minLength: 6,
          ...register("password", { required: true }),
        },
      ]}
      footer={
        <>
          Sudah punya akun?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </>
      }
    />
  );
}