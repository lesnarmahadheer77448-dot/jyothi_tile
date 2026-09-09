'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, MapPin, Calendar } from 'lucide-react';
import { projectsData } from '@/data/projects';

export default function InspirationPage() {
  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">ARCHITECTURAL STORIES</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Design Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9A90] font-light leading-relaxed">
            Realized architectural projects where Vault large-format sintered porcelain and natural granites defined the spatial character.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projectsData.map((project) => (
            <Link
              key={project.id}
              href={`/inspiration/${project.slug}`}
              className="group rounded-3xl overflow-hidden border border-[#242432] bg-[#121217] flex flex-col shadow-2xl transition-all hover:border-[#C5A880]/50"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                />
                <span className="absolute top-4 left-4 text-[10px] font-mono text-[#C5A880] uppercase bg-black/70 px-3 py-1 rounded-full border border-white/10">
                  {project.category}
                </span>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#8C887E]">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> {project.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C5A880]" /> {project.year}</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-white group-hover:text-[#C5A880] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#A8A49A] font-light leading-relaxed line-clamp-2">
                    {project.brief}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#C5A880] uppercase">
                  <span>Read Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

