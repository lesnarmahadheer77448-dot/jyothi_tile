'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  MessageSquare, 
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';

export default function AdminDashboardOverviewPage() {
  const { whatsappEnquiries, updateWhatsAppEnquiryStatus, callbackRequests, updateCallbackRequestStatus } = useAdminData();

  // Sort by newest first
  const sortedEnquiries = [...(whatsappEnquiries || [])].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const sortedCallbacks = [...(callbackRequests || [])].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

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
            Live customer product enquiries from WhatsApp.
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
        </div>
      </div>

      {/* Live WhatsApp Product Enquiries */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#25D366] tracking-widest block">
              WHATSAPP LEADS
            </span>
            <h3 className="font-serif-luxury text-2xl text-white">Live Product Enquiries</h3>
          </div>
        </div>

        {sortedEnquiries.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center">
            <MessageSquare className="w-10 h-10 text-[#8E8A80] mb-4 opacity-50" />
            <p className="text-sm text-[#8E8A80]">No WhatsApp product enquiries yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#20202C] overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="text-[#8E8A80] font-mono uppercase pb-3">
                  <th className="py-3">Timestamp</th>
                  <th className="py-3">Product Info</th>
                  <th className="py-3">Source</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans-luxury">
                {sortedEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-mono text-[#DDD9CF]">
                      {new Date(enq.timestamp).toLocaleString()}
                    </td>
                    <td className="py-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#222230]">
                        <Image src={enq.productImage} alt={enq.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{enq.productName}</p>
                        <p className="text-[10px] font-mono text-[#C5A880]">SKU: {enq.productSku}</p>
                      </div>
                    </td>
                    <td className="py-4 text-[#8E8A80] font-mono text-[11px] uppercase">
                      {enq.source.replace('_', ' ')}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded font-mono text-[10px] uppercase flex items-center gap-1.5 w-max ${
                        enq.status === 'New' 
                          ? 'bg-[#25D366]/20 text-[#25D366]' 
                          : enq.status === 'Contacted' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-white/5 text-[#8E8A80]'
                      }`}>
                        {enq.status === 'New' && <MessageSquare className="w-3 h-3" />}
                        {enq.status === 'Contacted' && <Clock className="w-3 h-3" />}
                        {enq.status === 'Closed' && <CheckCircle2 className="w-3 h-3" />}
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2">
                      {enq.status === 'New' && (
                        <button
                          onClick={() => updateWhatsAppEnquiryStatus(enq.id, 'Contacted')}
                          className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg font-mono text-[10px] uppercase transition-colors"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {enq.status !== 'Closed' && (
                        <button
                          onClick={() => updateWhatsAppEnquiryStatus(enq.id, 'Closed')}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-mono text-[10px] uppercase transition-colors"
                        >
                          Close Lead
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Callback Requests */}
      <div className="bg-[#121217] border border-[#222230] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest block">
              CALLBACK REQUESTS
            </span>
            <h3 className="font-serif-luxury text-2xl text-white">Quotation & General Callbacks</h3>
          </div>
        </div>

        {sortedCallbacks.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center">
            <Clock className="w-10 h-10 text-[#8E8A80] mb-4 opacity-50" />
            <p className="text-sm text-[#8E8A80]">No callback requests yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#20202C] overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="text-[#8E8A80] font-mono uppercase pb-3">
                  <th className="py-3">Timestamp</th>
                  <th className="py-3">Client Details</th>
                  <th className="py-3">Project / Items</th>
                  <th className="py-3">Notes</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans-luxury">
                {sortedCallbacks.map((cb) => (
                  <tr key={cb.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-mono text-[#DDD9CF] align-top">
                      {new Date(cb.timestamp).toLocaleString()}
                    </td>
                    <td className="py-4 align-top">
                      <p className="font-medium text-white">{cb.customerName}</p>
                      <p className="text-[10px] font-mono text-[#C5A880]">{cb.phone}</p>
                      <p className="text-[10px] font-mono text-[#8E8A80]">{cb.city}</p>
                    </td>
                    <td className="py-4 align-top max-w-[200px]">
                      <p className="text-[#DDD9CF] font-medium">{cb.projectType}</p>
                      <p className="text-[10px] text-[#8E8A80] truncate mt-1" title={cb.itemsSummary}>
                        {cb.itemsSummary}
                      </p>
                    </td>
                    <td className="py-4 align-top max-w-[200px]">
                      <p className="text-[10px] text-[#8E8A80] line-clamp-2" title={cb.notes}>
                        {cb.notes || '-'}
                      </p>
                    </td>
                    <td className="py-4 align-top">
                      <span className={`px-2.5 py-1 rounded font-mono text-[10px] uppercase flex items-center gap-1.5 w-max ${
                        cb.status === 'New' 
                          ? 'bg-[#C5A880]/20 text-[#C5A880]' 
                          : cb.status === 'Contacted' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-white/5 text-[#8E8A80]'
                      }`}>
                        {cb.status}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2 align-top">
                      {cb.status === 'New' && (
                        <button
                          onClick={() => updateCallbackRequestStatus(cb.id, 'Contacted')}
                          className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg font-mono text-[10px] uppercase transition-colors"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {cb.status !== 'Closed' && (
                        <button
                          onClick={() => updateCallbackRequestStatus(cb.id, 'Closed')}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-mono text-[10px] uppercase transition-colors"
                        >
                          Close Lead
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
