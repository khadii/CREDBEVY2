"use client";

import { useState } from "react";
import { Eye, EyeOff, Download } from "lucide-react";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import Table from "../../TableThree/GeneralreuseableTable";
import { formatDate } from "@/app/lib/formatdate";
import { formatCurrency } from "@/app/lib/utillity/formatCurrency";
import NoDataFound from "../../NoDataFound";

interface TransactionData {
  transaction_type: string;
  amount_paid: number;
  transaction_date: string;
  [key: string]: any;
}

interface TransactionHistoryTableProps {
  LoanRequest_Data: TransactionData[];
  totaltransaction: number;
}

const Transaction_HistoryTable = ({ 
  LoanRequest_Data, 
  totaltransaction 
}: TransactionHistoryTableProps) => {
  const tableHead = ["Name", "Amount", "Date"];
  const [viewMode, setViewMode] = useState<{ [key: string]: boolean }>({});
  const [currentDocument, setCurrentDocument] = useState<{url: string, name: string} | null>(null);

  const formatTableData = () => {
    return LoanRequest_Data?.map((item: TransactionData) => ({
      ...item,
      Name: item.transaction_type,
      Amount: item.amount_paid,
      Date: item.transaction_date
    })) || [];
  };

  const renderCell = (data: any, header: string) => {
    switch (header) {
      case "Name":
        return <div className="truncate max-w-48">{data?.transaction_type || "N/A"}</div>;
      case "Amount":
        return <div className="truncate max-w-28 capitalize">{formatCurrency(data?.amount_paid) || "N/A"}</div>;
      case "Date":
        return <span className="truncate">{formatDate(data.transaction_date) || "N/A"}</span>;
      default:
        return null;
    }
  };
   if (formatTableData().length < 1) {
      return <NoDataFound />;
    }
  return (
    <>
      <Table
        headers={tableHead}
        data={formatTableData()}
        titleProps={{
          mainTitle: "Transaction History",
          requestCount: `${totaltransaction} transactions`,
          subtitle: "All transactions attached to loan",
        }}
        renderCell={renderCell}
      />
    </>
  );
};

export default Transaction_HistoryTable;