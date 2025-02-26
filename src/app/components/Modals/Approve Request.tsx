"use client";
import React, { useState, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApproveRequest: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState(["", "", "", ""]);

  // 1) Make a ref that stores an array of HTMLInputElements
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Safely handle input changes
  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d?$/.test(value)) return;

    // Update the pin array
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move focus to next input if user typed a digit
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // 2) Only render if modal is open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      //   onClick={onClose}
    >
      <div className="relative bg-white">
        <div className=" flex pl-[24px] pt-[24px] pr-[15px] justify-between w-full items-center">
          <h2 className="text-[24px] font-semibold text-[#333333]">
          Approve Request
          </h2>
          <button onClick={onClose} className=" text-[#333333] px-2 rounded-[4px] border font-bold tetx-xs">
            ✕
          </button>
        </div>

        <div className="p-[24px] mt-[98px] ">
          <div className="w-full justify-center items-center  ">
           <div className="w-full flex justify-center mb-[24px]">
           <img
            src="/Image/tick-circle.svg"
            alt=""
            className="w-[88px] h-[88px] object-cover items-center justify-center"
            />
           </div>
            <div className="w-full  ">
              <p className=" text-[24px]  font-semibold text-[#333333] mb-[24px] text-center ">
              Loan Successfully Approved
              </p>
              <h1 className="mb-[105px] text-center text-[#8A8B9F] text-[14px] font-semibold">
              A loan request of  ₦ 134,000.00 has been approved
              </h1>

              <div className="flex justify-center space-x-6">
              
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
            <button className="px-[81px] py-[10px] border border-[#156064] bg-[#156064] rounded-[4px] text-[12px] font-bold text-white">
            Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveRequest;
