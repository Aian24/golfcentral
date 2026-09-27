"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Trash2, X, Loader2, RefreshCw } from "lucide-react";

interface ConfirmActionModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  iconType?: "delete" | "warning" | "reset";
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDestructive = true,
  isLoading = false,
  iconType = "delete",
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || isLoading) return;
      if (e.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#0B291D] border border-white/15 text-white rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Icon & Close */}
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isDestructive
                ? "bg-red-500/15 border border-red-500/30 text-red-400"
                : "bg-[#C59B27]/15 border border-[#C59B27]/30 text-[#D8B045]"
            }`}
          >
            {iconType === "delete" && <Trash2 className="w-6 h-6" />}
            {iconType === "warning" && <AlertTriangle className="w-6 h-6" />}
            {iconType === "reset" && <RefreshCw className="w-6 h-6" />}
          </div>

          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-40"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors disabled:opacity-40"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 disabled:opacity-50 ${
              isDestructive
                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-950/50"
                : "bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] shadow-lg shadow-black/40"
            }`}
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
