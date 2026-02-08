import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addThread } from '../features/threads/threadsSlice';

export default function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(state => state.auth.token);
  const loading = useSelector(state => state.threads.loading);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  if (!token) {
    navigate('/login');
    return null;
  }

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
    <h2 className="create-thread-title">
      <i className="fas fa-pen"></i>
      <span>Create New Thread</span>
    </h2>

    <form onSubmit={handleSubmit} className="create-thread-form">

      <div className="form-group">
        <label>Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Judul thread yang jelas dan singkat"
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="misal: react, redux, css (opsional)"
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Tulis isi thread di sini..."
          rows={6}
        />
      </div>

      <div className="form-action">
        <button disabled={loading}>
          {loading ? 'Posting...' : 'Post Thread'}
        </button>
      </div>

    </form>
  </div>

</div>
  );
}
