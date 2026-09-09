'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calculator, Trash2, ArrowRight, Check, MessageSquare, Plus, FileText } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';
import { useAuth } from '@/context/AuthContext';

export default function QuoteBuilderPage() {
  const { quoteItems, removeFromQuote, updateQuantity, clearQuote, isQuoteModalOpen, openQuoteModal } = useQuote();
  const { currentUser, requireAuth } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectType: 'Luxury Villa',
    expectedDelivery: 'Within 30 Days',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        city: currentUser.city || 'Mumbai',
      }));
    }
  }, [currentUser]);

  const totalArea = quoteItems.reduce((acc, item) => acc + (item.areaSqFt || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requireAuth(() => {
      setSubmitted(true);
    });
  };

  const handleWhatsAppInstantQuote = () => {
    requireAuth(() => {
      let text = `*BESPOKE SURFACE QUOTATION REQUEST*%0A%0A*Client:* ${encodeURIComponent(formData.name || (currentUser ? currentUser.name : 'Client'))}%0A*Phone:* ${encodeURIComponent(formData.phone || (currentUser ? currentUser.phone : 'N/A'))}%0A*Project:* ${encodeURIComponent(formData.projectType)} (${encodeURIComponent(formData.city || 'India')})%0A%0A*SPECIFIED SURFACES:*%0A`;

      quoteItems.forEach((item, idx) => {
        text += `${idx + 1}. *${encodeURIComponent(item.name)}*%0A   - SKU: ${item.sku}%0A   - Area: ${item.areaSqFt || 0} sq.ft (${item.boxesCount || 1} boxes incl. ${item.wastagePercent}% buffer)%0A%0A`;
      });

      text += `*Total Net Scope:* ~${totalArea} sq.ft%0A%0APlease provide formal proforma invoice & delivery timeline.`;
      window.open(`https://wa.me/919626547707?text=${text}`, '_blank');
    });
  };

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A880]">
            <Calculator className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">ESTIMATION DESK</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-wide">
            Bespoke Quotation Builder
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9A90] font-light leading-relaxed">
            Review your bill of quantities, adjust square footages with custom wastage buffers, and generate a formal architectural estimate.
          </p>
        </div>

        {quoteItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Line Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif-luxury text-xl text-white">
                  Selected Surfaces ({quoteItems.length})
                </h3>
                <button
                  onClick={clearQuote}
                  className="text-xs text-red-400 hover:underline font-mono"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {quoteItems.map((item) => (
                  <div
                    key={item.productId}
                    className="p-5 bg-[#121217] border border-[#242430] rounded-2xl flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-xl"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono text-[#C5A880] uppercase block">
                          SKU: {item.sku}
                        </span>
                        <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                        <p className="text-xs text-[#8E8A81] font-mono">
                          {item.size} • {item.finish}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={10}
                            value={item.areaSqFt || 500}
                            onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                            className="w-20 px-2 py-1 bg-[#181820] border border-[#2B2B38] rounded text-xs font-mono text-white text-right focus:outline-none focus:border-[#C5A880]"
                          />
                          <span className="text-xs font-mono text-[#8E8A81]">sq.ft</span>
                        </div>
                        <span className="text-[10px] text-[#C5A880] font-mono block mt-1">
                          ~{item.boxesCount || Math.ceil((item.areaSqFt || 500) / 23.25)} Boxes ({item.wastagePercent}% buffer)
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromQuote(item.productId)}
                        className="p-2 text-[#7A776F] hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                        title="Remove surface"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#C5A880] hover:underline uppercase"
              >
                <Plus className="w-4 h-4" />
                <span>Add More Surfaces From Catalog</span>
              </Link>
            </div>

            {/* Right Column: RFQ Submission Form (5 cols) */}
            <div className="lg:col-span-5 bg-[#121217] border border-[#262634] rounded-3xl p-8 space-y-6 shadow-2xl sticky top-28">
              <div>
                <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest block mb-1">
                  TOTAL ESTIMATED SCOPE
                </span>
                <h3 className="font-serif-luxury text-3xl text-white">~{totalArea} sq.ft</h3>
              </div>

              {submitted ? (
                <div className="p-6 bg-[#191924] border border-[#C5A880]/40 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-luxury text-xl text-white">Quotation Request Received</h4>
                  <p className="text-xs text-[#A8A49A]">
                    Thank you, {formData.name}. Our commercial estimating desk will prepare your itemized proforma bill and contact you at {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans-luxury">
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Client / Firm Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ysool"
                      className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200..."
                        className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-[#8C887E] mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Mumbai, Goa, Delhi..."
                        className="w-full px-4 py-2.5 bg-[#181820] border border-[#2B2B38] rounded-lg text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-xl shadow-[#C5A880]/20 transition-colors"
                  >
                    Submit Formal RFQ
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppInstantQuote}
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BE5B] text-black font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4 fill-black" />
                    <span>Send Line Items via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-[#292938] rounded-3xl p-12 space-y-4">
            <Calculator className="w-10 h-10 text-[#C5A880] mx-auto opacity-30" />
            <h3 className="font-serif-luxury text-2xl text-white">Your Quotation Desk is Empty</h3>
            <p className="text-xs text-[#8E8A81] max-w-md mx-auto">
              Browse our catalog of large-format porcelain slabs and natural granites, and click &quot;Request Quote&quot; or use the area calculator to populate line items here.
            </p>
            <Link
              href="/products"
              className="inline-block px-7 py-3.5 bg-[#C5A880] text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-[#D6BC97]"
            >
              Browse Surfaces Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

