"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Tabs } from "../../Tabs";
import Transaction_HistoryTable from "./Transaction_HistoryTable";
import RepaymentScheduleTable from "./RepaymentScheduleTable";
import { formatDate } from "@/app/lib/formatdate";
import { formatCurrency } from "@/app/lib/utillity/formatCurrency";
import DocumentsTable from "./DocTable";
import { fetchSingleLoanRequest } from "@/app/Redux/LoanHistory/singleLoanRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import NoDataFound from "../../NoDataFound";

interface RepaymentDetailsProps {
  id: string;
}

export default function RepaymentInfo({ id }: RepaymentDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: loanData, loading, error } = useSelector(
    (state: RootState) => state.historysingleLoanRequest
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleLoanRequest(id));
    }
  }, [dispatch, id]);

  // Format the loan summary data
  const summary = useMemo(() => {
    if (!loanData) return null;
    
    return {
      loan_amount: loanData.request_details.loan_amount,
      monthly_repayment: loanData.request_details.monthly_repayment,
      loan_purpose: loanData.request_details.loan_purpose,
      loan_terms: loanData.request_details.loan_duration,
      interest_rate: loanData.request_details.interest_rate,
      request_date: loanData.request_details.created_at,
      start_date: loanData.request_details.start_date,
      end_date: loanData.request_details.repaid_at || "N/A",
      status: loanData.request_details.status,
      fee: loanData.partner_info.total_expense_fee,
      balance: loanData.request_details.remaining_balance,
      total_paid: loanData.request_details.total_paid,
    };
  }, [loanData]);

  // Format repayment schedule using actual API data
  const repaymentSchedule = useMemo(() => {
    if (!loanData) return { repayment_schedule: [], total_repaymentSchedule: 0 };

    return {
      repayment_schedule: loanData.repayment.map((item: { installment: any; amount_paid: string; balance: any; due_date: any; status: any; }) => ({
        installment: item.installment,
        payment: parseFloat(item.amount_paid) || 0,
        balance: item.balance,
        due_date: item.due_date,
        status: item.status,
      })),
      total_repaymentSchedule: loanData.request_details.loan_duration,
    };
  }, [loanData]);

  // Format transaction history using actual API data
  const transactionHistory = useMemo(() => {
    if (!loanData) return { transactions: [], total_transactions: 0 };

    return {
      transactions: loanData.transactions.map((tx:any)=> ({
        transaction_type: tx.narration,
        amount_paid: tx.amount_paid,
        transaction_date: tx.transaction_date,
      })),
      total_transactions: loanData.transactions.length,
    };
  }, [loanData]);

  const tabs = useMemo(
    () => [
      { name: "Loan Details" },
      { name: "Repayment Schedule" },
      { name: "Transaction History" },
      { name: "Document" },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const loanSummaryData = useMemo(() => {
    if (!summary) return [];
    
    return [
      {
        label: "Loan Amount",
        value: formatCurrency(summary.loan_amount) ?? "N/A",
      },
      {
        label: "Monthly Repayment",
        value: formatCurrency(summary.monthly_repayment) ?? "N/A",
      },
      {
        label: "Loan Purpose",
        value: summary.loan_purpose ?? "N/A",
      },
      { 
        label: "Loan Terms", 
        value: `${summary.loan_terms} Months` 
      },
      { 
        label: "Interest Rate", 
        value: `${summary.interest_rate}%`
      },
      {
        label: "Request Date",
        value: formatDate(summary.request_date) ?? "N/A",
      },
      {
        label: "Start Date",
        value: formatDate(summary.start_date) ?? "N/A",
      },
      {
        label: "End Date",
        value: formatDate(summary.end_date) ?? "N/A",
      },
      {
        label: "Status",
        value: summary.status ?? "N/A",
      },
      {
        label: "Fee",
        value: formatCurrency(Number(summary.fee)) ?? "N/A",
      },
      {
        label: "Total Paid",
        value: formatCurrency(summary.total_paid) ?? "N/A",
      },
      {
        label: "Balance",
        value: formatCurrency(summary.balance) ?? "N/A",
      },
    ];
  }, [summary]);

  if (loading || !loanData) {
    return (
      <div className="pt-[34px] bg-white rounded-lg h-[1100px] w-full border-[1px] p-6">
       
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );}

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">Error: {error}</div>;
  }



  return (
    <div className={`pt-[34px] bg-white rounded-lg min-h-[1100px] w-full border-[1px]`}>
      <div className="flex mb-[42px] pl-[24px]">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      </div>

      {activeTab === "Repayment Schedule" && (
        <div className="w-full px-[24px]">
          <RepaymentScheduleTable
            LoanRequest_Data={repaymentSchedule.repayment_schedule}
            totalRepaymentschedule={repaymentSchedule.total_repaymentSchedule}
          />
        </div>
      )}

      {activeTab === "Transaction History" && (
        <div className="w-full px-[24px]">
          <Transaction_HistoryTable
            LoanRequest_Data={transactionHistory.transactions}
            totaltransaction={transactionHistory.total_transactions}
          />
        </div>
      )}

      {activeTab === "Loan Details" && (
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

      {activeTab === "Document" && (
        <div className="w-full px-[24px]">
          <DocumentsTable documents={loanData.documents} />
        </div>
      )}
    </div>
  );
}