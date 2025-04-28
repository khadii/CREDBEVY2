"use client";

import { useState, useRef, useEffect } from "react";
import YearModal from "../Yearmodal";
import { ChevronDown } from "lucide-react";
import DoubleBarChartComponent from "../DoubleBarchart";

type ComparisonDataItem = {
  name: string;
  firstDataset: number;
  secondDataset: number;
};

type CardChartProps = {
  title: string;
  description: string;
  totalAmount: string;
  comparisonData: ComparisonDataItem[];
  firstDatasetName?: string;
  secondDatasetName?: string;
  highlightFirst?: string;
  highlightSecond?: string;
  highlightColor?: string;
  barSize?: number;
  showValues?: boolean;
  tooltip?: boolean;
  selectedYear?: any;
  setSelectedYear?: any;
  yAxisFormatter?: (value: number) => string;
};

const CardChart = ({
  title,
  description,
  totalAmount,
  comparisonData,
  firstDatasetName = "Current",
  secondDatasetName = "Previous",
  highlightFirst = "",
  highlightSecond = "",
  highlightColor = "#EC7910",
  barSize = 11,
  showValues = true,
  tooltip = true,
  selectedYear,
  setSelectedYear,
  yAxisFormatter = (value) => `${value.toFixed(2)}M`,
}: CardChartProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white border rounded-lg pl-[20px] pr-[24px] pb-[38px] pt-[22px] w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-[33px]">
        <div className="w-full pl-9">
          <div className="flex justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-bold text-[#333333] mb-1">
                {title}
              </h2>
            </div>
            <div className="relative justify-end flex">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#F8F8F8] rounded-md py-[10px] text-sm pl-[20px] pr-[15px] text-[#333333] flex gap-[27px] font-bold items-center justify-center w-full"
              >
                <div>{selectedYear}</div>
                <div><ChevronDown size={20}/></div>
              </button>
              
              {/* Year Selection Modal */}
              {isModalOpen && (
                <div className="absolute right-0 left-0 top-12" ref={modalRef}>
                  <YearModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleSelectYear}
                  />
                </div>
              )}
            </div>
          </div>
          <p className="font-medium text-sm text-[#333333] mb-3">
            {description}
          </p>
          <p className="text-2xl font-bold text-[#333333]">{totalAmount}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <DoubleBarChartComponent
          comparisonData={comparisonData}
          firstDatasetName={firstDatasetName}
          secondDatasetName={secondDatasetName}
          highlightFirst={highlightFirst}
          highlightSecond={highlightSecond}
          highlightColor={highlightColor}
          barSize={barSize}
          showValues={showValues}
          tooltip={tooltip}
          yAxisFormatter={yAxisFormatter}
        />
      </div>
    </div>
  );
};

export default CardChart;