'use client';

import React from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { CompareTable } from '@/components/compare/CompareTable';

export default function ComparePage() {
  return (
    <div className="pt-28 pb-24 bg-[#0D0D0F] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <Layers className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">TECHNICAL BENCHMARK</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Surface Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9A90] font-light leading-relaxed">
            Side-by-side technical evaluation across water absorption, PEI ratings, slip resistance certifications, and dimensions to assist architects in specification.
          </p>
        </div>

        {/* Comparison Table */}
        <CompareTable />
      </div>
    </div>
  );
}

