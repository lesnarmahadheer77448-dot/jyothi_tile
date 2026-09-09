'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Eye, Layers, Plus } from 'lucide-react';
import { lookbooksData } from '@/data/lookbooks';
import { useQuote } from '@/context/QuoteContext';

export const ShopTheLookHero: React.FC = () => {
  const currentRoom = lookbooksData[0]; // Mediterranean Salone
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(0);
  const { openQuoteModal } = useQuote();

  const activeHotspot = activeHotspotIndex !== null ? currentRoom.hotspots[activeHotspotIndex] : null;

  return (
    <section className="py-24 bg-[#09090B] border-t border-[#1C1C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono">COMPLETE ROOM SOLUTION</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
              Shop The Look
            </h2>
          </div>
          <p className="text-sm text-[#938F86] max-w-md">
            Don’t just buy isolated tiles. Experience curated architectural palettes pairing floors, walls, countertops, and grouts.
          </p>
        </div>

        {/* Interactive Hotspot Room Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hotspot Photo (8 Cols) */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#24242C] bg-black shadow-2xl">
            <Image
              src={currentRoom.heroImage}
              alt={currentRoom.title}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Interactive Pins */}
            {currentRoom.hotspots.map((spot, idx) => {
              const isSelected = activeHotspotIndex === idx;
              return (
                <div
                  key={spot.title}
                  style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspotIndex(idx)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isSelected
                        ? 'bg-[#C5A880] text-black scale-125 shadow-[0_0_20px_#C5A880]'
                        : 'bg-black/80 text-white border border-white/60 hover:scale-110'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    {/* Pulsing beacon */}
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#C5A880]/30 -z-10" />
                  </button>
                </div>
              );
            })}

            {/* Room Narrative Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 text-xs">
              <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block mb-1">
                {currentRoom.styleTag} • {currentRoom.location}
              </span>
              <p className="text-white font-serif-luxury text-sm font-medium">{currentRoom.title}</p>
            </div>
          </div>

          {/* Active Hotspot Detail Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {activeHotspot ? (
              <div className="bg-[#131317] border border-[#2B2B36] rounded-2xl p-6 shadow-2xl space-y-5 animate-fade-in-scale">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                    {activeHotspot.productRole}
                  </span>
                  <span className="text-[10px] text-[#8C887E] font-mono">HOTSPOT ACTIVE</span>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-neutral-900 border border-white/5">
                  <Image
                    src={activeHotspot.image}
                    alt={activeHotspot.productName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-serif-luxury text-xl text-white">
                    {activeHotspot.productName}
                  </h4>
                  <p className="text-xs text-[#A8A49B] mt-1 font-mono">{activeHotspot.specs}</p>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <Link
                    href={`/products/${activeHotspot.productId}`}
                    className="w-full py-3 bg-[#C5A880] hover:bg-[#D6BC97] text-black text-xs font-semibold tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => openQuoteModal()}
                    className="w-full py-2.5 bg-[#1B1B22] hover:bg-[#252530] border border-[#2E2E3A] text-white text-xs tracking-wider uppercase rounded-lg transition-colors"
                  >
                    Get Look Quotation
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 border border-dashed border-[#2E2E3A] rounded-2xl text-center text-[#8C887E] text-xs">
                Click any hotspot pin (+) on the room image to inspect the specified material.
              </div>
            )}

            {/* Browse All Lookbooks CTA */}
            <Link
              href="/shop-the-look"
              className="p-4 bg-[#14141A] hover:bg-[#1A1A22] border border-[#24242E] rounded-xl flex items-center justify-between text-xs text-[#E5E1D8] group transition-colors"
            >
              <span>Explore All 12 Architectural Lookbooks</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

