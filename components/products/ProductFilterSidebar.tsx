'use client';

import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { SpaceType, TileFinish, MaterialType } from '@/types';

interface FilterState {
  spaces: string[];
  materials: string[];
  finishes: string[];
  colors: string[];
  sizes: string[];
  categories: string[];
  inStockOnly: boolean;
}

interface ProductFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalCount: number;
}

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  isOpenMobile,
  onCloseMobile,
  totalCount,
}) => {
  const spaceOptions = [
    { id: 'living-room', label: 'Living Room' },
    { id: 'bathroom', label: 'Bathroom & Spa' },
    { id: 'kitchen', label: 'Kitchen & Island' },
    { id: 'bedroom', label: 'Master Suite' },
    { id: 'outdoor', label: 'Terrace & Pool' },
    { id: 'commercial', label: 'Commercial & Lobby' },
  ];

  const categoryOptions = [
    { id: 'tiles', label: 'Vitrified Tiles' },
    { id: 'slabs', label: 'Sintered Stone Slabs' },
    { id: 'granite', label: 'Natural Granite Slabs' },
  ];

  const finishOptions: TileFinish[] = [
    'High Gloss / Polished',
    'Silk Matte',
    'Carving & Fluted',
    'Bookmatch',
    'Satin & Honed',
    'Anti-Skid / R11 Rustic',
  ];

  const sizeOptions = [
    '120 × 180 cm',
    '120 × 240 cm',
    '80 × 160 cm',
    '60 × 120 cm',
    '20 × 120 cm',
  ];

  const toggleArrayItem = (key: keyof FilterState, value: string) => {
    const current = (filters[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: updated });
  };

  const content = (
    <div className="space-y-8 text-xs font-sans-luxury">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="font-serif-luxury text-base text-white tracking-wider">FILTERS</h3>
          <p className="text-[11px] text-[#8C887E]">{totalCount} Surfaces Found</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-[#C5A880] hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Surface Category */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">SURFACE CATEGORY</h4>
        <div className="space-y-2">
          {categoryOptions.map((cat) => {
            const isChecked = filters.categories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center gap-2.5 text-[#DDD9CF] hover:text-white cursor-pointer select-none"
              >
                <div
                  onClick={() => toggleArrayItem('categories', cat.id)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[#C5A880] border-[#C5A880] text-black font-bold'
                      : 'border-[#383842] bg-[#16161B]'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleArrayItem('categories', cat.id)}>{cat.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Architectural Space */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">SPACE APPLICATION</h4>
        <div className="space-y-2">
          {spaceOptions.map((sp) => {
            const isChecked = filters.spaces.includes(sp.id);
            return (
              <label
                key={sp.id}
                className="flex items-center gap-2.5 text-[#DDD9CF] hover:text-white cursor-pointer select-none"
              >
                <div
                  onClick={() => toggleArrayItem('spaces', sp.id)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[#C5A880] border-[#C5A880] text-black font-bold'
                      : 'border-[#383842] bg-[#16161B]'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleArrayItem('spaces', sp.id)}>{sp.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Surface Finish */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">SURFACE FINISH</h4>
        <div className="space-y-2">
          {finishOptions.map((fin) => {
            const isChecked = filters.finishes.includes(fin);
            return (
              <label
                key={fin}
                className="flex items-center gap-2.5 text-[#DDD9CF] hover:text-white cursor-pointer select-none"
              >
                <div
                  onClick={() => toggleArrayItem('finishes', fin)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[#C5A880] border-[#C5A880] text-black font-bold'
                      : 'border-[#383842] bg-[#16161B]'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleArrayItem('finishes', fin)}>{fin}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">DIMENSIONS</h4>
        <div className="space-y-2">
          {sizeOptions.map((sz) => {
            const isChecked = filters.sizes.includes(sz);
            return (
              <label
                key={sz}
                className="flex items-center gap-2.5 text-[#DDD9CF] hover:text-white cursor-pointer select-none"
              >
                <div
                  onClick={() => toggleArrayItem('sizes', sz)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[#C5A880] border-[#C5A880] text-black font-bold'
                      : 'border-[#383842] bg-[#16161B]'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleArrayItem('sizes', sz)} className="font-mono">{sz}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Stock toggle */}
      <div className="pt-4 border-t border-white/10">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-[#E0DCD3]">Show In-Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 accent-[#C5A880] cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 bg-[#121216]/80 border border-[#262630] rounded-2xl p-6 h-fit sticky top-28 backdrop-blur-xl">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-xs bg-[#121216] border-l border-[#262630] h-full p-6 overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={onCloseMobile}
                className="p-2 text-[#9E9A90] hover:text-white bg-white/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

