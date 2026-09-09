'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BookOpen, MapPin, Calendar, Compass, ArrowRight, Check } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { useQuote } from '@/context/QuoteContext';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = use(params);

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { openQuoteModal } = useQuote();

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[520px] w-full bg-black mb-16 overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center gap-4 text-xs font-mono text-[#C5A880] mb-3">
            <span className="bg-black/70 px-3 py-1 rounded-full border border-white/10">{project.category}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {project.location}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {project.year}</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-wide">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-[#D4D0C5] max-w-2xl font-light mt-2">
            Architect: <strong className="text-white">{project.architect}</strong>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Narrative & Material Palette (70/30) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-[#121217] border border-[#242430] rounded-3xl p-8 sm:p-12 space-y-6">
              <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest block">
                ARCHITECTURAL INTENT & BRIEF
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-light">
                {project.brief}
              </h2>
              <div className="text-xs sm:text-sm text-[#A8A49A] font-light leading-relaxed space-y-4">
                <p>
                  To realize this monumental vision, the architectural team sought monolithic surfaces that could withstand coastal humidity without compromising on the velvet tactile warmth of honed natural stone.
                </p>
                <p>
                  Continuous vein mapping across the double-height fireplace and the 4-meter kitchen cantilever required millimeter-precise dry-lay inspection before shipment.
                </p>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-6">
              <h3 className="font-serif-luxury text-2xl text-white">Project Installation Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-[#242430]">
                    <Image src={img} alt={`Project Detail ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Material Palette (5 cols) */}
          <div className="lg:col-span-5 bg-[#121217] border border-[#242430] rounded-3xl p-8 space-y-6 sticky top-28 shadow-2xl">
            <div>
              <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest block mb-1">
                SPECIFIED SURFACES
              </span>
              <h3 className="font-serif-luxury text-2xl text-white">Material Palette</h3>
            </div>

            <div className="space-y-3">
              {project.materialPalette.map((mat) => (
                <div
                  key={mat.materialName}
                  className="flex items-center gap-4 p-3 bg-[#181820] rounded-xl border border-[#262634]"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-black flex-shrink-0">
                    <Image src={mat.thumbnail} alt={mat.materialName} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-[#C5A880] uppercase block">{mat.role}</span>
                    <h5 className="text-xs font-medium text-white truncate">{mat.materialName}</h5>
                    <Link
                      href={`/products`}
                      className="text-[11px] text-[#C5A880] hover:underline inline-flex items-center gap-1 mt-1 font-mono uppercase"
                    >
                      <span>Inspect Surface</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => openQuoteModal()}
                className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-xl"
              >
                Inquire Project Specification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

