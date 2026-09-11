'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Search, 
  MessageSquare, 
  Heart, 
  Layers, 
  Menu, 
  X, 
  Compass, 
  ChevronDown,
  ChevronLeft,
  Sparkles,
  User
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useQuote } from '@/context/QuoteContext';
import { useAuth } from '@/context/AuthContext';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logoutCustomer, openAuthModal } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const { wishlist } = useWishlist();
  const { compareItems, setIsDrawerOpen } = useCompare();
  const { openQuoteModal } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; href: string; hasMega: boolean; id?: string; badge?: string }[] = [
    { name: 'SPACES', href: '/products', hasMega: true, id: 'spaces' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0E0E11]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left section: Back Button & Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              {pathname !== '/' && (
                <button
                  onClick={() => router.back()}
                  className="xl:hidden p-1.5 sm:p-2 -ml-2 text-white hover:text-[#C5A880] transition-colors"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-[#C5A880]/60 flex items-center justify-center bg-black/40 group-hover:border-[#C5A880] transition-colors">
                  <span className="font-serif-luxury text-[#C5A880] text-xs sm:text-sm font-semibold tracking-tighter">J</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-luxury text-base sm:text-xl tracking-[0.2em] text-[#F8F6F0] font-light leading-none group-hover:text-[#C5A880] transition-colors">
                    JYOTHI TILES
                  </span>
                  <span className="text-[7px] sm:text-[9px] tracking-[0.3em] text-[#A09D95] uppercase font-sans-luxury mt-0.5 whitespace-nowrap">
                    LUXURY DIGITAL SHOWROOM
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => link.hasMega && setActiveMegaMenu(link.id || null)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <Link
                      href={link.href}
                      className={`text-xs tracking-[0.18em] font-sans-luxury uppercase transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'text-[#C5A880] font-medium'
                          : 'text-[#DDD9D0] hover:text-[#C5A880]'
                      }`}
                    >
                      {link.name}
                      {link.badge && (
                        <span className="px-1.5 py-0.2 text-[8px] bg-[#C5A880]/20 text-[#C5A880] rounded border border-[#C5A880]/40 font-mono tracking-normal">
                          {link.badge}
                        </span>
                      )}
                      {link.hasMega && (
                        <ChevronDown className="w-3 h-3 text-[#7E7A73] transition-transform duration-200" />
                      )}
                    </Link>
                    {link.hasMega && activeMegaMenu === link.id && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                        <MegaMenu type={link.id as 'collections' | 'spaces'} onClose={() => setActiveMegaMenu(null)} />
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action Icons & Quote CTA */}
            <div className="flex items-center space-x-3 sm:space-x-4">


              {/* Compare Tray Trigger */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-[#DDD9D0] hover:text-[#C5A880] transition-colors"
                title="Compare Surfaces"
              >
                <Layers className="w-4 h-4" />
                {compareItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C5A880] text-black text-[9px] font-bold flex items-center justify-center">
                    {compareItems.length}
                  </span>
                )}
              </button>

              {/* Wishlist Moodboard */}
              <Link
                href="/wishlist"
                className="relative p-2 text-[#DDD9D0] hover:text-[#C5A880] transition-colors"
                title="My Saved Surfaces"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C5A880] text-black text-[9px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* WhatsApp Quick Connect */}
              <a
                href="https://wa.me/919626547707?text=Hello%20Jyothi%20Tiles%20Atelier,%20I%20am%20exploring%20your%20digital%20showroom%20and%20would%20like%20to%20speak%20with%20a%20stone%20specialist."
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors text-xs font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              {/* User Authentication Profile Button */}
              {currentUser ? (
                <div className="relative group">
                  <button
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#1A1A22] border border-[#C5A880]/40 hover:border-[#C5A880] transition-colors"
                    title="User Account"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center font-serif-luxury font-bold text-xs">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline text-xs font-medium text-white truncate max-w-[90px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#14141A] border border-[#2B2B3C] rounded-2xl shadow-2xl p-3 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all space-y-2">
                    <div className="p-2 border-b border-white/5">
                      <p className="text-xs font-medium text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-[#C5A880] font-mono uppercase">{currentUser.role}</p>
                    </div>
                    <Link
                      href="/wishlist"
                      className="block px-2.5 py-1.5 text-xs text-[#DDD8CE] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      My Saved Moodboard ({wishlist.length})
                    </Link>
                    <Link
                      href="/quote"
                      className="block px-2.5 py-1.5 text-xs text-[#DDD8CE] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      Bespoke Quote Scope
                    </Link>
                    <Link
                      href="/admin"
                      className="block px-2.5 py-1.5 text-xs text-[#C5A880] hover:bg-white/5 rounded-lg transition-colors font-mono"
                    >
                      Admin Suite Desk →
                    </Link>
                    <button
                      onClick={() => logoutCustomer()}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border-t border-white/5 mt-1"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-[#DDD8CE] hover:text-white border border-[#2B2B38] hover:border-[#C5A880] rounded-lg transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Admin Login</span>
                </Link>
              )}

              {/* Primary Get A Quote Button */}
              <button
                onClick={() => openQuoteModal()}
                className="px-4 py-2 bg-[#C5A880] hover:bg-[#D6BC97] text-black text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-200 shadow-md shadow-[#C5A880]/15"
              >
                GET A QUOTE
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 text-white hover:text-[#C5A880] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>


      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};

