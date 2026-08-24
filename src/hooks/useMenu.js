import { useState, useCallback } from 'react';
import * as menuService from '../services/menuService';

/**
 * Custom hook for menu item state management.
 * Provides reactive state synced with localStorage.
 */
export function useMenu() {
  const [menuItems, setMenuItems] = useState(() => menuService.getAllMenuItems());

  const refreshMenu = useCallback(() => {
    setMenuItems(menuService.getAllMenuItems());
  }, []);

  const getAvailable = useCallback(() => {
    return menuItems.filter(item => item.available);
  }, [menuItems]);

  const getFeatured = useCallback(() => {
    return menuItems.filter(item => item.available && item.featured);
  }, [menuItems]);

  const getByCategory = useCallback((category) => {
    return menuItems.filter(item => item.available && item.category === category);
  }, [menuItems]);

  const createItem = useCallback((itemData) => {
    const newItem = menuService.createMenuItem(itemData);
    setMenuItems(menuService.getAllMenuItems());
    return newItem;
  }, []);

  const updateItem = useCallback((id, updatedData) => {
    const updated = menuService.updateMenuItem(id, updatedData);
    setMenuItems(menuService.getAllMenuItems());
    return updated;
  }, []);

  const deleteItem = useCallback((id) => {
    const success = menuService.deleteMenuItem(id);
    if (success) {
      setMenuItems(menuService.getAllMenuItems());
    }
    return success;
  }, []);

  const toggleAvailability = useCallback((id) => {
    const updated = menuService.toggleMenuItemAvailability(id);
    if (updated) {
      setMenuItems(menuService.getAllMenuItems());
    }
    return updated;
  }, []);

  return {
    menuItems,
    getAvailable,
    getFeatured,
    getByCategory,
    createItem,
    updateItem,
    deleteItem,
    toggleAvailability,
    refreshMenu,
  };
}
