"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import { Tabs } from "../../Tabs";
import Transaction_HistoryTable from "./Transaction_HistoryTable";
import RepaymentScheduleTable from "./RepaymentScheduleTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { formatDate } from "@/app/lib/formatdate";
import { single_loan_repayments } from "@/app/Redux/Repayment/repayment_thunk";
import { formatCurrency } from "@/app/lib/utillity/formatCurrency";

interface RepaymentDetailsProps {
  id: string;
}

export default function RepaymentInfo({ id }: RepaymentDetailsProps) {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.sinleloanRepayment
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(single_loan_repayments({ user_id: id }));
  }, [dispatch, id]);

  const summary = data?.loan_summary || {
    loan_amount: 0,
    monthly_repayment: 0,
    loan_purpose: "",
    loan_terms: 0,
    interest_rate: 0,
    request_date: "",
    status: "",
    approval_status: "",
    total_repayment_count: 0,
    total_upcoming_count: 0,
    total_overdue_count: 0,
  };

  const tabs = useMemo(
    () => [
      { name: "Loan Summary" },
      { name: "Repayment Schedule" },
      { name: "Transaction History" },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const loanSummaryData = useMemo(
    () => [
      {
        label: "Loan Amount",
        value: formatCurrency(summary.loan_amount) ?? "N/A",
      },
      {
        label: "Monthly Payment",
        value: formatCurrency(summary.monthly_repayment) ?? "N/A",
      },
      { label: "Loan Purpose", value: summary.loan_purpose ?? "N/A" },
      { label: "Loan Terms", value: summary.loan_terms ?? "N/A" },
      { label: "Interest Rate", value: summary.interest_rate ?? "N/A" },
      {
        label: "Request Date",
        value: formatDate(summary.request_date) ?? "N/A",
      },
    ],
    [summary]
  );

   if (loading || !data)  {
    return (
      <div className="pt-[34px] bg-white rounded-lg h-[1100px] w-full border-[1px] p-6">
       
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-[34px] bg-white rounded-lg h-[1100px] w-full border-[1px] p-6">
        <div>Error loading data: {error}</div>
      </div>
    );
  }

  return (
    <div
      className={`pt-[34px] bg-white rounded-lg h-[1100px] w-full border-[1px]`}
    >
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
            LoanRequest_Data={
              data?.repayment_schedule_history.repayment_schedule
            }
            totalRepaymentschedule={
              data?.repayment_schedule_history.total_repaymentSchedule
            }
          />
        </div>
      )}

      {activeTab === "Transaction History" && (
        <div className="w-full px-[24px]">
          <Transaction_HistoryTable
            LoanRequest_Data={data?.repayment_transaction_history.transactions!}
            totaltransaction={
              data?.repayment_transaction_history.total_transactions!
            }
          />
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
