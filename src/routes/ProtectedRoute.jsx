import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  // ❌ Belum login → arahkan ke login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // ✅ Sudah login → lanjut
  return children;
}
