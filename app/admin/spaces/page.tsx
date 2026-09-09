'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAdminData } from '@/context/AdminDataContext';
import { Upload, Trash2, Info, AlertTriangle, Image as ImageIcon } from 'lucide-react';

export default function AdminSpacesPage() {
  const { spaces, updateSpaceImage, deleteSpaceImage } = useAdminData();
  const [uploadingSpaceId, setUploadingSpaceId] = useState<string | null>(null);

  const handleFileChange = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSpaceId(id);

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      
      const response = await fetch('https://api.imgbb.com/1/upload?key=d01d029dcf7ed515a697ca6ae14e57f8', {
        method: 'POST',
        body: uploadData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        updateSpaceImage(id, data.data.url);
      } else {
        throw new Error(data.error?.message || 'ImgBB upload failed');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingSpaceId(null);
      e.target.value = ''; // Reset input
    }
  };

  const activeSpaces = spaces.slice(0, 4);

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-serif-luxury text-3xl text-white">Space Image Management</h1>
        <p className="text-sm text-[#8C887E] max-w-2xl">
          Manage the hero images for the 4 primary architectural spaces featured on the digital showroom homepage. Ensure all uploaded images meet professional web standards.
        </p>
      </div>

      {/* Guidelines Alert */}
      <div className="bg-[#121217] border border-[#262634] rounded-xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-[#C5A880]" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white mb-2 font-sans-luxury">Professional Upload Specifications</h3>
          <ul className="text-xs text-[#8E8A80] space-y-2 list-disc pl-4">
            <li><span className="text-[#DDD8CE]">Required Format:</span> Use <code className="font-mono bg-black/40 px-1 rounded text-[#C5A880]">WEBP</code>, <code className="font-mono bg-black/40 px-1 rounded text-[#C5A880]">JPEG</code>, or <code className="font-mono bg-black/40 px-1 rounded text-[#C5A880]">PNG</code> for optimal quality and performance.</li>
            <li><span className="text-[#DDD8CE]">High Resolution:</span> Firebase Storage handles large files, so you can upload high-quality textures.</li>
            <li><span className="text-[#DDD8CE]">Optimal Dimensions:</span> Recommended <b>800px width × 1200px height</b>. Portrait format is required for the card layout.</li>
            <li><span className="text-[#DDD8CE]">Naming Convention:</span> Use SEO-friendly filenames (e.g., <code className="font-mono bg-black/40 px-1 rounded text-[#C5A880]">living-room-hero-2026.webp</code>).</li>
          </ul>
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeSpaces.map(space => (
          <div key={space.id} className="bg-[#121217] border border-[#262634] rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row h-full">
            
            {/* Current Image Preview */}
            <div className="w-full md:w-2/5 h-64 md:h-auto bg-black relative border-b md:border-b-0 md:border-r border-[#262634] flex-shrink-0">
              {space.heroImage ? (
                <>
                  <Image 
                    src={space.heroImage} 
                    alt={space.name} 
                    fill 
                    className="object-cover opacity-90"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur border border-white/10 rounded text-[10px] font-mono text-[#C5A880] uppercase tracking-wider z-10">
                    Active Image
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#55524B] p-6 text-center bg-[#0C0C10]">
                  <ImageIcon className="w-10 h-10 mb-3 opacity-50" />
                  <p className="text-xs font-mono uppercase">No Image Uploaded</p>
                  <p className="text-[10px] mt-2">Space will display a placeholder on the homepage.</p>
                </div>
              )}
            </div>

            {/* Management Form */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#8E8A80] uppercase tracking-widest block mb-1">
                      {space.slug.replace('-', ' ')}
                    </span>
                    <h2 className="text-lg font-serif-luxury text-white">{space.name}</h2>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <label className="text-xs text-[#DDD8CE] block">
                    {uploadingSpaceId === space.id ? 'Uploading to Cloud...' : 'Upload High-Res Cloud Image'}
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => handleFileChange(space.id, e)}
                      disabled={uploadingSpaceId === space.id}
                      className="block w-full text-xs text-[#8E8A80]
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border border-[#2B2B38]
                        file:text-xs file:font-semibold
                        file:bg-[#181822] file:text-[#C5A880]
                        hover:file:bg-[#20202E] file:cursor-pointer file:transition-colors cursor-pointer disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="mt-8 pt-4 border-t border-[#262634]">
                <button
                  onClick={() => deleteSpaceImage(space.id)}
                  disabled={!space.heroImage}
                  className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-mono uppercase"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Current Image
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
