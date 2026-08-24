import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/formatters';
import { seedMenuItems } from '../data/seedData';

/**
 * Initialize menu with seed data on first visit.
 */
export function initializeMenu() {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (!isInitialized) {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(seedMenuItems));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
}

/**
 * Get all menu items from localStorage.
 * @returns {Array}
 */
export function getAllMenuItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) || [];
  } catch {
    return [];
  }
}

/**
 * Get only available menu items (for customer view).
 * @returns {Array}
 */
export function getAvailableMenuItems() {
  return getAllMenuItems().filter(item => item.available);
}

/**
 * Get a single menu item by ID.
 * @param {string} id
 * @returns {Object|null}
 */
export function getMenuItemById(id) {
  return getAllMenuItems().find(item => item.id === id) || null;
}

/**
 * Get featured menu items.
 * @returns {Array}
 */
export function getFeaturedMenuItems() {
  return getAvailableMenuItems().filter(item => item.featured);
}

/**
 * Get menu items by category.
 * @param {string} category
 * @returns {Array}
 */
export function getMenuItemsByCategory(category) {
  return getAvailableMenuItems().filter(item => item.category === category);
}

/**
 * Create a new menu item.
 * @param {Object} itemData
 * @returns {Object} The created item
 */
export function createMenuItem(itemData) {
  const items = getAllMenuItems();
  const newItem = {
    id: generateId(),
    ...itemData,
    price: Number(itemData.price),
    calories: itemData.calories ? Number(itemData.calories) : null,
    available: itemData.available !== undefined ? itemData.available : true,
    featured: itemData.featured || false,
    spicy: itemData.spicy || false,
  };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  return newItem;
}

/**
 * Update an existing menu item.
 * @param {string} id
 * @param {Object} updatedData
 * @returns {Object|null} The updated item
 */
export function updateMenuItem(id, updatedData) {
  const items = getAllMenuItems();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updatedData,
    price: Number(updatedData.price ?? items[index].price),
    calories: updatedData.calories != null ? Number(updatedData.calories) : items[index].calories,
  };

  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  return items[index];
}

/**
 * Delete a menu item by ID.
 * @param {string} id
 * @returns {boolean} Success
 */
export function deleteMenuItem(id) {
  const items = getAllMenuItems();
  const filtered = items.filter(item => item.id !== id);
  if (filtered.length === items.length) return false;
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(filtered));
  return true;
}

/**
 * Toggle menu item availability.
 * @param {string} id
 * @returns {Object|null} Updated item
 */
export function toggleMenuItemAvailability(id) {
  const items = getAllMenuItems();
  const item = items.find(item => item.id === id);
  if (!item) return null;
  item.available = !item.available;
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  return item;
}
