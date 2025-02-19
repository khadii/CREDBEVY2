"use client";

import React from "react";
import Table from "./ChartCards/Datatable";
// import Table from "./Table";

const LoanRequests = () => {
const requests = [
  {
    name: "Oripeolye Timilehin",
    income: `₦${134000000.00}`, // Number with prefix
    amount: `₦${134000000.00}`, // Number with prefix
    cs: 743, // Number without prefix
    ir: `${23}%`, // Number with suffix
    duration: `${3} Months`, // Number with suffix
    status: "Interested",
  },
  {
    name: "Oripeolye Timilehin",
    income: `₦${134000000.00}`,
    amount: `₦${134000000.00}`,
    cs: 743,
    ir: `${23}%`,
    duration: `${6} Months`,
    status: "Not Interested",
  },
  {
    name: "Oripeolye Timilehin",
    income: `₦${134000000.00}`,
    amount: `₦${134000000.00}`,
    cs: 743,
    ir: `${23}%`,
    duration: `${6} Months`,
    status: "Interested",
  },
  {
    name: "Oripeolye Timilehin",
    income: `₦${134000000.00}`,
    amount: `₦${134000000.00}`,
    cs: 743,
    ir: `${23}%`,
    duration: `${6} Months`,
  },
  {
    name: "Oripeolye Timilehin",
    income: `₦${134000000.00}`,
    amount: `₦${134000000.00}`,
    cs: 743,
    ir: `${23}%`,
    duration: `${6} Months`,
  },
];


  const headers = [
    "Name",
    "Average Income",
    "Amount Requested",
    "C.S",
    "I.R",
    "Duration",
    "Quick Actions",
  ];

  const titleProps = {
    mainTitle: "Pending Loan request",
    requestCount: "200 requests",
    subtitle: "Loans awaiting a decision",
  };

  return <Table headers={headers} data={requests} titleProps={titleProps} />;
};

export default LoanRequests;