'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

interface Currency {
  symbol: string;
  name: string;
}

interface MinimumAmountInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: any;
}

const AmountInput: React.FC<MinimumAmountInputProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  required = false,
  error,
}) => {
  // Hardcode the currency to Naira
  const selectedCurrency = { symbol: '₦', name: 'Nigerian Naira' };

  return (
    <div className="w-full">
      <label className="block text-gray-800 font-semibold text-[12px] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="flex rounded-md">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className={`w-full relative border rounded-[4px] bg-[#FAFAFA] h-[40px] border-[#DCDCE4] flex items-center px-2 outline-none focus:outline-none text-[14px] ${
              error ? 'border-red-500' : ''
            }`}
            placeholder={placeholder}
            aria-label={label}
          />
          {/* Display the Naira symbol without dropdown functionality */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center px-3">
            <span className="text-[14px]">{selectedCurrency.symbol}</span>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AmountInput;