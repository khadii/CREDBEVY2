"use client";
import React, { useState, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose:any
  setIsModalOpenApproveRequest:any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose,setIsModalOpenApproveRequest}) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    // Move focus to next input if user typed a digit
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]"
    >
      <div className="relative bg-white rounded-lg">
        <div className=" flex pl-[24px] pt-[24px] pr-[15px] justify-between w-full items-center">
          <h2 className="text-[24px] font-bold text-[#333333]">
          Indicate Interest
          </h2>
          <button onClick={onClose} className=" text-[#333333] px-2 rounded-[4px] border font-bold tetx-xs">
            ✕
          </button>
        </div>

        <div className="p-[24px] mt-[127px] ">
          <div className="w-full justify-center items-center flex">
            <div className="w-full  ">
              <p className=" text-[16px] font-bold text-[#333333] mb-[24px] text-center ">
                Input your transaction PIN to process request
              </p>

              <div className="flex justify-center space-x-6">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    // 3) Use the callback ref pattern to populate inputRefs.current[]
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    type="text"
                    // 4) Use a numeric maxLength
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-[80px] h-[80px]  border-[4px]  border-[#156064] rounded-[8px] focus:outline-none focus:ring-2 text-center focus:ring-[#156064] text-[40px] font-bold  mb-[134px] "
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-[96px]">
            <button
              onClick={onClose}
              className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-[12px] font-bold text-[#333333]"
            >
              Cancel
            </button>
            <button className="px-[81px] py-[10px] border border-[#156064] bg-[#156064] rounded-[4px] text-[12px] font-bold text-white"   onClick={() => {
    setIsModalOpenApproveRequest(true);
    onClose();
  }}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
