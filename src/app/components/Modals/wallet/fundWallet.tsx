import React from 'react';
import Modal from './modal';
import { useFormik } from 'formik';

// Reusable Label Component
interface LabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, className = '', children }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-xs font-semibold text-[#333333] mb-1 ${className}`}>
      {children}
    </label>
  );
};

// Reusable Input Field Component
interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
    placeholder?: string;
    maxLength?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  className = '',
  readOnly = false,
    placeholder = '',
      maxLength,
    
  
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={`w-full px-4 py-2 border border-[#DCDCE4] rounded-[4px] outline-none text-sm text-[#32324D] ${className} font-normal`}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
        placeholder={placeholder}
         maxLength={maxLength}
    />
  );
};

// Main App component
interface FundWalletProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const FundWallet: React.FC<FundWalletProps> = ({ isModalOpen, closeModal }) => {
  const formik = useFormik({
    initialValues: {
      accountNumber: '9055380387',
      bank: 'Guarantee Trust Bank',
      accountName: 'Credbevy Incorporation',
    },
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      closeModal();
    },
  });

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-[68px]">Fund Wallet</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="accountNumber">Account Number</Label>
            <InputField
              id="accountNumber"
              name="accountNumber"
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              readOnly
              
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="bank" className="text-sm font-medium text-gray-700">
              Bank
            </Label>
            <InputField
              id="bank"
              name="bank"
              value={formik.values.bank}
              onChange={formik.handleChange}
              readOnly
            //   className="border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div className="mb-[50px]">
            <Label htmlFor="accountName" className="text-sm font-medium text-gray-700">
              Account Name
            </Label>
            <InputField
              id="accountName"
              name="accountName"
              value={formik.values.accountName}
              onChange={formik.handleChange}
              readOnly
            //   className="border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <p className="text-center text-xs text-[#8A8B9F] italic mb-[40px] font-medium">
            Kindly use the details above to send money into your credbevy account through your bank apps
          </p>

          {/* <button
            type="submit"
            className="w-full bg-[#156064] text-white py-2 px-4 rounded-lg hover:bg-[#0e4a4d] transition-colors"
          >
            Confirm
          </button> */}
        </form>
      </div>
    </Modal>
  );
};

export default FundWallet;