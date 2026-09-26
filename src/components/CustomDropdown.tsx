"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string | number;
  label: string;
}

interface CustomDropdownProps {
  value: string | number;
  onChange: (value: string) => void;
  options: (DropdownOption | string)[];
  placeholder?: string;
  className?: string;
  id?: string;
  variant?: "light" | "dark" | "gold";
  size?: "sm" | "default";
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  className = "",
  id,
  variant = "light",
  size = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize options to { value, label }
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Variant styling
  const getTriggerStyles = () => {
    const sizeStyles =
      size === "sm"
        ? "px-3 py-2 pr-8 text-xs rounded-xl"
        : "px-4 py-3 pr-10 text-xs rounded-xl";

    if (isOpen) {
      return `${sizeStyles} bg-[#0F3D2A] text-white border-2 border-[#C59B27] shadow-lg ring-2 ring-[#C59B27]/20`;
    }

    if (variant === "dark") {
      return `${sizeStyles} bg-[#071F16] text-white border border-white/20 hover:border-[#C59B27]/60 focus:border-[#C59B27]`;
    }

    if (variant === "gold") {
      return `${sizeStyles} bg-[#0F3D2A] text-white border border-[#C59B27]/50 hover:border-[#C59B27] focus:border-[#D8B045]`;
    }

    // Default light variant
    return `${sizeStyles} bg-white text-[#0F172A] border-2 border-[#134E36]/20 hover:border-[#134E36]/40 focus:border-[#134E36] focus:ring-2 focus:ring-[#134E36]/20`;
  };

  const getChevronColor = () => {
    if (isOpen) return "text-[#D8B045] rotate-180";
    if (variant === "dark" || variant === "gold") return "text-[#C59B27]/80 rotate-0";
    return "text-[#134E36] rotate-0";
  };

  return (
    <div ref={dropdownRef} className="relative w-full select-none" id={id}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full font-medium outline-none transition-all flex items-center justify-between shadow-xs text-left cursor-pointer ${getTriggerStyles()} ${className}`}
      >
        <span className="truncate font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`${
            size === "sm" ? "w-3.5 h-3.5 right-2.5" : "w-4 h-4 right-3.5"
          } absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 ${getChevronColor()}`}
        />
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 py-1.5 rounded-xl bg-[#0F3D2A] border-2 border-[#C59B27]/70 shadow-[0_16px_40px_rgba(0,0,0,0.4)] overflow-hidden backdrop-blur-md animate-fadeIn">
          <div className="max-h-60 overflow-y-auto divide-y divide-white/5 scrollbar-thin scrollbar-thumb-white/10">
            {normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <div
                  key={String(opt.value)}
                  onClick={() => {
                    onChange(String(opt.value));
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#134E36] text-[#D8B045] font-bold"
                      : "text-white/90 hover:bg-[#134E36] hover:text-[#D8B045]"
                  }`}
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#D8B045] shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
