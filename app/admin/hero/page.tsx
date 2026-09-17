'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAdminData } from '@/context/AdminDataContext';
import { Save, Info, MonitorPlay, CheckCircle } from 'lucide-react';
import { HeroScene } from '@/context/AdminDataContext';

export default function AdminHeroPage() {
  const { heroScenes, updateHeroScene } = useAdminData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<HeroScene>>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const handleEdit = (scene: HeroScene) => {
    setEditingId(scene.id);
    setFormData(scene);
    setSaveSuccess(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = async (id: string) => {
    await updateHeroScene(id, formData);
    setEditingId(null);
    setSaveSuccess(id);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-serif-luxury text-3xl text-white">Hero Slider Management</h1>
        <p className="text-sm text-[#8C887E] max-w-2xl">
          Manage the text, tags, and calls-to-action for the main homepage cinematic slider.
        </p>
      </div>

      {/* Guidelines Alert */}
      <div className="bg-[#121217] border border-[#262634] rounded-xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-[#C5A880]" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white mb-2 font-sans-luxury">Content Guidelines</h3>
          <ul className="text-xs text-[#8E8A80] space-y-2 list-disc pl-4">
            <li><span className="text-[#DDD8CE]">Typography:</span> Headline 1 is serif (straight), Headline 2 is italic serif. Keep them concise for maximum impact.</li>
            <li><span className="text-[#DDD8CE]">Description:</span> Aim for 2-3 lines of text to ensure it does not overlap with the specs on mobile devices.</li>
          </ul>
        </div>
      </div>

      {/* Scenes List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {heroScenes.map(scene => {
          const isEditing = editingId === scene.id;
          const currentData = isEditing ? formData : scene;

          return (
            <div key={scene.id} className="bg-[#121217] border border-[#262634] rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
              {/* Preview Header */}
              <div className="w-full h-48 bg-black relative border-b border-[#262634] flex-shrink-0">
                <Image 
                  src={scene.fallbackImage} 
                  alt={scene.headlineLine1} 
                  fill 
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-2 py-1 mb-2 rounded border border-[#C5A880]/40 bg-black/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                    <span className="text-[8px] font-mono tracking-[0.2em] text-[#E5D2B8] uppercase">
                      {currentData.tag || scene.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif-luxury text-white">
                    {currentData.headlineLine1 || scene.headlineLine1}
                  </h3>
                  <h3 className="text-xl font-serif-luxury text-[#C5A880] italic">
                    {currentData.headlineLine2 || scene.headlineLine2}
                  </h3>
                </div>
              </div>

              {/* Management Form */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8E8A80] uppercase tracking-widest block">
                    Tab: {scene.tabLabel}
                  </span>
                  {!isEditing && (
                    <button
                      onClick={() => handleEdit(scene)}
                      className="text-xs font-mono text-[#C5A880] hover:text-white transition-colors uppercase"
                    >
                      Edit Scene
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-[#8E8A80] uppercase">Tag Badge</label>
                        <input
                          type="text"
                          value={formData.tag || ''}
                          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                          className="w-full bg-[#181822] border border-[#2B2B38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-[#8E8A80] uppercase">Tab Label</label>
                        <input
                          type="text"
                          value={formData.tabLabel || ''}
                          onChange={(e) => setFormData({ ...formData, tabLabel: e.target.value })}
                          className="w-full bg-[#181822] border border-[#2B2B38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#8E8A80] uppercase">Headline Line 1 (Normal)</label>
                      <input
                        type="text"
                        value={formData.headlineLine1 || ''}
                        onChange={(e) => setFormData({ ...formData, headlineLine1: e.target.value })}
                        className="w-full bg-[#181822] border border-[#2B2B38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#8E8A80] uppercase">Headline Line 2 (Italic / Gold)</label>
                      <input
                        type="text"
                        value={formData.headlineLine2 || ''}
                        onChange={(e) => setFormData({ ...formData, headlineLine2: e.target.value })}
                        className="w-full bg-[#181822] border border-[#2B2B38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#8E8A80] uppercase">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full bg-[#181822] border border-[#2B2B38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-[#8E8A80] uppercase">CTA Text</label>
                        <input
                          type="text"
                          value={formData.ctaText || ''}
                          onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                          className="w-full bg-[#181822] border border-[#2B2B38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-[#8E8A80] uppercase">CTA Link</label>
                        <input
                          type="text"
                          value={formData.ctaLink || ''}
                          onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                          className="w-full bg-[#181822] border border-[#2B2B38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#262634]">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-xs font-mono text-[#8E8A80] hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave(scene.id)}
                        className="px-4 py-2 bg-[#C5A880] hover:bg-[#D6BC97] text-black text-xs font-semibold tracking-wider rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    <p className="text-sm text-[#DDD8CE] font-sans-luxury">{scene.description}</p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="bg-[#181822] px-3 py-1.5 rounded-lg border border-[#2B2B38]">
                        <span className="text-[9px] text-[#8E8A80] block uppercase font-mono mb-0.5">CTA Button</span>
                        <span className="text-xs text-[#C5A880] font-medium">{scene.ctaText} → {scene.ctaLink}</span>
                      </div>
                    </div>
                    {saveSuccess === scene.id && (
                      <div className="mt-4 p-2 bg-green-500/10 border border-green-500/20 rounded flex items-center gap-2 text-green-400 text-xs animate-fade-in">
                        <CheckCircle className="w-4 h-4" />
                        <span>Scene updated successfully!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
