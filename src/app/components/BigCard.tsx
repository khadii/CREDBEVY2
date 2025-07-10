"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { GoPlus } from "react-icons/go";
import { useDashboard } from "../Context/DahboardContext";

interface WalletBalanceProps {
  balance: string;
  accountNumber: string;
  onFundClick?: () => void;
}

export default function Bigcard({
  balance,
  accountNumber,
  onFundClick,
}: WalletBalanceProps) {
  const [isHidden, setIsHidden] = useState(false);
  const { isFundWallet, setFundWallet } = useDashboard();

  return (
    <div
      className="w-full mx-auto px-10 py-9 bg-[#156064] rounded-lg flex justify-between items-center text-white 
                    transition-transform duration-300 "
    >
      <div>
        <h3 className="text-sm font-semibold">Wallet Balance</h3>
        <p className="text-4xl font-semibold mt-2">
          {isHidden ? "***********" : balance}
        </p>
        <p className="text-[12px] mt-3 text-white font-medium">
          WALLET ACCOUNT NUMBER:{" "}
          <span className="font-semibold">{accountNumber}</span>
        </p>
        <button
          onClick={() => {
            onFundClick;setFundWallet(true);
          }}
          className="mt-4 flex  px-[10px] py-2 bg-white text-[#333333]  rounded-[4px] gap-1 items-center"
        >
          <p className="text-[20px] font-medium ">
            {" "}
            <GoPlus />
          </p>
          <p className="font-semibold text-[10px]"> Fund Wallet</p>
        </button>
      </div>
      <button onClick={() => setIsHidden(!isHidden)} className="mr-20">
        {isHidden ? (
          <EyeOff className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
        ) : (
          <Eye className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
        )}
      </button>
    </div>
  );
}

export function Smallcard({
  balance,
  accountNumber,
  onFundClick,
}: WalletBalanceProps) {
  const [isHidden, setIsHidden] = useState(false);
  const { isFundWallet, setFundWallet } = useDashboard();
  return (
    <div
      className="relative w-full mx-auto pl-10 pr-[32px] py-[25px] bg-[#156064] rounded-lg flex justify-between items-center text-white 
                    transition-transform duration-300 "
    >
      <div>
        <h3 className="text-sm font-semibold">Wallet Balance</h3>
        <p className="text-2xl font-semibold mt-[8px]">
          {isHidden ? "***********" : balance}
        </p>
        <p className="text-xs text-white font-medium">
          WALLET ACCOUNT NUMBER:{" "}
          <span className="font-semibold">{accountNumber}</span>
        </p>
        <button
            onClick={() => {
            onFundClick;setFundWallet(true);
          }}
          className=" mt-[5px] flex items-center px-[10px] py-2 bg-white text-[#333333]  rounded-[4px] gap-1"
        >
          <p className="text-[16px] font-bold "> + </p>
          <p className="font-semibold text-[10px]"> Fund Wallet</p>
        </button>
      </div>
      <button
        onClick={() => setIsHidden(!isHidden)}
        className="absolute right-5 top-14"
      >
        {isHidden ? (
          <EyeOff className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
        ) : (
          <Eye className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
        )}
      </button>
    </div>
  );
}
