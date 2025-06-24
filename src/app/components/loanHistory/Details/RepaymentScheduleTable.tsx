"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Download } from "lucide-react";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import Table from "../../TableThree/GeneralreuseableTable";
import NoDataFound from "../../NoDataFound";

const RepaymentScheduleTable = ({ 
  LoanRequest_Data, 
  totalRepaymentschedule 
}: { 
  LoanRequest_Data: any, 
  totalRepaymentschedule: any 
}) => {
  const tableHead = ["Installment", "Payment", "Balance", "Due date", "Status"];
  const [viewMode, setViewMode] = useState<{ [key: string]: boolean }>({});
  const [currentDocument, setCurrentDocument] = useState<{ url: string; name: string } | null>(null);

  const formatTableData = () => {
    if (!LoanRequest_Data || !Array.isArray(LoanRequest_Data)) {
      return [];
    }
    return LoanRequest_Data.map((item: any) => ({
      installment: item.installment || 'N/A',
      amount_paid: item.amount_paid ? String(item.amount_paid).replace(/_/g, ' ') : 'N/A',
      balance: item.balance || 'N/A',
      due_date: item.due_date || 'N/A',
      status: item.status || 'N/A'
    }));
  };

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
        return <span className="truncate">{data.status}</span>;
      default:
        return null;
    }
  };

  const formattedData = formatTableData();
  const displayCount = totalRepaymentschedule ;
 if (formattedData.length < 1) {
    return <NoDataFound />;
  }

  return (
    <>
      <Table
      
        headers={tableHead}
        data={formattedData}
        titleProps={{
          mainTitle: "Repayment schedule",
          requestCount: `${displayCount} installments`,
          subtitle: "Repayment schedule of loan taken",
        }}
        renderCell={renderCell}
      />
    </>
  );
};

export default RepaymentScheduleTable;