'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Gem } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { collectionsData as staticCollections } from '@/data/collections';

export const CuratedCollections: React.FC = () => {
  const { collections: adminCollections } = useAdminData();
  const collectionsData = adminCollections.length > 0 ? adminCollections : staticCollections;
  
  return (
    <section className="py-24 bg-[#0A0A0C] border-y border-[#1C1C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <Gem className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">CINEMATIC EDITIONS</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Curated Master Collections
          </h2>
          <p className="text-sm text-[#918D84] font-sans-luxury">
            Instead of ordinary product catalogs, we organize our repertoire into cohesive architectural stories designed to harmonize across entire estates.
          </p>
        </div>

        {/* Collections Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collectionsData.map((col, idx) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative h-[440px] sm:h-[500px] rounded-2xl overflow-hidden border border-[#22222A] bg-[#121216] flex flex-col justify-between p-8 transition-all duration-700 hover:border-[#C5A880]/70"
            >
              {/* Background Image */}
              <Image
                src={col.heroImage}
                alt={col.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 brightness-60 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />

              {/* Top Tag & Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#C5A880] tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A880]/30">
                  VOL. 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#E8D6C0] bg-[#C5A880]/20 border border-[#C5A880]/40 px-2.5 py-1 rounded-full uppercase">
                  {col.editorialBadge}
                </span>
              </div>

              {/* Bottom Editorial Content */}
              <div className="relative z-10 space-y-3">
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white tracking-wide group-hover:text-[#C5A880] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C4C0B5] font-light max-w-lg leading-relaxed">
                  {col.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C5A880] uppercase">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

