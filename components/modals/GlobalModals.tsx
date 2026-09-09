'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Check, MessageSquare, Phone, Calendar, Sparkles, Send, User } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

export const GlobalModals: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, quoteItems, totalEstimatedArea, removeFromQuote } = useQuote();
  const { currentUser, requireAuth } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [projectType, setProjectType] = useState('Residential Villa');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-fill logged-in user credentials
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name);
      setPhone(currentUser.phone);
      if (currentUser.city) setCity(currentUser.city);
    }
  }, [currentUser]);

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();

    // Enquiry Auth Gate: Customer must be logged in
    requireAuth(() => {
      const itemsSummary = quoteItems.length > 0
        ? quoteItems.map((item, idx) => `• ${item.name} (${item.sku}) - ~${item.areaSqFt} sq.ft`).join('%0A')
        : 'General Inquiry / Material Selection';

      const clientDisplay = currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : fullName;
      const phoneDisplay = currentUser ? currentUser.phone : phone;

      const message = `*NEW LUXURY SPECIFICATION ENQUIRY*%0A%0A*Client Name:* ${encodeURIComponent(clientDisplay)}%0A*Phone:* ${encodeURIComponent(phoneDisplay)}%0A*Location:* ${encodeURIComponent(city)}%0A*Project Type:* ${encodeURIComponent(projectType)}%0A*Estimated Total Area:* ~${totalEstimatedArea || 500} sq.ft%0A%0A*Selected Materials:*%0A${itemsSummary}%0A%0A*Client Notes:* ${encodeURIComponent(notes || 'Please share detailed quotation with tax invoice and sample availability.')}`;

      setIsSubmitted(true);
      setTimeout(() => {
        window.open(`https://wa.me/919626547707?text=${message}`, '_blank');
      }, 600);
    });
  };

  return (
    <>
      <AuthModal />

      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-scale">
          <div className="relative w-full max-w-2xl bg-[#141418] border border-[#2B2B32] text-[#F5F3EF] shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#24242A] bg-[#111114]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl tracking-wider text-[#F5F3EF]">REQUEST BESPOKE QUOTATION</h3>
                  <p className="text-xs text-[#9E9A90]">Direct Concierge & Specialist Estimation</p>
                </div>
              </div>
              <button
                onClick={closeQuoteModal}
                className="p-2 text-[#8A8780] hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-white">Quotation Request Forwarded</h4>
                  <p className="text-sm text-[#A09D95] max-w-md mx-auto font-light">
                    Redirecting you to WhatsApp to connect directly with our head surface specialist.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWhatsAppSend} className="space-y-5">
                  {/* Selected Items Summary */}
                  {quoteItems.length > 0 && (
                    <div className="p-4 bg-[#1A1A1E] rounded-xl border border-[#2B2B33] space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#C5A880] uppercase tracking-wider">
                          SPECIFIED SURFACES ({quoteItems.length})
                        </span>
                        <span className="text-[#A09D95]">Total Scope: ~{totalEstimatedArea} sq.ft</span>
                      </div>
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {quoteItems.map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-center justify-between p-2 bg-[#121215] rounded-lg text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative w-8 h-8 rounded overflow-hidden bg-black flex-shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-white line-clamp-1">{item.name}</p>
                                <span className="text-[10px] text-[#A09D95] font-mono">{item.sku}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-[#C5A880]">{item.areaSqFt} sq.ft</span>
                              <button
                                type="button"
                                onClick={() => removeFromQuote(item.productId)}
                                className="text-[#88857C] hover:text-red-400 p-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Customer Status Banner */}
                  {currentUser ? (
                    <div className="p-3 bg-[#1C1C24] border border-[#C5A880]/30 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center font-bold text-[10px]">
                          {currentUser.name.charAt(0)}
                        </div>
                        <span className="text-white font-medium">Logged in as {currentUser.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#C5A880] uppercase bg-black/40 px-2 py-0.5 rounded">
                        {currentUser.role}
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                      <span>Sign in or create an account for trade discount priority.</span>
                      <span className="text-[10px] font-mono uppercase bg-amber-500/20 px-2 py-0.5 rounded">
                        Client Verification Required
                      </span>
                    </div>
                  )}

                  {/* Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A09D95] mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ysool"
                        className="w-full px-3.5 py-2.5 bg-[#1A1A1E] border border-[#2B2B33] rounded-lg text-sm text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A09D95] mb-1.5">Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98200 12345"
                        className="w-full px-3.5 py-2.5 bg-[#1A1A1E] border border-[#2B2B33] rounded-lg text-sm text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A09D95] mb-1.5">City / Delivery Location</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai, Bangalore, Pune"
                        className="w-full px-3.5 py-2.5 bg-[#1A1A1E] border border-[#2B2B33] rounded-lg text-sm text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A09D95] mb-1.5">Project Classification</label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1A1A1E] border border-[#2B2B33] rounded-lg text-sm text-white focus:outline-none focus:border-[#C5A880]"
                      >
                        <option>Residential Villa</option>
                        <option>Luxury Penthouse / Apartment</option>
                        <option>Commercial Office / Headquarters</option>
                        <option>Boutique Hotel / Restaurant</option>
                        <option>Architect / Interior Specifier</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] mb-1.5">Special Architectural Requirements / Notes</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Need bookmatch verification, expedited site delivery in 14 days, physical 10x10cm sample box."
                      className="w-full px-3.5 py-2.5 bg-[#1A1A1E] border border-[#2B2B33] rounded-lg text-sm text-white focus:outline-none focus:border-[#C5A880] resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20BE5B] text-black font-semibold text-xs tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20"
                    >
                      <MessageSquare className="w-4 h-4 fill-black" />
                      Connect via WhatsApp Instant Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        requireAuth(() => {
                          alert('Thank you! A senior specialist has logged your request and will call within 2 business hours.');
                          closeQuoteModal();
                        });
                      }}
                      className="px-5 py-3.5 bg-[#1E1E24] hover:bg-[#282830] text-[#E0DCD3] text-xs tracking-wider uppercase rounded-lg border border-[#33333C] flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                      Request Callback
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
