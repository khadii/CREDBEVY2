// src/app/pages/loan-request/ApprovedRequests.tsx
import React from "react";
// import { LoanRequestHeaderWithTabs } from "./ReuseableHeader";
import Search from "@/app/components/Search";
// import { Tab } from "@/types";
import { LoanRequestHeaderWithTabs } from "@/app/dashboard/loan-request/ReuseableHeader";
import { LoanRequestWithPagination } from "./loanRequestTableApproved";

interface ApprovedRequestsProps {
  tabs: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleSearchClick: () => void;
  handleFilterClick: () => void;
  handleSeeAllClick: () => void;
  laon_table_data_all:any,
  setCurrentPage:any,
  currentPage:any,
  totalPages:any,
  total_count:any,
  bulkAction:any
}

export default function ApprovedRequests({
  tabs,
  activeTab,
  setActiveTab,
  handleSearchClick,
  handleFilterClick,
  handleSeeAllClick,
  laon_table_data_all,
  currentPage,
  setCurrentPage,totalPages,
  total_count,
  bulkAction
}: ApprovedRequestsProps) {
  return (
    <div className="w-full min-h-screen">
      <LoanRequestHeaderWithTabs
        title="Loan Request"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Search
  
      />
      <LoanRequestWithPagination laon_table_data_all={laon_table_data_all} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} total_count={total_count} bulkAction={bulkAction} />
    </div>
  );
}