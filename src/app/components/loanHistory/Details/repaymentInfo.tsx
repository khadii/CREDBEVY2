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

interface RepaymentDetailsProps {
  id: string;
}

export default function RepaymentInfo({ id }: RepaymentDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: loanData, loading, error } = useSelector(
    (state: RootState) => state.historysingleLoanRequest);

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
      end_date: loanData.request_details.repaid_at || "N/A",
      status: loanData.request_details.status,
      fee: loanData.partner_info.total_expense_fee,
      balance: loanData.request_details.remaining_balance,
    };
  }, [loanData]);

  // Format repayment schedule
  const repaymentSchedule = useMemo(() => {
    if (!loanData) return { repayment_schedule: [], total_repaymentSchedule: 0 };

    // This is a simplified version - you might need to adjust based on your actual API response
    return {
      repayment_schedule: [
        {
          installment: 0,
          payment: 0,
          balance: loanData.request_details.loan_amount,
          due_date: "",
          status: "",
        },
        // Add actual repayment schedule items here based on API data
        // This is just a placeholder - you'll need to map the actual schedule
        {
          installment: 1,
          payment: loanData.request_details.monthly_repayment,
          balance: loanData.request_details.remaining_balance,
          due_date: loanData.request_details.next_due_date || "N/A",
          status: loanData.request_details.status.toLowerCase(),
        },
      ],
      total_repaymentSchedule: loanData.request_details.loan_duration,
    };
  }, [loanData]);

  // Format transaction history
  const transactionHistory = useMemo(() => {
    // This should be replaced with actual transaction data from your API
    // Currently using a placeholder
    return {
      transactions: [
        {
          transaction_type: "Loan Disbursement",
          amount_paid: loanData?.request_details.loan_amount || 0,
          transaction_date: loanData?.request_details.created_at || "N/A",
        },
        // Add more transactions as needed
      ],
      total_transactions: 1,
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
        label: "Loan Purpose",
        value: summary.loan_purpose ?? "N/A",
      },
      { label: "Loan Terms", value: `${summary.loan_terms} Months` },
      { label: "Interest Rate", value: `${summary.interest_rate}%`},
      {
        label: "Start Date",
        value: formatDate(summary.request_date) ?? "N/A",
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
        label: "Balance",
        value: formatCurrency(summary.balance) ?? "N/A",
      },
    ];
  }, [summary]);

  if (loading) {
    return <div>Loading loan details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loanData) {
    return <div>No loan data available</div>;
  }

  return (
    <div className={`pt-[34px] bg-white rounded-lg h-[1100px] w-full border-[1px]`}>
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
          <DocumentsTable LoanRequest_Data={{ loan: { documents: loanData.documents } }} />
        </div>
      )}
    </div>
  );
}