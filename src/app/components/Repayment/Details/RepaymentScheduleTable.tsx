"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Download } from "lucide-react";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import Table from "../../TableThree/GeneralreuseableTable";

const RepaymentScheduleTable = ({ LoanRequest_Data }: { LoanRequest_Data: any }) => {
  const tableHead = ["Installment", "Payment", "Balance", "Due date", "Status"];
  const [viewMode, setViewMode] = useState<{ [key: string]: boolean }>({});
  const [currentDocument, setCurrentDocument] = useState<{ url: string; name: string } | null>(null);

  const formatTableData = () => {
    if (!LoanRequest_Data?.loan?.repayment_schedule) return [];
    return LoanRequest_Data.loan.repayment_schedule.map((item: any) => ({
      installment: item.installment_number,
      amount_paid: item.amount.toString(),
      balance: item.remaining_balance.toString(),
      due_date: item.due_date,
      status: item.status
    }));
  };

  const renderCell = (data: any, header: string) => {
    switch (header) {
      case "Installment":
        return <div className="truncate max-w-48">{data.installment}</div>;
      case "Payment":
        return <div className="truncate max-w-28 capitalize">{data.amount_paid.replace(/_/g, ' ')}</div>;
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

  return (
    <>
      <Table
        headers={tableHead}
        data={formatTableData()}
        titleProps={{
          mainTitle: "Repayment schedule",
          requestCount: `${formatTableData().length} installments`,
          subtitle: "Repayment schedule of loan taken",
        }}
        renderCell={renderCell}
      />
    </>
  );
};

export default RepaymentScheduleTable;