'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Receipt, 
  Plus, 
  Search, 
  Printer, 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  X,
  FileText,
  CreditCard,
  Building2
} from 'lucide-react';
import { useAdminData, Invoice, InvoiceLineItem } from '@/context/AdminDataContext';

export default function AdminBillingPage() {
  const { invoices, createInvoice, updateInvoiceStatus, deleteInvoice, products, totalGrossRevenue } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New Invoice Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectType, setProjectType] = useState('High-End Villa Specification');
  const [siteAddress, setSiteAddress] = useState('');
  const [gstin, setGstin] = useState('27AAAAA0000A1Z5');
  const [paymentMode, setPaymentMode] = useState<Invoice['paymentMode']>('Bank Transfer (NEFT/RTGS)');
  const [status, setStatus] = useState<Invoice['status']>('Pending');
  const [discountPercent, setDiscountPercent] = useState(5);
  const [notes, setNotes] = useState('Includes high-precision edge chamfering. Delivery by flatbed.');

  // Invoice Line Items in Builder
  const [items, setItems] = useState<InvoiceLineItem[]>([
    {
      productId: products[0]?.id || 'calacatta-luxe',
      name: products[0]?.name || 'Calacatta Luxe Royale Sintered Porcelain',
      sku: products[0]?.sku || 'JT-SLAB-108',
      type: 'tile',
      image: products[0]?.mainImage || '',
      rateSqFt: products[0]?.unitPrice || 185,
      areaSqFt: 1200,
      wastagePercent: 10,
      boxesNeeded: 57,
      lineTotal: 244200,
    }
  ]);

  const resetForm = () => {
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setProjectType('High-End Villa Specification');
    setSiteAddress('');
    setDiscountPercent(5);
    setItems([
      {
        productId: products[0]?.id || 'calacatta-luxe',
        name: products[0]?.name || 'Calacatta Luxe Royale Sintered Porcelain',
        sku: products[0]?.sku || 'JT-SLAB-108',
        type: 'tile',
        image: products[0]?.mainImage || '',
        rateSqFt: products[0]?.unitPrice || 185,
        areaSqFt: 1000,
        wastagePercent: 10,
        boxesNeeded: 48,
        lineTotal: 203500,
      }
    ]);
  };

  const handleAddItem = () => {
    const defaultProd = products[0];
    if (!defaultProd) return;
    const rate = defaultProd.unitPrice || 185;
    const coverage = 'boxCoverageSqFt' in defaultProd ? (defaultProd.boxCoverageSqFt || 23.25) : 65;
    const area = 500;
    const gross = area * 1.1;
    const boxes = Math.ceil(gross / coverage);

    setItems([
      ...items,
      {
        productId: defaultProd.id,
        name: defaultProd.name,
        sku: defaultProd.sku,
        type: 'boxCoverageSqFt' in defaultProd ? 'tile' : 'granite',
        image: defaultProd.mainImage,
        rateSqFt: rate,
        areaSqFt: area,
        wastagePercent: 10,
        boxesNeeded: boxes,
        lineTotal: gross * rate,
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateItemProduct = (index: number, productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const rate = prod.unitPrice || 185;
    const coverage = 'boxCoverageSqFt' in prod ? (prod.boxCoverageSqFt || 23.25) : 65;
    const currentItem = items[index];
    const gross = currentItem.areaSqFt * (1 + currentItem.wastagePercent / 100);
    const boxes = Math.ceil(gross / coverage);

    const updated = [...items];
    updated[index] = {
      ...currentItem,
      productId: prod.id,
      name: prod.name,
      sku: prod.sku,
      type: 'boxCoverageSqFt' in prod ? 'tile' : 'granite',
      image: prod.mainImage,
      rateSqFt: rate,
      boxesNeeded: boxes,
      lineTotal: gross * rate,
    };
    setItems(updated);
  };

  const handleUpdateItemArea = (index: number, area: number, wastage: number, rate: number) => {
    const currentItem = items[index];
    const prod = products.find((p) => p.id === currentItem.productId);
    const coverage = prod && 'boxCoverageSqFt' in prod ? (prod.boxCoverageSqFt || 23.25) : 65;
    const gross = area * (1 + wastage / 100);
    const boxes = Math.ceil(gross / coverage);

    const updated = [...items];
    updated[index] = {
      ...currentItem,
      areaSqFt: area,
      wastagePercent: wastage,
      rateSqFt: rate,
      boxesNeeded: boxes,
      lineTotal: Math.round(gross * rate),
    };
    setItems(updated);
  };

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + it.lineTotal, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = Math.round((taxableAmount * 18) / 100);
  const grandTotal = taxableAmount + taxAmount;

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || items.length === 0) {
      alert('Please fill client name, phone number, and at least 1 surface item.');
      return;
    }

    const created = createInvoice({
      clientName,
      clientPhone: clientPhone.replace(/[^0-9]/g, ''),
      clientEmail,
      projectType,
      siteAddress,
      gstin,
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status,
      paymentMode,
      items,
      subtotal,
      discountPercent,
      discountAmount,
      taxPercent: 18,
      taxAmount,
      grandTotal,
      notes,
    });

    setIsCreateModalOpen(false);
    resetForm();
    setPreviewInvoice(created);
  };

  // Filtered Invoices
  const filteredInvoices = invoices.filter((inv) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNo = inv.invoiceNumber.toLowerCase().includes(q);
      const matchName = inv.clientName.toLowerCase().includes(q);
      const matchPhone = inv.clientPhone.includes(q);
      const matchProject = inv.projectType.toLowerCase().includes(q);
      if (!matchNo && !matchName && !matchPhone && !matchProject) return false;
    }

    if (statusFilter !== 'all' && inv.status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#20202C] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[#C5A880] mb-1">
            <Receipt className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">POINT OF SALE & INVOICING</span>
          </div>
          <h1 className="font-serif-luxury text-3xl text-white font-light">
            Billing POS & Proforma Invoicing
          </h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Generate tax proformas with automatic cutting buffers, 18% GST calculation, PDF print layouts, and instant WhatsApp dispatch.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="px-5 py-3 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-[#C5A880]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Proforma</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Gross Invoiced Amount</span>
          <p className="font-serif-luxury text-3xl text-white font-medium">₹{totalGrossRevenue.toLocaleString()}</p>
          <span className="text-[11px] font-mono text-[#C5A880]">Across {invoices.length} Total Invoices</span>
        </div>

        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Settled Invoices</span>
          <p className="font-serif-luxury text-3xl text-emerald-400 font-medium">
            {invoices.filter((i) => i.status === 'Paid').length} Paid
          </p>
          <span className="text-[11px] font-mono text-[#A8A49A]">Direct NEFT/RTGS verified</span>
        </div>

        <div className="p-6 bg-[#121217] border border-[#222230] rounded-2xl space-y-2 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#8E8A80]">Pending Collections</span>
          <p className="font-serif-luxury text-3xl text-amber-400 font-medium">
            {invoices.filter((i) => i.status === 'Pending').length} Pending
          </p>
          <span className="text-[11px] font-mono text-amber-400">1-click WhatsApp reminder ready</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121217] border border-[#222230] p-4 rounded-2xl shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice number, client, phone, project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-white placeholder-[#78756D] focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-[#DDD8CE] focus:outline-none focus:border-[#C5A880]"
        >
          <option value="all">All Invoice Statuses</option>
          <option value="Paid">Paid / Cleared</option>
          <option value="Pending">Pending Collection</option>
          <option value="Draft">Draft Quote</option>
        </select>
      </div>

      {/* Invoices List Table */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 flex items-center justify-between text-xs font-mono text-[#8E8A80]">
          <span>Showing {filteredInvoices.length} Invoices</span>
          <span className="text-[#C5A880]">GST 18% Compliant Engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[900px]">
            <thead className="bg-[#161620] text-[#8E8A80] font-mono uppercase border-b border-[#222230]">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client & Project</th>
                <th className="p-4">Date</th>
                <th className="p-4">Surfaces Billed</th>
                <th className="p-4">Grand Total (Incl. GST)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20202C] font-sans-luxury">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono text-[#C5A880] font-semibold">{inv.invoiceNumber}</td>
                  <td className="p-4">
                    <p className="text-white font-medium">{inv.clientName}</p>
                    <p className="text-[10px] text-[#8E8A80] font-mono">{inv.projectType}</p>
                  </td>
                  <td className="p-4 font-mono text-[#A8A49A]">{inv.date}</td>
                  <td className="p-4 font-mono text-[#DDD9CF] text-[11px]">
                    {inv.items.map((it) => `${it.name} (${it.areaSqFt} sq.ft)`).join(', ')}
                  </td>
                  <td className="p-4 font-mono font-bold text-white text-sm">
                    ₹{inv.grandTotal.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={inv.status}
                      onChange={(e) => updateInvoiceStatus(inv.id, e.target.value as Invoice['status'])}
                      className={`px-2 py-1 rounded text-[10px] font-mono uppercase border bg-[#181822] focus:outline-none ${
                        inv.status === 'Paid'
                          ? 'text-emerald-400 border-emerald-500/40'
                          : 'text-amber-400 border-amber-500/40'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Draft">Draft</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewInvoice(inv)}
                        className="px-3 py-1.5 bg-[#1B1B24] hover:bg-[#C5A880] text-white hover:text-black border border-[#2B2B38] rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print / View</span>
                      </button>

                      <a
                        href={`https://wa.me/91${inv.clientPhone}?text=Hello%20${encodeURIComponent(
                          inv.clientName
                        )},%20here%20is%20your%20proforma%20invoice%20${inv.invoiceNumber}%20for%20₹${inv.grandTotal.toLocaleString()}%20from%20Jyothi%20Tiles%20Atelier.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-lg font-mono text-xs inline-flex items-center gap-1.5"
                        title="Send Proforma to Client WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => deleteInvoice(inv.id)}
                        className="p-1.5 text-[#8E8A80] hover:text-red-400 rounded-lg hover:bg-red-500/10"
                        title="Delete Invoice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Generator Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-scale">
          <div className="relative w-full max-w-4xl bg-[#14141A] border border-[#2E2E40] text-[#EDE9E1] shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#242434] bg-[#111116]">
              <div>
                <h3 className="font-serif-luxury text-2xl text-white font-medium">
                  Generate Bespoke Proforma & Tax Invoice
                </h3>
                <p className="text-xs text-[#C5A880] font-mono">Auto 18% GST Engine + Box Coverage Conversion</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-[#88857C] hover:text-white rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Client Info Grid */}
              <div className="space-y-4 p-4 bg-[#111116] border border-[#232330] rounded-2xl">
                <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
                  01. Client & Project Coordinates
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Client / Architect Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Ar. Vikram Singhania"
                      className="w-full px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. 9820012345"
                      className="w-full px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl font-mono text-[#C5A880] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">GSTIN (Optional)</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="27AAAAA0000A1Z5"
                      className="w-full px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl font-mono text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Project Name & Type</label>
                    <input
                      type="text"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      placeholder="e.g. Alibaug Seafront Villa"
                      className="w-full px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Site Delivery Address</label>
                    <input
                      type="text"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      placeholder="e.g. Plot 14, Mandwa Beach Road, Alibaug"
                      className="w-full px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Line Items Builder */}
              <div className="space-y-4 p-4 bg-[#111116] border border-[#232330] rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest">
                    02. Specified Surface Items ({items.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-1 bg-[#1F1F2C] hover:bg-[#C5A880] text-white hover:text-black border border-[#2E2E40] rounded-lg font-mono text-[10px] uppercase transition-colors"
                  >
                    + Add Surface Line
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#181822] border border-[#282838] rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                    >
                      {/* Product Selector */}
                      <div className="sm:col-span-5">
                        <label className="block font-mono text-[9px] uppercase text-[#8E8A80] mb-1">Surface</label>
                        <select
                          value={item.productId}
                          onChange={(e) => handleUpdateItemProduct(idx, e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-[#121217] border border-[#2A2A3A] rounded-lg text-white text-xs truncate"
                        >
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.sku})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Net Area (sq.ft) */}
                      <div className="sm:col-span-2">
                        <label className="block font-mono text-[9px] uppercase text-[#8E8A80] mb-1">Net Area (sq.ft)</label>
                        <input
                          type="number"
                          min={1}
                          value={item.areaSqFt}
                          onChange={(e) =>
                            handleUpdateItemArea(idx, Number(e.target.value), item.wastagePercent, item.rateSqFt)
                          }
                          className="w-full px-2 py-1 bg-[#121217] border border-[#2A2A3A] rounded-lg font-mono text-white text-xs"
                        />
                      </div>

                      {/* Wastage Buffer */}
                      <div className="sm:col-span-2">
                        <label className="block font-mono text-[9px] uppercase text-[#8E8A80] mb-1">Wastage %</label>
                        <select
                          value={item.wastagePercent}
                          onChange={(e) =>
                            handleUpdateItemArea(idx, item.areaSqFt, Number(e.target.value), item.rateSqFt)
                          }
                          className="w-full px-2 py-1 bg-[#121217] border border-[#2A2A3A] rounded-lg font-mono text-white text-xs"
                        >
                          <option value={0}>0% Exact</option>
                          <option value={5}>+5% Simple</option>
                          <option value={10}>+10% Standard</option>
                          <option value={15}>+15% Herringbone</option>
                        </select>
                      </div>

                      {/* Rate / Sq.Ft */}
                      <div className="sm:col-span-2">
                        <label className="block font-mono text-[9px] uppercase text-[#8E8A80] mb-1">Rate (₹/sq.ft)</label>
                        <input
                          type="number"
                          value={item.rateSqFt}
                          onChange={(e) =>
                            handleUpdateItemArea(idx, item.areaSqFt, item.wastagePercent, Number(e.target.value))
                          }
                          className="w-full px-2 py-1 bg-[#121217] border border-[#2A2A3A] rounded-lg font-mono text-white text-xs"
                        />
                      </div>

                      {/* Remove Button */}
                      <div className="sm:col-span-1 text-right pt-4 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1.5 text-[#8E8A80] hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="sm:col-span-12 flex items-center justify-between text-[10px] font-mono text-[#C5A880] border-t border-white/5 pt-1.5 mt-1">
                        <span>
                          Boxes Needed: ~{item.boxesNeeded || 1} bxs (Gross: {Math.round(item.areaSqFt * (1 + item.wastagePercent / 100))} sq.ft)
                        </span>
                        <span className="font-bold text-white">Line Total: ₹{item.lineTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax & Discount Summary Block */}
              <div className="p-4 bg-[#111116] border border-[#232330] rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Trade Discount %</label>
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      className="w-32 px-3 py-1.5 bg-[#181822] border border-[#2B2B38] rounded-xl font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Terms & Notes</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. 50% advance, 50% prior to dispatch"
                      className="w-full px-3 py-1.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white"
                    />
                  </div>
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-2 bg-[#181822] p-4 rounded-xl border border-white/5 font-mono text-xs">
                  <div className="flex justify-between text-[#A8A49A]">
                    <span>Items Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#C5A880]">
                    <span>Trade Discount ({discountPercent}%):</span>
                    <span>- ₹{discountAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#A8A49A]">
                    <span>GST (18% — 9% CGST + 9% SGST):</span>
                    <span>+ ₹{taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm border-t border-white/10 pt-2">
                    <span>Grand Total:</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#242434]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-5 py-2.5 bg-[#181822] hover:bg-[#22222E] text-white font-mono uppercase rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold font-mono uppercase rounded-xl shadow-lg shadow-[#C5A880]/20"
                >
                  Save Proforma & View Printable Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Invoice Preview Modal */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-scale">
          <div className="relative w-full max-w-3xl bg-[#FFFFFF] text-[#111111] shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Top Control Bar (Non-printable) */}
            <div className="bg-[#14141A] text-white px-6 py-4 flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C5A880]" />
                <span className="font-mono text-xs uppercase text-[#C5A880]">
                  Official Proforma: {previewInvoice.invoiceNumber}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 bg-[#C5A880] text-black font-mono font-semibold text-xs rounded-lg flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setPreviewInvoice(null)}
                  className="p-1.5 text-[#88857C] hover:text-white rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet */}
            <div className="p-8 sm:p-12 overflow-y-auto space-y-8 text-xs font-sans">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-black/15 pb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold tracking-widest text-[#000000] uppercase">
                    JYOTHI TILES
                  </h2>
                  <p className="text-[10px] tracking-[0.2em] font-mono text-[#777] uppercase">
                    LUXURY DIGITAL SHOWROOM & NATURAL STONE ATELIER
                  </p>
                  <p className="text-[11px] text-[#444] mt-2 leading-relaxed">
                    Atelier 01, Ground Floor, Design District, Senapati Bapat Marg, Mumbai<br />
                    Phone: +91 96265 47707 | Email: concierge@jyothitiles.com<br />
                    GSTIN: 27AABCT9982Z1Z0
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-black text-white font-mono text-xs uppercase font-bold tracking-wider">
                    PROFORMA INVOICE
                  </span>
                  <p className="font-mono font-bold text-sm mt-2 text-black">{previewInvoice.invoiceNumber}</p>
                  <p className="font-mono text-[11px] text-[#666]">Date: {previewInvoice.date}</p>
                  <p className="font-mono text-[11px] text-[#666]">Due: {previewInvoice.dueDate}</p>
                </div>
              </div>

              {/* Bill To Coordinates */}
              <div className="grid grid-cols-2 gap-8 border-b border-black/10 pb-6">
                <div>
                  <span className="font-mono text-[9px] uppercase text-[#777] tracking-wider block mb-1">
                    BILLED TO:
                  </span>
                  <p className="font-bold text-sm text-black">{previewInvoice.clientName}</p>
                  <p className="text-[11px] text-[#444]">{previewInvoice.projectType}</p>
                  <p className="font-mono text-[11px] text-[#444]">Phone: +91 {previewInvoice.clientPhone}</p>
                  {previewInvoice.gstin && (
                    <p className="font-mono text-[10px] text-[#444]">Client GSTIN: {previewInvoice.gstin}</p>
                  )}
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-[#777] tracking-wider block mb-1">
                    SITE CONSIGNMENT ADDRESS:
                  </span>
                  <p className="text-[11px] text-[#333] leading-relaxed">
                    {previewInvoice.siteAddress || 'Consignment to client registered project site.'}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black font-mono uppercase text-[10px] text-black">
                      <th className="py-2">Item / Specification</th>
                      <th className="py-2">SKU</th>
                      <th className="py-2 text-center">Net Area</th>
                      <th className="py-2 text-center">Buffer</th>
                      <th className="py-2 text-center">Boxes</th>
                      <th className="py-2 text-right">Rate/Sq.Ft</th>
                      <th className="py-2 text-right">Total (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {previewInvoice.items.map((it, idx) => (
                      <tr key={idx} className="py-3">
                        <td className="py-3 font-medium text-black">{it.name}</td>
                        <td className="py-3 font-mono text-[#555]">{it.sku}</td>
                        <td className="py-3 text-center font-mono">{it.areaSqFt} sq.ft</td>
                        <td className="py-3 text-center font-mono">+{it.wastagePercent}%</td>
                        <td className="py-3 text-center font-mono">{it.boxesNeeded || 1} bxs</td>
                        <td className="py-3 text-right font-mono">₹{it.rateSqFt}</td>
                        <td className="py-3 text-right font-mono font-bold text-black">
                          ₹{it.lineTotal.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals & Bank Block */}
              <div className="grid grid-cols-2 gap-8 border-t-2 border-black pt-6">
                <div className="space-y-3">
                  <span className="font-mono text-[9px] uppercase text-[#777] tracking-wider block">
                    BANK REMITTANCE DETAILS (RTGS / NEFT):
                  </span>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded font-mono text-[10px] space-y-1 text-[#333]">
                    <p><span className="font-bold">Beneficiary:</span> JYOTHI TILES ATELIER LLP</p>
                    <p><span className="font-bold">Bank:</span> HDFC Bank Ltd, Mumbai</p>
                    <p><span className="font-bold">A/C No:</span> 50200084920194</p>
                    <p><span className="font-bold">IFSC Code:</span> HDFC0000128</p>
                  </div>
                  {previewInvoice.notes && (
                    <p className="text-[10px] text-[#555] italic">Note: {previewInvoice.notes}</p>
                  )}
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-[#555]">
                    <span>Items Subtotal:</span>
                    <span>₹{previewInvoice.subtotal.toLocaleString()}</span>
                  </div>
                  {previewInvoice.discountAmount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Trade Discount ({previewInvoice.discountPercent}%):</span>
                      <span>- ₹{previewInvoice.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#555]">
                    <span>GST (18% — 9% CGST + 9% SGST):</span>
                    <span>+ ₹{previewInvoice.taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-black font-bold text-base border-t border-black pt-2">
                    <span>Grand Total:</span>
                    <span>₹{previewInvoice.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="border-t border-black/10 pt-6 flex justify-between items-center text-[10px] text-[#777] font-mono">
                <span>Computer generated proforma. Valid for 14 days from issuance.</span>
                <span>Authorized Signatory — Jyothi Tiles</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
