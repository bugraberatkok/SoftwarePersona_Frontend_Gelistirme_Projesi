import { useState, useCallback } from 'react';
import * as authService from '../services/authService';

/**
 * Custom hook for authentication state management.
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isSessionActive());

  const login = useCallback((username, password) => {
    const success = authService.authenticate(username, password);
    if (success) {
      authService.saveSession();
      setIsAuthenticated(true);
    }
    return success;
  }, []);

  const logout = useCallback(() => {
    authService.clearSession();
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
