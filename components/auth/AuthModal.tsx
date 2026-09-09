'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Building2, 
  MapPin, 
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { useAuth, UserRole } from '@/context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, loginCustomer, signupCustomer } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(authModalMode || 'login');

  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('homeowner');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('Mumbai');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginCustomer(email, password);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
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
  };

  const handleDemoCustomerLogin = (type: 'homeowner' | 'architect') => {
    if (type === 'architect') {
      loginCustomer('rahul.sen@studiolotus.in', 'demo123');
    } else {
      loginCustomer('Ysool.singhania@gmail.com', 'demo123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-scale">
      <div className="relative w-full max-w-lg bg-[#121217] border border-[#2B2B3C] text-[#EDE9E1] shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header Banner */}
        <div className="p-6 pb-4 border-b border-[#242434] bg-[#161620] relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 text-[#88857C] hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 text-[#C5A880] mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">CLIENT ACCESS PORTAL</span>
          </div>
          <h3 className="font-serif-luxury text-2xl text-white font-light">
            Jyothi Tiles Atelier
          </h3>
          <p className="text-xs text-[#A8A49A] mt-1 font-light">
            Sign in to submit your architectural quotation, order physical sample kits, or schedule VIP private viewings.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 mt-5 p-1 bg-[#101015] rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
                activeTab === 'login'
                  ? 'bg-[#C5A880] text-black font-semibold shadow-md'
                  : 'text-[#8E8A80] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
                activeTab === 'signup'
                  ? 'bg-[#C5A880] text-black font-semibold shadow-md'
                  : 'text-[#8E8A80] hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white placeholder-[#6D6A62] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#181822] border border-[#2B2B38] rounded-xl text-white placeholder-[#6D6A62] focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8A80] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold font-mono text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C5A880]/20 flex items-center justify-center gap-2 mt-2"
              >
                <span>Sign In & Continue Action</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Click Demo Logins */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-[#8E8A80] uppercase tracking-wider block text-center">
                  Or Instant 1-Click Demo Login:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoCustomerLogin('homeowner')}
                    className="py-2 bg-[#181822] hover:bg-[#20202E] border border-[#2B2B38] rounded-xl font-mono text-[11px] text-[#DDD8CE] transition-colors"
                  >
                    🏡 Homeowner Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoCustomerLogin('architect')}
                    className="py-2 bg-[#181822] hover:bg-[#20202E] border border-[#2B2B38] rounded-xl font-mono text-[11px] text-[#C5A880] transition-colors"
                  >
                    📐 Architect Demo
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {/* Account Role Selector */}
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

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ysool"
                    className="w-full px-3.5 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
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
                    className="w-full px-3.5 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl font-mono text-white focus:outline-none focus:border-[#C5A880]"
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
                    className="w-full px-3.5 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1">City / Region</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai / Bangalore"
                    className="w-full px-3.5 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Company / Studio Name for Trade */}
              {(role === 'architect' || role === 'developer') && (
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#C5A880] mb-1">
                    Studio / Architecture Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Studio Lotus Architecture"
                    className="w-full px-3.5 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
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
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2 bg-[#181822] border border-[#2B2B38] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold font-mono text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C5A880]/20 flex items-center justify-center gap-2 mt-2"
              >
                <span>Register Account & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Trust Guarantees */}
          <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#8E8A80] border-t border-white/5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              256-Bit Encrypted
            </span>
            <span>Trade Pricing Tiers Included</span>
          </div>
        </div>
      </div>
    </div>
  );
}
