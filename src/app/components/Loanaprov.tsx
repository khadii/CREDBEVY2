"use client";

import React from "react";
import PieChartComponent from "./PieChart";
import PieCard from "./ChartCards/Piechart";

const data = [
  { name: "Approved", value: 200 ,color:"#156064"}, // Approved loans
  { name: "Unapproved", value: 300, color:"#EC7910" }, // Unapproved loans
];

export default function Loanaprov() {
  return (
    // <div className="bg-white shadow-lg rounded-lg p-6  w-full">
    //   {/* Header */}
    //   <div className="flex justify-between items-center mb-6">
    //     <div>
    //       <h2 className="text-lg font-semibold text-[#333333] mb-1">
    //         Loan Approval Rate
    //       </h2>
    //       <p className="font-medium text-xs text-[#333333] mb-3">
    //         The percentage of loan requests approved.
    //       </p>
    //       <p className="text-2xl font-bold text-[#333333]">80,000</p>
    //     </div>
    //   </div>

    //   {/* Chart and Stats */}
    //   <div className="">
    //     {/* Pie Chart */}
    //     <div className="">
    //       <PieChartComponent data={data} />
    //     </div>

    //     {/* Stats */}
    //     <div className="flex w-full space-x-12 justify-center mt-14">
    //       <div className="flex items-center ">
    //         <div className="w-4 h-4 bg-[#156064] rounded-full mr-2"></div>
    //         <span className="text-sm text-[#333333] font-light">Approved</span>
    //       </div>
          
    //       <div className="flex items-center">
    //         <div className="w-4 h-4 bg-[#EC7910] rounded-full mr-2"></div>
    //         <span className="text-sm text-[#333333] font-light">Unapproved</span>
    //       </div>
    //     </div>
    //   </div>

   
    // </div>
    <PieCard title={' Loan Approval Rate'} description={'  The percentage of loan requests approved.'} total={'80,000'} data={data}/>
  );
}