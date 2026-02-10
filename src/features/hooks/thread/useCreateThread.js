import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addThread } from "../../thread/threadsSlice";
import { useNavigate } from "react-router-dom";

export default function useCreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.threads.loadingThreads);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addThread({ title, body, category })).unwrap();
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return {
    title,
    category,
    body,
    loading,
    setTitle,
    setCategory,
    setBody,
    handleSubmit,
  };
}
