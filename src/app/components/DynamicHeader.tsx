"use client";
import { LucideChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function DynamicHeader() {
  const [activeTab, setActiveTab] = useState("All Request");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("This Year");

  const tabs = [
    { name: "All Request" },
    { name: "Pending Request", count: 200 },
    { name: "Approved Requests" },
    { name: "Canceled Requests" },
  ];
  const years = ["This Year", "Last Year"];

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
    <div className="bg-[#FAFAFA]">
      <h2 className="text-[34px] font-bold text-gray-900  pb-[32px]">Loan Request</h2>
      <div className="mt-8 space-y-6 items-center justify-between">
        {/* Tabs */}
        <div className="flex space-x-6 ">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`relative ${
                activeTab === tab.name ? "font-semibold text-[14px] text-[#156064] border-b-2 border-[#156064] pb-[10px]" : "text-[#8A8B9F] font-semibold text-[14px]"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
              {tab.count && (
                <span className="ml-2 inline-flex items-center px-[5px] py-[5px] text-[6px] font-[900px] bg-[#42BE65] text-[white] rounded-[100%]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Button to Open Modal */}
        <div className="w-full flex justify-end relative pb-[12px]">
          <button
            className="pl-5 pr-[9px] text-[13px] font-bold h-[38px] border rounded-md text-[#333333] bg-white flex items-center gap-[22px]"
            onClick={() => setIsOpen(true)}
          >
            {selectedYear} <LucideChevronDown size={20} />
          </button>
          {/* Modal */}
          {isOpen && (
            <div ref={modalRef} className="right-0 top-10 absolute">
              <div className="bg-white p-6 rounded-lg w-[132px]">
                <h3 className="text-[13px] font-semibold text-gray-900">Select Year</h3>
                {/* Options List */}
                <div className="mt-4 space-y-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      className={`w-full text-center text-[13px] p-1 rounded-md ${
                        selectedYear === year ? "bg-[#156064] text-white" : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsOpen(false); // Close modal after selection
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
      </div>
    </div>
  );
}