'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuoteItem, Product, GraniteSlab } from '@/types';

interface QuoteContextType {
  quoteItems: QuoteItem[];
  addToQuote: (item: Product | GraniteSlab, areaSqFt?: number, wastagePercent?: number) => void;
  removeFromQuote: (productId: string) => void;
  updateQuoteItemArea: (productId: string, areaSqFt: number, wastagePercent?: number) => void;
  updateQuantity: (productId: string, areaSqFt: number) => void;
  clearQuote: () => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  activeModalProduct: (Product | GraniteSlab) | null;
  openQuoteModal: (product?: Product | GraniteSlab) => void;
  closeQuoteModal: () => void;
  totalEstimatedArea: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<(Product | GraniteSlab) | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vault_quote_items');
      if (saved) {
        setQuoteItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('vault_quote_items', JSON.stringify(quoteItems));
    } catch {
      // ignore
    }
  }, [quoteItems]);

  const addToQuote = (item: Product | GraniteSlab, areaSqFt = 500, wastagePercent = 10) => {
    const isTile = 'boxCoverageSqFt' in item;
    const effectiveArea = areaSqFt * (1 + wastagePercent / 100);
    const boxesCount = isTile ? Math.ceil(effectiveArea / (item.boxCoverageSqFt || 20)) : undefined;

    setQuoteItems((prev) => {
      const existing = prev.find((i) => i.productId === item.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.id
            ? { ...i, areaSqFt, wastagePercent, boxesCount, boxesNeeded: boxesCount, product: item }
            : i
        );
      }
      const newItem: QuoteItem = {
        productId: item.id,
        name: item.name,
        sku: item.sku,
        type: item.category === 'granite' ? 'granite' : 'tile',
        image: item.mainImage,
        size: 'size' in item ? item.size : item.slabDimensions,
        finish: 'finish' in item ? item.finish : item.finishesAvailable[0],
        areaSqFt,
        wastagePercent,
        boxesCount,
        boxesNeeded: boxesCount,
        priceSqFtEstimate: 'priceSqFtEstimate' in item ? item.priceSqFtEstimate : item.priceBand,
        product: item,
      };
      return [...prev, newItem];
    });
  };

  const removeFromQuote = (productId: string) => {
    setQuoteItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuoteItemArea = (productId: string, areaSqFt: number, wastagePercent = 10) => {
    setQuoteItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId) {
          const effectiveArea = areaSqFt * (1 + wastagePercent / 100);
          const boxesCount = i.type === 'tile' ? Math.ceil(effectiveArea / 23.25) : undefined;
          return {
            ...i,
            areaSqFt,
            wastagePercent,
            boxesCount,
            boxesNeeded: boxesCount,
          };
        }
        return i;
      })
    );
  };

  const updateQuantity = (productId: string, areaSqFt: number) => {
    updateQuoteItemArea(productId, areaSqFt);
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const openQuoteModal = (product?: Product | GraniteSlab) => {
    if (product) {
      setActiveModalProduct(product);
      addToQuote(product);
    }
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setActiveModalProduct(null);
  };

  const totalEstimatedArea = quoteItems.reduce((acc, item) => acc + (item.areaSqFt || 0), 0);

  return (
    <QuoteContext.Provider
      value={{
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuoteItemArea,
        updateQuantity,
        clearQuote,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        activeModalProduct,
        openQuoteModal,
        closeQuoteModal,
        totalEstimatedArea,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};


