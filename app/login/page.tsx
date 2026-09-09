'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { loginCustomer, currentUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }

    loginCustomer(email, password);
    router.push('/products');
  };

  const handleDemoLogin = (role: 'homeowner' | 'architect') => {
    if (role === 'architect') {
      loginCustomer('rahul.sen@studiolotus.in', 'demo123');
    } else {
      loginCustomer('Ysool.singhania@gmail.com', 'demo123');
    }
    router.push('/products');
  };

  return (
    <div className="pt-28 pb-24 bg-[#0A0A0C] text-[#EDE9E1] min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-md bg-[#121217] border border-[#2B2B3C] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in-scale">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-[#C5A880] mb-2 hover:underline text-xs font-mono">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Showroom</span>
          </Link>
          <div className="w-10 h-10 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="font-serif-luxury text-3xl text-white font-light">Client Sign In</h1>
          <p className="text-xs text-[#9E9A90] font-light">
            Access your curated moodboards, track bespoke quotations, and manage project specifications.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl text-xs text-center font-mono">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.com"
                className="w-full pl-10 pr-4 py-3 bg-[#181822] border border-[#2B2B38] rounded-xl text-white placeholder-[#6D6A62] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-mono text-[10px] uppercase text-[#8E8A80]">Password *</label>
              <span className="font-mono text-[10px] text-[#C5A880] cursor-pointer hover:underline">
                Forgot Code?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#181822] border border-[#2B2B38] rounded-xl text-white placeholder-[#6D6A62] focus:outline-none focus:border-[#C5A880]"
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
            className="w-full py-4 bg-[#C5A880] hover:bg-[#D6BC97] text-black font-semibold font-mono text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#C5A880]/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to Atelier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Logins */}
        <div className="space-y-3 pt-2 border-t border-white/5">
          <span className="text-[10px] font-mono text-[#8E8A80] uppercase tracking-wider block text-center">
            Instant 1-Click Demo Login:
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('homeowner')}
              className="py-2.5 bg-[#181822] hover:bg-[#222230] border border-[#2B2B38] rounded-xl font-mono text-xs text-white transition-colors"
            >
              🏡 Homeowner Login
            </button>
            <button
              onClick={() => handleDemoLogin('architect')}
              className="py-2.5 bg-[#181822] hover:bg-[#222230] border border-[#2B2B38] rounded-xl font-mono text-xs text-[#C5A880] transition-colors"
            >
              📐 Architect Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-white/5 space-y-3 text-xs">
          <p className="text-[#8E8A80]">
            Don&apos;t have an account yet?{' '}
            <Link href="/signup" className="text-[#C5A880] hover:underline font-medium">
              Create Client Account →
            </Link>
          </p>

          <p className="text-[11px] text-[#6D6A62]">
            Are you showroom management?{' '}
            <Link href="/admin/login" className="text-white hover:underline font-mono">
              Admin Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
