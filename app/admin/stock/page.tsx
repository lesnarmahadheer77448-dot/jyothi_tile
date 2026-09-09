'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Boxes, 
  Search, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Clock, 
  Layers, 
  SlidersHorizontal,
  X,
  CheckCircle2
} from 'lucide-react';
import { useAdminData, UnifiedSurface } from '@/context/AdminDataContext';

export default function AdminStockManagementPage() {
  const { products, adjustStock, stockLogs, lowStockItems } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStockHealth, setSelectedStockHealth] = useState('all');

  // Restock / Adjustment Modal
  const [selectedProductForAdjust, setSelectedProductForAdjust] = useState<UnifiedSurface | null>(null);
  const [adjustQuantity, setAdjustQuantity] = useState<number>(50);
  const [adjustType, setAdjustType] = useState<'RESTOCK' | 'DISPATCH' | 'ADJUSTMENT' | 'DAMAGE'>('RESTOCK');
  const [adjustReason, setAdjustReason] = useState<string>('New Quarry Container Shipment');

  const handleOpenRestock = (product: UnifiedSurface) => {
    setSelectedProductForAdjust(product);
    setAdjustQuantity(50);
    setAdjustType('RESTOCK');
    setAdjustReason('New Quarry Shipment from Port');
  };

  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForAdjust) return;

    const quantityChange = adjustType === 'DISPATCH' || adjustType === 'DAMAGE' ? -Math.abs(adjustQuantity) : Math.abs(adjustQuantity);
    adjustStock(selectedProductForAdjust.id, quantityChange, adjustReason, adjustType);

    setSelectedProductForAdjust(null);
  };

  // Filtered Stock Items
  const filteredProducts = products.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = p.name.toLowerCase().includes(q);
      const matchesSku = p.sku.toLowerCase().includes(q);
      const matchesBin = p.warehouseBin && p.warehouseBin.toLowerCase().includes(q);
      const matchesLot = p.batchLotNumber && p.batchLotNumber.toLowerCase().includes(q);
      if (!matchesName && !matchesSku && !matchesBin && !matchesLot) return false;
    }

    if (selectedLocation !== 'all' && p.warehouseBin && !p.warehouseBin.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }

    const currentQty = p.stockQuantityBoxes || p.stockQuantitySlabs || 0;
    const minThreshold = p.minThreshold || 30;

    if (selectedStockHealth === 'low' && currentQty > minThreshold) return false;
    if (selectedStockHealth === 'healthy' && currentQty <= minThreshold) return false;
    if (selectedStockHealth === 'out' && currentQty > 0) return false;

    return true;
  });

  const totalStockBoxes = products.reduce((acc, p) => acc + (p.stockQuantityBoxes || 0), 0);
  const totalStockSlabs = products.reduce((acc, p) => acc + (p.stockQuantitySlabs || 0), 0);
  const totalWarehouseSqFt = products.reduce((acc, p) => acc + (p.stockSqFt || 0), 0);

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#20202C] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-400 mb-1">
            <Boxes className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">INVENTORY CONTROL & WAREHOUSE</span>
          </div>
          <h1 className="font-serif-luxury text-3xl text-white font-light">
            Stock Management & Warehouse Lots
          </h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Track box lots, granite slab yards, safety reorder thresholds, and physical warehouse bin coordinates.
          </p>
        </div>

        <button
          onClick={() => handleOpenRestock(products[0])}
          className="px-5 py-3 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-[#C5A880]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Quick Restock / Stock Log</span>
        </button>
      </div>

      {/* 4 Inventory Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-[#C5A880]">
            <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Total Warehouse Volume</span>
            <Layers className="w-4 h-4" />
          </div>
          <p className="font-serif-luxury text-3xl text-white font-medium">{Math.round(totalWarehouseSqFt).toLocaleString()} sq.ft</p>
          <span className="text-[11px] font-mono text-[#DDD8CE] block">{totalStockBoxes} Boxes + {totalStockSlabs} Monolith Slabs</span>
        </div>

        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-blue-400">
            <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Active Catalog Items</span>
            <Boxes className="w-4 h-4" />
          </div>
          <p className="font-serif-luxury text-3xl text-white font-medium">{products.length} Surfaces</p>
          <span className="text-[11px] font-mono text-blue-400 block">Across 6 Warehouse Bays</span>
        </div>

        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Low-Stock Warning Alerts</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="font-serif-luxury text-3xl text-amber-400 font-medium">{lowStockItems.length} Items</p>
          <span className="text-[11px] font-mono text-[#A8A49A] block">Below minimum safety buffer</span>
        </div>

        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Stock Movement Logs</span>
            <RefreshCw className="w-4 h-4" />
          </div>
          <p className="font-serif-luxury text-3xl text-white font-medium">{stockLogs.length} Records</p>
          <span className="text-[11px] font-mono text-emerald-400 block">Real-time audit tracking</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#121217] border border-[#222230] p-4 rounded-2xl shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search surface, lot batch, warehouse bin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-white placeholder-[#78756D] focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-[#DDD8CE] focus:outline-none focus:border-[#C5A880]"
        >
          <option value="all">All Warehouse Locations</option>
          <option value="Bay-A">Bay A (Central Tiles Rack)</option>
          <option value="Yard">Slab Yard (Natural Granite)</option>
        </select>

        <select
          value={selectedStockHealth}
          onChange={(e) => setSelectedStockHealth(e.target.value)}
          className="px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-[#DDD8CE] focus:outline-none focus:border-[#C5A880]"
        >
          <option value="all">All Stock Health Levels</option>
          <option value="healthy">Healthy Stock Level</option>
          <option value="low">Low Stock (Needs Restock)</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Stock Inventory Table */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 flex items-center justify-between text-xs font-mono text-[#8E8A80]">
          <span>Displaying {filteredProducts.length} Inventory Lines</span>
          <span className="text-[#C5A880]">Morbi & Brazil Quarry Batches</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#161620] text-[#8E8A80] font-mono uppercase border-b border-[#222230]">
              <tr>
                <th className="p-4">Surface Details</th>
                <th className="p-4">SKU / Code</th>
                <th className="p-4">Warehouse Location</th>
                <th className="p-4">Quarry Lot / Batch</th>
                <th className="p-4">Available Inventory</th>
                <th className="p-4">Health Status</th>
                <th className="p-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20202C] font-sans-luxury">
              {filteredProducts.map((item) => {
                const currentUnits = item.stockQuantityBoxes !== undefined ? item.stockQuantityBoxes : item.stockQuantitySlabs || 0;
                const unitName = item.stockQuantityBoxes !== undefined ? 'Boxes' : 'Slabs';
                const min = item.minThreshold || 30;
                const isLow = currentUnits <= min && currentUnits > 0;
                const isOut = currentUnits === 0;

                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                        <Image src={item.mainImage} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-white line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-[#8E8A80] font-mono capitalize">{item.category}</p>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="p-4 font-mono text-[#C5A880] font-medium">{item.sku}</td>

                    {/* Warehouse Bin */}
                    <td className="p-4 font-mono text-white">
                      <span className="px-2.5 py-1 bg-[#191924] rounded border border-[#2B2B3C] text-[11px]">
                        {item.warehouseBin || 'Yard-01'}
                      </span>
                    </td>

                    {/* Batch Lot Number */}
                    <td className="p-4 font-mono text-[#A8A49A] text-[11px]">
                      {item.batchLotNumber || 'Batch #LOT-880-GVT'}
                    </td>

                    {/* Available Inventory */}
                    <td className="p-4 font-mono">
                      <p className="text-white font-bold text-sm">
                        {currentUnits} {unitName}
                      </p>
                      <p className="text-[10px] text-[#8E8A80]">
                        ~{Math.round(item.stockSqFt || (currentUnits * 23.25)).toLocaleString()} sq.ft total
                      </p>
                    </td>

                    {/* Health Status */}
                    <td className="p-4">
                      {isOut ? (
                        <span className="px-2.5 py-1 rounded font-mono text-[10px] uppercase bg-red-500/20 text-red-400 border border-red-500/40">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="px-2.5 py-1 rounded font-mono text-[10px] uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">
                          Low Stock ({currentUnits}/{min})
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded font-mono text-[10px] uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          Optimal ({currentUnits})
                        </span>
                      )}
                    </td>

                    {/* Quick Restock Action */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenRestock(item)}
                        className="px-3 py-1.5 bg-[#1B1B24] hover:bg-[#C5A880] text-white hover:text-black border border-[#2D2D3E] hover:border-[#C5A880] rounded-lg font-mono text-xs transition-all uppercase"
                      >
                        Adjust / Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-Time Stock Movement Audit Logs */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
              AUDIT TRAIL
            </span>
            <h3 className="font-serif-luxury text-2xl text-white">Stock Movement & Adjustment Logs</h3>
          </div>
          <span className="text-xs font-mono text-[#8E8A80]">{stockLogs.length} Total Audit Entries</span>
        </div>

        {stockLogs.length > 0 ? (
          <div className="divide-y divide-[#20202C] overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead>
                <tr className="text-[#8E8A80] font-mono uppercase pb-3">
                  <th className="py-3">Timestamp</th>
                  <th className="py-3">Surface & SKU</th>
                  <th className="py-3">Movement Type</th>
                  <th className="py-3">Quantity Delta</th>
                  <th className="py-3">Stock Before &rarr; After</th>
                  <th className="py-3">Audit Reason / Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans-luxury">
                {stockLogs.map((log) => {
                  const isPositive = log.quantityChanged > 0;
                  return (
                    <tr key={log.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 font-mono text-[#8E8A80] text-[11px]">{log.timestamp}</td>
                      <td className="py-3.5">
                        <p className="text-white font-medium">{log.productName}</p>
                        <p className="text-[10px] text-[#C5A880] font-mono">{log.sku}</p>
                      </td>
                      <td className="py-3.5 font-mono">
                        <span className="px-2 py-0.5 rounded bg-[#181822] text-[#DDD8CE] border border-white/10 text-[10px]">
                          {log.changeType}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono font-bold">
                        <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
                          {isPositive ? `+${log.quantityChanged}` : log.quantityChanged} {log.unit}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono text-[#A8A49A]">
                        {log.previousStock} &rarr; <span className="text-white font-semibold">{log.newStock} {log.unit}</span>
                      </td>
                      <td className="py-3.5 text-[#DDD8CE] text-xs font-light">{log.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-xs text-[#8E8A80] py-8">
            No stock adjustments recorded yet. Use &quot;Quick Restock&quot; to log incoming shipments or dispatches.
          </p>
        )}
      </div>

      {/* Restock / Stock Adjustment Modal */}
      {selectedProductForAdjust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-scale">
          <div className="relative w-full max-w-lg bg-[#14141A] border border-[#2D2D3E] text-[#EDE9E1] shadow-2xl rounded-3xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#242434] bg-[#111116]">
              <div>
                <h3 className="font-serif-luxury text-xl text-white font-medium">
                  Adjust Inventory: {selectedProductForAdjust.name}
                </h3>
                <p className="text-xs text-[#C5A880] font-mono">SKU: {selectedProductForAdjust.sku}</p>
              </div>
              <button
                onClick={() => setSelectedProductForAdjust(null)}
                className="p-2 text-[#88857C] hover:text-white rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdjustment} className="p-6 space-y-4 text-xs">
              {/* Product Info Banner */}
              <div className="p-3 bg-[#181822] rounded-xl border border-[#282836] flex items-center justify-between font-mono">
                <span>Current Stock:</span>
                <span className="text-white font-bold">
                  {selectedProductForAdjust.stockQuantityBoxes !== undefined
                    ? `${selectedProductForAdjust.stockQuantityBoxes} Boxes`
                    : `${selectedProductForAdjust.stockQuantitySlabs} Slabs`}
                </span>
              </div>

              {/* Movement Type */}
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Action Type</label>
                <select
                  value={adjustType}
                  onChange={(e) => setAdjustType(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="RESTOCK">+ Restock (Incoming Quarry Shipment)</option>
                  <option value="DISPATCH">- Dispatch (Client Order Delivery)</option>
                  <option value="ADJUSTMENT">~ Audit Correction / Inventory Sync</option>
                  <option value="DAMAGE">- Damage / Breakage Write-off</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">
                  Quantity ({selectedProductForAdjust.stockQuantityBoxes !== undefined ? 'Boxes' : 'Slabs'})
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={adjustQuantity}
                  onChange={(e) => setAdjustQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl font-mono text-white text-base focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Audit Reason / Shipment Note *</label>
                <input
                  type="text"
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g. Received container batch #42 from Morbi"
                  className="w-full px-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#242434]">
                <button
                  type="button"
                  onClick={() => setSelectedProductForAdjust(null)}
                  className="px-5 py-2.5 bg-[#181822] hover:bg-[#22222E] text-white font-mono uppercase rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold font-mono uppercase rounded-xl shadow-lg shadow-[#C5A880]/20"
                >
                  Apply Stock Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
