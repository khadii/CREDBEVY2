// src/app/pages/loan-request/ApprovedRequests.tsx
import React from "react";
// import { LoanRequestHeaderWithTabs } from "./ReuseableHeader";
import Search from "@/app/components/Search";
import { LoanTable } from "@/app/components/LoanRequest/TableForAllApprovedRequest";
// import { Tab } from "@/types";
import { LoanRequestHeaderWithTabs } from "@/app/dashboard/loan-request/ReuseableHeader";

interface ApprovedRequestsProps {
  tabs: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleSearchClick: () => void;
  handleFilterClick: () => void;
  handleSeeAllClick: () => void;
}

export default function ApprovedRequests({
  tabs,
  activeTab,
  setActiveTab,
  handleSearchClick,
  handleFilterClick,
  handleSeeAllClick,
}: ApprovedRequestsProps) {
  return (
    <div>
      <LoanRequestHeaderWithTabs
        title="Loan Request"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Search
        onSearchClick={handleSearchClick}
        onFilterClick={handleFilterClick}
        onSeeAllClick={handleSeeAllClick}
      />
      <LoanTable />
    </div>
  );
}