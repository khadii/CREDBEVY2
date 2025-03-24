// src/app/pages/loan-request/PendingRequest.tsx
import React from "react";
// import { LoanRequestHeaderWithTabs } from "./ReuseableHeader";
import Search from "@/app/components/Search";
// import Table from "@/app/components/Tableone/Datatable";
// import { Tab, Request, TableTitleProps } from "@/types";
import { LoanRequestHeaderWithTabs } from "@/app/dashboard/loan-request/ReuseableHeader";
import Pagination from "../TableTwo/Pagination";
import Table from "../Tablefive/Table";
import { LoanRequestWithPagination } from "./loanRequestTablepending";

interface PendingRequestProps {
  tabs: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  requests: any;
  tableTitleProps: any;
  handleSearchClick: () => void;
  handleFilterClick: () => void;
  handleSeeAllClick: () => void;
  bulkAction: any;
  setCurrentPage: any;
  currentPage: any;
  totalPages: any;
  total_count:any
}

export default function PendingRequest({
  tabs,
  activeTab,
  setActiveTab,
  requests,
  tableTitleProps,
  handleSearchClick,
  handleFilterClick,
  handleSeeAllClick,
  bulkAction,
  setCurrentPage,
  currentPage,
  totalPages,
  total_count
}: PendingRequestProps) {
  return (
    <div className="w-full min-h-screen pb-36">
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
      <LoanRequestWithPagination
        laon_table_data_all={requests}
        total_count={total_count}
        bulkAction={bulkAction}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
