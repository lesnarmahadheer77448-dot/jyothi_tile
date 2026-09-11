'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Filter, 
  Grid3X3, 
  LayoutGrid, 
  List, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilterSidebar } from '@/components/products/ProductFilterSidebar';
import { Product, GraniteSlab } from '@/types';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();

  const { products } = useAdminData();

  const allSurfaces = useMemo(() => {
    return products;
  }, [products]);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [sortBy, setSortBy] = useState('featured');
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'compact' | 'list'>('editorial');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const initialCategory = searchParams.get('category');
  const initialSpace = searchParams.get('space');
  const initialFinish = searchParams.get('finish');
  const initialSize = searchParams.get('size');

  const [filters, setFilters] = useState<{
    spaces: string[];
    materials: string[];
    finishes: string[];
    colors: string[];
    sizes: string[];
    categories: string[];
    inStockOnly: boolean;
  }>({
    spaces: initialSpace ? [initialSpace] : [],
    materials: [],
    finishes: initialFinish ? [initialFinish] : [],
    colors: [],
    sizes: initialSize ? [initialSize] : [],
    categories: initialCategory ? [initialCategory] : [],
    inStockOnly: false,
  });

  // Sync state if URL params change
  useEffect(() => {
    const q = searchParams.get('query');
    if (q) setSearchQuery(q);
    const space = searchParams.get('space');
    if (space) setFilters((prev) => ({ ...prev, spaces: [space] }));
  }, [searchParams]);

  const filteredSurfaces = useMemo(() => {
    return allSurfaces.filter((item) => {
      // Query search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSku = item.sku.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        if (!matchesName && !matchesSku && !matchesDesc && !matchesTags) return false;
      }

      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }

      // Spaces
      if (filters.spaces.length > 0) {
        if ('suitableSpaces' in item) {
          const hasSpace = item.suitableSpaces?.some((s) => filters.spaces.includes(s)) ?? false;
          if (!hasSpace) return false;
        } else {
          // Granite applications mapping
          const graniteHasSpace = filters.spaces.some((s) => {
            if (s === 'kitchen') return true;
            if (s === 'living-room') return true;
            return false;
          });
          if (!graniteHasSpace) return false;
        }
      }

      // Finishes
      if (filters.finishes.length > 0) {
        if ('finish' in item) {
          if (!filters.finishes.includes(item.finish as string)) return false;
        } else {
          const hasFin = item.finishesAvailable?.some((f) => filters.finishes.includes(f as any)) ?? false;
          if (!hasFin) return false;
        }
      }

      // Sizes
      if (filters.sizes.length > 0) {
        if ('size' in item) {
          if (!filters.sizes.includes(item.size as string)) return false;
        }
      }

      // In-stock
      if (filters.inStockOnly) {
        if ('inStock' in item && !item.inStock) return false;
      }

      return true;
    });
  }, [allSurfaces, searchQuery, filters]);

  const handleResetFilters = () => {
    setFilters({
      spaces: [],
      materials: [],
      finishes: [],
      colors: [],
      sizes: [],
      categories: [],
      inStockOnly: false,
    });
    setSearchQuery('');
  };

  return (
    <div className="pt-28 pb-24 bg-[#0D0D0F] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs & Header */}
        <div className="mb-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8E8A81]">
            <span>VAULT ATELIER</span>
            <span>/</span>
            <span className="text-[#C5A880]">SURFACE COLLECTION</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Architectural Surfaces Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#9C988F] max-w-2xl font-light">
            Filter through our complete portfolio of large-format porcelain slabs, 3D fluted carvings, and natural Brazilian granites.
          </p>
        </div>

        {/* Action & Filter Control Bar */}
        <div className="bg-[#141418] border border-[#262630] rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar inside catalog */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#8C887E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by finish, space, vein pattern, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#1B1B22] border border-[#2D2D38] rounded-lg text-xs text-white placeholder-[#78756D] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 bg-[#1B1B22] border border-[#2D2D38] rounded-lg text-xs font-mono text-[#C5A880]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({filteredSurfaces.length})</span>
            </button>

            {/* Layout switchers */}
            <div className="hidden sm:flex items-center gap-1 bg-[#1B1B22] p-1 rounded-lg border border-[#2D2D38]">
              <button
                onClick={() => setLayoutMode('editorial')}
                className={`p-1.5 rounded transition-colors ${
                  layoutMode === 'editorial' ? 'bg-[#C5A880] text-black' : 'text-[#8E8A81] hover:text-white'
                }`}
                title="Editorial 3-Column View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('compact')}
                className={`p-1.5 rounded transition-colors ${
                  layoutMode === 'compact' ? 'bg-[#C5A880] text-black' : 'text-[#8E8A81] hover:text-white'
                }`}
                title="Compact 4-Column View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#1B1B22] border border-[#2D2D38] rounded-lg pl-3 pr-8 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                <option value="featured">Sort: Curated Featured</option>
                <option value="newest">Sort: New Launches</option>
                <option value="size">Sort: Monumental Formats</option>
              </select>
              <ChevronDown className="w-3 h-3 text-[#88857C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Grid & Sticky Sidebar Layout */}
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <ProductFilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
            totalCount={filteredSurfaces.length}
          />

          {/* Catalog Grid Area */}
          <div className="flex-1 min-w-0">
            {filteredSurfaces.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  layoutMode === 'compact'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {filteredSurfaces.map((item) => (
                  <ProductCard key={item.id} product={item as any} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-[#282834] rounded-2xl p-12 space-y-4">
                <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto opacity-40" />
                <h3 className="font-serif-luxury text-xl text-white">No Surfaces Matched Your Filter Criteria</h3>
                <p className="text-xs text-[#8E8A81] max-w-sm mx-auto">
                  Try broadening your search query or reset the space and finish filters to explore our full repertoire.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#C5A880] text-black text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-[#D6BC97]"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D0F] pt-32 text-center text-[#8E8A81]">Loading Surfaces Catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}

