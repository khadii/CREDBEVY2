"use client";

import { useState, useMemo, useCallback } from "react";
import DocumentsTable from "./RepaymentScheduleTable";
import { CSSProperties } from "react";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import Cookies from "js-cookie";
import { Tabs } from "../../Tabs";

export default function FinancialInfo({ id }: { id: any }) {
  const tabs = useMemo(
    () => [
      { name: "Loan Summary" },
      { name: "Repayment Schedule" },
      { name: "Transaction History" },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(value)
      .replace("NGN", "₦");
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Mock data for Loan Summary
  const loanSummaryData = useMemo(
    () => [
      { label: "Loan Amount", value: formatCurrency(500000) },
      { label: "Interest Rate", value: "15%" },
      { label: "Loan Tenure", value: "12 months" },
      { label: "Monthly Payment", value: formatCurrency(45833.33) },
      { label: "Total Repayment", value: formatCurrency(550000) },
      { label: "Disbursement Date", value: "15 Jan 2023" },
      { label: "Maturity Date", value: "15 Jan 2024" },
      { label: "Loan Status", value: "Active" },
    ],
    [formatCurrency]
  );

  // Mock data for Repayment Schedule
  const repaymentScheduleData = useMemo(
    () => ({
      loan: {
        documents: [
          {
            uuid: "1",
            document_name: "Repayment Schedule.pdf",
            category: "repayment_schedule",
            created_at: "2023-01-10T10:30:00Z",
            path: "/documents/repayment_schedule.pdf",
          },
        ],
      },
    }),
    []
  );

  // Mock data for Transaction History
  const transactionHistoryData = useMemo(
    () => ({
      loan: {
        documents: [
          {
            uuid: "2",
            document_name: "Transaction History.pdf",
            category: "transaction_history",
            created_at: "2023-01-15T14:45:00Z",
            path: "/documents/transaction_history.pdf",
          },
          {
            uuid: "3",
            document_name: "Payment Receipts.pdf",
            category: "receipts",
            created_at: "2023-02-01T09:15:00Z",
            path: "/documents/payment_receipts.pdf",
          },
        ],
      },
    }),
    []
  );

  return (
    <div
      className={`pt-[34px] bg-white rounded-lg h-[1100px] w-full border-[1px]`}
    >
      <div className="flex mb-[42px] pl-[24px]">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {activeTab === "Repayment Schedule" && (
        <div className="w-full px-[24px]">
          <DocumentsTable LoanRequest_Data={repaymentScheduleData} />
        </div>
      )}

      {activeTab === "Transaction History" && (
        <div className="w-full px-[24px]">
          <DocumentsTable LoanRequest_Data={transactionHistoryData} />
        </div>
      )}

      {activeTab === "Loan Summary" && (
        <div className="w-full space-y-5 mt-[38px] flex flex-col items-center justify-center">
          {loanSummaryData.map((item, index) => (
            <div
              key={index}
              className="flex w-full text-[16px] font-medium text-[#8A8B9F] text-left gap-[38px] pl-[24px] items-center"
            >
              <div className="w-[154px]">{item.label}:</div>
              <div className="text-left truncate w-[300px] text-pretty break-words">
                <p className={item.label === "Email" ? "break-words" : ""}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}