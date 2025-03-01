// src/app/pages/loan-request/PendingRequest.tsx
import React from "react";
// import { LoanRequestHeaderWithTabs } from "./ReuseableHeader";
import Search from "@/app/components/Search";
// import Table from "@/app/components/Tableone/Datatable";
// import { Tab, Request, TableTitleProps } from "@/types";
import { LoanRequestHeaderWithTabs } from "@/app/dashboard/loan-request/ReuseableHeader";
import Pagination from "../TableTwo/Pagination";
import Table from "../Tablefive/Table";

interface PendingRequestProps {
  tabs:any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  requests: any;
  tableHeaders: any;
  tableTitleProps:any
  handleSearchClick: () => void;
  handleFilterClick: () => void;
  handleSeeAllClick: () => void;
}

export default function PendingRequest({
  tabs,
  activeTab,
  setActiveTab,
  requests,
  tableHeaders,
  tableTitleProps,
  handleSearchClick,
  handleFilterClick,
  handleSeeAllClick,
}: PendingRequestProps) {
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
      <Table
        headers={tableHeaders}
        data={requests}
        titleProps={tableTitleProps}
        href={"#"}
      />
     
    </div>
  );
}