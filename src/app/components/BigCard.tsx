"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface WalletBalanceProps {
  balance: string;
  accountNumber: string;
  onFundClick?: () => void;
}

export default function Bigcard({ balance, accountNumber, onFundClick }: WalletBalanceProps) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="w-full mx-auto px-10 py-9 bg-[#156064] rounded-lg flex justify-between items-center text-white 
                    transition-transform duration-300 ">
      <div>
        <h3 className="text-base font-bold">Wallet Balance</h3>
        <p className="text-4xl font-bold mt-2">
          ₦ {isHidden ? "***********" : balance}
        </p>
        <p className="text-xs mt-3 text-white font-medium">
          WALLET ACCOUNT NUMBER: <span className="font-semibold">{accountNumber}</span>
        </p>
        <button 
          onClick={onFundClick} 
          className="mt-4 flex items-center px-[10px] py-2 bg-white text-[#333333]  rounded-[4px] gap-1"
        >
         <p className="text-[16px] font-bold "> + </p>
         <p className="font-bold text-[10px]"> Fund Wallet</p>
        </button>
      </div>
      <button onClick={() => setIsHidden(!isHidden)} className="mr-20">
        {isHidden ? <EyeOff className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" /> 
                  : <Eye className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />}
      </button>
    </div>
  );
}
