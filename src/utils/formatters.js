/**
 * Format a number as Turkish Lira currency.
 * @param {number} amount
 * @returns {string} e.g. "₺285,00"
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a date string to a readable Turkish locale format.
 * @param {string} dateStr - ISO date string
 * @returns {string} e.g. "21 Ağustos 2026, 18:00"
 */
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

/**
 * Format a date string to a shorter format.
 * @param {string} dateStr - ISO date string
 * @returns {string} e.g. "21.08.2026 18:00"
 */
export function formatDateShort(dateStr) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

/**
 * Generate a simple UUID v4.
 * @returns {string}
 */
export function generateId() {
  return crypto.randomUUID();
}

/**
 * Generate a human-readable order ID.
 * Uses a counter stored in localStorage.
 * @returns {string} e.g. "ORD-1001"
 */
export function generateOrderId(currentCounter) {
  return `ORD-${1000 + currentCounter}`;
}
