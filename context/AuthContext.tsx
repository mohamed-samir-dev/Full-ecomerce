'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');
    
    if (savedUser && loginTime) {
      const currentTime = new Date().getTime();
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
      
      if (currentTime - parseInt(loginTime) < threeDaysInMs) {
        return JSON.parse(savedUser);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedToken = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');
    
    if (savedToken && loginTime) {
      const currentTime = new Date().getTime();
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
      
      if (currentTime - parseInt(loginTime) < threeDaysInMs) {
        return savedToken;
      }
    }
    return null;
  });

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    const loginTime = new Date().getTime();
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('loginTime', loginTime.toString());
    localStorage.removeItem('cart');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
