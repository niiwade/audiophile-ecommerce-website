// Utility to format a number as a price string (e.g., $2,999)
export function formatPrice(amount) {
  if (typeof amount !== 'number') return '';
  return '$' + amount.toLocaleString();
}
