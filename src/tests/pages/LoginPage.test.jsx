import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';
import useLogin from '../../features/hooks/auth/useLogin';

jest.mock('../../features/hooks/auth/useLogin');

describe('LoginPage', () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  beforeEach(() => {
    useLogin.mockReturnValue({
      email: '',
      password: '',
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
      handleSubmit: mockHandleSubmit,
    });

    jest.clearAllMocks();
  });

  it('should render login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText('Masuk')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should call setEmail when email input changes', () => {
    render(<LoginPage />);

    fireEvent.change(
      screen.getByPlaceholderText('Masukkan Email'),
      { target: { value: 'test@mail.com' } }
    );

    expect(mockSetEmail).toHaveBeenCalledWith('test@mail.com');
  });

  it('should call setPassword when password input changes', () => {
    render(<LoginPage />);

    fireEvent.change(
      screen.getByPlaceholderText('Masukkan Password'),
      { target: { value: '123456' } }
    );

    expect(mockSetPassword).toHaveBeenCalledWith('123456');
  });

  it('should call handleSubmit when form is submitted', () => {
    render(<LoginPage />);

    const form = document.querySelector('.auth-form');
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('should redirect to register page when clicking Daftar', () => {
  const originalLocation = window.location;

  delete window.location;
  window.location = {
    href: '',
  };

  render(<LoginPage />);

  fireEvent.click(screen.getByText('Daftar'));

  expect(window.location).toBe('/register');

  window.location = originalLocation;
});
});
