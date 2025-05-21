"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast"; // You'll need to install this
import Image from "next/image";

interface KeysProps {
  label: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: any;
  name: string;
  copyable?: boolean; 
}

const KeyInput: React.FC<KeysProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  name,
  copyable = false,
}) => {
  const [showInput, setShowInput] = useState(true);

  const togglePasswordVisibility = () => {
    setShowInput(!showInput);
  };

  const handleCopy = () => {
    if (!value) return;
    
    navigator.clipboard.writeText(value)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  return (
    <div className="w-full">
      <label className="block text-gray-800 font-semibold text-[12px] mb-1">
        {label} 
      </label>
      <div className="relative">
        <input
          type={showInput ? "text" : "password"}
       value={value.length > 20 ? value.slice(0,70) + "..." : value}

          onChange={onChange}
          name={name}
          className={`w-full relative border rounded-[4px] bg-[#FAFAFA] h-[40px] border-[#DCDCE4] flex items-center px-2 outline-none focus:outline-none text-[14px] text-[#8A8B9F] font-normal truncate `}
          placeholder={placeholder}
          disabled
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1">
        
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
             <Image src={"/icons/copy.svg"} alt={""} width={18} height={18}/>
            </button>
      
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="p-1 text-gray-500 hover:text-gray-700"
            title={showInput ? "Hide password" : "Show password"}
          >
            {showInput ? (
              <FaEyeSlash size={18} className="text-[#8A8B9F]" />
            ) : (
              <FaEye size={18} className="text-[#8A8B9F]"/>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyInput;





export const KeyInputweb: React.FC<KeysProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  name,
  copyable = false,
}) => {
  const [showInput, setShowInput] = useState(true);

  const togglePasswordVisibility = () => {
    setShowInput(!showInput);
  };

  const handleCopy = () => {
    if (!value) return;
    
    navigator.clipboard.writeText(value)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  return (
    <div className="w-full">
      <label className="block text-gray-800 font-semibold text-[12px] mb-1">
        {label} 
      </label>
      <div className="relative">
        <input
          type={showInput ? "text" : "password"}
          value={value}
          onChange={onChange}
          name={name}
          className={`w-full relative border rounded-[4px] bg-[#FAFAFA] h-[40px] border-[#DCDCE4] flex items-center px-2 outline-none focus:outline-none text-[14px] text-[#8A8B9F] font-normal`}
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1">
        
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
             <Image src={"/icons/copy.svg"} alt={""} width={18} height={18}/>
            </button>
      
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="p-1 text-gray-500 hover:text-gray-700"
            title={showInput ? "Hide password" : "Show password"}
          >
            {showInput ? (
              <FaEyeSlash size={18} className="text-[#8A8B9F]" />
            ) : (
              <FaEye size={18} className="text-[#8A8B9F]"/>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

