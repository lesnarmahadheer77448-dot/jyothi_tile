'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Calendar, Car, Coffee, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { showroomsData } from '@/data/showrooms';
import { useAuth } from '@/context/AuthContext';

export default function ShowroomPage() {
  const { currentUser, requireAuth } = useAuth();
  const [selectedShowroom, setSelectedShowroom] = useState(showroomsData[0]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '11:00 AM - 01:00 PM',
    role: 'Homeowner / Villa Owner',
    interest: 'Porcelain Slabs & Natural Granite',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setBookingForm((prev) => ({
        ...prev,
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        role: currentUser.role === 'architect' ? 'Architect / Interior Designer' : 'Homeowner / Villa Owner',
      }));
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requireAuth(() => {
      setSubmitted(true);
      const message = `*VIP Reservation Request*%0A%0AName: ${bookingForm.name}%0APhone: ${bookingForm.phone}%0ADate: ${bookingForm.date}%0ATime Slot: ${bookingForm.timeSlot}%0ARole: ${bookingForm.role}%0AInterest: ${bookingForm.interest}%0A%0APlease confirm my booking at ${selectedShowroom.name}.`;
      window.open(`https://wa.me/919626547707?text=${message}`, '_blank');
    });
  };

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">EXPERIENCE CENTRES</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Visit Our Flagship Galleries
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9A90] font-light leading-relaxed">
            Step into our 12,000 sq.ft physical galleries. Experience monumental porcelain displays under calibrated lighting and inspect live natural Brazilian granite blocks with our stone curators.
          </p>
        </div>

        {/* Gallery Selector Tabs */}
        <div className="flex gap-4 border-b border-white/10 pb-4">
          {showroomsData.map((sr) => {
            const isSelected = selectedShowroom.id === sr.id;
            return (
              <button
                key={sr.id}
                onClick={() => setSelectedShowroom(sr)}
                className={`px-6 py-3 rounded-xl font-mono text-xs transition-all ${
                  isSelected
                    ? 'bg-[#C5A880] text-black font-semibold shadow-lg shadow-[#C5A880]/20'
                    : 'bg-[#15151B] text-[#9E9A90] hover:text-white border border-[#242430]'
                }`}
              >
                {sr.name}
              </button>
            );
          })}
        </div>

        {/* Showroom Showcase & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Showroom Photos & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-black border border-[#262634] shadow-2xl">
              <Image
                src={selectedShowroom.heroImage}
                alt={selectedShowroom.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest bg-black/70 px-3 py-1 rounded border border-white/10">
                  {selectedShowroom.address}
                </span>
              </div>
            </div>

            {/* Gallery photos */}
            <div className="grid grid-cols-2 gap-4">
              {(selectedShowroom.galleryImages || selectedShowroom.interiorImages || []).map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-[#242430]">
                  <Image src={img} alt={`Showroom ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Key Amenities */}
            <div className="p-6 bg-[#121217] rounded-2xl border border-[#242430] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-3">
                <Car className="w-4 h-4 text-[#C5A880]" />
                <span className="text-[#DDD9CF]">Valet Parking Available</span>
              </div>
              <div className="flex items-center gap-3">
                <Coffee className="w-4 h-4 text-[#C5A880]" />
                <span className="text-[#DDD9CF]">Private Architect Design Suite</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span className="text-[#DDD9CF]">Full-Slab Gantry Inspection</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <span className="text-[#DDD9CF]">{selectedShowroom.timings}</span>
              </div>
            </div>
          </div>

          {/* Right Column: VIP Appointment Booking Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#121217] border border-[#262634] rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl sticky top-28">
            <div>
              <div className="inline-flex items-center gap-2 text-[#C5A880] mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-[10px] tracking-widest font-mono uppercase">VIP PRIVATE VIEWING</span>
              </div>
              <h3 className="font-serif-luxury text-2xl text-white font-light">
                Book Showroom Concierge
              </h3>
              <p className="text-xs text-[#9E9A90] mt-1 font-light">
                Reserve an exclusive 1-on-1 consultation with our senior material architect.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-[#191924] border border-[#C5A880]/40 rounded-2xl text-center space-y-3 animate-fade-in-scale">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-xl text-white">VIP Appointment Confirmed</h4>
                <p className="text-xs text-[#A8A49A]">
                  Thank you, {bookingForm.name}. Our concierge team has reserved your slot for {bookingForm.date} at {selectedShowroom.name}. A confirmation SMS and calendar invite has been dispatched.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans-luxury">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    placeholder="e.g. Ar. Rajesh Mehta"
                    className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white placeholder-[#68655E] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="+91 98200..."
                      className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white placeholder-[#68655E] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Your Role</label>
                  <select
                    value={bookingForm.role}
                    onChange={(e) => setBookingForm({ ...bookingForm, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Homeowner / Villa Owner">Homeowner / Villa Owner</option>
                    <option value="Architect / Interior Designer">Architect / Interior Designer</option>
                    <option value="Developer / Builder">Developer / Builder</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-xl shadow-[#C5A880]/20 transition-colors mt-2"
                >
                  Confirm VIP Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

