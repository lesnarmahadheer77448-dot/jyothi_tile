'use client';

import React from 'react';
import Link from 'next/link';
import { X, ArrowRight, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';
import { useAuth } from '@/context/AuthContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string; badge?: string }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, navLinks }) => {
  const { openQuoteModal } = useQuote();
  const { currentUser, logoutCustomer, openAuthModal } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0C0C0E]/98 backdrop-blur-2xl xl:hidden flex flex-col p-6 overflow-y-auto animate-fade-in-scale">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded border border-[#C5A880]/60 flex items-center justify-center bg-black/40">
            <span className="font-serif-luxury text-[#C5A880] text-xs font-semibold">J</span>
          </div>
          <span className="font-serif-luxury text-lg tracking-[0.2em] text-[#F8F6F0]">
            JYOTHI TILES
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-[#A09D95] hover:text-white rounded-full bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Links */}
      <nav className="py-8 flex flex-col space-y-5">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClose}
            className="flex items-center justify-between text-base tracking-[0.2em] font-serif-luxury uppercase text-[#E5E1D8] hover:text-[#C5A880] transition-colors py-1"
          >
            <div className="flex items-center gap-2">
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-1.5 py-0.5 text-[8px] bg-[#C5A880]/20 text-[#C5A880] rounded border border-[#C5A880]/40 font-mono">
                  {link.badge}
                </span>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-[#66635C]" />
          </Link>
        ))}
      </nav>

      {/* Direct Contact & Quick CTAs */}
      <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
        {currentUser ? (
          <div className="p-3 bg-[#181822] border border-[#2B2B38] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-white">{currentUser.name}</p>
              <p className="text-[10px] text-[#C5A880] font-mono uppercase">{currentUser.role}</p>
            </div>
            <button
              onClick={() => logoutCustomer()}
              className="text-xs text-red-400 font-mono"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                openAuthModal('login');
              }}
              className="py-2.5 bg-[#181822] border border-[#2B2B38] text-white text-xs font-mono rounded-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onClose();
                openAuthModal('signup');
              }}
              className="py-2.5 bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] text-xs font-mono rounded-lg"
            >
              Create Account
            </button>
          </div>
        )}

        <button
          onClick={() => {
            onClose();
            openQuoteModal();
          }}
          className="w-full py-3.5 bg-[#C5A880] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-lg flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Request Instant Quotation
        </button>

        <a
          href="https://wa.me/919626547707?text=Hello%20Jyothi%20Tiles%20Atelier,%20I%20am%20exploring%20your%20digital%20showroom%20and%20need%20assistance."
          target="_blank"
          rel="noreferrer"
          className="w-full py-3 bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] font-medium text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-[#25D366]" />
          WhatsApp Specialist
        </a>
      </div>
    </div>
  );
};

