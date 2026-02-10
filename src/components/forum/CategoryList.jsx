import React from "react";
import Loading from "../loading/Loading";

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
    return <p style={{ padding: 16 }}>Tidak ada kategori</p>;
  }

  return (
    <ul className="category-list">
      {categories.map((cat) => (
        <li
          key={cat}
          className={activeCategory === cat ? "active" : ""}
          onClick={() => onSelect(cat)}
        >
          #{cat}
        </li>
      ))}
    </ul>
  );
}
