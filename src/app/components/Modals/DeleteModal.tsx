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
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="flex pl-6 pt-6 pr-4 justify-between w-full items-center">
          <h2 className="text-2xl font-semibold text-[#333333]">
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
        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-6">
              <img
                src="/Image/Trash.svg"
                alt="Delete icon"
                className="w-24 h-24 object-cover"
              />
            </div>
            <div className="w-full text-center">
              <p className="text-2xl font-semibold text-[#333333] mb-6">
                Are you sure you want to delete this?
              </p>
              <p className="mb-10 text-[#8A8B9F] text-sm font-semibold">
                Once you delete this, it can never be undone
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-between gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-[#333333] rounded-[4px] text-xs font-bold text-[#333333] hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose(); 
              }}
              className="flex-1 py-2 border border-[#FA4D56] bg-[#FA4D56] rounded-[4px] text-xs font-bold text-white hover:bg-[#e53e3e] transition-colors"
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