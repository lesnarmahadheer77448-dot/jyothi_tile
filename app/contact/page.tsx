'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, MessageSquare, Check, Sparkles } from 'lucide-react';
import { showroomsData } from '@/data/showrooms';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Surface Specification Enquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <Phone className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">CONCIERGE & DESK</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Connect With Our Stone Atelier
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9A90] font-light leading-relaxed">
            Whether inquiring about slab availability, ordering 10×10 cm physical samples, or scheduling a private viewing, our material curators are at your disposal.
          </p>
        </div>

        {/* 3 Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#121217] border border-[#242430] space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-lg text-white">Direct Advisory</h3>
            <p className="text-xs text-[#8E8A81]">Mon – Sat from 9:30 AM to 7:30 PM</p>
            <p className="text-sm font-mono text-white font-semibold pt-1">+91 96265 47707</p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121217] border border-[#242430] space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
              <MessageSquare className="w-5 h-5 fill-[#25D366]" />
            </div>
            <h3 className="font-serif-luxury text-lg text-white">WhatsApp Specialist</h3>
            <p className="text-xs text-[#8E8A81]">Instant quotes, photos & video walkthroughs</p>
            <a
              href="https://wa.me/919626547707"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-[#25D366] hover:underline uppercase inline-block pt-1"
            >
              Open WhatsApp Chat →
            </a>
          </div>

          <div className="p-8 rounded-3xl bg-[#121217] border border-[#242430] space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-lg text-white">Specifier Desk</h3>
            <p className="text-xs text-[#8E8A81]">For trade inquiries and project tenders</p>
            <p className="text-xs font-mono text-[#E5D2B8] pt-1">concierge@jyothitiles.com</p>
          </div>
        </div>

        {/* Contact Form & Showrooms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Showroom Locations (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif-luxury text-2xl text-white">Experience Centres</h3>
            <div className="space-y-6">
              {showroomsData.map((sr) => (
                <div key={sr.id} className="p-6 bg-[#121217] border border-[#242430] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-luxury text-lg text-white font-medium">{sr.name}</h4>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase bg-black/60 px-2.5 py-1 rounded">
                      {sr.city}
                    </span>
                  </div>
                  <p className="text-xs text-[#A8A49A] flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{sr.address}</span>
                  </p>
                  <p className="text-xs text-[#8E8A81] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{sr.timings}</span>
                  </p>
                  <div className="pt-2">
                    <a
                      href={sr.mapEmbedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#C5A880] hover:underline uppercase"
                    >
                      Get Driving Directions on Google Maps →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#121217] border border-[#262634] rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h3 className="font-serif-luxury text-2xl text-white mb-6">Send an Inquiry</h3>

            {formSubmitted ? (
              <div className="p-6 bg-[#191924] border border-[#C5A880]/40 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-xl text-white">Message Delivered</h4>
                <p className="text-xs text-[#A8A49A]">
                  Thank you, {contactForm.name}. A material specialist has received your inquiry and will respond within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans-luxury">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Ysool"
                    className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+91 96265..."
                      className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="Ysool@domain.com"
                      className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Mention the spaces, dimensions, finishes, or sample requests..."
                    className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-xl shadow-[#C5A880]/20 transition-colors"
                >
                  Send Inquiry to Concierge
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

