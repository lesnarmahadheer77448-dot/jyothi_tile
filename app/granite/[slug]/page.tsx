'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Heart, 
  Layers, 
  MessageSquare, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Maximize2, 
  ArrowRight,
  Droplets,
  Scale
} from 'lucide-react';
import { graniteData } from '@/data/granite';
import { SlabZoomViewer } from '@/components/granite/SlabZoomViewer';
import { ProductCard } from '@/components/products/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useQuote } from '@/context/QuoteContext';
import { useAdminData } from '@/context/AdminDataContext';

interface GraniteDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function GraniteDetailPage({ params }: GraniteDetailPageProps) {
  const { slug } = use(params);
  const { products, addWhatsAppEnquiry } = useAdminData();

  const granite = products.find((g) => g.slug === slug && g.category === 'granite');

  if (!granite) {
    notFound();
  }

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const { openQuoteModal } = useQuote();

  const isSaved = isInWishlist(granite.id);
  const isCompared = isInCompare(granite.id);

  const handleWhatsAppEnquiry = () => {
    // Record the enquiry in the admin dashboard
    addWhatsAppEnquiry({
      productId: granite.id,
      productName: granite.name,
      productSku: granite.sku,
      productImage: granite.mainImage,
      source: 'granite_page'
    });

    const message = `Hello Jyothi Tiles Atelier,%0A%0AI am inspecting the *${encodeURIComponent(
      granite.name
    )}* Natural Granite Slab (SKU: ${granite.sku}, Origin: ${encodeURIComponent(
      granite.origin || ''
    )}) on your digital showroom:%0A${encodeURIComponent(window.location.href)}%0A%0APlease check current block slab inventory, slab thickness options, and provide a quotation.`;
    window.open(`https://wa.me/919626547707?text=${message}`, '_blank');
  };

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8C887E] mb-8">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/granite" className="hover:text-white transition-colors">GRANITE ATELIER</Link>
          <span>/</span>
          <span className="text-[#C5A880] truncate">{granite.name.toUpperCase()}</span>
        </div>

        {/* 70/30 Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Full-Slab Zoom Viewer & Geology (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Slab Viewer */}
            <SlabZoomViewer granite={granite as any} />

            {/* Geological Origin & Narrative */}
            <div className="bg-[#121217] border border-[#262632] rounded-2xl p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                GEOLOGICAL PROFILE & CHARACTER
              </span>
              <h3 className="font-serif-luxury text-2xl text-white font-light">
                {granite.editorialQuote || (granite as any).editorialNotes}
              </h3>
              <p className="text-xs sm:text-sm text-[#A09C92] font-light leading-relaxed">
                {granite.description}
              </p>
            </div>

            {/* Technical Strength Table */}
            <div className="bg-[#121217] border border-[#262632] rounded-2xl p-6 space-y-4">
              <h4 className="font-serif-luxury text-base text-white border-b border-white/10 pb-3">
                Material Engineering & Quarry Characteristics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-[#181820] rounded-lg border border-[#242430]">
                  <span className="text-[#88857C] block text-[10px] uppercase font-mono">Quarry Provenance</span>
                  <span className="text-white font-medium">{granite.quarryLocation}</span>
                </div>
                <div className="p-3 bg-[#181820] rounded-lg border border-[#242430]">
                  <span className="text-[#88857C] block text-[10px] uppercase font-mono">Compressive Strength</span>
                  <span className="text-[#C5A880] font-mono font-medium">{(granite as any).compressiveStrength || 'N/A'}</span>
                </div>
                <div className="p-3 bg-[#181820] rounded-lg border border-[#242430]">
                  <span className="text-[#88857C] block text-[10px] uppercase font-mono">Specific Density</span>
                  <span className="text-white font-mono font-medium">{(granite as any).density || '2750 kg/m³'}</span>
                </div>
                <div className="p-3 bg-[#181820] rounded-lg border border-[#242430]">
                  <span className="text-[#88857C] block text-[10px] uppercase font-mono">Thermal Threshold</span>
                  <span className="text-white font-mono font-medium">{(granite as any).heatResistance || 'Up to 350°C'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Slab Info & Quotation Actions (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="bg-[#121217] border border-[#262632] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8C887E] mb-2 uppercase">
                  <span>{granite.origin}</span>
                  <span>SKU: {granite.sku}</span>
                </div>
                <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium">
                  {granite.name}
                </h1>
                <p className="text-xs text-[#9E9A90] mt-1 font-mono">
                  {granite.slabDimensions} • Natural Granite
                </p>
              </div>

              {/* Price Band */}
              <div className="p-4 bg-[#181820] border border-[#262632] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#7D7A73] block">Quarry Tier Band</span>
                  <span className="text-lg font-serif-luxury text-[#E5D2B8] font-semibold">{granite.priceBand}</span>
                </div>
                <span className="text-[10px] font-mono bg-[#C5A880]/20 text-[#C5A880] px-2.5 py-1 rounded border border-[#C5A880]/40">
                  {granite.currentBatchBlocks?.[0]?.split('(')[0] || 'Block A'}
                </span>
              </div>

              {/* Finishes Available */}
              <div>
                <span className="text-[10px] font-mono uppercase text-[#88857C] tracking-wider block mb-2">
                  Available Slab Finishes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {granite.finishesAvailable?.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1 bg-[#181820] border border-[#272734] rounded-lg text-xs font-mono text-[#DDD9CF]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => openQuoteModal(granite as any)}
                  className="w-full py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-xl shadow-[#C5A880]/20 transition-all duration-200"
                >
                  Request Slab Lot Quotation
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-3.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-[#25D366]" />
                  <span>Enquire Block Availability via WhatsApp</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => toggleWishlist(granite as any)}
                  className={`p-3 rounded-lg border text-center text-xs font-mono flex items-center justify-center gap-1.5 transition-colors ${
                    isSaved
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : 'bg-[#181820] hover:bg-[#20202A] border-[#292938] text-[#DCD8CF]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'In Moodboard' : 'Save Slab'}</span>
                </button>

                <button
                  onClick={() => (isCompared ? removeFromCompare(granite.id) : addToCompare(granite as any))}
                  className={`p-3 rounded-lg border text-center text-xs font-mono flex items-center justify-center gap-1.5 transition-colors ${
                    isCompared
                      ? 'bg-[#C5A880]/20 text-[#C5A880] border-[#C5A880]/50'
                      : 'bg-[#181820] hover:bg-[#20202A] border-[#292938] text-[#DCD8CF]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

