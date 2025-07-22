"use client";
import { useDashboard } from "@/app/Context/DahboardContext";
import {
  _single_loan_products_request,
  approve_loan,
} from "@/app/Redux/Loan_request/loan_request_thunk";
import { resetPinState } from "@/app/Redux/pin/pinkslice";
import { ConfirmPin } from "@/app/Redux/pin/pinthunk";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import AnimatedLoader from "../animation";
import LoanModal from "./indicateInteresteDetails";
import IndicateSuccessModal from "./indicateSuccessModal";
import { resetApproveState } from "@/app/Redux/Loan_request/loanConditon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PinModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { authPin, setAuhPin, selectedIds, refreshData, setInterested } =
    useDashboard();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({ pin: '' });
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [borderRed, setBorderRed] = useState(false);
  const [state, setState] = useState(1);

  const {
    loading: pinLoading,
    success: pinSuccess,
    error: pinError,
    message: pinMessage,
  } = useSelector((state: RootState) => state.Pin.accept);

  const { approveLoading, approveSuccess, approveError, approveData } =
    useSelector((state: RootState) => state.loanCondition);

  const resetAll = () => {
    setPin(["", "", "", ""]);
    setErrors({ pin: '' });
    setBorderRed(false);
    dispatch(resetPinState());
  };

  const handleClose = () => {
    resetAll();
    setState(1);
    onClose();
  };

  const getProductCookie = () => {
    try {
      const productCookie = Cookies.get("product_id");
      if (!productCookie) return null;
      if (typeof productCookie === "object") return productCookie;
      if (!productCookie.startsWith("{")) return productCookie;
      return JSON.parse(productCookie);
    } catch (error) {
      console.error("Failed to parse product cookie:", error);
      Cookies.remove("product_id");
      return null;
    }
  };

  useEffect(() => {
    if (pinSuccess) {
      resetAll();
      
      const pinPayload = {
        pin: pin.map((digit) => Number(digit)),
      };
      setAuhPin(pinPayload.pin);

      const currentRequestParams = {
        product_id: [selectedIds],
        pin: pinPayload.pin,
      };

      dispatch(approve_loan(currentRequestParams));
    }
    
    if (pinError) {
      toast.error(pinError);
      setBorderRed(true);
      dispatch(resetPinState());
    }
  }, [pinSuccess, pinError, pinMessage, dispatch]);

  useEffect(() => {
    if (approveSuccess) {
      const productData = getProductCookie();
      dispatch(_single_loan_products_request({ id: productData }));
      refreshData();
      toast.success(approveData?.message || "Loan approved successfully");
      setState(3);
    dispatch(resetApproveState());
    }

    if (approveError) {
      const productData = getProductCookie();
      toast.error(approveError );
      refreshData();
      dispatch(_single_loan_products_request({ id: productData }));
      setInterested(true);
      handleClose();
 dispatch(resetApproveState());
    }
  }, [approveSuccess,approveError,dispatch]);

  const handleChange = (index: number, value: string) => {
    if (errors.pin) {
      setErrors({ pin: '' });
    }
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const validate = (): boolean => {
    const newErrors = { pin: '' };
    const emptyIndex = pin.findIndex((digit) => digit === "");

    if (emptyIndex !== -1) {
      newErrors.pin = "Please complete the PIN";
      inputRefs.current[emptyIndex]?.focus();
    }

    setErrors(newErrors);
    return !newErrors.pin;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const pinPayload = {
        pin: pin.map((digit) => Number(digit)),
        actionType: 'accept' as const
      };

      await dispatch(ConfirmPin(pinPayload));
    } catch (error) {
      console.error("Error processing request:", error);
      toast.error("Failed to process request");
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="relative bg-white rounded-lg">
        {approveLoading || pinLoading ? (
          <AnimatedLoader isLoading={approveLoading || pinLoading} />
        ) : (
          <>
            {state === 1 && (
              <LoanModal
                open={isOpen}
                setOpen={onClose}
                setState={setState}
                titleName={"Accept Request"}
                buttonName={"Accept Request"} 
              />
            )}
            {state === 2 && (
              <>
                <div className="flex pl-[24px] pt-[24px] pr-[15px] justify-between w-full items-center">
                  <h2 className="text-[24px] font-bold text-[#333333] md:text-[24px] text-[20px]">
                    Accept Request
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-[#333333] px-2 rounded-[4px] border font-bold text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-[24px] mt-[50px] md:mt-[127px]">
                  <div className="w-full justify-center items-center flex">
                    <div className="w-full">
                      <p className="text-[16px] font-bold text-[#333333] mb-[24px] text-center">
                        Input your transaction PIN to process request
                      </p>

                      <div className="flex justify-center space-x-2 md:space-x-6">
                        {pin.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              if (el) {
                                inputRefs.current[index] = el;
                              }
                            }}
                            type="password"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            className={`w-[50px] h-[50px] md:w-[80px] md:h-[80px] border-[4px] ${
                              errors.pin && digit === ""
                                ? "border-red-500 focus:ring-red-500"
                                : "border-[#156064] focus:ring-[#156064]"
                            } rounded-[8px] focus:outline-none focus:ring-2 text-center text-[24px] md:text-[40px] font-bold mb-[50px] md:mb-[134px]`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {errors.pin && (
                    <p className="text-red-500 mb-4 text-center">
                      {errors.pin}
                    </p>
                  )}

        <div className="flex flex-col sm:flex-row sm:space-x-[96px] space-y-4 sm:space-y-0 justify-center">
                    <button
                      onClick={handleClose}
                      className="px-[40px] md:px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-[12px] font-bold text-[#333333]"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-[40px] md:px-[81px] py-[10px] border border-[#156064] bg-[#156064] rounded-[4px] text-[12px] font-bold text-white"
                      onClick={handleSubmit}
                      disabled={pinLoading || approveLoading}
                    >
                      {pinLoading || approveLoading ? "Processing..." : "Done"}
                    </button>
                  </div>
                </div>
              </>
            )}
            {state === 3 && (
              <IndicateSuccessModal
                open={isOpen}
                setOpen={handleClose}
                setState={setState}
                disc={"You Have Successfully Disbursed Loan"}
                title={"Acceptance Of Request Successful"}
                header={"Accept Request"}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PinModal;