import { useForm } from "react-hook-form";
import AuthForm from "../components/auth/AuthForm";
import useLogin from "../features/hooks/auth/useLogin";

export default function LoginPage() {
  const { handleLogin } = useLogin();
  const { register, handleSubmit } = useForm();

  return (
    <AuthForm
      title="Masuk"
      buttonText="Login"
      register={register}
      onSubmit={handleSubmit(handleLogin)}
      inputs={[
        {
          name: "email",
          type: "email",
          placeholder: "Masukkan Email",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Masukkan Password",
        },
      ]}
      footer={
        <>
          Belum punya akun?{" "}
          <span
            className="auth-link"
            onClick={() => (window.location = "/register")}
          >
            Daftar
          </span>
        </>
      }
    />
  );
}