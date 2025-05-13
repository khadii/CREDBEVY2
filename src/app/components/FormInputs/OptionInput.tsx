'use client';

import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface DurationInputProps {
  label?: string;
  value: string;
  onChange: (option: string) => void;
  options?: string[];
  required?: boolean;
  error?: any;
  placeholder?: string;
  disabledOptions?: string[]; // Add disabledOptions prop
}

const OptionInput: React.FC<DurationInputProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  placeholder = "Select an option",
  disabledOptions = [], // Default to empty array
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    if (disabledOptions.includes(option)) return; // Don't select if option is disabled
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-gray-800 font-semibold text-[12px] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className={`relative border rounded-[4px] bg-[#FAFAFA] h-[40px] border-[#DCDCE4] flex items-center px-2 cursor-pointer ${
            error ? "border-red-500" : ""
          }`}
        >
          <span
            className={`block truncate text-[14px] ${
              value ? "text-[#333333]" : "text-[#8A8B9F]"
            }`}
          >
            {value || placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              onClick={toggleDropdown}
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              <ChevronDown size={18} color="#333333" />
            </button>
          </span>
        </div>

        {isOpen && (
          <div className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <ul className="py-1">
              {options?.map((option) => (
                <li
                  key={option}
                  className={`relative py-2 px-4 text-[14px] ${
                    disabledOptions.includes(option)
                      ? "text-gray-400 cursor-not-allowed"
                      : "cursor-pointer hover:bg-gray-100"
                  } ${
                    value === option
                      ? "bg-[#F0F0FF] text-[#156064] font-semibold"
                      : "text-[#156064] font-semibold"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                  {disabledOptions.includes(option) && (
                    <span className="ml-2 text-xs">(Coming soon)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default OptionInput;