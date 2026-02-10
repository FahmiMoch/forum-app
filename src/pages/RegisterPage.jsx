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
      title="Register"
      onSubmit={handleSubmit}
      buttonText={loading ? "Registering..." : "Register"}
      inputs={[
        {
          type: "text",
          placeholder: "Name",
          value: name,
          onChange: (e) => setName(e.target.value),
          required: true,
        },
        {
          type: "email",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
        },
        {
          type: "password",
          placeholder: "Password (min 6 karakter)",
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
