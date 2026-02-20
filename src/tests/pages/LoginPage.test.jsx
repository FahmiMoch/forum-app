import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../../pages/LoginPage';
import useLogin from '../../features/hooks/auth/useLogin';

jest.mock('../../features/hooks/auth/useLogin');

describe('LoginPage', () => {
  const mockHandleLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useLogin.mockReturnValue({
      handleLogin: mockHandleLogin,
    });
  });

  it('should render login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText('Masuk')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan Password')).toBeInTheDocument();
  });

  it('should call handleLogin when form is submitted', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Masukkan Email');
    const passwordInput = screen.getByPlaceholderText('Masukkan Password');

    await userEvent.type(emailInput, 'test@mail.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(screen.getByText('Login'));

   await waitFor(() => {
  expect(mockHandleLogin).toHaveBeenCalled();
});

const firstCall = mockHandleLogin.mock.calls[0][0];

expect(firstCall).toEqual({
  email: 'test@mail.com',
  password: '123456',
});
  });

  it('should redirect to register page when clicking Daftar', async () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = '';

    render(<LoginPage />);
    await userEvent.click(screen.getByText('Daftar'));

    expect(window.location).toBe('/register');
    window.location = originalLocation;
  });
});