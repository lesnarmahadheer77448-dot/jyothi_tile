'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'homeowner' | 'architect' | 'developer' | 'contractor';

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  companyName?: string;
  city?: string;
  createdAt: string;
}

interface AuthContextType {
  // Customer State
  currentUser: CustomerUser | null;
  isAuthenticated: boolean;
  loginCustomer: (email: string, password?: string) => boolean;
  signupCustomer: (data: Omit<CustomerUser, 'id' | 'createdAt'>, password?: string) => boolean;
  logoutCustomer: () => void;

  // Admin State
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, password?: string) => boolean;
  logoutAdmin: () => void;

  // Modal Auth Gate Helper
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup', onAuthenticated?: () => void) => void;
  closeAuthModal: () => void;
  requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore sessions from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('jt_auth_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      const savedAdmin = localStorage.getItem('jt_auth_admin');
      if (savedAdmin === 'true') {
        setIsAdminAuthenticated(true);
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  // Save session updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (currentUser) {
        localStorage.setItem('jt_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('jt_auth_user');
      }

      if (isAdminAuthenticated) {
        localStorage.setItem('jt_auth_admin', 'true');
      } else {
        localStorage.removeItem('jt_auth_admin');
      }
    } catch {
      // ignore
    }
  }, [currentUser, isAdminAuthenticated, isLoaded]);

  // Customer Authentication
  const loginCustomer = (email: string) => {
    // Demo accounts or custom login
    const isArchitect = email.includes('architect') || email.includes('studio');
    const user: CustomerUser = {
      id: `usr-${Date.now()}`,
      name: isArchitect ? 'Ar. Rahul Sen' : 'Vikram Singhania',
      email: email.trim(),
      phone: '9820012345',
      role: isArchitect ? 'architect' : 'homeowner',
      companyName: isArchitect ? 'Studio Lotus Architecture' : undefined,
      city: 'Mumbai',
      createdAt: new Date().toISOString(),
    };

    setCurrentUser(user);
    setIsAuthModalOpen(false);

    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
    return true;
  };

  const signupCustomer = (data: Omit<CustomerUser, 'id' | 'createdAt'>) => {
    const newUser: CustomerUser = {
      ...data,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setCurrentUser(newUser);
    setIsAuthModalOpen(false);

    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
    return true;
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('jt_auth_user');
    } catch {
      // ignore
    }
  };

  // Admin Authentication
  const loginAdmin = (email: string, password?: string) => {
    // Default admin credentials: admin@jyothitiles.com / jyothi@2026
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin@jyothitiles.com' || cleanEmail === 'admin' || (password && password.length >= 4)) {
      setIsAdminAuthenticated(true);
      return true;
    }
    // Allow demo entry
    setIsAdminAuthenticated(true);
    return true;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('jt_auth_admin');
    } catch {
      // ignore
    }
  };

  // Auth Gate for Enquiry/Orders
  const openAuthModal = (mode: 'login' | 'signup' = 'login', onAuthenticated?: () => void) => {
    setAuthModalMode(mode);
    if (onAuthenticated) {
      setPendingCallback(() => onAuthenticated);
    } else {
      setPendingCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingCallback(null);
  };

  const requireAuth = (callback: () => void) => {
    if (currentUser) {
      callback();
    } else {
      openAuthModal('login', callback);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        loginCustomer,
        signupCustomer,
        logoutCustomer,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
