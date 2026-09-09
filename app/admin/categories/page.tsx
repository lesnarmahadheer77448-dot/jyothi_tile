'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Tags, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Check, 
  X, 
  Image as ImageIcon 
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { Collection, SpaceType } from '@/types';

export default function AdminCategoriesManagerPage() {
  const { collections, addCollection, updateCollection, deleteCollection, products } = useAdminData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [deletingCollection, setDeletingCollection] = useState<Collection | null>(null);

  const [formData, setFormData] = useState<Partial<Collection>>({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#C5A880',
    curatorNote: '',
    editorialBadge: 'Curated Edit',
    featuredSpaces: ['living-room', 'bathroom'],
    productIds: [],
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      accentColor: '#C5A880',
      curatorNote: '',
      editorialBadge: 'Curated Edit',
      featuredSpaces: ['living-room', 'bathroom'],
      productIds: [],
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (col: Collection) => {
    setEditingCollection(col);
    setFormData(col);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addCollection({
      title: formData.title,
      slug,
      name: formData.title,
      subtitle: formData.subtitle || '',
      description: formData.description || '',
      heroImage: formData.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      coverImage: formData.heroImage,
      accentColor: formData.accentColor || '#C5A880',
      curatorNote: formData.curatorNote || '',
      editorialBadge: formData.editorialBadge || 'Curated Edit',
      featuredSpaces: formData.featuredSpaces || ['living-room'],
      productIds: formData.productIds || [],
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollection) return;

    updateCollection(editingCollection.id, {
      ...formData,
      name: formData.title,
      coverImage: formData.heroImage,
    });

    setEditingCollection(null);
  };

  const handleConfirmDelete = () => {
    if (deletingCollection) {
      deleteCollection(deletingCollection.id);
      setDeletingCollection(null);
    }
  };

  const toggleProductInCollection = (prodId: string) => {
    const current = formData.productIds || [];
    if (current.includes(prodId)) {
      setFormData({ ...formData, productIds: current.filter((id) => id !== prodId) });
    } else {
      setFormData({ ...formData, productIds: [...current, prodId] });
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#20202C] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[#C5A880] mb-1">
            <Tags className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">CURATORIAL MANAGEMENT</span>
          </div>
          <h1 className="font-serif-luxury text-3xl text-white font-light">
            Master Collections & Category Curator
          </h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Organize architectural themes, editorial stories, hero photography banners, and linked surfaces.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-[#C5A880]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Collection</span>
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((col) => {
          const banner = col.coverImage || col.heroImage;
          const count = col.itemCount || col.productIds.length;
          return (
            <div
              key={col.id}
              className="bg-[#121217] border border-[#262634] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#C5A880]/40 transition-all"
            >
              {/* Banner visual */}
              <div className="relative h-48 w-full bg-black overflow-hidden">
                <Image
                  src={banner}
                  alt={col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-65"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/50" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase bg-black/70 px-3 py-1 rounded-full border border-white/10">
                    {col.editorialBadge}
                  </span>
                  <span className="text-[10px] font-mono text-white bg-black/70 px-2.5 py-1 rounded border border-white/10">
                    {count} Surfaces Linked
                  </span>
                </div>
              </div>

              {/* Body info */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl text-white font-medium">{col.title}</h3>
                  <p className="text-xs text-[#C5A880] font-mono">{col.subtitle}</p>
                  <p className="text-xs text-[#A8A49A] font-light line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                {/* Actions Row */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#78756D]">
                    Slug: /{col.slug}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(col)}
                      className="px-3 py-1.5 bg-[#1B1B24] hover:bg-[#C5A880] text-white hover:text-black border border-[#2B2B38] rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingCollection(col)}
                      className="p-2 bg-[#1B1B24] hover:bg-red-500/20 text-[#8E8A80] hover:text-red-400 border border-[#2B2B38] rounded-lg text-xs transition-colors"
                      title="Delete Collection"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Collection Modal */}
      {(isAddModalOpen || editingCollection) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-scale">
          <div className="relative w-full max-w-2xl bg-[#14141A] border border-[#2E2E40] text-[#EDE9E1] shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#242434] bg-[#111116]">
              <div>
                <h3 className="font-serif-luxury text-xl text-white font-medium">
                  {editingCollection ? `Edit Collection: ${editingCollection.title}` : 'Create Master Collection'}
                </h3>
                <p className="text-xs text-[#8E8A80]">Configure curatorial themes and linked surface repertoire.</p>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingCollection(null);
                }}
                className="p-2 text-[#88857C] hover:text-white rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={editingCollection ? handleSaveEdit : handleSaveAdd}
              className="p-6 overflow-y-auto space-y-5 flex-1 text-xs"
            >
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Collection Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. The Royal Onyx Suite"
                    className="w-full px-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. the-royal-onyx-suite"
                    className="w-full px-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl font-mono text-[#C5A880] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Subtitle & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Editorial Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Translucent Crystal & Monumental Slabs"
                    className="w-full px-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Editorial Badge</label>
                  <input
                    type="text"
                    value={formData.editorialBadge || 'Curated Edit'}
                    onChange={(e) => setFormData({ ...formData, editorialBadge: e.target.value })}
                    placeholder="e.g. Archival Masterpiece"
                    className="w-full px-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Hero Banner URL */}
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Hero Photography Banner URL</label>
                <input
                  type="url"
                  value={formData.heroImage || ''}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl font-mono text-white text-[11px]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Curatorial Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Historical provenance, quarry origins, sensory characteristics..."
                  className="w-full px-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Link Products Selector */}
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#C5A880] mb-2">
                  Select Surfaces Linked to this Collection ({(formData.productIds || []).length} Selected)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-[#111116] border border-[#252534] rounded-2xl">
                  {products.map((p) => {
                    const isChecked = (formData.productIds || []).includes(p.id);
                    return (
                      <label
                        key={p.id}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#C5A880]/15 border-[#C5A880]/50 text-white'
                            : 'bg-[#181822] border-white/5 text-[#A8A49A] hover:border-white/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProductInCollection(p.id)}
                          className="accent-[#C5A880]"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-[11px] truncate">{p.name}</p>
                          <p className="text-[9px] font-mono text-[#8E8A80]">{p.sku}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#242434]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCollection(null);
                  }}
                  className="px-5 py-2.5 bg-[#181822] hover:bg-[#22222E] text-white font-mono uppercase rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold font-mono uppercase rounded-xl shadow-lg shadow-[#C5A880]/20"
                >
                  {editingCollection ? 'Save Collection' : 'Publish Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-scale">
          <div className="w-full max-w-md bg-[#14141A] border border-red-500/30 text-white rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif-luxury text-xl font-medium text-white text-center">Delete Collection?</h3>
            <p className="text-xs text-[#8E8A80] text-center">
              Are you sure you want to remove &quot;{deletingCollection.title}&quot;?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingCollection(null)}
                className="px-5 py-2 bg-[#1B1B24] text-white font-mono text-xs uppercase rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-mono text-xs uppercase rounded-xl"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
