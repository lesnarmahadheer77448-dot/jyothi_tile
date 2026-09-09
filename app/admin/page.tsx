'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  Receipt, 
  Boxes, 
  TrendingUp, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  MessageSquare, 
  AlertTriangle, 
  ShieldCheck,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';

export default function AdminDashboardOverviewPage() {
  const { products, invoices, totalGrossRevenue, totalSqFtSold, lowStockItems, totalInvoicesCount } = useAdminData();

  const kpis = [
    {
      label: 'Gross Invoiced Sales',
      value: `₹${(totalGrossRevenue / 100000).toFixed(2)} Lakhs`,
      change: '+16.4% this month',
      subtext: `Across ${totalInvoicesCount} invoices`,
      icon: TrendingUp,
      color: 'text-[#C5A880]',
      bg: 'bg-[#C5A880]/10',
    },
    {
      label: 'Total Catalog Surfaces',
      value: `${products.length} Items`,
      change: 'Active in showroom',
      subtext: 'Tiles, Slabs & Granite',
      icon: Package,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Total Area Specified',
      value: `${totalSqFtSold.toLocaleString()} sq.ft`,
      change: 'High-value villa scope',
      subtext: 'Net bill of quantities',
      icon: Layers,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Low Stock Inventory Alerts',
      value: `${lowStockItems.length} Surfaces`,
      change: lowStockItems.length > 0 ? 'Requires restock' : 'Healthy inventory',
      subtext: 'Below minimum threshold',
      icon: AlertTriangle,
      color: lowStockItems.length > 0 ? 'text-amber-400' : 'text-emerald-400',
      bg: lowStockItems.length > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10',
    },
    {
      label: 'Active Invoices & POS',
      value: `${totalInvoicesCount} Generated`,
      change: 'Proforma & Tax Invoices',
      subtext: 'Instant WhatsApp dispatch',
      icon: Receipt,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'VIP Showroom Bookings',
      value: '18 Active RFQs',
      change: 'Architects & Clients',
      subtext: 'Mumbai & Bangalore centres',
      icon: Users,
      color: 'text-[#C5A880]',
      bg: 'bg-[#C5A880]/10',
    },
  ];

  const recentEnquiries = [
    { client: 'Ar. Rajesh Mehta (Studio Lotus)', project: 'Alibaug Seafront Villa', surfaces: 'Calacatta Luxe Royale, Titanium Granite', scope: '3,460 sq.ft', date: 'Today, 11:20 AM', status: 'NEW RFQ', phone: '9820089123' },
    { client: 'Sanjay Godrej & Partners', project: 'Worli Sky Penthouse Master Bath', surfaces: 'Statuario Altissimo 3D Fluted', scope: '1,800 sq.ft', date: 'Today, 09:45 AM', status: 'SAMPLE SENT', phone: '9821144556' },
    { client: 'Priya Kothari', project: 'Bangalore Indiranagar Residence', surfaces: 'Travertine Roman Navona Silk', scope: '1,450 sq.ft', date: 'Yesterday', status: 'QUOTED', phone: '9845011223' },
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#20202C]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">EXECUTIVE MANAGEMENT TERMINAL</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
            Jyothi Tiles Admin Suite
          </h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Live showroom operations, inventory health, client invoices, and sales intelligence.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#C5A880]/15"
          >
            <Plus className="w-4 h-4" />
            <span>Add Surface</span>
          </Link>
          <Link
            href="/admin/billing"
            className="px-4 py-2.5 bg-[#1B1B24] hover:bg-[#252532] border border-[#2D2D3E] text-white text-xs font-mono uppercase rounded-xl flex items-center gap-2 transition-colors"
          >
            <Receipt className="w-4 h-4 text-[#C5A880]" />
            <span>Create Invoice</span>
          </Link>
          <Link
            href="/admin/stock"
            className="px-4 py-2.5 bg-[#1B1B24] hover:bg-[#252532] border border-[#2D2D3E] text-white text-xs font-mono uppercase rounded-xl flex items-center gap-2 transition-colors"
          >
            <Boxes className="w-4 h-4 text-amber-400" />
            <span>Adjust Stock</span>
          </Link>
        </div>
      </div>

      {/* 6 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-3 shadow-xl hover:border-[#C5A880]/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E8A80]">
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="font-serif-luxury text-3xl text-white font-medium tracking-tight">
                {kpi.value}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-white/5">
                <span className={kpi.color}>{kpi.change}</span>
                <span className="text-[#6D6A62]">{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Revenue Trend & Stock Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Monthly Invoiced Sales Trend (8 Cols) */}
        <div className="lg:col-span-8 bg-[#121217] border border-[#222230] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
                SALES VELOCITY
              </span>
              <h3 className="font-serif-luxury text-xl text-white">Monthly Invoiced Revenue (2026)</h3>
            </div>
            <Link
              href="/admin/sales"
              className="text-xs font-mono text-[#C5A880] hover:underline uppercase flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* SVG Line / Bar Graphic */}
          <div className="pt-4 space-y-4">
            <div className="h-48 w-full flex items-end justify-between gap-2 sm:gap-4 px-2">
              {[
                { month: 'Mar', val: 12.4, height: '40%' },
                { month: 'Apr', val: 18.2, height: '55%' },
                { month: 'May', val: 15.6, height: '48%' },
                { month: 'Jun', val: 22.8, height: '70%' },
                { month: 'Jul', val: 28.5, height: '88%' },
                { month: 'Aug', val: 34.2, height: '100%', active: true },
              ].map((bar) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{bar.val}L
                  </span>
                  <div
                    className={`w-full max-w-[48px] rounded-t-lg transition-all duration-500 ${
                      bar.active
                        ? 'bg-gradient-to-t from-[#C5A880] to-[#E5D2B8] shadow-lg shadow-[#C5A880]/20'
                        : 'bg-[#20202E] group-hover:bg-[#2B2B3D]'
                    }`}
                    style={{ height: bar.height }}
                  />
                  <span className={`text-[10px] font-mono ${bar.active ? 'text-white font-semibold' : 'text-[#8E8A80]'}`}>
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-mono text-[#8E8A80] text-center">
              Highest sales velocity driven by 120×240 cm Sintered Slabs and Brazilian Titanium Granite.
            </p>
          </div>
        </div>

        {/* Right: Low Stock Alert Radar (4 Cols) */}
        <div className="lg:col-span-4 bg-[#121217] border border-[#222230] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest block">
                WAREHOUSE RADAR
              </span>
              <h3 className="font-serif-luxury text-xl text-white">Stock Health</h3>
            </div>
            <Link href="/admin/stock" className="text-xs font-mono text-amber-400 hover:underline uppercase">
              Manage →
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockItems.length > 0 ? (
              lowStockItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#181822] rounded-xl border border-amber-500/20 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-white text-xs font-medium truncate">{item.name}</p>
                    <p className="text-[10px] text-[#8E8A80] font-mono">
                      SKU: {item.sku} • Bin: {item.warehouseBin || 'Yard'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-amber-400 font-bold block">
                      {item.stockQuantityBoxes !== undefined ? `${item.stockQuantityBoxes} Bxs` : `${item.stockQuantitySlabs} Slabs`}
                    </span>
                    <span className="text-[9px] font-mono text-[#8E8A80]">Min: {item.minThreshold || 30}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#DDD9CF]">All stock levels are optimal.</p>
              </div>
            )}
          </div>

          <Link
            href="/admin/stock"
            className="block w-full py-3 bg-[#1B1B24] hover:bg-[#222230] border border-[#2A2A38] text-white text-center text-xs font-mono uppercase rounded-xl transition-colors"
          >
            Open Stock Inventory Console
          </Link>
        </div>
      </div>

      {/* Recent Invoices & POS Stream */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
              RECENT BILLING ACTIVITY
            </span>
            <h3 className="font-serif-luxury text-2xl text-white">Generated Proforma & Tax Invoices</h3>
          </div>
          <Link
            href="/admin/billing"
            className="px-4 py-2 bg-[#C5A880] hover:bg-[#D6BC97] text-black text-xs font-mono font-semibold uppercase rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Proforma</span>
          </Link>
        </div>

        <div className="divide-y divide-[#20202C] overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="text-[#8E8A80] font-mono uppercase pb-3">
                <th className="py-3">Invoice Number</th>
                <th className="py-3">Client & Project</th>
                <th className="py-3">Surfaces Scope</th>
                <th className="py-3">Grand Total</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Outreach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans-luxury">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 font-mono text-[#C5A880] font-medium">{inv.invoiceNumber}</td>
                  <td className="py-4">
                    <p className="text-white font-medium">{inv.clientName}</p>
                    <p className="text-[10px] text-[#8E8A80] font-mono">{inv.projectType}</p>
                  </td>
                  <td className="py-4 text-[#DDD9CF] font-mono text-[11px]">
                    {inv.items.map((it) => `${it.name} (${it.areaSqFt} sq.ft)`).join(', ')}
                  </td>
                  <td className="py-4 font-mono font-semibold text-white">
                    ₹{inv.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2.5 py-1 rounded font-mono text-[10px] uppercase ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <a
                      href={`https://wa.me/91${inv.clientPhone}?text=Hello%20${encodeURIComponent(inv.clientName)},%20here%20is%20your%20proforma%20invoice%20${inv.invoiceNumber}%20for%20₹${inv.grandTotal.toLocaleString()}%20from%20Jyothi%20Tiles.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-[#25D366]/20 text-[#25D366] rounded-lg font-mono text-xs inline-flex items-center gap-1 hover:bg-[#25D366]/30"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                      <span>WhatsApp Invoice</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Specifier Enquiries Stream */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
              LEADS & CRM INBOX
            </span>
            <h3 className="font-serif-luxury text-2xl text-white">Live Client Enquiries Stream</h3>
          </div>
          <Link href="/admin/enquiries" className="text-xs text-[#C5A880] hover:underline font-mono uppercase">
            View All in CRM →
          </Link>
        </div>

        <div className="divide-y divide-[#20202C] overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="text-[#8E8A80] font-mono uppercase pb-3">
                <th className="py-3">Client / Architect</th>
                <th className="py-3">Project</th>
                <th className="py-3">Specified Materials</th>
                <th className="py-3">Scope</th>
                <th className="py-3">Stage</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans-luxury">
              {recentEnquiries.map((enq) => (
                <tr key={enq.client} className="hover:bg-white/[0.02]">
                  <td className="py-4 font-medium text-white">{enq.client}</td>
                  <td className="py-4 text-[#DDD9CF]">{enq.project}</td>
                  <td className="py-4 text-[#C5A880] font-mono text-[11px]">{enq.surfaces}</td>
                  <td className="py-4 font-mono text-[#8E8A80]">{enq.scope}</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-[#C5A880]/20 text-[#C5A880] rounded font-mono text-[10px] uppercase">
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <a
                      href={`https://wa.me/91${enq.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-[#181822] hover:bg-[#25D366]/20 border border-[#2B2B38] text-white hover:text-[#25D366] rounded-lg font-mono text-xs inline-flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Chat</span>
                    </a>
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
