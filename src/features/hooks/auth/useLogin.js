import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, fetchMe } from "../../auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      await dispatch(fetchMe()).unwrap();
      navigate(from, { replace: true });
    } catch {
      alert("Login gagal");
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
