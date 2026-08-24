import { STORAGE_KEYS } from '../utils/constants';

/**
 * Get all cart items from localStorage.
 * @returns {{ items: Array }}
 */
export function getCart() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART));
    return data || { items: [] };
  } catch {
    return { items: [] };
  }
}

/**
 * Save cart to localStorage.
 * @param {{ items: Array }} cart
 */
export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

/**
 * Add an item to the cart or increment quantity if it exists.
 * @param {Object} menuItem - The menu item to add
 * @returns {{ items: Array }} Updated cart
 */
export function addToCart(menuItem) {
  const cart = getCart();
  const existingIndex = cart.items.findIndex(item => item.menuItemId === menuItem.id);

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += 1;
  } else {
    cart.items.push({
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.image,
      quantity: 1,
    });
  }

  saveCart(cart);
  return cart;
}

/**
 * Update the quantity of a cart item.
 * Removes the item if quantity drops to 0 or below.
 * @param {string} menuItemId
 * @param {number} quantity
 * @returns {{ items: Array }} Updated cart
 */
export function updateCartItemQuantity(menuItemId, quantity) {
  const cart = getCart();

  if (quantity <= 0) {
    cart.items = cart.items.filter(item => item.menuItemId !== menuItemId);
  } else {
    const item = cart.items.find(item => item.menuItemId === menuItemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  saveCart(cart);
  return cart;
}

/**
 * Remove an item from the cart entirely.
 * @param {string} menuItemId
 * @returns {{ items: Array }} Updated cart
 */
export function removeFromCart(menuItemId) {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.menuItemId !== menuItemId);
  saveCart(cart);
  return cart;
}

/**
 * Clear all items from the cart.
 * @returns {{ items: Array }} Empty cart
 */
export function clearCart() {
  const emptyCart = { items: [] };
  saveCart(emptyCart);
  return emptyCart;
}

/**
 * Get the total number of items in the cart.
 * @returns {number}
 */
export function getCartTotalItems() {
  const cart = getCart();
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Get the total price of all items in the cart.
 * @returns {number}
 */
export function getCartTotalPrice() {
  const cart = getCart();
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
