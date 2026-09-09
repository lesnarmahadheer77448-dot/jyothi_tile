'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, Sparkles, Layers } from 'lucide-react';
import { Product } from '@/types';

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const images = [
    { type: 'Installed Scene', url: product.mainImage },
    ...(product.roomImages?.map((url, i) => ({ type: `Room View ${i + 1}`, url })) || []),
    { type: 'Macro Texture', url: product.textureImage },
    ...(product.fullSlabImage ? [{ type: 'Full Slab', url: product.fullSlabImage }] : []),
    ...(product.edgeImage ? [{ type: 'Edge Profile', url: product.edgeImage }] : []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Large Featured Viewer */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-[#2B2B36] shadow-2xl group">
        <Image
          src={activeImage.url}
          alt={`${product.name} - ${activeImage.type}`}
          fill
          priority
          className="object-cover transition-all duration-700 animate-fade-in-scale group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* View mode indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono text-[#E5D2B8] uppercase">
            {activeImage.type}
          </span>
        </div>

        {/* Dimension & Finish Badge */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#D4C3AC] bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <span>{product.size}</span>
          <span>{product.finish}</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {images.map((img, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={`${img.url}-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border transition-all ${
                isSelected
                  ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 scale-105'
                  : 'border-[#24242F] opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img.url} alt={img.type} fill className="object-cover" />
              <span className="absolute bottom-1 left-1 right-1 text-[8px] font-mono text-white bg-black/80 rounded px-1 text-center truncate">
                {img.type}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

