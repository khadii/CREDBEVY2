'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';

interface CollateralSelectionProps {
  label?: string;
  defaultSelectedOptions?: string[];
  availableOptions?: string[];
  onChange?: (selectedOptions: string[]) => void;
  required?: boolean;
  error?: any; // Add error prop
  visibility: any;
}

const CollateralSelection: React.FC<CollateralSelectionProps> = ({
  label = 'Accepted Collateral',
  visibility,
  defaultSelectedOptions = ['Car', 'Property', 'Equipment'],
  availableOptions = [
    'Car',
    'Property',
    'Equipment',
    'Inventory',
    'Accounts Receivable',
    'Investments',
    'Insurance',
  ],
  onChange,
  required = false,
  error,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const removeOption = (option: string) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
    if (onChange) {
      onChange(updatedOptions);
    }
  };

  const addOption = (option: string) => {
    if (!selectedOptions.includes(option)) {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
      setIsDropdownOpen(false);
      if (onChange) {
        onChange(updatedOptions);
      }
    }
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
        <div className="flex flex-wrap items-center flex-grow gap-1 py-1">
          {selectedOptions.map((option) => (
            <div
              key={option}
              className="flex items-center px-3 h-[32px] rounded-md bg-[#F0F0FF] text-[#156064] text-[12px] font-bold"
            >
              <span className="mr-1">{option}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(option);
                }}
                className="ml-1"
              >
                <X size={14} color="#156064" />
              </button>
            </div>
          ))}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
          className="ml-auto text-gray-500 hover:text-gray-700"
        >
          <ChevronDown size={18} color="#333333" />
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-full max-w-[500px]">
          <div className="flex items-center px-2 py-1 border-b">
            <Search size={16} color="#333333" className="mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-[#156064] text-[12px] font-bold py-2"
              autoFocus
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

export default CollateralSelection;