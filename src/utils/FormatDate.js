export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now - date;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days <= 0) return 'hari ini';
  if (days === 1) return '1 hari yang lalu';

  return `${days} hari yang lalu`;
}
