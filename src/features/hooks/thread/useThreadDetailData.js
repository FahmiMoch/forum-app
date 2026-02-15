import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchThreadDetail,
  clearThreadDetail,
} from '../../thread/threadsSlice';

export default function useThreadDetailData(threadId) {
  const dispatch = useDispatch();

  const { threadDetail, loading, error } = useSelector(
    (state) => state.threads
  );

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
    return () => dispatch(clearThreadDetail());
  }, [dispatch, threadId]);

  return {
    threadDetail,
    loading,
    error,
  };
}
