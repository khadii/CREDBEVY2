"use client";
import { useState, useRef, useEffect } from "react";
import { LucideChevronDown } from "lucide-react";

export const YearDropdown = ({ years, selectedYear, setSelectedYear }:{ years:any, selectedYear:any, setSelectedYear:any }) => {
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

  return (
    <div className="w-full flex justify-end relative pb-[12px]">
      <button
        className="pl-5 pr-[9px] text-[13px] font-bold h-[38px] border rounded-md text-[#333333] bg-white flex items-center gap-[22px]"
        onClick={() => setIsOpen(true)}
      >
        {selectedYear} <LucideChevronDown size={20} />
      </button>
      {isOpen && (
        <div ref={modalRef} className="right-0 top-10 absolute">
          <div className="bg-white p-6 rounded-lg w-[132px]">
            <h3 className="text-[13px] font-semibold text-gray-900">Select Year</h3>
            <div className="mt-4 space-y-2">
              {years.map((year:any) => (
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