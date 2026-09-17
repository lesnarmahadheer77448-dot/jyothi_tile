'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { ProductCard } from '../products/ProductCard';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'marble' | 'stone' | 'slabs'>('all');
  const { products } = useAdminData();

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'marble') return p.collectionId === 'the-marble-edit';
    if (activeTab === 'stone') return p.collectionId === 'the-stone-collection';
    if (activeTab === 'slabs') return p.category === 'slabs';
    return true;
  });

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#C5A880] mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">FEATURED SURFACES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            The Surface Edit
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 p-1.5 bg-[#141418] border border-[#262630] rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-mono transition-colors ${
              activeTab === 'all'
                ? 'bg-[#C5A880] text-black font-semibold'
                : 'text-[#9E9A90] hover:text-white'
            }`}
          >
            All Masterpieces
          </button>
          <button
            onClick={() => setActiveTab('marble')}
            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-mono transition-colors ${
              activeTab === 'marble'
                ? 'bg-[#C5A880] text-black font-semibold'
                : 'text-[#9E9A90] hover:text-white'
            }`}
          >
            Marble Edit
          </button>
          <button
            onClick={() => setActiveTab('stone')}
            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-mono transition-colors ${
              activeTab === 'stone'
                ? 'bg-[#C5A880] text-black font-semibold'
                : 'text-[#9E9A90] hover:text-white'
            }`}
          >
            Stone & Travertine
          </button>
          <button
            onClick={() => setActiveTab('slabs')}
            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-mono transition-colors ${
              activeTab === 'slabs'
                ? 'bg-[#C5A880] text-black font-semibold'
                : 'text-[#9E9A90] hover:text-white'
            }`}
          >
            120×240 Slabs
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom CTA to Full Catalog */}
      <div className="mt-16 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#16161C] hover:bg-[#C5A880] text-[#E0DCD4] hover:text-black border border-[#2D2D38] hover:border-[#C5A880] rounded-sm text-xs uppercase font-semibold tracking-[0.25em] transition-all duration-300 shadow-xl"
        >
          <span>View Complete Catalog (12,000+ Designs)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

