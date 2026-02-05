import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from './features/auth/authSlice';
import AppRoutes from './routes/AppRouter';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    }
  }, [token, dispatch]);

  return <AppRoutes />;
}

export default App;
