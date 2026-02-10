import { useState } from "react";
import { useSelector } from "react-redux";
import RequireLoginModal from "../../../components/auth/RequireLoginModal";

export default function useAuthGuard() {
  const { token } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const requireLogin = () => {
    setShowLoginModal(true);
  };

  const loginModal = (
    <RequireLoginModal
      open={showLoginModal}
      onClose={() => setShowLoginModal(false)}
    />
  );

  return {
    token,
    requireLogin,
    loginModal,
  };
}
