"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: (DropdownOption | string)[];
  placeholder?: string;
  className?: string;
  id?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  className = "",
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize options to { value, label }
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

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

  return (
    <div ref={dropdownRef} className="relative w-full select-none" id={id}>
      {/* Dropdown Trigger Button - White background when closed, green when opened */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full px-4 py-3 pr-10 rounded-xl text-xs font-medium outline-none transition-all flex items-center justify-between shadow-xs text-left cursor-pointer border-2 ${
          isOpen
            ? "bg-[#0A251A] text-white border-[#BFA054] shadow-md"
            : "bg-white text-[#111827] border-[#0A251A]/20 hover:border-[#0A251A]/40 focus:border-[#0A251A] focus:ring-2 focus:ring-[#0A251A]/20"
        } ${className}`}
      >
        <span className="truncate font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 ${
            isOpen
              ? "rotate-180 text-[#D4B568]"
              : "rotate-0 text-[#0A251A]"
          }`}
        />
      </button>

      {/* Dropdown Menu Popup - Luxury GREEN background with gold accents and ZERO OS blue */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 py-1.5 rounded-xl bg-[#0A251A] border-2 border-[#BFA054]/60 shadow-[0_16px_40px_rgba(0,0,0,0.4)] overflow-hidden backdrop-blur-md animate-fadeIn">
          <div className="max-h-60 overflow-y-auto divide-y divide-white/5">
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#061710] text-[#D4B568] font-bold"
                      : "text-white/90 hover:bg-[#061710] hover:text-[#D4B568]"
                  }`}
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#D4B568] shrink-0" />
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
