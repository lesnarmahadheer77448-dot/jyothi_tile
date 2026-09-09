'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, ZoomIn, ZoomOut, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { GraniteSlab } from '@/types';

interface SlabZoomViewerProps {
  granite: GraniteSlab;
}

export const SlabZoomViewer: React.FC<SlabZoomViewerProps> = ({ granite }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeView, setActiveView] = useState<'full-slab' | 'macro-vein' | 'installed'>('full-slab');

  const getImage = () => {
    if (activeView === 'macro-vein') return granite.textureMacroImage;
    if (activeView === 'installed') return granite.installedRoomImage;
    return granite.fullSlabImage;
  };

  return (
    <div className="space-y-4">
      {/* Main Canvas */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-[#2B2B36] shadow-2xl group">
        <div
          className="relative w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <Image
            src={getImage()}
            alt={granite.name}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* View Switchers on top left */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <button
            onClick={() => setActiveView('full-slab')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono backdrop-blur-md border transition-colors ${
              activeView === 'full-slab'
                ? 'bg-[#C5A880] text-black font-bold border-[#C5A880]'
                : 'bg-black/70 text-[#E5D2B8] border-white/10 hover:text-white'
            }`}
          >
            Full Slab (320 × 195 cm)
          </button>
          <button
            onClick={() => setActiveView('macro-vein')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono backdrop-blur-md border transition-colors ${
              activeView === 'macro-vein'
                ? 'bg-[#C5A880] text-black font-bold border-[#C5A880]'
                : 'bg-black/70 text-[#E5D2B8] border-white/10 hover:text-white'
            }`}
          >
            Macro Texture Zoom
          </button>
          <button
            onClick={() => setActiveView('installed')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono backdrop-blur-md border transition-colors ${
              activeView === 'installed'
                ? 'bg-[#C5A880] text-black font-bold border-[#C5A880]'
                : 'bg-black/70 text-[#E5D2B8] border-white/10 hover:text-white'
            }`}
          >
            Installed Waterfall Island
          </button>
        </div>

        {/* Zoom Controls on top right */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.0))}
            className="p-1.5 text-[#C5A880] hover:text-white rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-[#D8D4CA] px-1">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1.0))}
            className="p-1.5 text-[#C5A880] hover:text-white rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Batch info bottom badge */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#E0DCD3] bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
          <span>Dimensions: {granite.slabDimensions}</span>
          <span className="text-[#C5A880]">{granite.currentBatchBlocks[0]}</span>
        </div>
      </div>
    </div>
  );
};

