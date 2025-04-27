import { FaCircle } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { useDashboard } from "@/app/Context/DahboardContext";
import { DropdownMenu } from "./activateDeActivate";

interface StatusWithOptionsProps {
    status: string;
    uuid: string;
    activeDropdown: string | null;
    setActiveDropdown: (uuid: string | null) => void;
  }
  
  export const StatusWithOptions = ({
    status,
    uuid,
    activeDropdown,
    setActiveDropdown
  }: StatusWithOptionsProps) => {
    const isActive = activeDropdown === uuid;
    const { selectedIds, setSelectedIds } = useDashboard();
    const handleOptionsClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveDropdown(isActive ? null : uuid);
      setSelectedIds(uuid)
    };
  
    const statusStyles = {
      active: "border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2]",
      repaid: "border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2]",
      overdue: "border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1]",
      inactive: "border-[#FFF2C2] bg-[#FFFBEF] text-[#F4C418]"
    };
  
    const statusColors = {
      active: "#42BE65",
      repaid: "#42BE65",
      overdue: "#E33A24",
      inactive: "#F4C418"
    };
  
    const statusKey = status.toLowerCase() as keyof typeof statusStyles;

    return (
      <div className="flex items-center space-x-[18px] ">
        <button className={`flex items-center border px-2 h-[23px] rounded-full text-xs font-semibold ${statusStyles[statusKey]}`}>
          <FaCircle className={`w-2 h-2 mr-1`} style={{ color: statusColors[statusKey] }} />
          {status}
        </button>
        <div className="">
          <SlOptionsVertical 
            color="#8A8B9F" 
            onClick={handleOptionsClick} 
            className="cursor-pointer hover:opacity-80 " 
          />
          {isActive && <div className="absolute right-10 "> <DropdownMenu onClick={(e) => e.stopPropagation()} productId={uuid} setActiveDropdown={setActiveDropdown} /></div>}
        </div>
      </div>
    );
  };