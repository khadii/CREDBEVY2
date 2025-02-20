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
    <PieCard title={' Loan Approval Rate'} description={'  The percentage of loan requests approved.'} total={'80,000'} data={data}/>
  );
}