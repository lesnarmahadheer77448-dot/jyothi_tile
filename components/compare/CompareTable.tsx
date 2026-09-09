'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Check, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useQuote } from '@/context/QuoteContext';
import { Product, GraniteSlab } from '@/types';

export const CompareTable: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { openQuoteModal } = useQuote();

  if (compareItems.length === 0) {
    return (
      <div className="py-24 text-center border border-dashed border-[#292938] rounded-3xl p-12 space-y-4">
        <h3 className="font-serif-luxury text-2xl text-white">Your Comparison Tray is Empty</h3>
        <p className="text-xs text-[#8E8A81] max-w-md mx-auto">
          Explore our collection of porcelain tiles and exotic granites, and click the &quot;Add to Compare&quot; button to view technical specifications side-by-side.
        </p>
        <Link
          href="/products"
          className="inline-block px-7 py-3.5 bg-[#C5A880] text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-[#D6BC97]"
        >
          Explore Surface Catalog
        </Link>
      </div>
    );
  }

  const specRows = [
    {
      label: 'Surface Category',
      getter: (item: Product | GraniteSlab) => item.category.toUpperCase(),
    },
    {
      label: 'Material Composition',
      getter: (item: Product | GraniteSlab) =>
        'material' in item ? item.material : '100% Solid Natural Granite',
    },
    {
      label: 'Nominal Dimensions',
      getter: (item: Product | GraniteSlab) =>
        'size' in item ? item.size : item.slabDimensions,
    },
    {
      label: 'Finish / Texture',
      getter: (item: Product | GraniteSlab) =>
        'finish' in item ? item.finish : item.finishesAvailable.join(', '),
    },
    {
      label: 'Water Absorption (ISO)',
      getter: (item: Product | GraniteSlab) => item.waterAbsorption,
      highlight: true,
    },
    {
      label: 'Scratch / Traffic Hardness',
      getter: (item: Product | GraniteSlab) =>
        'mohsHardness' in item && item.mohsHardness
          ? `MOHS ${item.mohsHardness} • PEI ${item.peiRating || 4}`
          : 'density' in item
          ? `Density: ${item.density} • ${item.compressiveStrength}`
          : 'MOHS 7 Certified',
    },
    {
      label: 'Slip Rating',
      getter: (item: Product | GraniteSlab) =>
        'slipRating' in item && item.slipRating ? item.slipRating : 'Custom profile available',
    },
    {
      label: 'Quarry / Origin Provenance',
      getter: (item: Product | GraniteSlab) => item.origin,
    },
    {
      label: 'Guide Rate / Tier',
      getter: (item: Product | GraniteSlab) =>
        'priceSqFtEstimate' in item && item.priceSqFtEstimate
          ? item.priceSqFtEstimate
          : 'priceBand' in item
          ? item.priceBand
          : 'By Project Quote',
      highlight: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[#8C887E]">
          Comparing {compareItems.length} of 4 surfaces
        </span>
        <button
          onClick={clearCompare}
          className="text-xs text-red-400 hover:underline font-mono"
        >
          Clear Matrix
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto border border-[#262632] rounded-2xl bg-[#121217] shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#262632]">
              <th className="p-6 text-xs uppercase font-mono tracking-widest text-[#C5A880] w-64 bg-[#15151B]">
                SPECIFICATION ATTRIBUTE
              </th>
              {compareItems.map((item) => (
                <th key={item.id} className="p-6 min-w-[260px] align-top bg-[#121217] border-l border-[#242430]">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/5">
                      <Image src={item.mainImage} alt={item.name} fill className="object-cover" />
                      <button
                        onClick={() => removeFromCompare(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white/70 hover:text-white"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#8E8A81] uppercase block">SKU: {item.sku}</span>
                      <h4 className="font-serif-luxury text-base text-white font-medium mt-0.5">{item.name}</h4>
                    </div>

                    <button
                      onClick={() => openQuoteModal(item)}
                      className="w-full py-2 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-[11px] uppercase tracking-wider rounded-lg transition-colors"
                    >
                      Get Quote
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#242430] text-xs">
            {specRows.map((row, idx) => (
              <tr key={row.label} className={idx % 2 === 0 ? 'bg-white/[0.01]' : ''}>
                <td className="p-5 font-mono text-[#9E9A90] uppercase tracking-wider bg-[#15151B] border-r border-[#262632]">
                  {row.label}
                </td>
                {compareItems.map((item) => (
                  <td
                    key={item.id}
                    className={`p-5 font-sans-luxury border-l border-[#242430] ${
                      row.highlight ? 'text-[#E5D2B8] font-semibold' : 'text-[#DDD9CF]'
                    }`}
                  >
                    {row.getter(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

