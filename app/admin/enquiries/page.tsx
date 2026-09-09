'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Search, 
  Filter,
  UserCheck,
  Send,
  PackageCheck
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [stageFilter, setStageFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [enquiries, setEnquiries] = useState([
    {
      id: 'RFQ-8901',
      client: 'Ar. Rajesh Mehta (Studio Lotus)',
      phone: '9820089123',
      email: 'rajesh@studiolotus.in',
      project: 'Alibaug Seafront Villa (4,200 sq.ft)',
      surfaces: ['Calacatta Luxe Royale (120×180 cm)', 'Nero Marquina Velvet Bookmatch'],
      status: 'New RFQ',
      date: 'Aug 29, 2026 • 11:20 AM',
      sampleRequested: true,
    },
    {
      id: 'RFQ-8900',
      client: 'Sanjay Godrej & Partners',
      phone: '9821144556',
      email: 'sanjay@godrejpartners.com',
      project: 'Worli Sky Penthouse Master Bath',
      surfaces: ['Titanium Gold Leather Granite (2 Slabs)'],
      status: 'Sample Dispatched',
      date: 'Aug 29, 2026 • 09:45 AM',
      sampleRequested: true,
    },
    {
      id: 'RFQ-8899',
      client: 'Priya Kothari',
      phone: '9845011223',
      email: 'priya.k@gmail.com',
      project: 'Indiranagar Residence Living Room',
      surfaces: ['Travertine Roman Navona (1,800 sq.ft)'],
      status: 'Quoted',
      date: 'Aug 28, 2026 • 04:15 PM',
      sampleRequested: false,
    },
    {
      id: 'RFQ-8898',
      client: 'Karan Mehra (Mehra Associates)',
      phone: '9810077889',
      email: 'karan@mehra.design',
      project: 'Goa Boutique Beach Resort',
      surfaces: ['Ceppo di Gre Silk Rustic', 'Nordic Fluted Oak'],
      status: 'Won / Confirmed',
      date: 'Aug 27, 2026 • 02:00 PM',
      sampleRequested: true,
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const mClient = e.client.toLowerCase().includes(q);
      const mProject = e.project.toLowerCase().includes(q);
      const mPhone = e.phone.includes(q);
      if (!mClient && !mProject && !mPhone) return false;
    }
    if (stageFilter !== 'all' && e.status !== stageFilter) return false;
    return true;
  });

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#20202C] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[#C5A880] mb-1">
            <MessageSquare className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">LEAD CRM & ARCHITECT DESK</span>
          </div>
          <h1 className="font-serif-luxury text-3xl text-white font-light">
            Enquiries & Specifier Lead Desk
          </h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Track architect RFQs, sample box dispatch records, formal trade quotations, and direct WhatsApp consultations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-[#1B1B24] border border-[#2B2B38] text-xs font-mono text-[#DDD8CE] rounded-lg">
            {enquiries.length} Active Leads
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121217] border border-[#222230] p-4 rounded-2xl shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search architect name, villa project, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-white placeholder-[#78756D] focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="px-3 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-xs text-[#DDD8CE] focus:outline-none focus:border-[#C5A880]"
        >
          <option value="all">All Lead Pipeline Stages</option>
          <option value="New RFQ">New RFQ Incoming</option>
          <option value="Sample Dispatched">Sample Dispatched</option>
          <option value="Quoted">Quoted / Proforma Sent</option>
          <option value="Won / Confirmed">Won / Confirmed Order</option>
        </select>
      </div>

      {/* List of Enquiries */}
      <div className="space-y-4">
        {filteredEnquiries.map((enq) => (
          <div
            key={enq.id}
            className="p-6 bg-[#121217] border border-[#262634] rounded-3xl space-y-4 shadow-xl hover:border-[#C5A880]/30 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#191924] border border-[#2E2E3E] text-xs font-mono text-[#C5A880] rounded-lg">
                  {enq.id}
                </span>
                <h3 className="font-serif-luxury text-lg text-white font-medium">{enq.client}</h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[#7D7A73]">{enq.date}</span>
                <select
                  value={enq.status}
                  onChange={(e) => updateStatus(enq.id, e.target.value)}
                  className="bg-[#181822] border border-[#2E2E3E] text-[#C5A880] rounded-lg px-3 py-1.5 text-xs focus:outline-none font-mono"
                >
                  <option value="New RFQ">New RFQ</option>
                  <option value="Sample Dispatched">Sample Dispatched</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Won / Confirmed">Won / Confirmed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans-luxury">
              <div>
                <span className="text-[10px] font-mono text-[#8C887E] uppercase block mb-1">Project & Scope</span>
                <p className="text-white font-medium">{enq.project}</p>
                <p className="text-[11px] text-[#7E7A71] mt-0.5">{enq.email}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C887E] uppercase block mb-1">Specified Surfaces</span>
                <ul className="space-y-0.5 text-[#DDD9CF] font-mono text-[11px]">
                  {enq.surfaces.map((s) => (
                    <li key={s} className="text-[#C5A880]">• {s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C887E] uppercase block mb-1">Direct Specifier Outreach</span>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`https://wa.me/91${enq.phone}?text=Hello%20${encodeURIComponent(
                      enq.client
                    )},%20connecting%20from%20Jyothi%20Tiles%20regarding%20your%20specification%20for%20${encodeURIComponent(
                      enq.project
                    )}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                    <span>WhatsApp DM</span>
                  </a>
                  <a
                    href={`tel:+91${enq.phone}`}
                    className="px-3.5 py-2 bg-[#181822] hover:bg-[#222230] border border-[#2B2B38] text-white rounded-xl font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
