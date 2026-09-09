'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Package, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Layers, 
  SlidersHorizontal, 
  Sparkles, 
  Eye, 
  AlertTriangle,
  ArrowUpDown,
  Filter,
  Maximize2
} from 'lucide-react';
import { useAdminData, UnifiedSurface } from '@/context/AdminDataContext';
import { SurfaceCategory, TileFinish, MaterialType, SpaceType } from '@/types';

export default function AdminProductsManagerPage() {
  const { products, addProduct, updateProduct, deleteProduct, toggleStockStatus } = useAdminData();

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<UnifiedSurface | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<UnifiedSurface | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const STANDARD_CATEGORIES = ["tiles", "slabs", "granite", "marble", "quartz"];
  const STANDARD_MATERIALS = [
    "Glazed Vitrified (GVT)",
    "Polished Glazed Vitrified (PGVT)",
    "Full Body Porcelain",
    "Sintered Stone Slab",
    "Natural Granite",
    "Imported Italian Marble"
  ];
  const STANDARD_FINISHES = [
    "High Gloss / Polished",
    "Silk Matte",
    "Carving & Fluted",
    "Bookmatch",
    "Leather & Flamed",
    "Anti-Skid / R11 Rustic"
  ];

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<UnifiedSurface>>({
    name: '',
    sku: '',
    category: '',
    material: '',
    finish: '',
    colorFamily: 'White / Carrara',
    colorHex: '#F5F5F5',
    size: '120 × 180 cm',
    widthCm: 120,
    heightCm: 180,
    thicknessMm: 9,
    boxCoverageSqFt: 23.25,
    tilesPerBox: 2,
    priceSqFtEstimate: '₹185 / sq.ft',
    unitPrice: 185,
    description: '',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    textureImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
    stockQuantityBoxes: 150,
    warehouseBin: 'Bay-A1',
    batchLotNumber: 'Batch #LOT-990-GVT',
    minThreshold: 30,
    suitableSpaces: ['living-room', 'bathroom'],
  });

  const resetForm = () => {
    setFormData({
      name: '',
      sku: `JT-SKU-${Math.floor(100 + Math.random() * 900)}`,
      category: '',
      material: '',
      finish: '',
      colorFamily: 'White / Carrara',
      colorHex: '#F5F5F5',
      size: '120 × 180 cm',
      widthCm: 120,
      heightCm: 180,
      thicknessMm: 9,
      boxCoverageSqFt: 23.25,
      tilesPerBox: 2,
      priceSqFtEstimate: '₹185 / sq.ft',
      unitPrice: 185,
      description: 'Premium architectural surface curated for monumental residential spaces.',
      mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      textureImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
      stockQuantityBoxes: 150,
      warehouseBin: 'Bay-A1',
      batchLotNumber: `Batch #LOT-${Math.floor(100 + Math.random() * 900)}-GVT`,
      minThreshold: 30,
      suitableSpaces: ['living-room', 'bathroom'],
    });
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: UnifiedSurface) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      unitPrice: product.unitPrice || Number(product.priceSqFtEstimate?.replace(/[^0-9]/g, '')?.slice(0, 3) || 185),
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) {
      alert('Please provide product name and SKU.');
      return;
    }

    const priceSqFtEstimate = formData.unitPrice ? `₹${formData.unitPrice} / sq.ft` : formData.priceSqFtEstimate;
    addProduct({
      ...formData,
      priceSqFtEstimate,
      priceBand: 'Premium Range',
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const priceSqFtEstimate = formData.unitPrice ? `₹${formData.unitPrice} / sq.ft` : formData.priceSqFtEstimate;
    updateProduct(editingProduct.id, {
      ...formData,
      priceSqFtEstimate,
    });

    setEditingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct.id);
      setDeletingProduct(null);
    }
  };

  const handleFileUpload = async (field: 'mainImage' | 'textureImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      
      const response = await fetch('https://api.imgbb.com/1/upload?key=d01d029dcf7ed515a697ca6ae14e57f8', {
        method: 'POST',
        body: uploadData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormData((prev) => ({ ...prev, [field]: data.data.url }));
      } else {
        throw new Error(data.error?.message || 'ImgBB upload failed');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesBin = p.warehouseBin && p.warehouseBin.toLowerCase().includes(q);
        const matchesLot = p.batchLotNumber && p.batchLotNumber.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesCategory && !matchesBin && !matchesLot) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Finish
      if (selectedFinish !== 'all') {
        const finish = (p.finish || (p.finishesAvailable ? p.finishesAvailable.join(' ') : '')) as string;
        if (!finish.toLowerCase().includes(selectedFinish.toLowerCase())) {
          return false;
        }
      }

      // Stock Status
      if (selectedStockStatus === 'in-stock' && !p.inStock) return false;
      if (selectedStockStatus === 'low-stock') {
        const current = p.stockQuantityBoxes || p.stockQuantitySlabs || 0;
        if (current > (p.minThreshold || 30)) return false;
      }
      if (selectedStockStatus === 'out-of-stock' && (p.stockQuantityBoxes || p.stockQuantitySlabs || 0) > 0) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedFinish, selectedStockStatus]);

  const categoriesList = [
    { value: 'all', label: 'All Categories' },
    { value: 'tiles', label: 'Porcelain Tiles' },
    { value: 'slabs', label: 'Sintered Slabs (120×240)' },
    { value: 'granite', label: 'Natural Granite' },
    { value: 'marble', label: 'Imported Marble' },
    { value: 'quartz', label: 'Engineered Quartz' },
  ];

  const finishesList = [
    { value: 'all', label: 'All Finishes' },
    { value: 'Polished', label: 'High Gloss / Polished' },
    { value: 'Silk Matte', label: 'Silk Matte' },
    { value: 'Carving', label: '3D Fluted Carving' },
    { value: 'Bookmatch', label: 'Bookmatch Mirror' },
    { value: 'Leather', label: 'Leather Finish' },
    { value: 'Anti-Skid', label: 'R11 Anti-Skid Rustic' },
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#20202C] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[#C5A880] mb-1">
            <Package className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">CATALOG MANAGEMENT</span>
          </div>
          <h1 className="font-serif-luxury text-3xl text-white font-light">
            Surface Repertoire & Catalog Manager
          </h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Manage specifications, high-res texture photography, square footage rates, and inventory status.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-[#C5A880]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Surface</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#121217] border border-[#222230] p-4 rounded-2xl shadow-xl">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by surface, SKU, bin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-white placeholder-[#78756D] focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-[#DDD8CE] focus:outline-none focus:border-[#C5A880]"
        >
          {categoriesList.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Finish Filter */}
        <select
          value={selectedFinish}
          onChange={(e) => setSelectedFinish(e.target.value)}
          className="px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-[#DDD8CE] focus:outline-none focus:border-[#C5A880]"
        >
          {finishesList.map((fin) => (
            <option key={fin.value} value={fin.value}>
              {fin.label}
            </option>
          ))}
        </select>

        {/* Stock Filter */}
        <select
          value={selectedStockStatus}
          onChange={(e) => setSelectedStockStatus(e.target.value)}
          className="px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-[#DDD8CE] focus:outline-none focus:border-[#C5A880]"
        >
          <option value="all">All Stock Statuses</option>
          <option value="in-stock">In Stock (Healthy)</option>
          <option value="low-stock">Low Stock Alerts</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Catalog Table */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 flex items-center justify-between text-xs font-mono text-[#8E8A80]">
          <span>Showing {filteredProducts.length} of {products.length} Surfaces</span>
          <span className="text-[#C5A880]">Live Atelier Sync Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[900px]">
            <thead className="bg-[#161620] text-[#8E8A80] font-mono uppercase border-b border-[#222230]">
              <tr>
                <th className="p-4">Surface Preview</th>
                <th className="p-4">SKU / Code</th>
                <th className="p-4">Category & Material</th>
                <th className="p-4">Dimensions</th>
                <th className="p-4">Stock & Bin</th>
                <th className="p-4">Guide Rate</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20202C] font-sans-luxury">
              {filteredProducts.map((item) => {
                const isInStock = 'inStock' in item ? Boolean(item.inStock) : true;
                const currentStock = item.stockQuantityBoxes !== undefined ? `${item.stockQuantityBoxes} Boxes` : `${item.stockQuantitySlabs} Slabs`;
                const isLow = (item.stockQuantityBoxes || item.stockQuantitySlabs || 0) <= (item.minThreshold || 30);
                const price = item.priceSqFtEstimate || item.priceBand;

                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="p-4 flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                        <Image src={item.mainImage} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-serif-luxury text-sm font-medium text-white line-clamp-1">{item.name}</p>
                        <span className="text-[10px] font-mono text-[#C5A880]">
                          {'finish' in item ? item.finish : 'Natural Leathered'}
                        </span>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="p-4 font-mono text-[#C5A880] font-medium">{item.sku}</td>

                    {/* Category & Material */}
                    <td className="p-4">
                      <p className="text-[#DDD9CF] capitalize font-medium">{item.category}</p>
                      <p className="text-[10px] text-[#8E8A80] font-mono">
                        {'material' in item ? item.material : 'Earth Volcanic Stone'}
                      </p>
                    </td>

                    {/* Dimensions */}
                    <td className="p-4 font-mono text-[#A8A49A]">
                      {'size' in item ? item.size : item.slabDimensions}
                      <span className="block text-[10px] text-[#6D6A62]">
                        {'thicknessMm' in item ? `${item.thicknessMm} mm thickness` : '20/30 mm gangsaw'}
                      </span>
                    </td>

                    {/* Stock & Warehouse Bin */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase ${
                            isLow
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          }`}
                        >
                          {currentStock}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#8E8A80] font-mono block mt-1">
                        Bin: {item.warehouseBin || 'Yard-01'} • {item.batchLotNumber || 'Lot-1'}
                      </span>
                    </td>

                    {/* Guide Rate */}
                    <td className="p-4 font-mono text-white font-semibold">{price}</td>

                    {/* Action Buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 bg-[#181822] hover:bg-[#C5A880] text-[#A8A49A] hover:text-black rounded-lg border border-[#2B2B38] transition-colors"
                          title="Edit Surface"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Stock Toggle */}
                        <button
                          onClick={() => toggleStockStatus(item.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-colors ${
                            isInStock
                              ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/30'
                          }`}
                          title="Toggle Live Status"
                        >
                          {isInStock ? 'Live' : 'By Order'}
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeletingProduct(item)}
                          className="p-2 bg-[#181822] hover:bg-red-500/20 text-[#A8A49A] hover:text-red-400 rounded-lg border border-[#2B2B38] transition-colors"
                          title="Delete Surface"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal Drawer */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-scale">
          <div className="relative w-full max-w-3xl bg-[#14141A] border border-[#2E2E40] text-[#EDE9E1] shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#242434] bg-[#111116]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl text-white font-medium">
                    {editingProduct ? `Edit Surface: ${editingProduct.name}` : 'Add New Architectural Surface'}
                  </h3>
                  <p className="text-xs text-[#8E8A80]">Configure specifications, dimensions, rates, and stock.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-2 text-[#88857C] hover:text-white rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form
              onSubmit={editingProduct ? handleSaveEdit : handleSaveAdd}
              className="p-6 overflow-y-auto space-y-6 flex-1 text-xs"
            >
              {/* Row 1: Name & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Surface Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Calacatta Luxe Royale"
                    className="w-full px-4 py-2.5 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">SKU / Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. JT-SLAB-108"
                    className="w-full px-4 py-2.5 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-[#C5A880] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Row 2: Category, Material, Finish */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Category *</label>
                  <select
                    value={formData.category === '' ? '' : (STANDARD_CATEGORIES.includes(formData.category as string) ? formData.category : 'custom')}
                    onChange={(e) => {
                      setFormData({ ...formData, category: e.target.value as any });
                    }}
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="" disabled>Select Category...</option>
                    <option value="tiles">Porcelain Tiles</option>
                    <option value="slabs">Sintered Slabs (120×240)</option>
                    <option value="granite">Natural Granite Slabs</option>
                    <option value="marble">Imported Marble</option>
                    <option value="quartz">Engineered Quartz</option>
                    <option value="custom">Other (Custom...)</option>
                  </select>
                  {(formData.category === 'custom' || (!STANDARD_CATEGORIES.includes(formData.category as string) && formData.category !== '')) && (
                    <input
                      type="text"
                      placeholder="Type custom category..."
                      value={formData.category === 'custom' ? '' : formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full mt-2 px-3 py-2 bg-[#1A1A24] border border-[#C5A880]/50 rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                      autoFocus
                    />
                  )}
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Material Composition *</label>
                  <select
                    value={formData.material === '' ? '' : (STANDARD_MATERIALS.includes(formData.material as string) ? formData.material : 'custom')}
                    onChange={(e) => {
                      setFormData({ ...formData, material: e.target.value as any });
                    }}
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="" disabled>Select Material...</option>
                    <option value="Glazed Vitrified (GVT)">Glazed Vitrified (GVT)</option>
                    <option value="Polished Glazed Vitrified (PGVT)">Polished Glazed Vitrified (PGVT)</option>
                    <option value="Full Body Porcelain">Full Body Porcelain</option>
                    <option value="Sintered Stone Slab">Sintered Stone Slab</option>
                    <option value="Natural Granite">Natural Granite</option>
                    <option value="Imported Italian Marble">Imported Italian Marble</option>
                    <option value="custom">Other (Custom...)</option>
                  </select>
                  {(formData.material === 'custom' || (!STANDARD_MATERIALS.includes(formData.material as string) && formData.material !== '')) && (
                    <input
                      type="text"
                      placeholder="Type custom material..."
                      value={formData.material === 'custom' ? '' : formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value as any })}
                      className="w-full mt-2 px-3 py-2 bg-[#1A1A24] border border-[#C5A880]/50 rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                      autoFocus
                    />
                  )}
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Surface Finish *</label>
                  <select
                    value={formData.finish === '' ? '' : (STANDARD_FINISHES.includes(formData.finish as string) ? formData.finish : 'custom')}
                    onChange={(e) => {
                      setFormData({ ...formData, finish: e.target.value as any });
                    }}
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="" disabled>Select Finish...</option>
                    <option value="High Gloss / Polished">High Gloss / Polished</option>
                    <option value="Silk Matte">Silk Matte & Cashmere</option>
                    <option value="Carving & Fluted">3D Carving & Fluted</option>
                    <option value="Bookmatch">Bookmatch Mirror</option>
                    <option value="Leather & Flamed">Leather & Flamed Finish</option>
                    <option value="Anti-Skid / R11 Rustic">Anti-Skid / R11 Rustic</option>
                    <option value="custom">Other (Custom...)</option>
                  </select>
                  {(formData.finish === 'custom' || (!STANDARD_FINISHES.includes(formData.finish as string) && formData.finish !== '')) && (
                    <input
                      type="text"
                      placeholder="Type custom finish..."
                      value={formData.finish === 'custom' ? '' : formData.finish}
                      onChange={(e) => setFormData({ ...formData, finish: e.target.value as any })}
                      className="w-full mt-2 px-3 py-2 bg-[#1A1A24] border border-[#C5A880]/50 rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                      autoFocus
                    />
                  )}
                </div>
              </div>

              {/* Row 3: Dimensions, Thickness, Box Coverage */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Size Format</label>
                  <input
                    type="text"
                    value={formData.size || '120 × 180 cm'}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="120 × 180 cm"
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Thickness (mm)</label>
                  <input
                    type="number"
                    value={formData.thicknessMm || 9}
                    onChange={(e) => setFormData({ ...formData, thicknessMm: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Box Coverage (sq.ft)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.boxCoverageSqFt || 23.25}
                    onChange={(e) => setFormData({ ...formData, boxCoverageSqFt: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Rate (₹ / sq.ft) *</label>
                  <input
                    type="number"
                    required
                    value={formData.unitPrice || 185}
                    onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-[#C5A880] font-semibold"
                  />
                </div>
              </div>

              {/* Row 4: Stock & Warehouse Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Stock Quantity (Boxes)</label>
                  <input
                    type="number"
                    value={formData.stockQuantityBoxes || 100}
                    onChange={(e) => setFormData({ ...formData, stockQuantityBoxes: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Warehouse Bin / Location</label>
                  <input
                    type="text"
                    value={formData.warehouseBin || 'Bay-A1'}
                    onChange={(e) => setFormData({ ...formData, warehouseBin: e.target.value })}
                    placeholder="Bay-A2 or Yard-3"
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Batch / Lot Number</label>
                  <input
                    type="text"
                    value={formData.batchLotNumber || 'Batch #LOT-990-GVT'}
                    onChange={(e) => setFormData({ ...formData, batchLotNumber: e.target.value })}
                    placeholder="Batch #LOT-884"
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-white"
                  />
                </div>
              </div>

              {/* Row 5: High-Res Image URLs & Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80]">Main Showcase Photo</label>
                  
                  {/* File Upload */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-[#55524B]">Upload High-Res Image to Cloud Storage:</span>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => handleFileUpload('mainImage', e)}
                      disabled={isUploading}
                      className="block w-full text-xs text-[#8E8A80]
                        file:mr-3 file:py-1.5 file:px-3
                        file:rounded-lg file:border border-[#2D2D3E]
                        file:text-[10px] file:font-semibold
                        file:bg-[#1A1A24] file:text-[#C5A880]
                        hover:file:bg-[#20202E] file:cursor-pointer cursor-pointer disabled:opacity-50"
                    />
                  </div>

                  {/* URL Fallback */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-[#55524B]">Or paste an external Image URL:</span>
                    <input
                      type="text"
                      value={formData.mainImage || ''}
                      onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-white text-[11px] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80]">Macro Texture Photo</label>
                  
                  {/* File Upload */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-[#55524B]">Upload High-Res Image to Cloud Storage:</span>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => handleFileUpload('textureImage', e)}
                      disabled={isUploading}
                      className="block w-full text-xs text-[#8E8A80]
                        file:mr-3 file:py-1.5 file:px-3
                        file:rounded-lg file:border border-[#2D2D3E]
                        file:text-[10px] file:font-semibold
                        file:bg-[#1A1A24] file:text-[#C5A880]
                        hover:file:bg-[#20202E] file:cursor-pointer cursor-pointer disabled:opacity-50"
                    />
                  </div>

                  {/* URL Fallback */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-[#55524B]">Or paste an external Image URL:</span>
                    <input
                      type="text"
                      value={formData.textureImage || ''}
                      onChange={(e) => setFormData({ ...formData, textureImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl font-mono text-white text-[11px] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 6: Description */}
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Curatorial Editorial Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe veining, nano-mirror finish, aesthetic styling..."
                  className="w-full px-4 py-2.5 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Row 7: Space Suitability */}
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Space Suitability (Select all that apply)</label>
                <div className="flex flex-wrap gap-4 p-3 bg-[#1A1A24] border border-[#2D2D3E] rounded-xl">
                  {[
                    { id: 'living-room', label: 'Living Room & Lounges' },
                    { id: 'bathroom', label: 'Bathroom & Wellness' },
                    { id: 'kitchen', label: 'Kitchen & Culinary' },
                    { id: 'outdoor', label: 'Outdoor & Terraces' }
                  ].map(space => (
                    <label key={space.id} className="flex items-center gap-2 text-xs text-[#DDD8CE] cursor-pointer hover:text-white transition-colors">
                      <input 
                        type="checkbox"
                        checked={formData.suitableSpaces?.includes(space.id as any) || false}
                        onChange={(e) => {
                          const currentSpaces = formData.suitableSpaces || [];
                          if (e.target.checked) {
                            setFormData({ ...formData, suitableSpaces: [...currentSpaces, space.id as any] });
                          } else {
                            setFormData({ ...formData, suitableSpaces: currentSpaces.filter(s => s !== space.id) });
                          }
                        }}
                        className="accent-[#C5A880] w-3.5 h-3.5 cursor-pointer"
                      />
                      {space.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#242434]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2.5 bg-[#1B1B24] hover:bg-[#252532] text-white font-mono uppercase rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold font-mono uppercase rounded-xl transition-all shadow-lg shadow-[#C5A880]/20 disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : (editingProduct ? 'Save Changes' : 'Publish Surface to Catalog')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-scale">
          <div className="w-full max-w-md bg-[#14141A] border border-red-500/30 text-white rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif-luxury text-xl font-medium text-white">Delete Surface?</h3>
              <p className="text-xs text-[#8E8A80]">
                Are you sure you want to remove <span className="text-white font-semibold">&quot;{deletingProduct.name}&quot;</span> ({deletingProduct.sku}) from the catalog? This action will update live showroom availability.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-5 py-2 bg-[#1B1B24] hover:bg-[#252532] text-white font-mono text-xs uppercase rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-mono text-xs uppercase rounded-xl transition-colors shadow-lg shadow-red-500/20"
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
