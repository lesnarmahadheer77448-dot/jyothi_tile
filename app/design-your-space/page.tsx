'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, MessageSquare } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';
import { useAdminData } from '@/context/AdminDataContext';

export default function DesignYourSpacePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { products, spaces } = useAdminData();
  const tiles = products.filter(p => p.category !== 'granite');
  const granites = products.filter(p => p.category === 'granite');

  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [selectedFloor, setSelectedFloor] = useState<any>(null);
  const [selectedWall, setSelectedWall] = useState<any>(null);
  const [selectedGranite, setSelectedGranite] = useState<any>(null);

  React.useEffect(() => {
    if (spaces.length > 0 && !selectedSpace) setSelectedSpace(spaces[0]);
    if (tiles.length > 0 && !selectedFloor) setSelectedFloor(tiles[0]);
    if (tiles.length > 1 && !selectedWall) setSelectedWall(tiles[1]);
    if (granites.length > 0 && !selectedGranite) setSelectedGranite(granites[0]);
  }, [spaces, products, selectedSpace, selectedFloor, selectedWall, selectedGranite]);

  const { openQuoteModal, addToQuote } = useQuote();

  if (!selectedSpace || !selectedFloor || !selectedWall || !selectedGranite) {
    return <div className="min-h-screen bg-[#0A0A0C] pt-32 text-center text-[#8E8A81]">Loading Design Board...</div>;
  }

  const handleFinishWizard = () => {
    addToQuote(selectedFloor);
    addToQuote(selectedWall);
    addToQuote(selectedGranite);
    openQuoteModal();
  };

  const handleWhatsAppShare = () => {
    const message = `*CUSTOM ROOM DESIGN BOARD*%0A%0A*Target Space:* ${encodeURIComponent(selectedSpace.name)}%0A*1. Floor Surface:* ${encodeURIComponent(selectedFloor.name)} (${selectedFloor.sku})%0A*2. Wall / Feature:* ${encodeURIComponent(selectedWall.name)} (${selectedWall.sku})%0A*3. Countertop Granite:* ${encodeURIComponent(selectedGranite.name)} (${selectedGranite.sku})%0A%0APlease provide a combined quotation for this design suite.`;
    window.open(`https://wa.me/919626547707?text=${message}`, '_blank');
  };

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">STEP-BY-STEP SPECIFIER</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Design Your Space
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9A90] font-light">
            Build your personalized material board step by step: select room space, floor surface, wall accent, and matching countertop slabs.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-12 overflow-x-auto pb-2">
          {['1. Select Space', '2. Floor Tile', '3. Wall Accent', '4. Granite Slab', '5. Summary'].map(
            (label, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isPast = currentStep > stepNum;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-colors ${
                      isActive
                        ? 'bg-[#C5A880] text-black font-bold ring-4 ring-[#C5A880]/20'
                        : isPast
                        ? 'bg-[#262634] text-[#C5A880]'
                        : 'bg-[#181820] text-[#737068] border border-[#2B2B38]'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : stepNum}
                  </div>
                  <span
                    className={`text-xs font-mono whitespace-nowrap ${
                      isActive ? 'text-white font-medium' : 'text-[#737068]'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            }
          )}
        </div>

        {/* Step 1: Select Space */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fade-in-scale">
            <h3 className="font-serif-luxury text-2xl text-white text-center">Step 1: Choose Architectural Room</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {spaces.map((sp) => {
                const isSelected = selectedSpace.id === sp.id;
                return (
                  <button
                    key={sp.id}
                    onClick={() => setSelectedSpace(sp)}
                    className={`group relative h-64 rounded-2xl overflow-hidden border text-left p-6 flex flex-col justify-end transition-all ${
                      isSelected
                        ? 'border-[#C5A880] ring-2 ring-[#C5A880]/40 shadow-xl'
                        : 'border-[#262632] hover:border-white/20'
                    }`}
                  >
                    <Image src={sp.heroImage} alt={sp.name} fill className="object-cover brightness-60 group-hover:brightness-75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="relative z-10">
                      <h4 className="font-serif-luxury text-xl text-white group-hover:text-[#C5A880] transition-colors">{sp.name}</h4>
                      <p className="text-xs text-[#9E9A90] line-clamp-1 mt-1 font-sans-luxury">{sp.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg flex items-center gap-2"
              >
                <span>Proceed to Floor Tile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Floor Tile */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fade-in-scale">
            <h3 className="font-serif-luxury text-2xl text-white text-center">Step 2: Select Primary Floor Surface</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiles.map((prod) => {
                const isSelected = selectedFloor.id === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedFloor(prod)}
                    className={`cursor-pointer rounded-2xl overflow-hidden border p-4 bg-[#121217] transition-all ${
                      isSelected
                        ? 'border-[#C5A880] ring-2 ring-[#C5A880]/40'
                        : 'border-[#262632] hover:border-white/20'
                    }`}
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3">
                      <Image src={prod.mainImage} alt={prod.name} fill className="object-cover" />
                    </div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase">{prod.size} • {prod.finish}</span>
                    <h4 className="font-serif-luxury text-base text-white font-medium truncate">{prod.name}</h4>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-[#181820] text-white text-xs uppercase font-mono rounded-lg border border-[#2B2B38] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg flex items-center gap-2"
              >
                <span>Proceed to Wall Accent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Wall Tile */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in-scale">
            <h3 className="font-serif-luxury text-2xl text-white text-center">Step 3: Select Wall Surface / 3D Carving</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiles.map((prod) => {
                const isSelected = selectedWall.id === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedWall(prod)}
                    className={`cursor-pointer rounded-2xl overflow-hidden border p-4 bg-[#121217] transition-all ${
                      isSelected
                        ? 'border-[#C5A880] ring-2 ring-[#C5A880]/40'
                        : 'border-[#262632] hover:border-white/20'
                    }`}
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3">
                      <Image src={prod.textureImage || prod.mainImage || ''} alt={prod.name} fill className="object-cover" />
                    </div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase">{prod.material}</span>
                    <h4 className="font-serif-luxury text-base text-white font-medium truncate">{prod.name}</h4>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-[#181820] text-white text-xs uppercase font-mono rounded-lg border border-[#2B2B38] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-8 py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg flex items-center gap-2"
              >
                <span>Proceed to Granite Slab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Choose Countertop Granite */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in-scale">
            <h3 className="font-serif-luxury text-2xl text-white text-center">Step 4: Select Natural Granite Monolith</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {granites.map((granite) => {
                const isSelected = selectedGranite.id === granite.id;
                return (
                  <div
                    key={granite.id}
                    onClick={() => setSelectedGranite(granite)}
                    className={`cursor-pointer rounded-2xl overflow-hidden border p-4 bg-[#121217] transition-all ${
                      isSelected
                        ? 'border-[#C5A880] ring-2 ring-[#C5A880]/40'
                        : 'border-[#262632] hover:border-white/20'
                    }`}
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3">
                      <Image src={granite.mainImage} alt={granite.name} fill className="object-cover" />
                    </div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase">{granite.origin}</span>
                    <h4 className="font-serif-luxury text-base text-white font-medium truncate">{granite.name}</h4>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 bg-[#181820] text-white text-xs uppercase font-mono rounded-lg border border-[#2B2B38] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-8 py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg flex items-center gap-2"
              >
                <span>View Design Board Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Summary Board */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-fade-in-scale">
            <h3 className="font-serif-luxury text-2xl text-white text-center">Your Custom Material Moodboard</h3>
            <div className="p-8 rounded-3xl bg-[#121217] border border-[#2B2B36] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase">SPACE CONFIGURED</span>
                  <h4 className="font-serif-luxury text-2xl text-white">{selectedSpace.name}</h4>
                </div>
                <button onClick={() => setCurrentStep(1)} className="text-xs text-[#C5A880] hover:underline font-mono">
                  Modify Room
                </button>
              </div>

              {/* 3 Material Tiles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#181820] rounded-xl border border-[#262634] space-y-3">
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase block">01. Floor Surface</span>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black">
                    <Image src={selectedFloor.mainImage} alt={selectedFloor.name} fill className="object-cover" />
                  </div>
                  <h5 className="text-sm font-medium text-white">{selectedFloor.name}</h5>
                  <p className="text-xs text-[#8E8A81] font-mono">{selectedFloor.size} • {selectedFloor.finish}</p>
                </div>

                <div className="p-4 bg-[#181820] rounded-xl border border-[#262634] space-y-3">
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase block">02. Wall Feature</span>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black">
                    <Image src={selectedWall.textureImage} alt={selectedWall.name} fill className="object-cover" />
                  </div>
                  <h5 className="text-sm font-medium text-white">{selectedWall.name}</h5>
                  <p className="text-xs text-[#8E8A81] font-mono">{selectedWall.size} • {selectedWall.material}</p>
                </div>

                <div className="p-4 bg-[#181820] rounded-xl border border-[#262634] space-y-3">
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase block">03. Countertop Granite</span>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black">
                    <Image src={selectedGranite.mainImage} alt={selectedGranite.name} fill className="object-cover" />
                  </div>
                  <h5 className="text-sm font-medium text-white">{selectedGranite.name}</h5>
                  <p className="text-xs text-[#8E8A81] font-mono">{selectedGranite.slabDimensions}</p>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleFinishWizard}
                  className="flex-1 py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-xl"
                >
                  Generate Combined Architectural Quotation
                </button>
                <button
                  onClick={handleWhatsAppShare}
                  className="px-6 py-4 bg-[#25D366] text-black font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  Share Board to WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

