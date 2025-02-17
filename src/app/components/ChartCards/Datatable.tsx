"use client";

import React from "react";
import { LucideThumbsUp, LucideThumbsDown, LucideChevronDown } from "lucide-react";

interface TableProps {
  headers: string[];
  data: Array<{
    name: string;
    income: string;
    amount: string;
    cs: number;
    ir: string;
    duration: string;
    status?: string;
  }>;
  titleProps: {
    mainTitle: string;
    requestCount: string;
    subtitle: string;
  };
}

const Table: React.FC<TableProps> = ({ headers, data, titleProps }) => {
  return (
    <div className="bg-white rounded-lg shadow border-t-[1px] mt-3 border-b-[1px]">
      <div className="flex justify-between items-center pb-8 py-2 px-6 border-b-[1px]">
        <div>
          <div className="grid grid-cols-3 w-full gap-3">
            <h2 className="text-lg font-semibold flex items-center col-span-2 text-[#333333]">
              {titleProps.mainTitle}
            </h2>
            <span className="text-xs font-medium bg-[#fdfcfd] items-center border border-[#F1CFF4] justify-center rounded-full col-span-1 text-[#156064] flex">
              {titleProps.requestCount}
            </span>
          </div>
          <p className="text-[#333333] text-sm font-medium">{titleProps.subtitle}</p>
        </div>
        <button className="bg-[#24262D] text-white px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-bold">
          Bulk Action <LucideChevronDown size={16} />
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#FFFFFF] text-[#8A8B9F] font-semibold text-xs">
          <tr>
            <th className="px-6">
              <input type="checkbox" />
            </th>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#333333] font-medium text-sm">
          {data.map((req, index) => (
            <tr key={index} className="border-t odd:bg-gray-100 even:bg-white">
              <td className="px-6 py-6">
                <input type="checkbox" />
              </td>
              <td className="w-full py-6 flex items-center gap-2">
                <img
                  src="https://bit.ly/dan-abramov"
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                {req.name}
              </td>
              <td className="px-6 py-6">{req.income}</td>
              <td className="px-6 py-6">{req.amount}</td>
              <td className="px-6 py-6">{req.cs}</td>
              <td className="px-6 py-6">{req.ir}</td>
              <td className="px-6 py-6">{req.duration}</td>
              <td className="px-6 py-6">
                {req.status === "Interested" && (
                  <span className="text-green-500">🟢 Interested</span>
                )}
                {req.status === "Not Interested" && (
                  <span className="text-red-500">🔴 Not Interested</span>
                )}
                {!req.status && (
                  <div className="flex gap-2">
                    <LucideThumbsUp className="text-green-500 cursor-pointer" />
                    <LucideThumbsDown className="text-red-500 cursor-pointer" />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;