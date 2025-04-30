"use client";

import { FaCircle } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { DropdownMenu } from "../Modals/activateDeActivate";
import { useDashboard } from "@/app/Context/DahboardContext";

interface StatusWithOptionsProps {
  status: string;
}

export const StatusWithOptions = ({
  status,
}: StatusWithOptionsProps) => {
  const statusStyles = {
    active: "border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2]",
    repaid: "border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2]",
    overdue: "border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1]",
    inactive: "border-[#FFF2C2] bg-[#FFFBEF] text-[#F4C418]",
    completed: "border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2]",
    failed: "border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1]",
    pending: "border-[#FFF2C2] bg-[#FFFBEF] text-[#F4C418]"
  };

  const statusColors = {
    active: "#42BE65",
    repaid: "#42BE65",
    overdue: "#E33A24",
    inactive: "#F4C418",
    completed: "#42BE65",
    failed: "#E33A24",
    pending: "#F4C418"
  };

  const statusKey = status.toLowerCase() as keyof typeof statusStyles;

  return (
    <div className="flex items-center space-x-[18px]">
      <button className={`flex items-center border px-2 h-[23px] rounded-full text-xs font-semibold ${statusStyles[statusKey]}`}>
        <FaCircle className={`w-2 h-2 mr-1`} style={{ color: statusColors[statusKey] }} />
        {status}
      </button>
    </div>
  );
};