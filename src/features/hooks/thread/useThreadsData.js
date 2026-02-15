import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads } from '../../thread/threadsSlice';
import { fetchUsers } from '../../users/usersSlice';

export default function useThreadsData() {
  const dispatch = useDispatch();

  const threadsState = useSelector((state) => state.threads);
  const usersState = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  return {
    threads: threadsState.threads,
    threadsLoading: threadsState.loading,
    threadsError: threadsState.error,

    users: usersState.users,
    usersLoading: usersState.loading,
    usersError: usersState.error,
  };
}
