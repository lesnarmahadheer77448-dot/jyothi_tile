'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, ArrowRight, ChevronDown } from 'lucide-react';

export const FloatingTileFinder: React.FC = () => {
  const router = useRouter();
  const [selectedSpace, setSelectedSpace] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedFinish, setSelectedFinish] = useState('all');

  const spaces = [
    { value: 'all', label: 'All Spaces' },
    { value: 'living-room', label: 'Living Room' },
    { value: 'bathroom', label: 'Bathroom / Spa' },
    { value: 'kitchen', label: 'Kitchen & Island' },
    { value: 'bedroom', label: 'Master Bedroom' },
    { value: 'outdoor', label: 'Outdoor & Terrace' },
    { value: 'commercial', label: 'Commercial / Lobby' },
  ];

  const types = [
    { value: 'all', label: 'All Surface Types' },
    { value: 'tiles', label: 'Porcelain Floor & Wall' },
    { value: 'slabs', label: 'Large-Format Sintered Slabs' },
    { value: 'granite', label: 'Natural Granite Slabs' },
    { value: 'marble', label: 'Imported Marble Edit' },
  ];

  const sizes = [
    { value: 'all', label: 'All Dimensions' },
    { value: '120x180', label: '120 × 180 cm (Monumental)' },
    { value: '120x240', label: '120 × 240 cm (Slabs)' },
    { value: '80x160', label: '80 × 160 cm (Large)' },
    { value: '60x120', label: '60 × 120 cm (Classic)' },
    { value: '20x120', label: '20 × 120 cm (Wood Planks)' },
    { value: 'slab', label: '320 × 195 cm (Granite Slab)' },
  ];

  const finishes = [
    { value: 'all', label: 'All Surface Finishes' },
    { value: 'polished', label: 'High Gloss / Nano Polished' },
    { value: 'silk-matte', label: 'Silk Matte & Cashmere' },
    { value: 'carving', label: '3D Carving & Fluted' },
    { value: 'bookmatch', label: 'Bookmatch Mirror' },
    { value: 'leather', label: 'Leather Finish' },
    { value: 'anti-skid', label: 'R11 Anti-Skid Rustic' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedSpace !== 'all') params.set('space', selectedSpace);
    if (selectedType !== 'all') params.set('category', selectedType);
    if (selectedSize !== 'all') params.set('size', selectedSize);
    if (selectedFinish !== 'all') params.set('finish', selectedFinish);

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-10 mb-20">
      <div className="bg-[#141418]/95 border border-[#2B2B33] backdrop-blur-2xl p-4 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Header Tag */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[#D8C6AC]">
              SIGNATURE SURFACE FINDER
            </span>
          </div>
          <span className="text-xs text-[#8E8A81] hidden sm:inline">
            Configure Room & Specs For Instant Match
          </span>
        </div>

        {/* 4 Dropdowns + Find Button Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
          {/* Space selector */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-[#9C988F] font-mono">01 / SPACE</label>
            <div className="relative">
              <select
                value={selectedSpace}
                onChange={(e) => setSelectedSpace(e.target.value)}
                aria-label="Filter by architectural space"
                className="w-full appearance-none bg-[#1A1A20] border border-[#2B2B36] hover:border-[#C5A880]/50 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                {spaces.map((s) => (
                  <option key={s.value} value={s.value} className="bg-[#141418]">
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#88857D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Surface Type selector */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-[#9C988F] font-mono">02 / SURFACE</label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by surface category"
                className="w-full appearance-none bg-[#1A1A20] border border-[#2B2B36] hover:border-[#C5A880]/50 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                {types.map((t) => (
                  <option key={t.value} value={t.value} className="bg-[#141418]">
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#88857D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Dimension Size selector */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-[#9C988F] font-mono">03 / SIZE</label>
            <div className="relative">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                aria-label="Filter by dimension size"
                className="w-full appearance-none bg-[#1A1A20] border border-[#2B2B36] hover:border-[#C5A880]/50 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                {sizes.map((sz) => (
                  <option key={sz.value} value={sz.value} className="bg-[#141418]">
                    {sz.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#88857D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Finish selector */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-[#9C988F] font-mono">04 / FINISH</label>
            <div className="relative">
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                aria-label="Filter by surface finish"
                className="w-full appearance-none bg-[#1A1A20] border border-[#2B2B36] hover:border-[#C5A880]/50 rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                {finishes.map((f) => (
                  <option key={f.value} value={f.value} className="bg-[#141418]">
                    {f.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#88857D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Find Button */}
          <div className="flex flex-col justify-end pt-3 sm:pt-0 sm:self-end">
            <button
              onClick={handleSearch}
              className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-lg shadow-[#C5A880]/20 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
            >
              <Search className="w-4 h-4" />
              <span>FIND MY TILE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

