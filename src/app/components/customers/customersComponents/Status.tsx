import { FaCircle } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { useDashboard } from "@/app/Context/DahboardContext";


interface StatusWithOptionsProps {
  status: string;
  uuid: string;
  activeDropdown: string | null;
  setActiveDropdown: (uuid: string | null) => void;
}

export const StatusWithOptionsCustomers= ({
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
    setSelectedIds(uuid);
  };

  // Loan status styles
  const statusStyles = {
    pending: "border-[#FFE8B0] text-[#E9A706] bg-[#FFF9E7]",
    approved: "border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2]",
    denied: "border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1]",
  };

  const statusColors = {
    pending: "#E9A706",
    approved: "#42BE65",
    denied: "#E33A24",
  };

  const statusKey = status?.toLowerCase() as keyof typeof statusStyles;

  return (
    <div className="flex items-center space-x-[18px] relative">
      <button
        className={`flex items-center border px-2 h-[23px] rounded-full text-xs font-semibold ${statusStyles[statusKey]}`}>
        <FaCircle
          className="w-2 h-2 mr-1"
          style={{ color: statusColors[statusKey] }}
        />
        {status}
      </button>
      <div>
        {/* <SlOptionsVertical
          color="#8A8B9F"
          onClick={handleOptionsClick}
          className="cursor-pointer hover:opacity-80"
        />
        {isActive && (
          <div className="absolute right-10 z-10">
            <DropdownMenu
              onClick={(e) => e.stopPropagation()}
              productId={uuid}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};
