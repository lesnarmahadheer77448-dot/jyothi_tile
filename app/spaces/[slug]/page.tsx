'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { lookbooksData } from '@/data/lookbooks';
import { ProductCard } from '@/components/products/ProductCard';

interface SpaceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function SpaceDetailPage({ params }: SpaceDetailPageProps) {
  const { slug } = use(params);
  const { spaces, products } = useAdminData();

  const space = spaces.find((s) => s.slug === slug);

  if (!space) {
    notFound();
  }

  // Filter products suitable for this space
  const suitableProducts = products.filter((p) =>
    p.suitableSpaces?.includes(slug as any)
  );

  const spaceLookbook = lookbooksData.find((l) => l.spaceType === (slug as any) || l.slug === slug) || lookbooksData[0];

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      {/* Space Hero Banner */}
      <div className="relative h-[480px] w-full bg-black mb-16 overflow-hidden">
        <Image
          src={space.heroImage}
          alt={space.name}
          fill
          priority
          className="object-cover brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="inline-flex items-center gap-2 text-[#C5A880] mb-2">
            <Compass className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">SPACE SPECIFIER GUIDE</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-wide">
            {space.name}
          </h1>
          <p className="text-sm sm:text-base text-[#D4D0C5] max-w-2xl font-light mt-2">
            {space.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Architectural Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#121217] border border-[#242430] rounded-3xl p-8 sm:p-12">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest block">
              MATERIAL CRITERIA & FINISH ADVICE
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white">
              Architectural Recommendations
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9A90] font-light leading-relaxed">
              When specifying surfaces for {space.name.toLowerCase()} environments, balancing tactile luxury with rigorous slip resistance and maintenance durability is paramount.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {space.recommendedFinishes.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1 bg-[#1A1A22] border border-[#2D2D3A] rounded-full text-xs font-mono text-[#C5A880]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 justify-center flex flex-col">
            <span className="text-[10px] font-mono text-[#8C887E] uppercase tracking-widest">
              SPECIFICATION CHECKLIST:
            </span>
            {(space.designTips || []).map((tip: string) => (
              <div key={tip} className="flex items-start gap-3 text-xs text-[#DDD9CF]">
                <div className="w-4 h-4 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Products for this space */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block">
                CURATED PORTFOLIO
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl text-white">
                Surfaces for {space.name} ({suitableProducts.length})
              </h2>
            </div>
            <Link
              href={`/products?space=${space.slug}`}
              className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 font-mono uppercase"
            >
              <span>Explore in Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suitableProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

