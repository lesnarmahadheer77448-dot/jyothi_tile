'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { collectionsData } from '@/data/collections';

export default function CollectionsPage() {
  return (
    <div className="pt-28 pb-24 bg-[#0D0D0F] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <Layers className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">EDITORIAL CURATIONS</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Master Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9A90] font-light leading-relaxed">
            Our curated surface collections group vitrified porcelain tiles, sintered slabs, and natural granites into cohesive architectural palettes.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collectionsData.map((col) => {
            const colImg = col.coverImage || col.heroImage;
            const colName = col.name || col.title;
            const count = col.itemCount || col.productIds.length;
            return (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative h-[420px] rounded-3xl overflow-hidden border border-[#262634] p-8 sm:p-10 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-[#C5A880]/50"
              >
                <Image
                  src={colImg}
                  alt={colName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-60 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase bg-black/70 px-3 py-1 rounded-full border border-white/10">
                    {count} SURFACES
                  </span>
                </div>

                <div className="relative z-10 space-y-2">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white group-hover:text-[#C5A880] transition-colors">
                    {colName}
                  </h3>
                  <p className="text-xs text-[#DDD9CF] font-light line-clamp-2">
                    {col.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                    <span>Explore Collection Repertoire</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

