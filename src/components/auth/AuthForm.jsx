export default function AuthForm({
  title,
  inputs,
  buttonText,
  onSubmit,
  footer,
  register,
}) {
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title">{title}</h2>

        {inputs.map((input, index) => (
          <div key={index}>
            <input
              className="auth-input"
              data-testid={input.name}
              type={input.type}
              placeholder={input.placeholder}
              {...register(input.name)}
            />

            {input.error && (
              <small className="auth-error">
                {input.error}
              </small>
            )}
          </div>
        ))}

        <button className="auth-button" type="submit">
          {buttonText}
        </button>

        {footer && (
          <p className="auth-footer">
            {footer}
          </p>
        )}
      </form>
    </div>
  );
}