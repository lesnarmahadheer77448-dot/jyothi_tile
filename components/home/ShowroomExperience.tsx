'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, ArrowRight, ShieldCheck, Coffee, Car } from 'lucide-react';
import { showroomsData } from '@/data/showrooms';

export const ShowroomExperience: React.FC = () => {
  const showroom = showroomsData[0]; // Mumbai Flagship

  return (
    <section className="py-24 bg-[#09090C] border-t border-[#1C1C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#2B2B36] bg-[#111116] grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Left Visual Area (6 cols) */}
          <div className="lg:col-span-6 relative h-[360px] lg:h-auto overflow-hidden">
            <Image
              src={showroom.heroImage}
              alt={showroom.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase bg-black/70 px-2.5 py-1 rounded border border-[#C5A880]/40">
                FLAGSHIP EXPERIENCE CENTRE
              </span>
              <h3 className="font-serif-luxury text-2xl text-white mt-2 font-medium">
                {showroom.name}
              </h3>
            </div>
          </div>

          {/* Right Details & Booking (6 cols) */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[#C5A880]">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-mono">VISIT OUR SHOWROOM</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light tracking-wide">
                Experience 12,000+ Surfaces In Monumental Scale
              </h2>

              <p className="text-xs sm:text-sm text-[#A39F95] font-light leading-relaxed">
                Step beyond miniature tile samples. Walk through actual architectural room mockups, test high-intensity lighting rigs (3000K–6500K), and review full-slab Brazilian granites with a dedicated material consultant.
              </p>

              {/* Showroom Amenities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#E0DCD3]">
                  <Car className="w-4 h-4 text-[#C5A880]" />
                  <span>Complimentary Valet Parking</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#E0DCD3]">
                  <Coffee className="w-4 h-4 text-[#C5A880]" />
                  <span>Private Client Lounge & Bar</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#E0DCD3]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Full-Slab Gantry Inspection</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#E0DCD3]">
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Architect Specifier Library</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/showroom"
                className="px-7 py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#C5A880]/20"
              >
                <span>Book Private Viewing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://maps.app.goo.gl/N5tCYYmKaHVayzHx7"
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 bg-[#17171E] hover:bg-[#202028] border border-[#2B2B36] text-white text-xs font-medium tracking-widest uppercase rounded-sm flex items-center justify-center transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

