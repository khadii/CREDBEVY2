"use client";
import React, { useState, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: any;
  setIsModalOpenApproveRequest: any;
}

interface ErrorState {
  pin?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, setIsModalOpenApproveRequest }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState<ErrorState>({});
  const inputRefs = useRef<HTMLInputElement[]>([]);
  
  const handleChange = (index: number, value: string) => {
    if (error.pin) {
      setError({});
    }
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  if (!isOpen) return null;

  const validate = () => {
    const newError: ErrorState = {};
    const emptyIndex = pin.findIndex(digit => digit === "");
    if (emptyIndex !== -1) {
      newError.pin = "Please complete the PIN";
      inputRefs.current[emptyIndex]?.focus();
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsModalOpenApproveRequest(true);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="relative bg-white rounded-lg">
        <div className="flex pl-[24px] pt-[24px] pr-[15px] justify-between w-full items-center">
          <h2 className="text-[24px] font-bold text-[#333333]">
            Indicate Interest
          </h2>
          <button onClick={onClose} className="text-[#333333] px-2 rounded-[4px] border font-bold tetx-xs">
            ✕
          </button>
        </div>

        <div className="p-[24px] mt-[127px]">
          <div className="w-full justify-center items-center flex">
            <div className="w-full">
              <p className="text-[16px] font-bold text-[#333333] mb-[24px] text-center">
                Input your transaction PIN to process request
              </p>

              <div className="flex justify-center space-x-6">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className={`w-[80px] h-[80px] border-[4px] ${
                      error.pin && digit === "" 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-[#156064] focus:ring-[#156064]"
                    } rounded-[8px] focus:outline-none focus:ring-2 text-center text-[40px] font-bold mb-[134px]`}
                  />
                ))}
              </div>
            </div>
          </div>
          {error.pin && (
            <p className="text-red-500 mb-4 text-center">{error.pin}</p>
          )}

          <div className="flex space-x-[96px] justify-center">
            <button
              onClick={onClose}
              className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-[12px] font-bold text-[#333333]"
            >
              Cancel
            </button>
            <button 
              className="px-[81px] py-[10px] border border-[#156064] bg-[#156064] rounded-[4px] text-[12px] font-bold text-white"
              onClick={handleSubmit}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;