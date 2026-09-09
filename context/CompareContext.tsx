'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, GraniteSlab } from '@/types';

type ComparableItem = Product | GraniteSlab;

interface CompareContextType {
  compareItems: ComparableItem[];
  addToCompare: (item: ComparableItem) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<ComparableItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vault_compare_items');
      if (saved) {
        setCompareItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vault_compare_items', JSON.stringify(compareItems));
    } catch {
      // ignore
    }
  }, [compareItems]);

  const addToCompare = (item: ComparableItem) => {
    if (compareItems.some((i) => i.id === item.id)) {
      return;
    }
    if (compareItems.length >= 4) {
      alert('You can compare a maximum of 4 surfaces at a time.');
      return;
    }
    setCompareItems((prev) => [...prev, item]);
    setIsDrawerOpen(true);
  };

  const removeFromCompare = (id: string) => {
    setCompareItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setIsDrawerOpen(false);
  };

  const isInCompare = (id: string) => {
    return compareItems.some((i) => i.id === id);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

