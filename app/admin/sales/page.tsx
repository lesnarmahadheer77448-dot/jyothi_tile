'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Download, 
  Layers, 
  Receipt, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Calendar, 
  ArrowUpRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';

export default function AdminSalesReportsPage() {
  const { invoices, totalGrossRevenue, totalSqFtSold, products } = useAdminData();

  const paidInvoices = invoices.filter((i) => i.status === 'Paid' || i.status === 'Pending');
  const aov = paidInvoices.length > 0 ? Math.round(totalGrossRevenue / paidInvoices.length) : 0;
  const gstCollected = Math.round(paidInvoices.reduce((acc, i) => acc + i.taxAmount, 0));

  // Category Breakdown
  const categoryBreakdown = [
    { name: 'Sintered Stone Slabs (120×240 cm)', share: 44, amount: Math.round(totalGrossRevenue * 0.44), color: 'bg-[#C5A880]' },
    { name: 'Natural Granite & Quartz Slabs', share: 29, amount: Math.round(totalGrossRevenue * 0.29), color: 'bg-blue-400' },
    { name: 'Glazed Vitrified GVT Floor Tiles', share: 19, amount: Math.round(totalGrossRevenue * 0.19), color: 'bg-emerald-400' },
    { name: '3D Fluted Carvings & Accents', share: 8, amount: Math.round(totalGrossRevenue * 0.08), color: 'bg-purple-400' },
  ];

  // Space Breakdown
  const spaceBreakdown = [
    { name: 'Grand Living & Foyers', share: 42, color: 'bg-[#C5A880]' },
    { name: 'Master Bath Spas', share: 28, color: 'bg-blue-400' },
    { name: 'Kitchen Countertops & Islands', share: 18, color: 'bg-emerald-400' },
    { name: 'Outdoor Facades & Terraces', share: 12, color: 'bg-amber-400' },
  ];

  // Top Grossing Surfaces
  const topSurfaces = [
    { name: 'Calacatta Luxe Royale Sintered Porcelain', sku: 'JT-SLAB-108', category: 'Sintered Slab', sqft: 3200, revenue: 651200 },
    { name: 'Statuario Altissimo 3D Fluted Carving', sku: 'JT-CARV-204', category: 'Carving Tile', sqft: 1800, revenue: 435600 },
    { name: 'Titanium Gold Leather Granite Slab', sku: 'JT-GRAN-001', category: 'Granite Slab', sqft: 260, revenue: 122850 },
    { name: 'Travertine Roman Navona Silk Finish', sku: 'JT-TILE-102', category: 'GVT Tile', sqft: 1450, revenue: 268250 },
  ];

  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Invoice Number,Client Name,Phone,Project,Date,Status,Total Amount (INR)\n';

    invoices.forEach((inv) => {
      csvContent += `"${inv.invoiceNumber}","${inv.clientName}","${inv.clientPhone}","${inv.projectType}","${inv.date}","${inv.status}","${inv.grandTotal}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Jyothi_Tiles_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#20202C] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[#C5A880] mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">FINANCIAL INTELLIGENCE</span>
          </div>
          <h1 className="font-serif-luxury text-3xl text-white font-light">
            Sales Reports & Revenue Analytics
          </h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Comprehensive billing metrics, category performance, square footage velocity, and GST audit logs.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-5 py-3 bg-[#1B1B24] hover:bg-[#C5A880] text-white hover:text-black border border-[#2B2B38] font-semibold text-xs tracking-widest uppercase rounded-xl flex items-center gap-2 transition-all shadow-xl"
        >
          <Download className="w-4 h-4" />
          <span>Export Sales Audit (CSV)</span>
        </button>
      </div>

      {/* 4 Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Gross Invoiced Revenue</span>
          <p className="font-serif-luxury text-3xl text-[#C5A880] font-medium">₹{totalGrossRevenue.toLocaleString()}</p>
          <span className="text-[11px] font-mono text-emerald-400 block">+16.4% growth vs prior cycle</span>
        </div>

        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Average Order Value (AOV)</span>
          <p className="font-serif-luxury text-3xl text-white font-medium">₹{aov.toLocaleString()}</p>
          <span className="text-[11px] font-mono text-[#DDD8CE] block">Across residential villa scopes</span>
        </div>

        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Total Square Footage Sold</span>
          <p className="font-serif-luxury text-3xl text-blue-400 font-medium">{totalSqFtSold.toLocaleString()} sq.ft</p>
          <span className="text-[11px] font-mono text-blue-400 block">High specification volume</span>
        </div>

        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Total GST Collected (18%)</span>
          <p className="font-serif-luxury text-3xl text-purple-400 font-medium">₹{gstCollected.toLocaleString()}</p>
          <span className="text-[11px] font-mono text-[#8E8A80] block">CGST 9% + SGST 9% split</span>
        </div>
      </div>

      {/* Revenue Breakdown by Category & Space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Revenue Breakdown */}
        <div className="p-6 sm:p-8 bg-[#121217] border border-[#222230] rounded-3xl space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
              MATERIAL PERFORMANCE
            </span>
            <h3 className="font-serif-luxury text-xl text-white">Sales by Surface Category</h3>
          </div>

          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#DDD8CE]">{cat.name}</span>
                  <span className="text-white font-bold">{cat.share}% (₹{cat.amount.toLocaleString()})</span>
                </div>
                <div className="h-2 w-full bg-[#181822] rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Space Distribution */}
        <div className="p-6 sm:p-8 bg-[#121217] border border-[#222230] rounded-3xl space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
              ARCHITECTURAL APPLICATION
            </span>
            <h3 className="font-serif-luxury text-xl text-white">Sales by Project Space</h3>
          </div>

          <div className="space-y-4">
            {spaceBreakdown.map((sp) => (
              <div key={sp.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#DDD8CE]">{sp.name}</span>
                  <span className="text-white font-bold">{sp.share}% Share</span>
                </div>
                <div className="h-2 w-full bg-[#181822] rounded-full overflow-hidden">
                  <div className={`h-full ${sp.color} rounded-full`} style={{ width: `${sp.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Surfaces Table */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
              LEADERBOARD
            </span>
            <h3 className="font-serif-luxury text-2xl text-white">Top Grossing Architectural Surfaces</h3>
          </div>
          <span className="text-xs font-mono text-[#8E8A80]">Ranked by Total Invoiced Revenue</span>
        </div>

        <div className="divide-y divide-[#20202C] overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="text-[#8E8A80] font-mono uppercase pb-3">
                <th className="py-3">Rank</th>
                <th className="py-3">Surface & SKU</th>
                <th className="py-3">Material Category</th>
                <th className="py-3">Volume Specified</th>
                <th className="py-3 text-right">Gross Revenue (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans-luxury">
              {topSurfaces.map((surf, idx) => (
                <tr key={surf.sku} className="hover:bg-white/[0.02]">
                  <td className="py-4 font-mono font-bold text-[#C5A880]">0{idx + 1}</td>
                  <td className="py-4">
                    <p className="font-medium text-white">{surf.name}</p>
                    <p className="text-[10px] text-[#8E8A80] font-mono">{surf.sku}</p>
                  </td>
                  <td className="py-4 text-[#DDD8CE] font-mono">{surf.category}</td>
                  <td className="py-4 font-mono text-white font-semibold">{surf.sqft.toLocaleString()} sq.ft</td>
                  <td className="py-4 font-mono font-bold text-[#C5A880] text-sm text-right">
                    ₹{surf.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
