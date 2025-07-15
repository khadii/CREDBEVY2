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
  data: any;
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
  data,
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
    <div className="bg-white border rounded-lg px-4 sm:pl-[20px] sm:pr-[24px] pb-6 sm:pb-[38px] pt-4 sm:pt-[22px] w-full relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-[33px]">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-0">
            <div className="order-1 sm:order-none">
              <h2 className="text-lg font-bold text-[#333333] mb-1">{title}</h2>
              <p className="font-medium text-sm text-[#333333] mb-2 sm:mb-3">
                {description}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[#333333]">
                {totalAmount}
              </p>
            </div>
            <div className="sm:absolute sm:top-6 sm:right-8 w-full ">
              <div className="relative justify-end flex w-full sm:w-auto order-0 sm:order-none ">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#F8F8F8] rounded-md py-2 sm:py-[10px] text-sm px-3 sm:pl-[20px] sm:pr-[15px] text-[#333333] flex gap-2 sm:gap-[27px] font-bold items-center justify-between w-full sm:w-auto"
              >
                <div>{selectedYear}</div>
                <ChevronDown size={20} />
              </button>

              {isModalOpen && (
                <div
                  className="absolute right-0 left-0 sm:left-auto top-12 z-10 w-full sm:w-auto"
                  ref={modalRef}
                >
                  <YearModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleSelectYear}
                  />
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Legend */}
          <div className="mt-4 sm:mt-8 sm:absolute sm:right-8 sm:top-12">
            <div className="flex flex-wrap justify-start sm:justify-center gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4">
              {data.map((item: any, index: any) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2 flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[8px] sm:text-[9px] text-[#333333] font-semibold whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full -mx-2 sm:mx-0 overflow-auto scrollbar-hide">
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