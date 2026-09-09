'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Flame, Layers, Maximize2 } from 'lucide-react';
import { graniteData } from '@/data/granite';

export const GraniteSpotlight: React.FC = () => {
  const featuredGranite = graniteData[0]; // Titanium Gold Leather Granite

  return (
    <section className="py-24 bg-[#070709] border-t border-[#1C1C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Slab Photography & Zoom trigger (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#2B2B36] bg-black shadow-2xl">
              <Image
                src={featuredGranite.fullSlabImage}
                alt={featuredGranite.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Full Slab Inspector Badge */}
              <Link
                href={`/granite/${featuredGranite.slug}`}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#C5A880]/40 text-[#E5D2B8] text-xs font-mono flex items-center gap-1.5 hover:bg-[#C5A880] hover:text-black transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>INSPECT FULL SLAB (320 × 195 CM)</span>
              </Link>

              {/* Current Quarry Batch */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#C4BFB5]">
                <span>Origin: {featuredGranite.origin}</span>
                <span className="text-[#C5A880]">{featuredGranite.currentBatchBlocks[0]}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Details & Strength Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#C5A880]">
              <Layers className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono">NATURAL STONE ATELIER</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light tracking-wide">
              {featuredGranite.name}
            </h2>

            <p className="text-xs sm:text-sm text-[#9C988F] font-light leading-relaxed">
              {featuredGranite.description}
            </p>

            {/* Performance Specs Matrix */}
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#737068]">Heat Threshold</span>
                <p className="text-xs font-medium text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{featuredGranite.heatResistance}</span>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#737068]">Thickness Options</span>
                <p className="text-xs font-medium text-white">20 mm & 30 mm Slabs</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#737068]">Density</span>
                <p className="text-xs font-medium text-white">{featuredGranite.density}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#737068]">Water Absorption</span>
                <p className="text-xs font-medium text-white text-[#C5A880]">{featuredGranite.waterAbsorption}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/granite"
                className="px-7 py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#C5A880]/20"
              >
                <span>Explore Granite Atelier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/granite/${featuredGranite.slug}`}
                className="px-7 py-3.5 bg-[#141418] hover:bg-[#1B1B22] border border-[#2B2B33] text-white text-xs font-medium tracking-widest uppercase rounded-sm flex items-center justify-center transition-colors"
              >
                View Slab Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

