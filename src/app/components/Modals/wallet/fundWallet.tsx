
'use client'


import React, { useEffect, useRef, useState } from 'react';
import Modal from './modal';
import { useFormik } from 'formik';

// Reusable Label Component
interface LabelProps {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, className = '', children }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-xs font-semibold text-[#333333] mb-1 ${className}`}>
      {children}
    </label>
  );
};


export const Title: React.FC<LabelProps> = ({ htmlFor, className = '', children }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-xs font-semibold text-[#8A8B9F] mb-2 ${className}`}>
      {children}
    </label>
  );
};

// Reusable Input Field Component
interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
    placeholder?: string;
    maxLength?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  className = '',
  readOnly = false,
    placeholder = '',
      maxLength,
    
  
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={`w-full px-4 py-2 border border-[#DCDCE4] rounded-[4px] outline-none text-sm text-[#32324D] ${className} font-normal`}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
        placeholder={placeholder}
         maxLength={maxLength}
    />
  );
};

// Main App component
interface FundWalletProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const FundWallet: React.FC<FundWalletProps> = ({ isModalOpen, closeModal }) => {
  const formik = useFormik({
    initialValues: {
      accountNumber: '9055380387',
      bank: 'Guarantee Trust Bank',
      accountName: 'Credbevy Incorporation',
    },
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      closeModal();
    },
  });

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-[68px]">Fund Wallet</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="accountNumber">Account Number</Label>
            <InputField
              id="accountNumber"
              name="accountNumber"
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              readOnly
              
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="bank" className="text-sm font-medium text-gray-700">
              Bank
            </Label>
            <InputField
              id="bank"
              name="bank"
              value={formik.values.bank}
              onChange={formik.handleChange}
              readOnly
            //   className="border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div className="mb-[50px]">
            <Label htmlFor="accountName" className="text-sm font-medium text-gray-700">
              Account Name
            </Label>
            <InputField
              id="accountName"
              name="accountName"
              value={formik.values.accountName}
              onChange={formik.handleChange}
              readOnly
            //   className="border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <p className="text-center text-xs text-[#8A8B9F] italic mb-[40px] font-medium">
            Kindly use the details above to send money into your credbevy account through your bank apps
          </p>

          {/* <button
            type="submit"
            className="w-full bg-[#156064] text-white py-2 px-4 rounded-lg hover:bg-[#0e4a4d] transition-colors"
          >
            Confirm
          </button> */}
        </form>
      </div>
    </Modal>
  );
};

export default FundWallet;









interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  className = '',
  placeholder = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`w-full px-4 py-2 border border-[#DCDCE4] rounded-[4px] outline-none text-sm text-[#32324D] font-normal flex items-center justify-between cursor-pointer ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={!selectedOption ? 'text-[#999999]' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="#32324D"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#DCDCE4] rounded-[4px] shadow-md max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 text-sm text-[#32324D] cursor-pointer hover:bg-[#F0F0FF] ${
                option.value === value ? 'bg-[#F0F0FF]' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};