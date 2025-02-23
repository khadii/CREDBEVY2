"use client";

import React from "react";
import {
  LucideThumbsUp,
  LucideThumbsDown,
  LucideChevronDown,
  Dot,
  Circle,
} from "lucide-react";
import { FaCircle } from "react-icons/fa";

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
    <div className="bg-white rounded-lg  mt-3  w-full ">
      <div className="flex justify-between items-center pb-6 py-6 px-6 border rounded-lg border-b-0 rounded-b-none">
        <div>
          <div className="grid grid-cols-3 w-full gap-3">
            <h2 className="text-lg font-bold flex items-center col-span-2 text-[#333333]">
              {titleProps.mainTitle}
            </h2>
            <span className="text-xs font-semibold bg-[#FEF1FFAD] items-center border border-[#F1CFF4] justify-center rounded-full col-span-1 text-[#156064] flex">
              {titleProps.requestCount}
            </span>
          </div>
          <p className="text-[#333333] text-sm font-semibold">
            {titleProps.subtitle}
          </p>
        </div>
        <button className="bg-[#24262D] text-white px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-extrabold">
          Bulk Action <LucideChevronDown size={16} />
        </button>
      </div>
      <table className="w-full text-left ">
        <thead className="bg-[#FFFFFF] text-[#8A8B9F] font-bold text-xs border">
          <tr className="h-[44px]">
            <th className="pl-[27px] py-3 px-6">
              <div className="flex items-center gap-4 h-full">
                {" "}
                {/* Increased gap */}
                <input type="checkbox" /> Name
              </div>
            </th>
            <th className="py-3 px-6 truncate">Average Income</th>
            <th className="py-3 px-6 truncate">Amount Requested</th>
            <th className="py-3 px-6 truncate">C.S</th>
            <th className="py-3 px-6 truncate">I.R</th>
            <th className="py-3 px-6 truncate">Duration</th>
            <th className="py-3 px-6 truncate">Quick Actions</th>
          </tr>
        </thead>

        <tbody className="text-[#333333] font-semibold text-xs">
          {data.map((req, index) => (
            <tr
              key={index}
              className="border-t odd:bg-gray-100 even:bg-white h-[72px]"
            >
              <td className="pl-[27px] py-4 px-6">
                <div className="flex items-center gap-4 h-full">
                  {" "}
                  {/* Increased gap */}
                  <input type="checkbox" />
                  <img
                    src="https://bit.ly/dan-abramov"
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="truncate max-w-[140px]">{req.name}</p>
                </div>
              </td>
              <td className="truncate max-w-[120px] py-4 px-6">{req.income}</td>
              <td className="truncate max-w-[120px] py-4 px-6">{req.amount}</td>
              <td className="truncate max-w-[75px] py-4 px-6">{req.cs}</td>
              <td className="truncate max-w-[85px] py-4 px-6">{req.ir}</td>
              <td className="truncate max-w-[110px] py-4 px-6">
                {req.duration}
              </td>
              <td className="truncate max-w-[154px] py-4 px-4">
                {req.status === "Interested" && (
                  <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
                    <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
                    Interested 
                  </button>
                )}
                {req.status === "Not Interested" && (
                  <button className="flex items-center gap-2 border border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1] px-2 h-[23px] rounded-full text-xs font-semibold">
                   <FaCircle className="text-[#E33A24] w-2 h-2 mr-1" />
                    Not interested
                  </button>
                )}
                {!req.status && (
                  <div className="flex w-full gap-[27px]">
                    {" "}
                    {/* Increased gap */}
                    <LucideThumbsUp
                      size={24}
                      className="text-[#067647] cursor-pointer"
                    />
                    <LucideThumbsDown
                      size={24}
                      className="text-[#B42318] cursor-pointer"
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center pb-6 py-2 px-6 border rounded-lg border-t-0 rounded-t-none"></div>
    </div>
  );
};

export default Table;
