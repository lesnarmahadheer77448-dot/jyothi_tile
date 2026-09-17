'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, Heart, MessageSquare, X, ArrowRight, Sparkles } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useWishlist } from '@/context/WishlistContext';
import { usePathname } from 'next/navigation';

export const FloatingActionBar: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare, isDrawerOpen, setIsDrawerOpen } = useCompare();
  const { wishlist } = useWishlist();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {/* Floating Sticky Bottom Compare Drawer */}
      {isDrawerOpen && compareItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121216]/95 border-t border-[#2D2D35] backdrop-blur-2xl px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] animate-fade-in-scale">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C5A880]" />
                <span className="font-serif-luxury text-sm text-white tracking-wider">
                  SURFACE COMPARISON ({compareItems.length}/4)
                </span>
              </div>
              <button
                onClick={clearCompare}
                className="text-[11px] text-[#8C887E] hover:text-red-400 underline ml-auto sm:ml-2"
              >
                Clear All
              </button>
            </div>

            {/* Selected item chips */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
              {compareItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-[#1B1B22] border border-[#2B2B36] rounded-lg px-2.5 py-1.5 flex-shrink-0"
                >
                  <div className="relative w-7 h-7 rounded overflow-hidden bg-black">
                    <Image src={item.mainImage} alt={item.name} fill className="object-cover" />
                  </div>
                  <span className="text-xs text-[#ECE8DE] truncate max-w-[110px]">{item.name}</span>
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="text-[#6D6A62] hover:text-white p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Link
                href="/compare"
                className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4BA94] text-black text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>Compare Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-[#88857C] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Concierge Pill */}
      {!isAdmin && (
        <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
          <a
            href="https://wa.me/919626547707?text=Hello%20Jyothi%20Tiles,%20I%20am%20exploring%20your%20digital%20showroom%20and%20need%20assistance%20with%20material%20selection."
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 px-4 py-3 bg-[#111114]/90 hover:bg-[#111114] border border-[#25D366]/40 backdrop-blur-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-[10px] uppercase tracking-wider text-[#A09D95]">Surface Specialist</span>
              <span className="text-xs font-medium text-white group-hover:text-[#25D366] transition-colors">Direct WhatsApp</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30">
              <MessageSquare className="w-5 h-5 text-black fill-black" />
            </div>
          </a>
        </div>
      )}
    </>
  );
};

