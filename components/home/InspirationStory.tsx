'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, MapPin, Calendar, Compass } from 'lucide-react';
import { projectsData } from '@/data/projects';

export const InspirationStory: React.FC = () => {
  const featuredProject = projectsData[0]; // The Palm Sanctuary Estate

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1C1C22]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#C5A880] mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">ARCHITECTURAL STORIES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Design Inspiration
          </h2>
        </div>
        <p className="text-sm text-[#938F86] max-w-md">
          Discover how leading architects employ Vault surfaces across prestigious private residences, luxury resorts, and high-contrast penthouses.
        </p>
      </div>

      {/* Hero Story Feature Card */}
      <div className="relative rounded-3xl overflow-hidden border border-[#262630] bg-[#111116] grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        {/* Left Visual Area (7 Cols) */}
        <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] lg:h-full overflow-hidden">
          <Image
            src={featuredProject.coverImage}
            alt={featuredProject.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          <span className="absolute top-6 left-6 text-xs font-mono text-[#C5A880] tracking-widest bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A880]/30 uppercase">
            CASE STUDY • {featuredProject.category}
          </span>
        </div>

        {/* Right Story Text (5 Cols) */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs font-mono text-[#8C887E]">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> {featuredProject.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C5A880]" /> {featuredProject.year}</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white">
              {featuredProject.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#B0ACA2] font-light leading-relaxed">
              {featuredProject.brief}
            </p>

            {/* Material Palette in this project */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] block mb-2">
                Specified Material Palette:
              </span>
              <div className="space-y-2">
                {featuredProject.materialPalette.map((mat) => (
                  <div
                    key={mat.materialName}
                    className="flex items-center gap-3 p-2 bg-[#181820] rounded-lg border border-[#242430]"
                  >
                    <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0 bg-black">
                      <Image src={mat.thumbnail} alt={mat.materialName} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-white truncate">{mat.materialName}</p>
                      <p className="text-[10px] text-[#8C887E] truncate">{mat.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <Link
              href={`/inspiration/${featuredProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors"
            >
              <span>Read Full Architectural Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/inspiration"
              className="text-xs text-[#8A8780] hover:underline"
            >
              All Projects ({projectsData.length})
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

