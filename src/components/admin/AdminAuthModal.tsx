"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lock, ShieldCheck, ArrowRight, Key, Sparkles, Loader2, AlertCircle } from "lucide-react";

interface AdminAuthModalProps {
  onLoginSuccess: (user: any) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onLoginSuccess }) => {
  const [passkey, setPasskey] = useState("");
  const [username, setUsername] = useState("Terrie Purdum");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey, username }),
      });

      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("gcm_admin_auth", "true");
        sessionStorage.setItem("gcm_admin_user", JSON.stringify(data.user));
        onLoginSuccess(data.user);
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Network error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setPasskey("golfcentraladmin");
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: "golfcentraladmin", username: "Terrie Purdum" }),
      });

      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("gcm_admin_auth", "true");
        sessionStorage.setItem("gcm_admin_user", JSON.stringify(data.user));
        onLoginSuccess(data.user);
      }
    } catch {
      setError("Demo authentication error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#071F16] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#134E36]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#0F3D2A] border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-white">
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#071F16] border border-[#C59B27]/50 flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8 text-[#D8B045]" />
          </div>

          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-[10px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3 h-3 text-[#D8B045]" />
              <span>Editorial Access Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Golf Central Admin
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Monthly Edition Management &amp; Digital Archive Control
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-900/40 border border-red-500/50 rounded-xl flex items-start space-x-2 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
              Editor / Publisher Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#071F16] border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#C59B27] transition-colors"
              placeholder="e.g. Terrie Purdum"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
              Admin Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#071F16] border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#C59B27] transition-colors pl-10"
                placeholder="Enter passkey (e.g. golfcentraladmin)"
                required
              />
              <Key className="w-4 h-4 text-[#D8B045] absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
            <p className="text-[11px] text-white/50 mt-1">
              Hint: Default passkey is <code className="text-[#D8B045]">golfcentraladmin</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Access...</span>
              </>
            ) : (
              <>
                <span>Enter Admin Suite</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D8B045]" />
            <span>1-Click Instant Demo Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
