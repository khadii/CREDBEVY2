'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface Currency {
  symbol: string;
  name: string;
}

interface MinimumAmountInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currencies?: Currency[];
  required?: boolean;
}

const MinimumAmountInput: React.FC<MinimumAmountInputProps> = ({
  label = 'Minimum Amount',
  placeholder = '',
  value,
  onChange,
  currencies = [
    { symbol: '₦', name: 'Nigerian Naira' },
    { symbol: '$', name: 'US Dollar' },
    { symbol: '€', name: 'Euro' },
    { symbol: '£', name: 'British Pound' },
  ],
  required = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
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
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-gray-800 font-semibold text-[12px] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="flex rounded-md">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full relative border rounded-[4px] bg-[#FAFAFA] h-[40px] border-[#DCDCE4] flex items-center px-2 outline-none focus:outline-none text-[14px]"
            placeholder={placeholder}
            aria-label={label}
          />
          <div className="absolute right-0 top-0 bottom-0 flex items-center px-3">
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex items-center text-gray-500 hover:text-gray-600"
            >
              <span className="mr-1 text-[14px]">{selectedCurrency.symbol}</span>
              <ChevronDown size={18} color="#333333" />
            </button>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute top-9 right-0 mt-1 w-36 rounded-md bg-white shadow-lg z-10 border border-gray-100">
            <ul className="py-1">
              {currencies.map((currency) => (
                <li key={currency.symbol}>
                  <button
                    type="button"
                    onClick={() => selectCurrency(currency)}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    <span className="mr-2 text-[14px]">{currency.symbol}</span>
                    {currency.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimumAmountInput;