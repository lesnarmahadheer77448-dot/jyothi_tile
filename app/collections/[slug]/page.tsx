'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { ProductCard } from '@/components/products/ProductCard';

interface CollectionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { slug } = use(params);
  const { collections, products } = useAdminData();

  const collection = collections.find((c) => c.slug === slug || c.id === slug);

  if (!collection) {
    notFound();
  }

  // Filter products in this collection
  const collectionProducts = products.filter((p) => 
    p.collectionId === collection.id || 
    p.collectionId === collection.slug || 
    ((collection.slug === 'the-granite-atelier' || collection.id === 'the-granite-atelier') && p.category === 'granite')
  );

  const colImage = collection.coverImage || collection.heroImage;
  const colName = collection.name || collection.title;

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      {/* Banner */}
      <div className="relative h-[440px] w-full bg-black mb-16 overflow-hidden">
        <Image
          src={colImage}
          alt={colName}
          fill
          priority
          className="object-cover brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="inline-flex items-center gap-2 text-[#C5A880] mb-2">
            <Layers className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">MASTER COLLECTION</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-wide">
            {colName}
          </h1>
          <p className="text-sm sm:text-base text-[#D4D0C5] max-w-2xl font-light mt-2">
            {collection.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Count & Breadcrumb */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C887E]">
            <Link href="/" className="hover:text-white">HOME</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-white">COLLECTIONS</Link>
            <span>/</span>
            <span className="text-[#C5A880]">{colName.toUpperCase()}</span>
          </div>
          <span className="text-xs font-mono text-[#A8A49A]">{collectionProducts.length} Surfaces</span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionProducts.map((item) => (
            <ProductCard key={item.id} product={item as any} />
          ))}
        </div>
      </div>
    </div>
  );
}

