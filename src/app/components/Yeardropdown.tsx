"use client";
import { useState, useRef, useEffect } from "react";
import { LucideChevronDown } from "lucide-react";

export const YearDropdown = ({ 
  years, 
  selectedYear, 
  setSelectedYear,
  withdrawal = false,
  onOptionalButtonClick,
  optionalButtonText = "Download" // New prop with default value
}: { 
  years: any, 
  selectedYear: any, 
  setSelectedYear: any,
  withdrawal?: boolean | number,
  onOptionalButtonClick?: () => void,
  optionalButtonText?: string // Type definition for the new prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionalClick = () => {
    if (onOptionalButtonClick) {
      onOptionalButtonClick();
    } else {
      console.log("Optional button clicked - no action provided");
    }
  };

  return (
    <div className="w-full flex justify-end relative pb-[12px] gap-2">
      {withdrawal === 2 && (
        <button
          className="w-[134px] text-[13px] font-bold h-[38px] border rounded-md text-white bg-[#24262D] flex items-center gap-[22px] text-center justify-center"
          onClick={handleOptionalClick}
        >
          {optionalButtonText}
        </button>
      )}
      <button
        className="w-[134px] text-[13px] font-bold h-[38px] border rounded-md text-[#333333] bg-white flex items-center gap-[50px] text-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        {selectedYear} <LucideChevronDown size={20} />
      </button>
      {isOpen && (
        <div ref={modalRef} className="right-0 top-10 absolute">
          <div className="bg-white py-6 px-2 rounded-lg w-[134px] shadow-lg">
            <h3 className="text-[13px] font-semibold text-gray-900 text-center">Select Year</h3>
            <div className="mt-4 space-y-2">
              {years.map((year: any) => (
                <button
                  key={year}
                  className={`w-full text-center text-[13px] p-1 rounded-md ${
                    selectedYear === year ? "bg-[#156064] text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsOpen(false);
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};