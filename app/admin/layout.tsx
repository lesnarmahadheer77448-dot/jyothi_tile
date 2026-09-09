'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  Tags, 
  Receipt, 
  TrendingUp, 
  MessageSquare, 
  Search, 
  Bell, 
  ExternalLink, 
  Menu, 
  X, 
  Plus, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { useAuth } from '@/context/AuthContext';
import AdminLoginPage from './login/page';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { products, invoices, collections, lowStockItems } = useAdminData();
  const { isAdminAuthenticated, logoutAdmin } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);



  // Keyboard shortcut (Ctrl+K or Cmd+K) for Deep Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Deep Search Query Matching
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return { products: [], invoices: [], collections: [] };

    const q = searchQuery.toLowerCase();
    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.batchLotNumber && p.batchLotNumber.toLowerCase().includes(q)) ||
        (p.warehouseBin && p.warehouseBin.toLowerCase().includes(q))
    ).slice(0, 5);

    const matchedInvoices = invoices.filter(
      (inv) =>
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.clientName.toLowerCase().includes(q) ||
        inv.clientPhone.includes(q) ||
        inv.projectType.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedCollections = collections.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.name && c.name.toLowerCase().includes(q))
    ).slice(0, 3);

    return { products: matchedProducts, invoices: matchedInvoices, collections: matchedCollections };
  }, [searchQuery, products, invoices, collections]);

  const navItems = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Product Catalog', href: '/admin/products', icon: Package, badge: products.length },
    { name: 'Stock & Warehouse', href: '/admin/stock', icon: Boxes, alert: lowStockItems.length > 0 ? lowStockItems.length : undefined },
    { name: 'Categories & Edit', href: '/admin/categories', icon: Tags, badge: collections.length },
    { name: 'Space Images', href: '/admin/spaces', icon: Sparkles },
    { name: 'Billing & POS Invoices', href: '/admin/billing', icon: Receipt, badge: invoices.length },
    { name: 'Sales & Analytics', href: '/admin/sales', icon: TrendingUp },
    { name: 'Enquiries & CRM', href: '/admin/enquiries', icon: MessageSquare },
  ];

  // If on admin login page, render page directly
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not authenticated as Admin, show login gate
  if (!isAdminAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#09090C] text-[#EDE9E1] flex flex-col pt-16">
      {/* Universal Top Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0E0E12]/95 border-b border-[#242430] backdrop-blur-xl h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#16161D] text-[#8C887E] hover:text-white border border-[#242430]"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded border border-[#C5A880]/60 flex items-center justify-center bg-black/60 group-hover:border-[#C5A880] transition-colors">
              <span className="font-serif-luxury text-[#C5A880] text-sm font-semibold">J</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-base tracking-[0.2em] text-[#F8F6F0] font-light leading-none">
                JYOTHI TILES
              </span>
              <span className="text-[8px] tracking-[0.3em] text-[#C5A880] uppercase font-mono mt-0.5">
                ENTERPRISE ATELIER SUITE
              </span>
            </div>
          </Link>
        </div>

        {/* Global Deep Search Input */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 bg-[#14141A] border border-[#262634] hover:border-[#C5A880]/50 rounded-xl text-xs text-[#8E8A80] transition-all shadow-inner group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Deep Search products, SKUs, invoices, lots...</span>
            </div>
            <kbd className="px-2 py-0.5 bg-[#1E1E28] border border-[#323242] rounded text-[10px] font-mono text-[#DDD8CE]">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right Header Utilities */}
        <div className="flex items-center gap-3">
          {/* Quick Deep Search Button on Mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-[#8C887E] hover:text-white bg-[#14141A] rounded-lg border border-[#242430]"
          >
            <Search className="w-4 h-4 text-[#C5A880]" />
          </button>

          {/* Low Stock Alert Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-lg bg-[#14141A] text-[#8C887E] hover:text-white border border-[#242430] transition-colors"
              title="Inventory & System Alerts"
            >
              <Bell className="w-4 h-4" />
              {lowStockItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[9px] font-mono font-bold rounded-full flex items-center justify-center animate-pulse">
                  {lowStockItems.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#14141A] border border-[#262634] rounded-2xl shadow-2xl p-4 z-50 animate-fade-in-scale space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-serif-luxury text-sm text-white">Inventory Health</span>
                  <span className="text-[10px] font-mono text-amber-400">{lowStockItems.length} Low Stock</span>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {lowStockItems.length > 0 ? (
                    lowStockItems.map((item) => (
                      <Link
                        key={item.id}
                        href="/admin/stock"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="p-2.5 bg-[#1B1B24] rounded-xl flex items-center justify-between text-xs hover:bg-[#232330] transition-colors block"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-white truncate font-medium">{item.name}</p>
                          <p className="text-[10px] text-[#8E8A80] font-mono">
                            Bin: {item.warehouseBin || 'Yard'} • Lot: {item.batchLotNumber || 'LOT-1'}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-amber-400 whitespace-nowrap bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {item.stockQuantityBoxes !== undefined ? `${item.stockQuantityBoxes} bxs` : `${item.stockQuantitySlabs} slbs`}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-[#8E8A80] text-center py-4">All surfaces meet healthy stock levels.</p>
                  )}
                </div>

                <Link
                  href="/admin/stock"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="block text-center text-xs text-[#C5A880] hover:underline font-mono uppercase pt-1"
                >
                  Manage Warehouse Stock →
                </Link>
              </div>
            )}
          </div>

          {/* Live Showroom Link */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#181820] hover:bg-[#20202C] border border-[#2B2B38] text-[#DDD8CE] text-xs font-mono rounded-lg transition-colors"
          >
            <span>Live Showroom</span>
            <ExternalLink className="w-3 h-3 text-[#C5A880]" />
          </Link>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:sticky top-16 left-0 bottom-0 z-30 w-64 bg-[#0C0C10] border-r border-[#20202C] p-4 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-6">
            <div className="px-3 pt-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#7A776F] block">
                MAIN NAVIGATION
              </span>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-sans-luxury tracking-wide transition-all ${
                      isActive
                        ? 'bg-[#C5A880] text-black font-semibold shadow-lg shadow-[#C5A880]/15'
                        : 'text-[#BBB7AC] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#C5A880]'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-black/20 text-black' : 'bg-[#191922] text-[#A09D94] border border-[#2B2B38]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.alert !== undefined && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        {item.alert} low
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer User Badge & Sign Out */}
          <div className="pt-4 border-t border-[#1C1C26] space-y-3">
            <div className="p-3 bg-[#121217] rounded-xl border border-[#222230] flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] font-serif-luxury font-bold text-xs flex-shrink-0">
                  JT
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white font-medium truncate">Atelier Manager</p>
                  <p className="text-[10px] text-[#25D366] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    Terminal Live
                  </p>
                </div>
              </div>
              <button
                onClick={() => logoutAdmin()}
                className="text-[10px] font-mono text-[#8E8A80] hover:text-red-400 p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                title="Sign Out of Admin"
              >
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-[#09090C] overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Universal Deep Search Modal (Ctrl + K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md animate-fade-in-scale">
          <div className="relative w-full max-w-2xl bg-[#121218] border border-[#2B2B3C] text-[#F5F3EF] shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh]">
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#242434] bg-[#161620]">
              <Search className="w-4 h-4 text-[#C5A880] mr-3 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search surfaces, SKUs, invoices, clients, lot batches, bins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-[#78756D] focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-[#88857C] hover:text-white rounded-lg bg-white/5 text-xs font-mono"
              >
                ESC
              </button>
            </div>

            {/* Live Search Results */}
            <div className="p-4 overflow-y-auto space-y-6 flex-1 text-xs">
              {searchQuery.trim() ? (
                <>
                  {/* Products Section */}
                  {searchResults.products.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-wider block">
                        Surfaces & Granite Catalog ({searchResults.products.length})
                      </span>
                      <div className="space-y-1.5">
                        {searchResults.products.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              router.push('/admin/products');
                            }}
                            className="p-2.5 bg-[#181822] hover:bg-[#20202E] rounded-xl border border-white/5 flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-black flex-shrink-0">
                                <Image src={prod.mainImage} alt={prod.name} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="text-white font-medium">{prod.name}</p>
                                <p className="text-[10px] text-[#8C887E] font-mono">
                                  SKU: {prod.sku} • Bin: {prod.warehouseBin || 'Yard'} • Lot: {prod.batchLotNumber || 'N/A'}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono text-[#C5A880]">
                              {'priceSqFtEstimate' in prod ? prod.priceSqFtEstimate : prod.priceBand}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Invoices Section */}
                  {searchResults.invoices.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-wider block">
                        Invoices & Billing POS ({searchResults.invoices.length})
                      </span>
                      <div className="space-y-1.5">
                        {searchResults.invoices.map((inv) => (
                          <div
                            key={inv.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              router.push('/admin/billing');
                            }}
                            className="p-2.5 bg-[#181822] hover:bg-[#20202E] rounded-xl border border-white/5 flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <div>
                              <p className="text-white font-medium">{inv.invoiceNumber} — {inv.clientName}</p>
                              <p className="text-[10px] text-[#8C887E] font-mono">
                                Project: {inv.projectType} • Phone: {inv.clientPhone}
                              </p>
                            </div>
                            <div className="text-right font-mono">
                              <span className="text-white font-semibold">₹{inv.grandTotal.toLocaleString()}</span>
                              <span className="block text-[9px] text-[#C5A880] uppercase">{inv.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collections Section */}
                  {searchResults.collections.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-wider block">
                        Master Collections ({searchResults.collections.length})
                      </span>
                      <div className="space-y-1.5">
                        {searchResults.collections.map((col) => (
                          <div
                            key={col.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              router.push('/admin/categories');
                            }}
                            className="p-2.5 bg-[#181822] hover:bg-[#20202E] rounded-xl border border-white/5 flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <p className="text-white font-medium">{col.title}</p>
                            <span className="text-[10px] font-mono text-[#A8A49A]">{col.editorialBadge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.products.length === 0 &&
                    searchResults.invoices.length === 0 &&
                    searchResults.collections.length === 0 && (
                      <p className="text-center text-[#8C887E] py-8">
                        No matches found for &quot;{searchQuery}&quot;.
                      </p>
                    )}
                </>
              ) : (
                <div className="py-6 text-center space-y-2">
                  <p className="text-[#8C887E]">Type any keyword to search across the entire showroom back-office.</p>
                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#C5A880]">
                    <span>Try: &quot;Calacatta&quot;</span>
                    <span>•</span>
                    <span>&quot;Granite&quot;</span>
                    <span>•</span>
                    <span>&quot;INV-JT&quot;</span>
                    <span>•</span>
                    <span>&quot;Bay-A&quot;</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
