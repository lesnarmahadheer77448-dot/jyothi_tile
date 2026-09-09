'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building2, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck 
} from 'lucide-react';
import { useAuth, UserRole } from '@/context/AuthContext';

export default function CustomerSignupPage() {
  const router = useRouter();
  const { signupCustomer } = useAuth();

  const [role, setRole] = useState<UserRole>('homeowner');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('Mumbai');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    signupCustomer({
      name,
      email,
      phone,
      role,
      companyName: role === 'architect' || role === 'developer' ? companyName : undefined,
      city,
    }, password);

    router.push('/products');
  };

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-lg bg-[#121217] border border-[#2B2B3C] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in-scale">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-[#C5A880] mb-2 hover:underline text-xs font-mono">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Showroom</span>
          </Link>
          <div className="w-10 h-10 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="font-serif-luxury text-3xl text-white font-light">Create Client Account</h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Register to receive trade discounts, curate bespoke moodboards, and order complimentary architectural sample boxes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Account Classification */}
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">I Am A:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'homeowner', label: 'Homeowner' },
                { id: 'architect', label: 'Architect / Designer' },
                { id: 'developer', label: 'Builder / Dev' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id as UserRole)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-mono transition-all border ${
                    role === r.id
                      ? 'bg-[#C5A880]/20 border-[#C5A880] text-white font-semibold'
                      : 'bg-[#181822] border-[#282836] text-[#8E8A80] hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ysool"
                className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Mobile / WhatsApp *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98200 12345"
                className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl font-mono text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          {/* Email & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ysool@domain.com"
                className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">City / Region</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Mumbai / Bangalore"
                className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          {/* Studio Name for Architects / Developers */}
          {(role === 'architect' || role === 'developer') && (
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#C5A880] mb-1">
                Studio / Architectural Practice Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Studio Lotus Architecture"
                className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Create Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold font-mono text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#C5A880]/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>Complete Registration & Explore</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/5 space-y-2 text-xs">
          <p className="text-[#8E8A80]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#C5A880] hover:underline font-medium">
              Sign In Here →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
