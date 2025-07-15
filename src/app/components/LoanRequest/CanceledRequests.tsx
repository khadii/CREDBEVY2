// src/app/pages/loan-request/CanceledRequests.tsx
import React from "react";
import { HeaderWithTabs } from "../HeadersTab";
import { LoanRequestHeaderWithTabs } from "@/app/dashboard/loan-request/ReuseableHeader";

interface CanceledRequestsProps {
  tabs: any[];
  years:any
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleYearChange: (year: any) => void;
}

export default function CanceledRequests({
  tabs,
  years,
  activeTab,
  setActiveTab,
  handleYearChange,
}: CanceledRequestsProps) {
  return (
    <>
       <LoanRequestHeaderWithTabs
             title="Loan Request"
             tabs={tabs}
             activeTab={activeTab}
             setActiveTab={setActiveTab}
           />
      <div>comming soon</div>
    </>
  );
}
