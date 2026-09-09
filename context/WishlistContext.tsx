'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, GraniteSlab } from '@/types';

type WishlistItem = Product | GraniteSlab;

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  shareViaWhatsApp: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vault_wishlist_items');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('vault_wishlist_items', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    if (!wishlist.some((i) => i.id === item.id)) {
      setWishlist((prev) => [...prev, item]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((i) => i.id === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const shareViaWhatsApp = () => {
    if (wishlist.length === 0) return;
    const itemsList = wishlist
      .map((item, idx) => `${idx + 1}. *${item.name}* (SKU: ${item.sku})`)
      .join('%0A');
    const message = `Hello Jyothi Tiles Atelier,%0A%0AI have curated a bespoke collection of surfaces from your digital showroom and would like to receive availability and quotation details:%0A%0A${itemsList}%0A%0APlease connect with pricing and delivery timelines.`;
    window.open(`https://wa.me/919626547707?text=${message}`, '_blank');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        shareViaWhatsApp,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

