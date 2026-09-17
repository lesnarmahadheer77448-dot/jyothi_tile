'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Layers, ArrowRight, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Product, GraniteSlab } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useQuote } from '@/context/QuoteContext';

interface ProductCardProps {
  product: Product | GraniteSlab;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const { openQuoteModal } = useQuote();

  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const isTile = 'size' in product;
  const sizeLabel = isTile ? product.size : product.slabDimensions;
  const finishLabel = isTile ? product.finish : product.finishesAvailable[0];
  const detailUrl = product.category === 'granite' ? `/granite/${product.slug}` : `/products/${product.slug}`;

  return (
    <div className="group relative bg-[#131317] border border-[#24242C] hover:border-[#C5A880]/60 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-black/80">
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950">
        <Link href={detailUrl} className="block w-full h-full">
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {'isNew' in product && product.isNew && (
              <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-[#C5A880] text-black font-semibold rounded">
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
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-black/60 text-[#D8D4CA] hover:text-white border border-white/10'
              }`}
              title={isSaved ? 'Remove from Moodboard' : 'Save to Moodboard'}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Compare Button */}
            <button
              onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product))}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isCompared
                  ? 'bg-[#C5A880] text-black font-bold'
                  : 'bg-black/60 text-[#D8D4CA] hover:text-[#C5A880] border border-white/10'
              }`}
              title={isCompared ? 'In Compare Matrix' : 'Add to Compare'}
            >
              <Layers className="w-3.5 h-3.5" />
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
            <span>{'material' in product ? product.material : product.origin}</span>
            <span>SKU: {product.sku}</span>
          </div>
          <Link href={detailUrl}>
            <h4 className="font-serif-luxury text-lg text-white group-hover:text-[#C5A880] transition-colors line-clamp-1">
              {product.name}
            </h4>
          </Link>
          <p className="text-xs text-[#9E9A91] line-clamp-2 mt-1.5 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price Band & Direct CTAs */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#7A7770] block">Guide Price</span>
            <span className="text-xs font-semibold text-[#E5D2B8] font-mono">
              {'priceSqFtEstimate' in product && product.priceSqFtEstimate
                ? product.priceSqFtEstimate
                : 'priceBand' in product
                ? product.priceBand
                : 'By Quotation'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openQuoteModal(product)}
              className="px-3 py-1.5 bg-[#1B1B22] hover:bg-[#C5A880] text-[#D8D4CA] hover:text-black border border-[#2F2F3B] hover:border-[#C5A880] rounded text-[11px] uppercase tracking-wider font-medium transition-all"
            >
              Get Quote
            </button>
            <Link
              href={detailUrl}
              className="p-1.5 rounded text-[#9E9A90] hover:text-white hover:bg-white/5 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

