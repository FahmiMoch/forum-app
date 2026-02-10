import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password })).unwrap();
      alert("Register berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

  return {
    name,
    email,
    password,
    loading,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
