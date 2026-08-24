import { STORAGE_KEYS } from '../utils/constants';

const CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

/**
 * Check if credentials match the demo admin.
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */
export function authenticate(username, password) {
  return username === CREDENTIALS.username && password === CREDENTIALS.password;
}

/**
 * Save auth session to localStorage.
 */
export function saveSession() {
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ isAuthenticated: true }));
}

/**
 * Remove auth session from localStorage.
 */
export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
}

/**
 * Check if an active session exists.
 * @returns {boolean}
 */
export function isSessionActive() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH));
    return data?.isAuthenticated === true;
  } catch {
    return false;
  }
}
