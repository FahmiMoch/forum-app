import AuthForm from "../components/auth/AuthForm";
import useLogin from "../features/hooks/auth/useLogin";

export default function LoginPage() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <AuthForm
      title="Login"
      onSubmit={handleSubmit}
      buttonText="Login"
      inputs={[
        {
          type: "email",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
        },
        {
          type: "password",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
        },
      ]}
      footer={
        <>
          Belum punya akun?{" "}
          <span className="auth-link" onClick={() => (window.location = "/register")}>
            Daftar
          </span>
        </>
      }
    />
  );
}
