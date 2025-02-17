"use client";

import React from "react";
import Table from "./ChartCards/Datatable";
// import Table from "./Table";

const LoanRequests = () => {
  const requests = [
    {
      name: "Oripeolye Timilehin",
      income: "₦134,000,000.00",
      amount: "₦134,000,000.00",
      cs: 743,
      ir: "23%",
      duration: "3 Months",
      status: "Interested",
    },
    {
      name: "Oripeolye Timilehin",
      income: "₦134,000,000.00",
      amount: "₦134,000,000.00",
      cs: 743,
      ir: "23%",
      duration: "6 months",
      status: "Not Interested",
    },
    {
      name: "Oripeolye Timilehin",
      income: "₦134,000,000.00",
      amount: "₦134,000,000.00",
      cs: 743,
      ir: "23%",
      duration: "6 months",
      status: "Interested",
    },
    {
      name: "Oripeolye Timilehin",
      income: "₦134,000,000.00",
      amount: "₦134,000,000.00",
      cs: 743,
      ir: "23%",
      duration: "6 months",
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