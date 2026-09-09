'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Compass, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  ArrowDown, 
  Layers, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';

interface HeroScene {
  id: string;
  tag: string;
  tabLabel: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  videoUrl?: string;
  fallbackImage: string;
  specs: { label: string; value: string }[];
  ctaText: string;
  ctaLink: string;
}

const HERO_SCENES: HeroScene[] = [
  {
    id: 'monumental-slabs',
    tag: 'THE ARCHITECTURAL EDIT',
    tabLabel: '01 MONUMENTAL SLABS',
    headlineLine1: 'JYOTHI TILES',
    headlineLine2: 'SURFACES THAT DEFINE SPACE',
    description: 'Transforming luxury residences with 120×240 cm sintered stone slabs, 12-layer nano-mirror gloss, and bookmatch precision.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-living-room-with-large-windows-and-marble-floor-41484-large.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop',
    specs: [
      { label: 'MAX FORMAT', value: '120 × 240 CM' },
      { label: 'WATER ABSORPTION', value: '< 0.02%' },
      { label: 'SURFACES IN STOCK', value: '12,000+' }
    ],
    ctaText: 'EXPLORE COLLECTIONS',
    ctaLink: '/products',
  },
  {
    id: 'exotic-granite',
    tag: 'NATURAL STONE ATELIER',
    tabLabel: '02 EXOTIC GRANITE',
    headlineLine1: 'RAW EARTH MONOLITHS',
    headlineLine2: 'BILLION-YEAR CHARACTER',
    description: 'Direct quarry shipments of Titanium Gold, Patagonia Quartzite, and Black Galaxy. 350°C thermal resistance for statement kitchen islands.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-kitchen-with-large-marble-countertop-41487-large.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=2400&auto=format&fit=crop',
    specs: [
      { label: 'SLAB DIMENSIONS', value: '320 × 195 CM' },
      { label: 'THICKNESS', value: '18 / 20 / 30 MM' },
      { label: 'HEAT RESISTANCE', value: 'UP TO 350°C' }
    ],
    ctaText: 'VIEW GRANITE SLABS',
    ctaLink: '/granite',
  },
  {
    id: 'wellness-spa',
    tag: 'TACTILE WELLNESS SPAS',
    tabLabel: '03 CARVED & FLUTED',
    headlineLine1: 'WHISPER-QUIET LUXURY',
    headlineLine2: '3D TACTILE SANCTUARIES',
    description: 'Fluted carving porcelain and silk-matte travertines engineered for five-star private bath spas and master suites.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-bathroom-interior-41486-large.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=85&w=2400&auto=format&fit=crop',
    specs: [
      { label: 'SLIP RESISTANCE', value: 'R10 / R11 RATED' },
      { label: 'ANTI-MICROBIAL', value: 'ZERO POROSITY' },
      { label: 'TEXTURES', value: '3D FLUTED & SILK' }
    ],
    ctaText: 'EXPLORE SURFACES',
    ctaLink: '/products',
  },
  {
    id: 'facades-outdoor',
    tag: 'EXTERIOR & LANDSCAPE',
    tabLabel: '04 OUTDOOR & FACADES',
    headlineLine1: 'WEATHERPROOF GRANDEUR',
    headlineLine2: 'ENDURING ACROSS GENERATIONS',
    description: 'UV-stable, frost-proof vitrified surfaces and rugged Ceppo di Gré textures designed for monsoon rains, pool coping, and modern facades.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-house-exterior-with-swimming-pool-41485-large.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=85&w=2400&auto=format&fit=crop',
    specs: [
      { label: 'DURABILITY', value: 'PEI-5 HIGH TRAFFIC' },
      { label: 'UV STABILITY', value: '100% COLOR RETENTION' },
      { label: 'WARRANTY', value: '10-YEAR ASSURANCE' }
    ],
    ctaText: 'SHOP THE LOOK',
    ctaLink: '/shop-the-look',
  },
];

const SCENE_DURATION_MS = 6500;

export const HeroCinematic: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Advance scene handler
  const goToScene = (index: number) => {
    setIsTransitioning(true);
    setCurrentSceneIndex(index);
    setProgress(0);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const nextScene = () => {
    goToScene((currentSceneIndex + 1) % HERO_SCENES.length);
  };

  const prevScene = () => {
    goToScene((currentSceneIndex - 1 + HERO_SCENES.length) % HERO_SCENES.length);
  };

  // Timer & progress bar loop (Emaar style continuous tracker)
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const increment = (intervalTime / SCENE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextScene();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentSceneIndex]);

  // Video playback management
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === currentSceneIndex && isPlaying) {
          vid.currentTime = 0;
          vid.play().catch(() => {
            // Autoplay policy fallback handled gracefully
          });
        } else {
          vid.pause();
        }
      }
    });
  }, [currentSceneIndex, isPlaying]);

  const currentScene = HERO_SCENES[currentSceneIndex];

  return (
    <section className="relative h-screen min-h-[700px] w-full flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* Background Video / Visual Layer with Emaar Cinematic Crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_SCENES.map((scene, idx) => {
          const isActive = idx === currentSceneIndex;
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
              style={{
                transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 8s ease-out',
                transform: isActive ? 'scale(1)' : 'scale(1.08)',
              }}
            >
              {/* HTML5 Video Layer */}
              {scene.videoUrl && (
                <video
                  ref={(el) => { videoRefs.current[idx] = el; }}
                  src={scene.videoUrl}
                  poster={scene.fallbackImage}
                  muted
                  playsInline
                  loop
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-70"
                />
              )}

              {/* High-Resolution Fallback Poster */}
              <Image
                src={scene.fallbackImage}
                alt={scene.headlineLine1}
                fill
                priority={idx === 0}
                className={`object-cover object-center brightness-60 -z-10 ${scene.videoUrl ? 'hidden md:block' : 'block'}`}
              />

              {/* Emaar Multilayer Gradient Film Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/35 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80" />
            </div>
          );
        })}
      </div>

      {/* Top Floating Brand Pre-Badge */}
      <div className="relative z-20 pt-28 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/40 bg-black/50 backdrop-blur-md animate-fade-in-scale">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#E5D2B8] uppercase">
            {currentScene.tag}
          </span>
        </div>
      </div>

      {/* Main Center-Left Editorial Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-6">
        <div className="max-w-3xl space-y-6">
          {/* Animated Headline */}
          <div className="space-y-1">
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.05] drop-shadow-2xl">
              {currentScene.headlineLine1}
            </h2>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic gold-gradient-text tracking-wide leading-[1.08]">
              {currentScene.headlineLine2}
            </h1>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-[#DDD8CE] font-light leading-relaxed max-w-2xl font-sans-luxury">
            {currentScene.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={currentScene.ctaLink}
              className="px-8 py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black text-xs font-semibold tracking-[0.25em] uppercase rounded-sm transition-all duration-300 shadow-xl shadow-[#C5A880]/20 flex items-center gap-2 hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4" />
              <span>{currentScene.ctaText}</span>
            </Link>
          </div>

          {/* Spec Pills */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10">
            {currentScene.specs.map((s) => (
              <div key={s.label} className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#9E9A90] uppercase tracking-widest block">
                  {s.label}
                </span>
                <span className="text-sm sm:text-base font-serif-luxury font-medium text-white">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};


