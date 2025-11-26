'use client';

import { useState, useEffect } from 'react';
import type { AuthToken, User } from '@/shared/types';
import { MockAuthRepository } from '@/infrastructure/repositories/mock/MockAuthRepository';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = MockAuthRepository.getStoredToken();
    const currentUser = MockAuthRepository.getCurrentUser();

    if (token && MockAuthRepository.validateToken(token.token)) {
      setIsAuthenticated(true);
      setUser(currentUser);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setLoading(false);
  };

  const login = (token: AuthToken, user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = async () => {
    await MockAuthRepository.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuth,
  };
};
