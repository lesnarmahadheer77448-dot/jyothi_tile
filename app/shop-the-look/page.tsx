'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Plus, ArrowRight, Check, Compass } from 'lucide-react';
import { lookbooksData } from '@/data/lookbooks';
import { useQuote } from '@/context/QuoteContext';

export default function ShopTheLookPage() {
  const [selectedLookbookIndex, setSelectedLookbookIndex] = useState(0);
  const currentRoom = lookbooksData[selectedLookbookIndex] || lookbooksData[0];
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(0);
  const { openQuoteModal } = useQuote();

  const activeHotspot = activeHotspotIndex !== null ? currentRoom.hotspots[activeHotspotIndex] : null;

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">ARCHITECTURAL LOOKBOOKS</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Shop The Look
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9A90] font-light leading-relaxed">
            Curated room suites designed by premier interior architects. Click the interactive hotspots to inspect individual material layers or request a turnkey specification package.
          </p>
        </div>

        {/* Room Switcher Tabs */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto mb-8 border-b border-white/10">
          {lookbooksData.map((look, idx) => {
            const isSelected = selectedLookbookIndex === idx;
            return (
              <button
                key={look.id}
                onClick={() => {
                  setSelectedLookbookIndex(idx);
                  setActiveHotspotIndex(0);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#C5A880] text-black font-semibold shadow-lg shadow-[#C5A880]/20'
                    : 'bg-[#15151B] text-[#9E9A90] hover:text-white border border-[#242430]'
                }`}
              >
                {look.title} ({look.styleTag})
              </button>
            );
          })}
        </div>

        {/* Interactive Hotspot Canvas & Detail Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Photo with Hotspots (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#262634] bg-black shadow-2xl">
              <Image
                src={currentRoom.heroImage}
                alt={currentRoom.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Hotspot Pins */}
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
                      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isSelected
                          ? 'bg-[#C5A880] text-black scale-125 shadow-[0_0_25px_#C5A880]'
                          : 'bg-black/80 text-white border border-white/60 hover:scale-110'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span className="absolute inset-0 rounded-full animate-ping bg-[#C5A880]/30 -z-10" />
                    </button>
                  </div>
                );
              })}

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 text-xs">
                <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block mb-1">
                  DESIGNED BY: {currentRoom.designer} • {currentRoom.location}
                </span>
                <p className="text-white font-serif-luxury text-lg font-medium">{currentRoom.title}</p>
                <p className="text-xs text-[#A8A49B] mt-1 font-light">{currentRoom.narrative}</p>
              </div>
            </div>

            {/* List of Used Products */}
            <div className="bg-[#121217] border border-[#242430] rounded-2xl p-6 space-y-4">
              <h4 className="font-serif-luxury text-lg text-white">
                Complete Material Suite In This Room ({currentRoom.usedProducts.length} Surfaces)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentRoom.usedProducts.map((prod) => (
                  <div
                    key={prod.productId}
                    className="flex items-center gap-3 p-3 bg-[#181820] border border-[#262634] rounded-xl"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black flex-shrink-0">
                      <Image src={prod.image} alt={prod.productName} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-mono text-[#C5A880] uppercase block truncate">{prod.role}</span>
                      <p className="text-xs font-medium text-white truncate">{prod.productName}</p>
                      <p className="text-[10px] text-[#8C887E] truncate font-mono">{prod.spec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Active Hotspot & Bundle Quote (4 Cols) */}
          <div className="lg:col-span-4 bg-[#121217] border border-[#242430] rounded-2xl p-6 space-y-6 shadow-2xl sticky top-28">
            {activeHotspot ? (
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block">
                  ACTIVE HOTSPOT • {activeHotspot.productRole}
                </span>

                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-white/5">
                  <Image src={activeHotspot.image} alt={activeHotspot.productName} fill className="object-cover" />
                </div>

                <div>
                  <h4 className="font-serif-luxury text-xl text-white">{activeHotspot.productName}</h4>
                  <p className="text-xs text-[#A8A49A] mt-1 font-mono">{activeHotspot.specs}</p>
                </div>

                <Link
                  href={`/products/${activeHotspot.productId}`}
                  className="w-full py-3 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <span>View Surface Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <p className="text-xs text-[#8E8A81]">Select any hotspot pin to view details.</p>
            )}

            {/* Turnkey Room Bundle Quote */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#A09C92] block">
                Turnkey Estimation:
              </span>
              <button
                onClick={() => openQuoteModal()}
                className="w-full py-3.5 bg-[#1C1C24] hover:bg-[#252532] border border-[#2F2F40] text-white text-xs tracking-widest uppercase rounded-lg transition-colors"
              >
                Request Full Room Look Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

