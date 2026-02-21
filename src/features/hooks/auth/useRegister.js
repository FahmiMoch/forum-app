import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleRegister = async ({ name, email, password }) => {
    try {
      await dispatch(register({ name, email, password })).unwrap();
      alert('Register berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      alert(err);
    }
  };

  return {
    loading,
    handleRegister,
  };
}