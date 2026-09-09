'use client';

import React from 'react';
import { ShieldCheck, FileCheck, Droplets, Sparkles, Footprints, Layers } from 'lucide-react';
import { Product } from '@/types';

interface TechnicalSpecsProps {
  product: Product;
}

export const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ product }) => {
  const specs = [
    { label: 'Surface Material', value: product.material, highlight: false },
    { label: 'Finish & Texture', value: product.finish, highlight: false },
    { label: 'Nominal Dimensions', value: product.size, highlight: false },
    { label: 'Slab Thickness', value: `${product.thicknessMm} mm`, highlight: false },
    { label: 'Water Absorption (ISO 10545-3)', value: product.waterAbsorption, highlight: true },
    { label: 'MOHS Scratch Hardness', value: product.mohsHardness ? `MOHS ${product.mohsHardness}` : 'MOHS 7', highlight: false },
    { label: 'PEI Abrasion Rating', value: product.peiRating ? `PEI Group ${product.peiRating}` : 'PEI 4 (Heavy Traffic)', highlight: false },
    { label: 'Slip Resistance Class', value: product.slipRating || 'R10 Certified', highlight: true },
    { label: 'Frost & Thermal Shock Resistance', value: product.frostResistant ? 'Impervious (100% Frost Proof)' : 'Standard', highlight: false },
    { label: 'Box Packaging Coverage', value: `${product.boxCoverageSqFt} sq.ft (${product.tilesPerBox} pcs / box)`, highlight: false },
    { label: 'Recommended Joint Width', value: '1.0 mm (Laser Calibrated Rectified)', highlight: false },
    { label: 'Recommended Grout Shade', value: product.recommendedGrout, highlight: true },
    { label: 'Origin & Heritage', value: product.origin, highlight: false },
    { label: 'Stock Status & Dispatch', value: `${product.stockStatus} (${product.leadTime})`, highlight: false },
  ];

  return (
    <div className="bg-[#141418] border border-[#272732] rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif-luxury text-lg text-white tracking-wide">
            Architectural & ISO Technical Specifications
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#8C887E] uppercase">SKU: {product.sku}</span>
      </div>

      <div className="divide-y divide-white/5">
        {specs.map((s, idx) => (
          <div
            key={s.label}
            className={`py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs ${
              idx % 2 === 0 ? 'bg-white/[0.01]' : ''
            }`}
          >
            <span className="text-[#8E8A81]">{s.label}</span>
            <span className={`font-mono ${s.highlight ? 'text-[#C5A880] font-semibold' : 'text-white'}`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

