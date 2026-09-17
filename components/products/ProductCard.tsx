'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ArrowRight, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Product, GraniteSlab } from '@/types';
import { UnifiedSurface } from '@/context/AdminDataContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuote } from '@/context/QuoteContext';

interface ProductCardProps {
  product: Product | GraniteSlab | UnifiedSurface;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuoteModal } = useQuote();

  const isSaved = isInWishlist(product.id);

  const isTile = 'size' in product && !!product.size;
  const sizeLabel = isTile ? (product as any).size : (product as any).slabDimensions;
  const finishLabel = isTile ? (product as any).finish : ((product as any).finishesAvailable?.[0] || 'Polished');
  const detailUrl = product.category === 'granite' ? `/granite/${product.slug}` : `/products/${product.slug}`;

  return (
    <div className="group relative bg-[#131317] border border-[#24242C] hover:border-[#C5A880]/60 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-black/80">
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950">
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Dynamic Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10 pointer-events-none">
          <div className="flex flex-col gap-2">
            {featured && (
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] bg-[#C5A880] text-black rounded-sm shadow-lg">
                FEATURED
              </span>
            )}
            {('isNew' in product && product.isNew) && (
              <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-white text-black rounded-sm shadow-md">
                NEW
              </span>
            )}
            <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md text-[#E8D6C0] border border-white/10 rounded">
              {product.category.toUpperCase()}
            </span>
          </div>

          {/* Quick Floating Action Icons */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product as any)}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-black/60 text-[#D8D4CA] hover:text-white border border-white/10'
              }`}
              title={isSaved ? 'Remove from Moodboard' : 'Save to Moodboard'}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#D8C4AA]">
          <span>{sizeLabel}</span>
          <span>{finishLabel}</span>
        </div>
      </div>

      {/* Card Details & Specifications */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#8A8780] mb-1">
            <span>{'material' in product ? (product as any).material : (product as any).origin}</span>
            <span>SKU: {product.sku}</span>
          </div>
          
          <Link href={detailUrl} className="group-hover:text-[#C5A880] transition-colors block">
            <h3 className="text-xl font-serif-luxury font-medium text-white mb-1.5 leading-snug">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-xs text-[#9E9A90] font-light line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#24242C]">
          {/* Price Range */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#737068]">Starting from</span>
            <span className="text-sm font-semibold text-[#E8D6C0]">
              {(product as any).priceSqFtEstimate} <span className="text-[10px] text-[#8A8780] font-normal">/ sq.ft</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openQuoteModal(product as any)}
              className="px-3 py-2.5 bg-[#1C1C22] hover:bg-[#25252D] border border-[#2D2D38] text-white text-[10px] font-medium tracking-widest uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3 h-3 text-[#C5A880]" />
              <span>Quote</span>
            </button>
            <Link
              href={detailUrl}
              className="px-3 py-2.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all duration-300"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

