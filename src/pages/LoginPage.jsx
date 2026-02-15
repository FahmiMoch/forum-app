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
      title="Masuk"
      onSubmit={handleSubmit}
      buttonText="Login"
      inputs={[
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
