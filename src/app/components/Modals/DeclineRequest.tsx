"use client";
import { useDashboard } from "@/app/Context/DahboardContext";
import React, { useState, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeclineRequest: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { interested, setInterested } = useDashboard();
  // 2) Only render if modal is open
  if (!isOpen) return null;
  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]"
      //   onClick={onClose}
    >
      <div className="relative bg-white rounded-lg">
        <div className=" flex pl-[24px] pt-[24px] pr-[15px] justify-between w-full items-center">
          <h2 className="text-[24px] font-semibold text-[#333333]">
          Decline Request
          </h2>
          <button onClick={onClose} className=" text-[#333333] px-2 rounded-[4px] border font-bold tetx-xs">
            ✕
          </button>
        </div>

        <div className="p-[24px] mt-[98px] ">
          <div className="w-full justify-center items-center  ">
           <div className="w-full flex justify-center mb-[24px]">
           <img
            src="/Image/close-circle.svg"
            alt=""
            className="w-[88px] h-[88px] object-cover items-center justify-center"
            />
           </div>
            <div className="w-full  ">
              <p className=" text-[24px]  font-semibold text-[#333333] mb-[24px] text-center ">
              Are you sure you want to decline  this offer?
              </p>
              <h1 className="mb-[105px] text-center text-[#8A8B9F] text-[14px] font-semibold">
              A loan request of  ₦ 134,000.00 from a user with CS OF <span className="text-[#42BE65]"> 750</span>
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
            <button className="px-[81px] py-[10px] border border-[#FA4D56] bg-[#FA4D56] rounded-[4px] text-[12px] font-bold text-white" onClick={()=>{setInterested(false);onClose()}}>
            Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclineRequest;
