'use client'
import { ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface DurationInputProps {
  label?: string;
  value: string;
  onChange: (option: string) => void;
  options?: string[];
  required?: boolean;
}

const OptionInput: React.FC<DurationInputProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onChange(option); // Call the onChange prop with the selected option
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
        <div
          onClick={toggleDropdown}
          className="relative border rounded-[4px] bg-[#FAFAFA] h-[40px] border-[#DCDCE4] flex items-center px-2 cursor-pointer"
        >
          <span className="block truncate text-[14px] text-[#8A8B9F]">
            {value}
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
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <ul className="py-1">
              {options?.map((option) => (
                <li
                  key={option}
                  className={`relative cursor-pointer select-none py-2 px-4 hover:bg-gray-100 ${
                    value === option
                      ? 'bg-[#F0F0FF] text-[#156064] text-[14px]'
                      : 'text-[#156064] text-[14px] font-semibold'
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionInput;