'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputFieldPasswordProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: any;
  name: string; // Add this prop to match formik field names
}

const InputFieldPassword: React.FC<InputFieldPasswordProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'password',
  required = false,
  error,
  name, // Destructure the name prop
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <label className="block text-gray-800 font-semibold text-[12px] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          name={name} // Bind the name prop
          className={`w-full relative border rounded-[4px] bg-[#FAFAFA] h-[40px] border-[#DCDCE4] flex items-center px-2 outline-none focus:outline-none text-[14px] ${
            error ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputFieldPassword;