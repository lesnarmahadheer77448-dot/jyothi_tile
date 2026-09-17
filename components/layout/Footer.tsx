'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  FileText,
  Sparkles
} from 'lucide-react';
import { showroomsData } from '@/data/showrooms';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0C] text-[#E5E1D8] border-t border-[#1F1F24] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* 4-Column Directory Grid */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 border-b border-[#1E1E24]">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded border border-[#C5A880]/60 flex items-center justify-center bg-black/40">
                <span className="font-serif-luxury text-[#C5A880] text-xs font-semibold">J</span>
              </div>
              <span className="font-serif-luxury text-lg tracking-[0.2em] text-[#F8F6F0]">
                JYOTHI TILES
              </span>
            </div>
            <p className="text-xs text-[#8E8B83] leading-relaxed max-w-sm">
              The premier destination for interior designers, architects, and discerning homeowners seeking large-format vitrified porcelain, sintered stone slabs, and exotic natural granite.
            </p>
          </div>



          {/* Col 4: Showrooms Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-mono">Experience Centres</h4>
            <div className="space-y-3 text-xs text-[#8E8A80]">
              <div>
                <p className="text-white font-medium">Jyothi Tiles Flagship Gallery</p>
                <p>T.S. No: 2195/2B, West 4th Street<br/>Pudukkottai, Tamil Nadu 622001</p>
                <p className="text-[#C5A880] pt-1">+91 96265 47707</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 text-center sm:text-left text-[10px] text-[#636058] max-w-4xl leading-relaxed">
          <strong>Legal Disclaimer:</strong> All product images, website graphics, and showroom photographs displayed on this digital platform are for representational and aesthetic purposes only. Because natural stone (including granite and marble) and vitrified porcelain are subject to natural and manufacturing variations, the actual physical shades, veining, patterns, and textures of the materials may differ slightly from these digital renderings. We highly recommend verifying the material in our physical experience centres or requesting a physical sample prior to final specification and purchase.
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] text-[#737068] text-center sm:text-left">
          <p>© {new Date().getFullYear()} Jyothi Tiles & Natural Stone Atelier. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end space-x-4 sm:space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Specification</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

