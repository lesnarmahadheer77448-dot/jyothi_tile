'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  KeyRound, 
  Sparkles, 
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin, isAdminAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please provide your admin authorized email.');
      return;
    }

    const ok = loginAdmin(email, password);
    if (ok) {
      router.push('/admin');
    } else {
      setErrorMsg('Invalid email or security key. Access denied.');
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#08080A] text-[#EDE9E1] min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-md bg-[#101015] border border-[#2B2B3E] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in-scale">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-[#C5A880] mb-2 hover:underline text-xs font-mono">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Showroom</span>
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#C5A880]/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-light">
            Management Console
          </h1>
          <p className="text-xs text-[#8E8A80] font-mono uppercase tracking-widest">
            JYOTHI TILES ATELIER • RESTRICTED ACCESS
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl text-xs text-center font-mono">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Authorized Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domain.com"
                className="w-full pl-10 pr-4 py-3 bg-[#161620] border border-[#29293C] rounded-xl text-white font-mono focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8A80] mb-1.5">Admin Security Key / Passcode</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8E8A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#161620] border border-[#29293C] rounded-xl text-white font-mono focus:outline-none focus:border-[#C5A880]"
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
            <span>Authorize & Open Admin Suite</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Indicator */}
        <div className="p-3 bg-[#15151D] border border-white/5 rounded-2xl flex items-center justify-between text-[10px] font-mono text-[#8E8A80]">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Security Gateway Active
          </span>
          <span className="text-[#C5A880]">TLS 1.3 Encrypted</span>
        </div>
      </div>
    </div>
  );
}
