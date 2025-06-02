"use client";

import React, { useState } from "react";
import Pagination from "../TableTwo/modifiedTabletwo/tablePagination";
import { FaAngleDown } from "react-icons/fa";

interface TableProps<T> {
  headers: string[];
  data: T[];
  titleProps: {
    mainTitle: string;
    requestCount: string;
    subtitle: string;
  };
  renderCell: (data: T, header: string) => React.ReactNode;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  showDownloadButton?: boolean; // New prop to control button visibility
}

const Table = <T,>({
  headers,
  data,
  titleProps,
  renderCell,
  currentPage,
  totalPages,
  setCurrentPage,
  showDownloadButton = false, // Default to false if not provided
}: TableProps<T>) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const handleDownloadClick = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };

  return (
    <div className="bg-white rounded-lg mt-3 w-full">
      <div className="flex justify-between items-center pb-6 py-6 px-6 border rounded-lg border-b-0 rounded-b-none">
        <div>
          <div className="flex items-center w-full gap-3">
            <h2 className="text-lg font-bold flex items-center col-span-2 text-[#333333]">
              {titleProps.mainTitle}
            </h2>
            <span className="text-xs px-2 font-semibold bg-[#FEF1FFAD] items-center border border-[#F1CFF4] justify-center rounded-full col-span-1 text-[#156064] flex">
              {titleProps.requestCount}
            </span>
          </div>
          <p className="text-[#333333] text-sm font-semibold">
            {titleProps.subtitle}
          </p>
        </div>
        {showDownloadButton && ( // Conditionally render the download button
          <div className="relative">
            <button
              onClick={handleDownloadClick}
              className="bg-[#24262D] text-white px-[16px] py-[12px] text-[12px] font-semibold rounded-lg flex items-center gap-x-[8px]"
            >
              Download Log <FaAngleDown />
            </button>
            {showDownloadOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      // Add download as CSV logic here
                      setShowDownloadOptions(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Download as CSV
                  </button>
                  <button
                    onClick={() => {
                      // Add download as PDF logic here
                      setShowDownloadOptions(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Download as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <table className="w-full text-left">
        <thead className="bg-[#FFFFFF] text-[#8A8B9F] font-bold text-xs border">
          <tr className="h-[44px]">
            {headers.map((header, index) => (
              <th key={index} className="py-3 px-4 truncate">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-[#333333] font-semibold text-xs">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t odd:bg-gray-100 even:bg-white h-[72px]"
            >
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="py-4 px-4 truncate">
                  {renderCell(row, header)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Table;