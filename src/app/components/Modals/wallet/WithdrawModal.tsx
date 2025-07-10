"use client";
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import Modal from "./modal";
import { InputField, Label } from "./fundWallet";
import Image from "next/image";

// Props for the WithdrawModal
interface WithdrawModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

// Props for the ChangeAccountModal
interface ChangeAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (accountDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  }) => void;
  currentAccount: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}

export const ChangeAccountModal: React.FC<ChangeAccountModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentAccount,
}) => {
  const [accountDetails, setAccountDetails] = useState({
    accountName: currentAccount.accountName,
    accountNumber: currentAccount.accountNumber,
    bankName: currentAccount.bankName,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(accountDetails);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 z-50">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">
          Change Account Details
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="accountName">Account Name</Label>
            <InputField
              id="accountName"
              name="accountName"
              type="text"
              value={accountDetails.accountName}
              onChange={handleChange}
            //   required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="accountNumber">Account Number</Label>
            <InputField
              id="accountNumber"
              name="accountNumber"
              type="text"
              value={accountDetails.accountNumber}
              onChange={handleChange}
            //   required
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="bankName">Bank Name</Label>
            <InputField
              id="bankName"
              name="bankName"
              type="text"
              value={accountDetails.bankName}
              onChange={handleChange}
            //   required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-[#333333] py-[10px] px-4 rounded-[4px] hover:bg-gray-300 transition-colors font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#156064] text-white py-[10px] px-4 rounded-[4px] hover:bg-[#0e4a4d] transition-colors font-semibold text-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const [currentStep, setCurrentStep] = useState<"withdraw" | "confirmPin" | "success">("withdraw");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [isChangeAccountModalOpen, setIsChangeAccountModalOpen] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Withdraw formik
  const withdrawFormik = useFormik({
    initialValues: {
      accountName: "Neo Cash Microfinance",
      accountNumber: "0423807582",
      bankName: "Providus Bank",
      amount: "",
    },
    onSubmit: (values) => {
      const amount = parseFloat(values.amount.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(amount) && amount > 0) {
        setWithdrawalAmount(amount);
        setCurrentStep("confirmPin");
      }
    },
  });

  // PIN formik
  const pinFormik = useFormik({
    initialValues: {
      pin: ["", "", "", ""],
    },
    validate: (values) => {
      const errors: { pin?: string } = {};
      if (values.pin.some((digit) => digit === "")) {
        errors.pin = "PIN is required";
      }
      return errors;
    },
    onSubmit: () => {
      setCurrentStep("success");
    },
  });

  // Format input as currency
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue) return "";
    return `₦${parseInt(numericValue, 10).toLocaleString("en-US")}`;
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    withdrawFormik.setFieldValue("amount", e.target.value.replace(/[^0-9]/g, ""));
  };

  // Handle PIN digit change
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pinFormik.values.pin];
      newPin[index] = value;
      pinFormik.setFieldValue("pin", newPin);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !pinFormik.values.pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Reset state on modal close
  const handleCompleteWithdrawal = () => {
    closeModal();
    setCurrentStep("withdraw");
    pinFormik.resetForm();
    withdrawFormik.resetForm();
  };

  // Handle account details change
  const handleAccountChange = (accountDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  }) => {
    withdrawFormik.setValues({
      ...withdrawFormik.values,
      ...accountDetails,
    });
  };

  return (
    <>
      {/* Withdraw Modal */}
      {/* The main withdraw modal should only be visible if isModalOpen is true */}
      {isModalOpen && (
        <>
          <Modal isOpen={currentStep === "withdraw"} onClose={closeModal}>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#333333] mb-6">Withdraw</h2>
              <p className="text-center text-xs text-[#8A8B9F] italic mb-6 font-medium">
                Money will be withdrawn into the account below
              </p>

              <div className="flex flex-row w-full justify-between py-4 bg-[#F6F6F9] rounded-[4px] border border-[#DCDCE4] px-4">
                <div>
                  <p className="text-base font-medium text-[#8A8B9F] mb-1">{withdrawFormik.values.accountName}</p>
                  <p className="text-sm font-medium text-[#8A8B9F] mb-1">{withdrawFormik.values.accountNumber}</p>
                  <p className="text-sm font-medium text-[#8A8B9F]">{withdrawFormik.values.bankName}</p>
                </div>
                <button
                  type="button"
                  className="text-[#156064] text-sm font-semibold mt-2"
                  onClick={() => setIsChangeAccountModalOpen(true)}
                >
                  Change
                </button>
              </div>

              <form onSubmit={withdrawFormik.handleSubmit}>
                <div className="mb-[55px] mt-[22px]">
                  <Label htmlFor="amount">Amount</Label>
                  <InputField
                    id="amount"
                    name="amount"
                    type="text"
                    value={formatCurrency(withdrawFormik.values.amount)}
                    onChange={handleAmountChange}
                    className="text-lg font-bold"
                    placeholder="₦0"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#156064] text-white py-[10px] px-4 rounded-[4px] hover:bg-[#0e4a4d] transition-colors font-semibold text-xs"
                >
                  Withdraw
                </button>
              </form>
            </div>
          </Modal>

          {/* Confirm PIN Modal */}
          <Modal isOpen={currentStep === "confirmPin"} onClose={closeModal}>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#333333] mb-[100px]">Confirm Transaction</h2>
              <p className="text-center text-base text-[#333333] mb-6 font-semibold">
              Input your transaction PIN to process request
              </p>

              <form onSubmit={pinFormik.handleSubmit}>
             <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-[77px]">
  {pinFormik.values.pin.map((digit, index) => (
    <input
      key={index}
      id={`pin-${index}`}
      ref={(el) => {
        if (el) {
          inputRefs.current[index] = el;
        }
      }}
      type="password"
      maxLength={1}
      value={digit}
      onChange={(e) => handlePinChange(e, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      className={`
        w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]
        border-[3px] sm:border-[4px]
        border-[#156064] focus:ring-[#156064]
        rounded-[8px] focus:outline-none focus:ring-2
        text-center text-[32px] sm:text-[40px] font-bold
      `}
    />
  ))}
</div>


                <button
                  type="submit"
                  className="w-full bg-[#156064] text-white py-[10px] px-4 rounded-[4px] hover:bg-[#0e4a4d] transition-colors font-semibold text-xs"
                >
                  Confirm
                </button>
              </form>
            </div>
          </Modal>

          {/* Success Modal */}
          <Modal isOpen={currentStep === "success"} onClose={handleCompleteWithdrawal}>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#333333] mb-[80px]">Confirm Transaction</h2>


              <div className=" w-full flex justify-center items-center flex-col space-y-6 mb-[56px]">
                <div>
                  <Image
                    src={"/Image/tick-circle.svg"}
                    alt={"cred"}
                    height={73}
                    width={73}
                    className="mb-[24px]"
                  />
                </div>
                <h2 className="text-2xl font-medium  text-[#333333]">Withdrawal Successful</h2>
                <p className="text-sm font-medium text-[#8A8B9F]">
                  You have successfully withdrawn ₦{withdrawalAmount.toLocaleString("en-US")}
                </p>
              </div>

              <button
                onClick={handleCompleteWithdrawal}
                className="w-full bg-[#156064] text-white py-[10px] px-4 rounded-[4px] hover:bg-[#0e4a4d] transition-colors font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </Modal>
        </>
      )}

      {/* Change Account Modal - this should be rendered when isChangeAccountModalOpen is true, regardless of currentStep */}
      <ChangeAccountModal
        isOpen={isChangeAccountModalOpen}
        onClose={() => setIsChangeAccountModalOpen(false)}
        onSave={handleAccountChange}
        currentAccount={{
          accountName: withdrawFormik.values.accountName,
          accountNumber: withdrawFormik.values.accountNumber,
          bankName: withdrawFormik.values.bankName,
        }}
      />
    </>
  );
};