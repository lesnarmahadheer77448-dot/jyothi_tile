'use client';

import React, { useState } from 'react';
import { Calculator, Plus, Minus, Info } from 'lucide-react';
import { Product } from '@/types';
import { useQuote } from '@/context/QuoteContext';

interface TileCalculatorProps {
  product: Product;
}

export const TileCalculator: React.FC<TileCalculatorProps> = ({ product }) => {
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [length, setLength] = useState<number>(20);
  const [width, setWidth] = useState<number>(15);
  const [wastagePercent, setWastagePercent] = useState<number>(10);
  const { addToQuote, openQuoteModal } = useQuote();

  const rawAreaSqFt = unit === 'feet' ? length * width : length * width * 10.7639;
  const bufferAreaSqFt = Math.round(rawAreaSqFt * (1 + wastagePercent / 100));
  const boxCoverage = product.boxCoverageSqFt || 23.25;
  const boxesNeeded = Math.ceil(bufferAreaSqFt / boxCoverage);
  const totalEffectiveSqFt = Math.round(boxesNeeded * boxCoverage);

  const handleAddEstimateToQuote = () => {
    addToQuote(product, bufferAreaSqFt, wastagePercent);
    openQuoteModal(product);
  };

  return (
    <div className="bg-[#141418] border border-[#272732] rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#C5A880]" />
          <h4 className="font-serif-luxury text-base text-white tracking-wide">Surface Quantity Estimator</h4>
        </div>
        {/* Unit switch */}
        <div className="flex items-center bg-[#1B1B22] p-1 rounded-lg border border-[#2B2B38] text-[10px] font-mono">
          <button
            onClick={() => setUnit('feet')}
            className={`px-2.5 py-1 rounded ${unit === 'feet' ? 'bg-[#C5A880] text-black font-bold' : 'text-[#8E8A81]'}`}
          >
            FEET
          </button>
          <button
            onClick={() => setUnit('meters')}
            className={`px-2.5 py-1 rounded ${unit === 'meters' ? 'bg-[#C5A880] text-black font-bold' : 'text-[#8E8A81]'}`}
          >
            METRES
          </button>
        </div>
      </div>

      {/* Input Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase font-mono tracking-widest text-[#8E8A81] mb-1">
            Room Length ({unit === 'feet' ? 'ft' : 'm'})
          </label>
          <input
            type="number"
            min={1}
            value={length || ''}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full px-3 py-2 bg-[#1B1B22] border border-[#2B2B36] rounded-lg text-sm text-white font-mono focus:outline-none focus:border-[#C5A880]"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-mono tracking-widest text-[#8E8A81] mb-1">
            Room Width ({unit === 'feet' ? 'ft' : 'm'})
          </label>
          <input
            type="number"
            min={1}
            value={width || ''}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full px-3 py-2 bg-[#1B1B22] border border-[#2B2B36] rounded-lg text-sm text-white font-mono focus:outline-none focus:border-[#C5A880]"
          />
        </div>
      </div>

      {/* Wastage % chips */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E8A81]">
            Cutting & Wastage Buffer
          </span>
          <span className="text-xs font-mono text-[#C5A880]">+{wastagePercent}%</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[5, 10, 15].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setWastagePercent(pct)}
              className={`py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                wastagePercent === pct
                  ? 'bg-[#C5A880] text-black font-bold border-[#C5A880]'
                  : 'bg-[#1B1B22] text-[#A8A49B] border-[#2A2A36] hover:text-white'
              }`}
            >
              +{pct}% {pct === 10 ? '(Recommended)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Output Box */}
      <div className="p-4 bg-[#1B1B22] border border-[#292936] rounded-xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8E8A81]">Net Floor/Wall Area:</span>
          <span className="font-mono text-white font-medium">{Math.round(rawAreaSqFt)} sq.ft</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8E8A81]">Total with {wastagePercent}% Buffer:</span>
          <span className="font-mono text-[#C5A880] font-bold">{bufferAreaSqFt} sq.ft</span>
        </div>
        <div className="flex items-center justify-between text-xs border-t border-white/10 pt-2">
          <span className="text-white font-medium">Boxes Needed ({boxCoverage} sq.ft/box):</span>
          <span className="font-mono text-xl text-white font-bold">{boxesNeeded} Boxes</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAddEstimateToQuote}
        className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D4BA94] text-black font-semibold text-xs tracking-widest uppercase rounded-lg transition-colors shadow-lg shadow-[#C5A880]/15"
      >
        Add {boxesNeeded} Boxes to Bespoke Quote
      </button>
    </div>
  );
};

