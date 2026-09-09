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
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-[#1E1E24]">
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
            <div className="pt-2 flex items-center gap-3 text-xs text-[#A39F95]">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>ISO 9001:2015 Certified • 10-Year Surface Warranty</span>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-mono">Collections</h4>
            <ul className="space-y-2 text-xs text-[#A8A49B]">
              <li><Link href="/collections/the-marble-edit" className="hover:text-white transition-colors">The Marble Edit</Link></li>
              <li><Link href="/collections/the-stone-collection" className="hover:text-white transition-colors">The Stone & Concrete</Link></li>
              <li><Link href="/collections/the-monochrome-collection" className="hover:text-white transition-colors">The Monochrome Edit</Link></li>
              <li><Link href="/granite" className="hover:text-white transition-colors">Natural Granite Atelier</Link></li>
              <li><Link href="/products?finish=Carving+%26+Fluted" className="hover:text-white transition-colors">3D Fluted Carvings</Link></li>
              <li><Link href="/products?category=slabs" className="hover:text-white transition-colors">Large-Format Slabs (120×240)</Link></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-mono">Interactive</h4>
            <ul className="space-y-2 text-xs text-[#A8A49B]">
              <li><Link href="/shop-the-look" className="hover:text-white transition-colors">Shop The Look (Hotspots)</Link></li>
              <li><Link href="/design-your-space" className="hover:text-white transition-colors">Design Your Space Wizard</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Surfaces Matrix</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Moodboard & Wishlist</Link></li>
              <li><Link href="/inspiration" className="hover:text-white transition-colors">Architectural Stories</Link></li>
            </ul>
          </div>

          {/* Col 4: Showrooms Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-mono">Experience Centres</h4>
            <div className="space-y-3 text-xs text-[#8E8A80]">
              <div>
                <p className="text-white font-medium">Mumbai Flagship</p>
                <p>Senapati Bapat Marg, Lower Parel</p>
                <p className="text-[#C5A880]">+91 98200 12345</p>
              </div>
              <div>
                <p className="text-white font-medium">Bangalore Atelier</p>
                <p>100 Feet Road, Indiranagar</p>
                <p className="text-[#C5A880]">+91 98450 67890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737068]">
          <p>© {new Date().getFullYear()} Jyothi Tiles & Natural Stone Atelier. All architectural rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-[#C5A880] transition-colors">Admin Dashboard</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Specification</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

