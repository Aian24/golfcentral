"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lock, ArrowRight, Key, Loader2, AlertCircle, ShieldCheck, Eye, EyeOff } from "lucide-react";

interface AdminAuthModalProps {
  onLoginSuccess: (user: any) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onLoginSuccess }) => {
  const [passkey, setPasskey] = useState("");
  const [showPasskey, setShowPasskey] = useState(false);
  const [username, setUsername] = useState("admin");
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
        setError(data.error || "Invalid credentials. Please verify your passkey.");
      }
    } catch {
      setError("Network error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#071F16] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Ambient luxury background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#134E36]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#0F3D2A] border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-white">
        {/* Header Official Branding */}
        <div className="text-center space-y-4 mb-8">
          {/* Real Company Logo */}
          <div className="relative h-12 w-56 mx-auto">
            <Image
              src="/images/official_logo_white.png"
              alt="Golf Central Magazine"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <ShieldCheck className="w-3 h-3 text-[#D8B045]" />
              <span>Publisher Portal</span>
            </div>
            <p className="text-xs text-white/70">
              Monthly Edition Publishing &amp; Archive Management
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

        {/* Real Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
              Username / Account
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#071F16] border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#C59B27] transition-colors"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
              Security Passkey
            </label>
            <div className="relative">
              <input
                type={showPasskey ? "text" : "password"}
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#071F16] border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#C59B27] transition-colors pl-10 pr-11"
                placeholder="Enter passkey"
                required
              />
              <Key className="w-4 h-4 text-[#D8B045] absolute left-3.5 top-3.5 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D8B045] transition-colors p-1 rounded-lg focus:outline-none"
                title={showPasskey ? "Hide passkey" : "Show passkey"}
                aria-label={showPasskey ? "Hide passkey" : "Show passkey"}
              >
                {showPasskey ? (
                  <EyeOff className="w-4 h-4 text-[#D8B045]" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Editorial Suite</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
