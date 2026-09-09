'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageSquare, Trash2, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useQuote } from '@/context/QuoteContext';
import { ProductCard } from '@/components/products/ProductCard';

export default function WishlistPage() {
  const { wishlist, clearWishlist, shareViaWhatsApp } = useWishlist();
  const { openQuoteModal, addToQuote } = useQuote();

  const handleQuoteAll = () => {
    wishlist.forEach((item) => addToQuote(item));
    openQuoteModal();
  };

  return (
    <div className="pt-28 pb-24 bg-[#0D0D0F] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#C5A880] mb-2">
              <Heart className="w-4 h-4 fill-[#C5A880]" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono">CURATED MOODBOARD</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
              My Saved Surfaces ({wishlist.length})
            </h1>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={shareViaWhatsApp}
                className="px-5 py-3 bg-[#25D366] hover:bg-[#20BE5B] text-black font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Share Moodboard on WhatsApp</span>
              </button>
              <button
                onClick={handleQuoteAll}
                className="px-5 py-3 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors"
              >
                Request Quote for All
              </button>
              <button
                onClick={clearWishlist}
                className="p-3 text-[#8C887E] hover:text-red-400 border border-[#2B2B36] rounded-lg transition-colors"
                title="Clear Moodboard"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-[#292938] rounded-3xl p-12 space-y-4">
            <Heart className="w-10 h-10 text-[#C5A880] mx-auto opacity-30" />
            <h3 className="font-serif-luxury text-2xl text-white">Your Moodboard is Empty</h3>
            <p className="text-xs text-[#8E8A81] max-w-md mx-auto">
              Save your favorite porcelain tiles, fluted carvings, and natural granites while exploring our showroom. They will be organized here for showroom consultation or instant quotation.
            </p>
            <Link
              href="/products"
              className="inline-block px-7 py-3.5 bg-[#C5A880] text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-[#D6BC97]"
            >
              Explore Repertoire
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

