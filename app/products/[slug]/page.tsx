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
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Check,
  Compass
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { ProductGallery } from '@/components/products/ProductGallery';
import { TechnicalSpecs } from '@/components/products/TechnicalSpecs';
import { TileCalculator } from '@/components/products/TileCalculator';
import { ProductCard } from '@/components/products/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useQuote } from '@/context/QuoteContext';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const { products } = useAdminData();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  if (product.category === 'granite') {
    if (typeof window !== 'undefined') {
      window.location.href = `/granite/${slug}`;
    }
    return null;
  }

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();
  const { openQuoteModal } = useQuote();

  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.collectionId === product.collectionId && p.category !== 'granite')
    .slice(0, 3);

  const matchingGranite = product.matchingGraniteSku
    ? products.find((g) => (g.id === product.matchingGraniteSku || g.sku === product.matchingGraniteSku) && g.category === 'granite')
    : null;

  const handleWhatsAppEnquiry = () => {
    const message = `Hello Jyothi Tiles Atelier,%0A%0AI am reviewing the *${encodeURIComponent(
      product.name
    )}* (SKU: ${product.sku}, Size: ${product.size}, Finish: ${encodeURIComponent(
      product.finish
    )}) on your digital showroom:%0A${encodeURIComponent(window.location.href)}%0A%0APlease provide availability, sample dispatch, and trade quotation.`;
    window.open(`https://wa.me/919626547707?text=${message}`, '_blank');
  };

  return (
    <div className="pt-28 pb-24 bg-[#0D0D0F] text-[#EFEBE4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8C887E] mb-8">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">COLLECTION</Link>
          <span>/</span>
          <Link href={`/collections/${product.collectionId}`} className="hover:text-white transition-colors">
            {product.collectionName.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-[#C5A880] truncate">{product.name.toUpperCase()}</span>
        </div>

        {/* 70/30 Master Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Gallery & In-Depth Specs (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Gallery */}
            <ProductGallery product={product} />

            {/* Editorial Narrative */}
            <div className="bg-[#141418] border border-[#272732] rounded-2xl p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                CURATORIAL NARRATIVE
              </span>
              <h3 className="font-serif-luxury text-2xl text-white font-light">
                {product.editorialQuote || 'Architectural Majesty Crafted For Legacy Interiors.'}
              </h3>
              <p className="text-xs sm:text-sm text-[#A8A49A] font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Technical ISO Specifications */}
            <TechnicalSpecs product={product} />
          </div>

          {/* Right Column: Pricing, Actions, Calculator & Shop The Look (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="bg-[#141418] border border-[#2B2B36] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8E8A81] mb-2 uppercase">
                  <span>{product.origin}</span>
                  <span>SKU: {product.sku}</span>
                </div>
                <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium">
                  {product.name}
                </h1>
                <p className="text-xs text-[#A09C92] mt-1 font-mono">
                  {product.material} • {product.size} • {product.finish}
                </p>
              </div>

              {/* Guide Price Box */}
              <div className="p-4 bg-[#1B1B22] border border-[#2B2B38] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#7D7A73] block">Architectural Guide Rate</span>
                  <span className="text-lg font-serif-luxury text-[#E5D2B8] font-semibold">{product.priceSqFtEstimate}</span>
                </div>
                <span className="text-[10px] font-mono bg-[#C5A880]/20 text-[#C5A880] px-2.5 py-1 rounded border border-[#C5A880]/40">
                  {product.stockStatus}
                </span>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => openQuoteModal(product)}
                  className="w-full py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-xl shadow-[#C5A880]/20 transition-all duration-200"
                >
                  Request Bespoke Quotation
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-3.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-[#25D366]" />
                  <span>Chat With Stone Specialist</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="pt-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-full p-3 rounded-lg border text-center text-xs font-mono flex items-center justify-center gap-1.5 transition-colors ${
                    isSaved
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : 'bg-[#1B1B22] hover:bg-[#23232C] border-[#2E2E3C] text-[#DCD8CF]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'In Moodboard' : 'Save Surface'}</span>
                </button>
              </div>

              <button
                onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product))}
                className={`w-full py-2.5 rounded-lg border text-xs font-mono flex items-center justify-center gap-2 transition-colors ${
                  isCompared
                    ? 'bg-[#C5A880]/20 text-[#C5A880] border-[#C5A880]/50'
                    : 'bg-transparent text-[#9E9A90] hover:text-white border-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isCompared ? 'Added to Surface Comparison Tray' : '+ Add to Comparison Matrix'}</span>
              </button>
            </div>

            {/* Area & Box Calculator */}
            <TileCalculator product={product} />

            {/* "Shop The Look" / Matching Material Recommendation */}
            {matchingGranite && (
              <div className="bg-[#141418] border border-[#272732] rounded-2xl p-6 space-y-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block">
                  RECOMMENDED PAIRING
                </span>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0">
                    <Image src={matchingGranite.mainImage} alt={matchingGranite.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-medium text-white truncate">{matchingGranite.name}</h5>
                    <p className="text-[11px] text-[#8C887E]">{matchingGranite.slabDimensions} • Natural Granite</p>
                    <Link
                      href={`/granite/${matchingGranite.slug}`}
                      className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 mt-1 font-mono uppercase"
                    >
                      <span>Inspect Slab</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Collection Surfaces */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">HARMONIOUS REPERTOIRE</span>
                <h3 className="font-serif-luxury text-2xl text-white">More From {product.collectionName}</h3>
              </div>
              <Link
                href={`/collections/${product.collectionId}`}
                className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View Full Collection</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel as any} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

