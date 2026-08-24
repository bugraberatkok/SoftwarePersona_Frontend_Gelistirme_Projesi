import { useState, useCallback } from 'react';
import * as orderService from '../services/orderService';

/**
 * Custom hook for order state management.
 * Provides reactive state synced with localStorage.
 */
export function useOrders() {
  const [orders, setOrders] = useState(() => orderService.getAllOrders());

  const refreshOrders = useCallback(() => {
    setOrders(orderService.getAllOrders());
  }, []);

  const getById = useCallback((id) => {
    return orders.find(order => order.id === id) || null;
  }, [orders]);

  const getByStatus = useCallback((status) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  const createOrder = useCallback((orderData) => {
    const newOrder = orderService.createOrder(orderData);
    setOrders(orderService.getAllOrders());
    return newOrder;
  }, []);

  const updateStatus = useCallback((id, newStatus) => {
    const updated = orderService.updateOrderStatus(id, newStatus);
    if (updated) {
      setOrders(orderService.getAllOrders());
    }
    return updated;
  }, []);

  const getStatistics = useCallback(() => {
    return orderService.getOrderStatistics();
  }, [orders]);

  return {
    orders,
    getById,
    getByStatus,
    createOrder,
    updateStatus,
    getStatistics,
    refreshOrders,
  };
}
