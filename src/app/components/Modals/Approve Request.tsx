"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApproveRequest: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // Only render if modal is open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="relative bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex pl-6 pt-6 pr-4 justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Approve Request
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-800 px-2 rounded-md border border-gray-300 font-bold text-lg hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-center mb-6">
              <img
                src="/Image/tick-circle.svg"
                alt="Success icon"
                className="w-22 h-22 object-cover"
              />
            </div>
            <div className="w-full">
              <p className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Processing Loan request approval...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveRequest;