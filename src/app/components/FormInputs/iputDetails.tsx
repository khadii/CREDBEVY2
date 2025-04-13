'use client';

import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: any;
  disabled?: boolean; // <-- New prop
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  error,
  disabled = false, // <-- Default to false
}) => {
  return (
    <div className="w-full">
      <label className="block text-gray-800 font-semibold text-[12px] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled} // <-- Condition to disable input
        className={`w-full relative border rounded-[4px] bg-[#FAFAFA] h-[40px] border-[#DCDCE4] flex items-center px-2 outline-none focus:outline-none text-[14px] ${
          error ? 'border-red-500' : ''
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`} // Optional: styling for disabled state
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;


// 'use client';

// import React, { useState } from 'react';
// import InputField from './InputField';

// const Form = () => {
//   const [duration, setDuration] = useState('3 Months');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleDurationChange = (e) => {
//     setDuration(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   return (
//     <div>
//       <InputField
//         label="Duration"
//         placeholder="Enter duration"
//         value={duration}
//         onChange={handleDurationChange}
//         requir