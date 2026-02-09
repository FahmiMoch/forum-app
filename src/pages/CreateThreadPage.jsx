import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addThread } from '../features/threads/threadsSlice';

export default function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(state => state.auth.token);
  const loading = useSelector(
    state => state.threads.loadingThreads
  );

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        addThread({ title, body, category })
      ).unwrap();

      navigate('/');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="create-thread-page">
      <div className="create-thread-card">
        <h2>Create New Thread</h2>

        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Judul thread"
            required
          />

          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Kategori (opsional)"
          />

          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={6}
            placeholder="Isi thread"
            required
          />

          <button disabled={loading}>
            {loading ? 'Posting...' : 'Post Thread'}
          </button>
        </form>
      </div>
    </div>
  );
}
