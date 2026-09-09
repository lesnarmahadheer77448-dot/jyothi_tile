'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { collectionsData } from '@/data/collections';
import { spacesData } from '@/data/spaces';

interface MegaMenuProps {
  type: 'collections' | 'spaces';
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, onClose }) => {
  if (type === 'collections') {
    return (
      <div className="w-[880px] bg-[#121216]/95 border border-[#27272F] backdrop-blur-2xl rounded-xl p-6 shadow-2xl animate-fade-in-scale">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase font-mono">CURATED PORTFOLIO</span>
            <h4 className="font-serif-luxury text-lg text-white">Cinematic Editorial Collections</h4>
          </div>
          <Link
            href="/collections"
            onClick={onClose}
            className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {collectionsData.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              onClick={onClose}
              className="group flex flex-col space-y-2.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="relative aspect-[4/3] w-full rounded overflow-hidden bg-neutral-900 border border-white/5">
                <Image
                  src={col.heroImage}
                  alt={col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[9px] font-mono tracking-widest text-[#E5D2B8] bg-black/60 px-1.5 py-0.5 rounded">
                  {col.editorialBadge}
                </span>
              </div>
              <div>
                <h5 className="text-xs font-serif-luxury tracking-wide text-white group-hover:text-[#C5A880] transition-colors line-clamp-1">
                  {col.title}
                </h5>
                <p className="text-[11px] text-[#8E8A81] line-clamp-1 mt-0.5 font-sans-luxury">
                  {col.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Spaces Mega Menu
  return (
    <div className="w-[840px] bg-[#121216]/95 border border-[#27272F] backdrop-blur-2xl rounded-xl p-6 shadow-2xl animate-fade-in-scale">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase font-mono">EXPLORE BY ARCHITECTURAL SPACE</span>
          <h4 className="font-serif-luxury text-lg text-white">Find Tiles For Every Room</h4>
        </div>
        <Link
          href="/products"
          onClick={onClose}
          className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 uppercase tracking-wider"
        >
          <span>All Surfaces</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {spacesData.map((sp) => (
          <Link
            key={sp.id}
            href={`/spaces/${sp.slug}`}
            onClick={onClose}
            className="group flex gap-3.5 p-2.5 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
          >
            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-neutral-900">
              <Image
                src={sp.heroImage}
                alt={sp.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <h5 className="text-xs font-medium text-white group-hover:text-[#C5A880] transition-colors truncate font-sans-luxury">
                {sp.name}
              </h5>
              <p className="text-[10px] text-[#8C887E] line-clamp-1 mt-0.5">
                {sp.recommendedSizes[0]} • {sp.recommendedFinishes[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

