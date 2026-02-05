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
      <h2><i className="fas fa-pen"></i> Create New Thread</h2>

      <form onSubmit={handleSubmit} className="create-thread-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Content" />
        <button disabled={loading}>Post Thread</button>
      </form>
    </div>
  );
}
