import { useDispatch, useSelector } from "react-redux";
import { addThread } from "../../thread/threadsSlice";
import { useNavigate } from "react-router-dom";

export default function useCreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.threads.loadingThreads);

  const handleCreateThread = async ({ title, body, category }) => {
    try {
      await dispatch(
        addThread({ title, body, category })
      ).unwrap();

      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return {
    loading,
    handleCreateThread,
  };
}