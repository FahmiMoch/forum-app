export default function AuthForm({
  title,
  inputs,
  buttonText,
  onSubmit,
  footer,
  register, // 🔥 tambahin ini
}) {
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title">{title}</h2>

        {inputs.map((input, index) => {
          const { name, error, ...rest } = input;

          return (
            <div key={index}>
              <input
                className="auth-input"
                name={name}
                data-testid={name}
                {...(register && name ? register(name) : {})} // 🔥 MAGIC FIX
                {...rest}
              />
              {error && <small className="auth-error">{error}</small>}
            </div>
          );
        })}

        <button className="auth-button" type="submit">
          {buttonText}
        </button>

        {footer && <p className="auth-footer">{footer}</p>}
      </form>
    </div>
  );
}