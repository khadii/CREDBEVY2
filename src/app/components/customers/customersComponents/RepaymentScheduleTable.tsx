"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Download } from "lucide-react";
import { FaCircle } from "react-icons/fa";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import Table from "../../TableThree/GeneralreuseableTable";

const RepaymentScheduleTable = () => {
  const tableHead = ["Installment", "Payment", "Balance", "Due date", "Status"];
  const [viewMode, setViewMode] = useState<{ [key: string]: boolean }>({});
  const [currentDocument, setCurrentDocument] = useState<{ url: string; name: string } | null>(null);

  const renderStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return (
          <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
            Paid
          </button>
        );
      case "due":
        return (
          <button className="flex items-center gap-2 border border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#E33A24] w-2 h-2 mr-1" />
            Due
          </button>
        );
      case "not due":
        return (
          <button className="flex items-center border border-[#FFF2C2] bg-[#FFFBEF] text-[#F4C418] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#F4C418] w-2 h-2 mr-1" />
            Not Due
          </button>
        );
      default:
        return <span>{status}</span>;
    }
  };

  // Mock data from the image
  const repaymentData = [
    {
      installment: "0",
      amount_paid: "0",
      balance: "N 900,383,393.00",
      due_date: "",
      status: ""
    },
    {
      installment: "1",
      amount_paid: "N 230,000,000.00",
      balance: "N 900,383,393.00",
      due_date: "9/8/2023",
      status: "paid"
    },
    {
      installment: "2",
      amount_paid: "N 230,000,000.00",
      balance: "N 900,383,393.00",
      due_date: "9/8/2023",
      status: "due"
    },
    {
      installment: "3",
      amount_paid: "N 230,000,000.00",
      balance: "N 900,383,393.00",
      due_date: "9/8/2023",
      status: "paid"
    },
    {
      installment: "4",
      amount_paid: "N 230,000,000.00",
      balance: "N 900,383,393.00",
      due_date: "9/8/2023",
      status: "not due"
    },
    {
      installment: "5",
      amount_paid: "N 230,000,000.00",
      balance: "N 900,383,393.00",
      due_date: "9/8/2023",
      status: "paid"
    },
    {
      installment: "6",
      amount_paid: "N 230,000,000.00",
      balance: "N 900,383,393.00",
      due_date: "9/8/2023",
      status: "due"
    }
  ];

  const renderCell = (data: any, header: string) => {
    if (!data) return null;

    switch (header) {
      case "Installment":
        return <div className="truncate max-w-48">{data.installment}</div>;
      case "Payment":
        return <div className="truncate max-w-28 capitalize">{data.amount_paid}</div>;
      case "Balance":
        return <span className="truncate">{data.balance}</span>;
      case "Due date":
        return <span className="truncate">{data.due_date}</span>;
      case "Status":
        return renderStatus(data.status);
      default:
        return null;
    }
  };

  return (
    <>
      <Table
        headers={tableHead}
        data={repaymentData}
        titleProps={{
          mainTitle: "Repayment schedule",
          requestCount: "6 installments",
          subtitle: "Repayment schedule of loan taken",
        }}
        renderCell={renderCell}
      />
    </>
  );
};

export default RepaymentScheduleTable;