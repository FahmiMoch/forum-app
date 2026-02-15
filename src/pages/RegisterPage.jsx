import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import useRegister from "../features/hooks/auth/useRegister";

export default function RegisterPage() {
  const {
    name,
    email,
    password,
    loading,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
  } = useRegister();

  return (
    <AuthForm
      title="Daftar"
      onSubmit={handleSubmit}
      buttonText={loading ? "Registering..." : "Register"}
      inputs={[
        {
          type: "text",
          placeholder: "Masukkan Nama",
          value: name,
          onChange: (e) => setName(e.target.value),
          required: true,
        },
        {
          type: "email",
          placeholder: "Masukkan Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
        },
        {
          type: "password",
          placeholder: "Masukkan Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          minLength: 6,
          required: true,
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
