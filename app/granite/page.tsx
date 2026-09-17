'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, ShieldCheck, Layers, Maximize2, Sparkles } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { ProductCard } from '@/components/products/ProductCard';

export default function GraniteAtelierPage() {
  const { products } = useAdminData();
  const graniteData = products.filter(p => p.category === 'granite');
  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <Layers className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">EARTH MONOLITHS</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-wide">
            Natural Granite Atelier
          </h1>
          <p className="text-xs sm:text-sm text-[#A09C92] font-light leading-relaxed">
            Mined from ancient volcanic rifts in Brazil, Norway, and India. Every gangsaw slab is unique, engineered with unmatched thermal resilience (350°C) and scratch resistance for monumental kitchen islands, staircases, and feature cladding.
          </p>
        </div>

        {/* Feature Banner */}
        <div className="mb-16 p-8 rounded-3xl bg-[#121217] border border-[#242430] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider">THICKNESS PROFILES</span>
            <p className="text-base text-white font-serif-luxury">18mm, 20mm & 30mm Solid Slabs</p>
            <p className="text-xs text-[#8E8A81]">Waterjet mitred edge finishing available.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider">SURFACE TREATMENTS</span>
            <p className="text-base text-white font-serif-luxury">Leather, Honed & Mirror Polish</p>
            <p className="text-xs text-[#8E8A81]">Tactile velvet leather touch that resists prints.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider">BOOKMATCH COMPATIBILITY</span>
            <p className="text-base text-white font-serif-luxury">Consecutive Block Pairs</p>
            <p className="text-xs text-[#8E8A81]">Seamless mirror vein flow across islands.</p>
          </div>
        </div>

        {/* Slabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graniteData.map((granite) => (
            <ProductCard key={granite.id} product={granite} />
          ))}
        </div>
      </div>
    </div>
  );
}

