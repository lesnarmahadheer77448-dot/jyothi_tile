'use client';

import React from 'react';
import { HeroCinematic } from '@/components/home/HeroCinematic';

import { SpaceExplorer } from '@/components/home/SpaceExplorer';
import { ShowroomExperience } from '@/components/home/ShowroomExperience';

export default function HomePage() {
  return (
    <div className="bg-[#0D0D0F] text-[#F4F1EA] overflow-x-hidden">
      {/* 01. Cinematic Hero */}
      <HeroCinematic />



      {/* 03. Discover by Space */}
      <SpaceExplorer />


      {/* 10. Flagship Showroom Experience */}
      <ShowroomExperience />
    </div>
  );
}

