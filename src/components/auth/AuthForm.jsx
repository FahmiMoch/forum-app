export default function AuthForm({
  title,
  inputs,
  buttonText,
  onSubmit,
  footer,
}) {
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title">{title}</h2>

        {inputs.map((input) => (
          <input
            key={input.placeholder}
            className="auth-input"
            {...input}
          />
        ))}

        <button className="auth-button" type="submit">
          {buttonText}
        </button>

        {footer && <p className="auth-footer">{footer}</p>}
      </form>
    </div>
  );
}
