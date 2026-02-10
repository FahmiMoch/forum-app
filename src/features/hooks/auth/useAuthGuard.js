import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useAuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  const requireLogin = useCallback(() => {
    alert("Login dulu ya 🙂");
    navigate("/login", {
      replace: true,
      state: { from: location },
    });
  }, [navigate, location]);

  return {
    token,
    requireLogin,
  };
}
