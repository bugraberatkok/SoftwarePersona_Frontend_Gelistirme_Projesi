import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import * as cartService from '../services/cartService';

const CartContext = createContext(null);

/**
 * CartProvider wraps the app to provide shared cart state.
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => cartService.getCart());

  const addItem = useCallback((menuItem) => {
    const updated = cartService.addToCart(menuItem);
    setCart({ ...updated });
  }, []);

  const updateQuantity = useCallback((menuItemId, quantity) => {
    const updated = cartService.updateCartItemQuantity(menuItemId, quantity);
    setCart({ ...updated });
  }, []);

  const removeItem = useCallback((menuItemId) => {
    const updated = cartService.removeFromCart(menuItemId);
    setCart({ ...updated });
  }, []);

  const clearAllItems = useCallback(() => {
    const updated = cartService.clearCart();
    setCart({ ...updated });
  }, []);

  const totalItems = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
    [cart.items]
  );

  const totalPrice = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart.items]
  );

  const value = useMemo(() => ({
    items: cart.items,
    totalItems,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearAllItems,
  }), [cart.items, totalItems, totalPrice, addItem, updateQuantity, removeItem, clearAllItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook for cart state management.
 * Must be used within a CartProvider.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
