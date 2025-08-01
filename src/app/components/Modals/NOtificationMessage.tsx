import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Notification } from '@/app/Redux/Notification/Notification'; 

// MessageDetailModal Component
const MessageDetailModal = ({ isOpen, notification, onClose }: { 
  isOpen: boolean, 
  notification: Notification | null, 
  onClose: () => void 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !notification || !notification.data.message) {
    return null;
  }

  // Helper to format currency and handle both string and number inputs
  const formatCurrency = (amount: number | string | undefined): string => {
    if (amount === undefined || amount === null) {
      return '₦0.00';
    }
    
    let numericAmount: number;

    if (typeof amount === 'string') {
      numericAmount = parseFloat(amount.replace(/,/g, ''));
    } else {
      numericAmount = amount;
    }

    if (isNaN(numericAmount)) {
      return '₦0.00';
    }

    return `₦${numericAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 font-sans z-[70]">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold text-[#333333]">Message Details</h3> 
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
            aria-label="Close message view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1">
          {notification.type === 'request' ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[#333333]">Loan Information</h4>
                <div className="mt-2 space-y-2 text-sm">
                  <p><span className="font-semibold">Borrower:</span> {notification.data.user_name}</p>
                  <p><span className="font-semibold">Amount:</span> {formatCurrency(notification.data.loan_amount)}</p>
                  <p><span className="font-semibold">Status:</span> {notification.data.status}</p>
                  <p><span className="font-semibold">Date:</span> {notification.data.timestamp}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[#333333]">Message</h4>
                <div 
                  className="mt-2 text-sm text-[#333333]"
                  dangerouslySetInnerHTML={{ __html: notification.data.message }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div 
                className="text-sm leading-relaxed text-[#333333]"
                dangerouslySetInnerHTML={{ __html: notification.data.message }}
              />
              <p className="text-sm text-gray-500">
                {new Date(notification.created_at).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#156064] text-white rounded-md hover:bg-[#104e52] focus:outline-none focus:ring-2 focus:ring-[#156064]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailModal;