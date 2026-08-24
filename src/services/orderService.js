import { STORAGE_KEYS } from '../utils/constants';
import { generateOrderId } from '../utils/formatters';

/**
 * Get the next order counter and increment it.
 * @returns {number}
 */
function getNextOrderCounter() {
  const counter = parseInt(localStorage.getItem(STORAGE_KEYS.ORDER_COUNTER) || '1', 10);
  localStorage.setItem(STORAGE_KEYS.ORDER_COUNTER, String(counter + 1));
  return counter;
}

/**
 * Get all orders from localStorage.
 * @returns {Array}
 */
export function getAllOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
  } catch {
    return [];
  }
}

/**
 * Get a single order by ID.
 * @param {string} id
 * @returns {Object|null}
 */
export function getOrderById(id) {
  return getAllOrders().find(order => order.id === id) || null;
}

/**
 * Get orders filtered by status.
 * @param {string} status
 * @returns {Array}
 */
export function getOrdersByStatus(status) {
  return getAllOrders().filter(order => order.status === status);
}

/**
 * Create a new order.
 * @param {Object} orderData - { items, total, customerName, tableNumber }
 * @returns {Object} The created order
 */
export function createOrder(orderData) {
  const orders = getAllOrders();
  const counter = getNextOrderCounter();
  const newOrder = {
    id: generateOrderId(counter),
    items: orderData.items,
    total: orderData.total,
    customerName: orderData.customerName,
    tableNumber: orderData.tableNumber,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder); // newest first
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
}

/**
 * Update the status of an order.
 * @param {string} id
 * @param {string} newStatus
 * @returns {Object|null} Updated order
 */
export function updateOrderStatus(id, newStatus) {
  const orders = getAllOrders();
  const order = orders.find(o => o.id === id);
  if (!order) return null;
  order.status = newStatus;
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return order;
}

/**
 * Calculate dashboard statistics from orders.
 * @returns {Object}
 */
export function getOrderStatistics() {
  const orders = getAllOrders();

  const stats = {
    totalOrders: orders.length,
    newOrders: 0,
    preparingOrders: 0,
    readyOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
  };

  orders.forEach(order => {
    switch (order.status) {
      case 'new':        stats.newOrders++; break;
      case 'preparing':  stats.preparingOrders++; break;
      case 'ready':      stats.readyOrders++; break;
      case 'completed':  stats.completedOrders++; break;
      case 'cancelled':  stats.cancelledOrders++; break;
    }
    // Revenue from non-cancelled orders
    if (order.status !== 'cancelled') {
      stats.totalRevenue += order.total;
    }
  });

  return stats;
}
