"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Tabs } from "../Tabs";
import DocumentsTable from "./DocTable";
import { useDashboard } from "@/app/Context/DahboardContext";
import FinancialGrid from "../LoanRequest/FinancialCardgrid";
import { CSSProperties } from "react";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import Cookies from "js-cookie";
import SpinningFaceExact from "../credbevyLoader";

export default function FinancialInfo({ id }: { id: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const product_id = useMemo(() => ({ id }), [id]);

  const {
    loading: LoanRequest_loading,
    error: LoanRequest_SuccessError,
    data: LoanRequest_Data,
    user_info_status
  } = useSelector((state: RootState) => state.loanRequest.single_loan_products_request);
  
  const { approveSuccess } = useSelector((state: RootState) => state.loanCondition);
  const { interested, setInterested,setSelectedIds } = useDashboard();

  // Main data fetch effect - runs only when id changes
  useEffect(() => {
    dispatch(_single_loan_products_request(product_id));
    setSelectedIds(product_id)
  }, [dispatch, product_id]);

  // Set cookies only when data is available
  useEffect(() => {
    if (LoanRequest_Data?.loan) {
      Cookies.set("cs", LoanRequest_Data.loan.user.credit_score.toString());
      Cookies.set("loan_amount", LoanRequest_Data.loan.request_details.loan_amount.toString());
      Cookies.set("product_id", id.toString());
    }
  }, [LoanRequest_Data, id]);

  // Update interested state only when relevant data changes
  useEffect(() => {
    if (LoanRequest_Data?.loan?.request_details) {
      setInterested(user_info_status === "INTERESTED");
      setSelectedIds(id)
    }
  }, [user_info_status, LoanRequest_Data, setInterested]);

  const tabs = useMemo(() => [
    { name: "All Request" },
    { name: "Employment info" },
    { name: "Financial info" },
    { name: "Credit info" },
    { name: "Documents" },
    { name: "Prediction" },
  ], []);

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [showDocumentsTable, setShowDocumentsTable] = useState(false);
  const [showFinancialGrid, setShowFinancialGrid] = useState(false);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value).replace('NGN', 'N');
  }, []);

  const Request_Details = useMemo(() => 
    LoanRequest_Data?.loan ? [
      { label: "Loan Amount", value: formatCurrency(LoanRequest_Data.loan.request_details.loan_amount) },
      { label: "Monthly Repayment", value: formatCurrency(LoanRequest_Data.loan.request_details.loan_amount / LoanRequest_Data.loan.request_details.loan_duration) },
      { label: "Loan Purpose", value: LoanRequest_Data.loan.request_details.loan_purpose },
      { label: "Loan Terms", value: `${LoanRequest_Data.loan.request_details.loan_duration} Months` },
      { label: "Interest Rate", value: `${LoanRequest_Data.loan.request_details.interest_rate}%` },
      { label: "Request Date", value: new Date(LoanRequest_Data.loan.request_details.created_at).toLocaleString() },
    ] : [], [LoanRequest_Data, formatCurrency]);

  const Employment_Info = useMemo(() => 
    LoanRequest_Data?.loan?.employment_info ? [
      { label: "Employment Status", value: LoanRequest_Data.loan.employment_info.employment_status },
      { label: "Current Employer", value: LoanRequest_Data.loan.employment_info.business_name },
      { label: "Job Title:", value: LoanRequest_Data.loan.employment_info.job_role },
      { label: "Monthly Income:", value: formatCurrency(LoanRequest_Data.loan.employment_info.monthly_income) },
    ] : [], [LoanRequest_Data, formatCurrency]);

  const financialData = useMemo(() => 
    LoanRequest_Data?.loan?.financial_info ? [
      { label: "Average Debt", value: formatCurrency(LoanRequest_Data.loan.financial_info.average_debit) },
      { label: "Average Credit", value: formatCurrency(LoanRequest_Data.loan.financial_info.average_credit) },
      { label: "Average Balance", value: formatCurrency(LoanRequest_Data.loan.financial_info.average_balance) },
      { label: "Average Income", value: formatCurrency(LoanRequest_Data.loan.financial_info.average_income) },
      { label: "Average Expenses", value: formatCurrency(LoanRequest_Data.loan.financial_info.average_expenses) },
      { label: "Performing Loans", value: LoanRequest_Data.loan.financial_info.perform_loans || "0" },
      { label: "Account Name", value: `${LoanRequest_Data.loan.user.first_name} ${LoanRequest_Data.loan.user.last_name}` },
      { label: "Account Number", value: LoanRequest_Data.loan.financial_info.payment_account_number },
      { label: "Financial Institution", value: LoanRequest_Data.loan.financial_info.payment_bank_name },
      { label: "BVN", value: LoanRequest_Data.loan.financial_info.bvn },
    ] : [], [LoanRequest_Data, formatCurrency]);

  const financialDataNotinterested = useMemo(() => 
    financialData.map(item => {
      if (["Account Number", "Financial Institution", "BVN"].includes(item.label)) {
        return item;
      }
      return {
        ...item,
        value: item.value
      };
    }), [financialData]);

  const financialdata = interested ? financialData : financialDataNotinterested;

  const [data, setData] = useState<Array<{label: string, value: string}>>([]);

  useEffect(() => {
    if (!LoanRequest_Data) return;

    switch (activeTab) {
      case "All Request":
        setData(Request_Details);
        setShowDocumentsTable(false);
        setShowFinancialGrid(false);
        break;
      case "Employment info":
        setData(Employment_Info);
        setShowDocumentsTable(false);
        setShowFinancialGrid(false);
        break;
      case "Financial info":
        setData(financialdata);
        setShowDocumentsTable(false);
        setShowFinancialGrid(false);
        break;
      case "Documents":
        setData([]);
        setShowDocumentsTable(true);
        setShowFinancialGrid(false);
        break;
      case "Credit info":
        setData([]);
        setShowDocumentsTable(false);
        setShowFinancialGrid(true);
        break;
      default:
        setData([]);
        setShowDocumentsTable(false);
        setShowFinancialGrid(false);
        break;
    }
  }, [activeTab, LoanRequest_Data, Request_Details, Employment_Info, financialdata]);

  const blurStyles: CSSProperties = {
    filter: "blur(4px)",
    userSelect: "none",
    pointerEvents: "none",
  };

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  if (LoanRequest_loading) {
    return <div className="w-full justify-center items-center max-h-screen h-full flex min-h-screen"><SpinningFaceExact/></div>;
  }

  if (LoanRequest_SuccessError) {
    return <div>Error: {LoanRequest_SuccessError}</div>;
  }

  return (
    <div className={`pt-[34px] bg-white rounded-lg ${interested ? "h-[1100px]" : "h-[1100px]"} w-full border-[1px]`}>
      <div className="flex mb-[42px] pl-[24px]">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {showDocumentsTable ? (
        <div className="w-full px-[24px]">
          <DocumentsTable LoanRequest_Data={LoanRequest_Data} />
        </div>
      ) : showFinancialGrid ? (
        <div className="w-full px-[24px]">
          <FinancialGrid LoanRequest_Data={LoanRequest_Data} />
        </div>
      ) : (
        <div className="w-full space-y-5 mt-[38px] flex flex-col items-center justify-center">
          {data.map((item, index) => (
            <div key={index} className="flex w-full text-[16px] font-medium text-[#8A8B9F] text-left gap-[38px] pl-[24px] items-center">
              <div className="w-[154px]">{item.label}:</div>
              <div className="text-left truncate w-[300px] text-pretty break-words">
                <p className={item.label === "Email" ? "break-words" : ""}>
                  {interested ? (
                    item.value
                  ) : (
                    <>
                      {!["Account Number", "Financial Institution", "BVN"].includes(item.label) ? (
                        <span>{item.value}</span>
                      ) : (
                        <span style={blurStyles}>{item.value}</span>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}