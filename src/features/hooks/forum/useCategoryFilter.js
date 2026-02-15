import { useState } from 'react';

export default function useCategoryFilter(defaultValue = 'All') {
  const [categoryFilter, setCategoryFilter] = useState(defaultValue);

  return {
    categoryFilter,
    setCategoryFilter,
  };
}
