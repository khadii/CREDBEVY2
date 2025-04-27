'use client';

import { bulk_action } from '@/app/Redux/Loan_Product/loan_product_thunk';
import { AppDispatch, RootState } from '@/app/Redux/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface DropdownMenuProps {
  onClick: (e: React.MouseEvent) => void;
  productId: any;
  setActiveDropdown:any
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ onClick, productId ,setActiveDropdown}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading: bulkActionLoading,
    success: bulkActionSuccess,
    error: bulkActionError,
    data: bulkActionData,
  } = useSelector((state: RootState) => state.bulkAction);

  const handleEdit = () => {
    router.push(`/dashboard/loan-products/edit/${productId}`);
    setActiveDropdown(false)
  };

  const handleDelete = () => {
    dispatch(bulk_action({ loan_product_ids: [productId], action: 'delete' }));
    setActiveDropdown(false)
  };

  const handleActivate = () => {
    dispatch(bulk_action({ loan_product_ids: [productId], action: 'activate' }));
    setActiveDropdown(false)
    
  };

  const handleDeactivate = () => {
    dispatch(bulk_action({ loan_product_ids: [productId], action: 'deactivate' }));
    setActiveDropdown(false)
  };

  return (
    <div
      className="mt-1 w-[130px] bg-white rounded-[4px] shadow-lg py-3"
      onClick={onClick}
    >
      <p
        className="px-4 py-2 text-sm font-semibold text-[#333333] hover:bg-gray-100 cursor-pointer"
        onClick={handleEdit}
      >
        Send Reminder
      </p>
      <p
        className="px-4 py-2 text-sm font-semibold text-[#333333] hover:bg-gray-100 cursor-pointer"
        onClick={handleActivate}
      >
      Blacklist
      </p>
   
      <p
        className="px-4 py-2 text-sm font-semibold text-[#FF0303] hover:bg-gray-100 cursor-pointer"
        onClick={handleDelete}
      >
        Delete
      </p>
    </div>
  );
};
