'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';

interface SelectionProps {
  label?: string;
  defaultSelectedOptions?: string[];
  availableOptions?: string[];
  onChange?: (selectedOptions: string[]) => void;
  required?: boolean;
  error?: any;
  visibility: string;
  placeholder?: string;
}

const Selection: React.FC<SelectionProps> = ({
  label = 'Accepted Collateral',
  visibility,
  defaultSelectedOptions = [],
  availableOptions = [],
  onChange,
  required = false,
  error,
  placeholder = 'Select an option',
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelectedOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const removeOption = (option: string) => {
    const newOptions = selectedOptions.filter(item => item !== option);
    setSelectedOptions(newOptions);
    if (onChange) onChange(newOptions);
  };

  const addOption = (option: string) => {
    const newOptions = [option]; // Only allow one selection
    setSelectedOptions(newOptions);
    setIsDropdownOpen(false);
    if (onChange) onChange(newOptions);
  };

  const getFilteredOptions = () => {
    return availableOptions
      .filter((option) => !selectedOptions.includes(option))
      .filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`w-full ${visibility}`} ref={dropdownRef}>
      <label className="block text-gray-800 font-semibold text-[12px] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`relative border rounded-[4px] bg-[#FAFAFA] min-h-[40px] border-[#DCDCE4] flex items-center px-2 cursor-pointer ${
          error ? 'border-red-500' : ''
        }`}
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap items-center flex-grow py-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <div key={option} className="flex items-center m-1 px-3 h-[32px] rounded-md bg-[#F0F0FF] text-[#156064] text-[12px] font-bold">
                <span className="mr-1">{option}</span>
                <button type="button" onClick={(e) => {
                  e.stopPropagation();
                  removeOption(option);
                }}>
                  <X size={14} color="#156064" className="border-l pl-1" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-[#8A8B9F] text-sm">{placeholder}</span>
          )}
        </div>
        <ChevronDown size={18} color="#333333" className="ml-auto" />
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md w-full">
          <div className="flex items-center px-2 py-1 border-b">
            <Search size={16} color="#333333" className="mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-[#156064] text-[12px] font-bold"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="py-1 max-h-60 overflow-auto text-[#156064] text-[12px] font-bold">
            {getFilteredOptions().map((option) => (
              <li
                key={option}
                onClick={() => addOption(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Selection;