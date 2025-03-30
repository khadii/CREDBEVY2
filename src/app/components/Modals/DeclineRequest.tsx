"use client";
import { useDashboard } from "@/app/Context/DahboardContext";
import { decline_interest } from "@/app/Redux/Loan_request/loan_request_thunk";
import { AppDispatch, RootState } from "@/app/Redux/store";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeclineRequest: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { selectedIds, refreshData, setInterested } = useDashboard();
  const dispatch = useDispatch<AppDispatch>();
  const {   declineLoading,
    declineSuccess,
    declineError,
    declineData, } = useSelector((state: RootState) => state.loanrejectaccept);
  
  if (!isOpen) return null;
  
  const handleSubmit = async () => {
    try {
      const currentRequestParams = {
        product_id: [selectedIds],
      };
      
      const notinterestResult = await dispatch(decline_interest(currentRequestParams));
      
      if (notinterestResult.meta.requestStatus === 'fulfilled') {
        refreshData();
        setInterested(false);
        onClose();
        toast.success('Request declined successfully');
      }
    } catch (error) {
      console.error('Error processing request:', error);
      toast.error('Failed to process request');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="relative bg-white rounded-lg">
        <div className="flex pl-[24px] pt-[24px] pr-[15px] justify-between w-full items-center">
          <h2 className="text-[24px] font-semibold text-[#333333]">
            Decline Request
          </h2>
          <button 
            onClick={onClose} 
            className="text-[#333333] px-2 rounded-[4px] border font-bold text-xs"
          >
            ✕
          </button>
        </div>

        <div className="p-[24px] mt-[98px]">
          <div className="w-full justify-center items-center">
            <div className="w-full flex justify-center mb-[24px]">
              <img
                src="/Image/close-circle.svg"
                alt="Decline icon"
                className="w-[88px] h-[88px] object-cover items-center justify-center"
              />
            </div>
            <div className="w-full">
              <p className="text-[24px] font-semibold text-[#333333] mb-[24px] text-center">
                Are you sure you want to decline this offer?
              </p>
              <h1 className="mb-[105px] text-center text-[#8A8B9F] text-[14px] font-semibold">
                A loan request of ₦134,000.00 from a user with CS OF <span className="text-[#42BE65]">750</span>
              </h1>
            </div>
          </div>

          <div className="flex space-x-[96px]">
            <button
              onClick={onClose}
              className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-[12px] font-bold text-[#333333]"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={declineLoading}
              className="px-[81px] py-[10px] border border-[#FA4D56] bg-[#FA4D56] rounded-[4px] text-[12px] font-bold text-white disabled:opacity-50"
            >
              {declineLoading ? 'Processing...' : 'Decline'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclineRequest;