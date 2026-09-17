'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Image as ImageIcon } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';

export const SpaceExplorer: React.FC = () => {
  const { spaces } = useAdminData();
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#C5A880] mb-2">
            <Compass className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">ARCHITECTURAL SPACES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Discover Your Space
          </h2>
        </div>
        <p className="text-sm text-[#938F86] max-w-md">
          Explore curated surfaces tailored to room-specific lighting conditions, foot traffic, moisture levels, and scale.
        </p>
      </div>

      {/* Grid of 4 Primary Space Master Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {spaces.slice(0, 4).map((space, idx) => (
          <Link
            key={space.id}
            href={`/spaces/${space.slug}`}
            className="group relative h-[460px] rounded-2xl overflow-hidden border border-[#24242C] bg-[#121216] flex flex-col justify-end p-6 transition-all duration-500 hover:border-[#C5A880]/60 hover:shadow-2xl hover:shadow-[#C5A880]/10"
          >
            {/* Background Image with Zoom */}
            {space.heroImage ? (
              <Image
                src={space.heroImage}
                alt={space.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-90"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#55524B] bg-[#0C0C10] group-hover:bg-[#121216] transition-colors">
                <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-50">Image Pending</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

            {/* Index number badge */}
            <span className="absolute top-6 left-6 text-xs font-mono text-[#C5A880] tracking-widest bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-[#C5A880]/30">
              0{idx + 1}
            </span>

            {/* Card Content */}
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                {space.recommendedSizes[0]}
              </span>
              <h3 className="font-serif-luxury text-2xl text-white tracking-wide group-hover:text-[#C5A880] transition-colors">
                {space.name}
              </h3>
              <p className="text-xs text-[#B5B1A8] line-clamp-2 font-sans-luxury">
                {space.tagline}
              </p>

              <div className="pt-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-[#EAE6DE] group-hover:text-[#C5A880] transition-colors uppercase">
                <span>Explore Surfaces</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

