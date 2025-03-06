"use client";
import { useDashboard } from "@/app/Context/DahboardContext";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const { interested, setInterested } = useDashboard();

  // Only render if modal is open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]"
      role="dialog"
    
    >
      <div className="relative bg-white rounded-lg lg:max-h-full md:max-h-[500px] overflow-scroll" >
        {/* Modal Header */}
        <div className="flex pl-[24px] pt-[24px] pr-[15px] justify-between w-full items-center">
          <h2 className="text-[24px] font-semibold text-[#333333]">
          Delete Role
          </h2>
          <button
            onClick={onClose}
            className="text-[#333333] px-2 rounded-[4px] border font-bold text-xs"
    
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-[24px] mt-[98px]">
          <div className="w-full justify-center items-center">
            <div className="w-full flex justify-center mb-[24px]">
              <img
                src="/Image/Trash.svg"
                alt="Delete icon"
                className="w-[95px] h-[95px] object-cover items-center justify-center"
              />
            </div>
            <div className="w-full">
              <p className="text-[24px] font-semibold text-[#333333] mb-[24px] text-center">
                Are you sure you want to delete this?
              </p>
              <h1 className="mb-[105px] text-center text-[#8A8B9F] text-[14px] font-semibold">
                Once you delete this, it can never be undone
              </h1>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex space-x-[396px]">
            <button
              onClick={onClose}
              className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-[12px] font-bold text-[#333333] hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose(); 
              }}
              className="px-[81px] py-[10px] border border-[#FA4D56] bg-[#FA4D56] rounded-[4px] text-[12px] font-bold text-white hover:bg-[#e53e3e] transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;