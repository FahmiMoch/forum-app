import React from 'react';
import Loading from '../loading/Loading';
import { FaFolderOpen } from 'react-icons/fa';

export default function CategoryList({
  categories = [],
  activeCategory,
  onSelect,
  loading,
}) {
  if (loading) {
    return <Loading />;
  }



  if (!categories.length) {
    return (
      <div className="category-empty">
        <FaFolderOpen className="empty-icon" />
        <p>Tidak ada kategori</p>
      </div>
    );
  }

  return (
    <ul className="category-list">
      {categories.map((cat) => (
        <li
          key={cat}
          className={activeCategory === cat ? 'active' : ''}
          onClick={() => onSelect(cat)}
        >
          #{cat}
        </li>
      ))}
    </ul>
  );
}
