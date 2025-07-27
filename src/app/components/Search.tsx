"use client";

import React, { useState, useCallback } from "react";
import { LucideSearch, ListFilter, XCircle } from "lucide-react"; 
import { useDashboard } from "../Context/DahboardContext";
import { usePathname } from "next/navigation";
import LoanProductFilter from "./Modals/filter/loanProductFilter";
import LoanRequestFilterModal from "./Modals/filter/LoanRequestFilterModal";
import RepaymentFilterModal from "./Modals/filter/RepaymentFilter";
import LoanHistoryFilterModal from "./Modals/filter/LoanHistoryFilter";
import FinancialFilterModal from "./Modals/filter/FinancialsFilter";
import SearchInputModal from "./SearchInputModal";
import PendingLoanRequestFilterModal from "./Modals/filter/PendingLoanReuest";


import { _pending_loans } from "../Redux/dashboard/dashboardThunk";
import { AppDispatch } from "../Redux/store";
import { useDispatch } from "react-redux";
import { _loan_products_all } from "../Redux/Loan_Product/loan_product_thunk";
import { loan_repayment } from "../Redux/Repayment/repayment_thunk";
import { fetchLoanRequests } from "../Redux/LoanHistory/loanRequests_thunk";
import { fetchCustomerLoanRequests } from "../Redux/customer/customer_request_slice";
import CustomerFilterModal from "./Modals/filter/customerFilter";
import { all_loan_requests } from "../Redux/Loan_request/loan_request_thunk";
import { transactionhistory } from "../Redux/Financials/TransactionHistory/TransactionHistory";


interface LoanRequestActionsProps {
  onSearchSubmit?: (searchTerm: string) => void; 
  showSeeAll?: boolean;
  searchName?: string;
}

const Search: React.FC<LoanRequestActionsProps> = ({
  showSeeAll = true,
  searchName = "Search",
}) => {
  const { filter, setFilter } = useDashboard(); 
  const pathname = usePathname();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hasActiveSearch, setHasActiveSearch] = useState(false);
  const [hasActiveFilter, setHasActiveFilter] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const isLoanProductsPage = pathname === "/dashboard/loan-products";
  const isLoanRequestPage = pathname === "/dashboard/loan-request";
  const dashboard = pathname === "/dashboard";
  const isRepaymentFilterModal = pathname === "/dashboard/repayment";
  const isLoanHistoryFilterModal = pathname === "/dashboard/loan-history";
  const isFinancialFilterModal = pathname === "/dashboard/financials";
  const isCustomerPage = pathname === "/dashboard/customers";

  const dispatch = useDispatch<AppDispatch>();

  const {
    search,
    minAmount,
    maxAmount,
    minCreditScore,
    maxCreditScore,
    startDate,
    minUserIncome,
    maxUserIncome,
  } = useDashboard(); 


  const onSearchSubmit = (searchTerm: any) => {
    if (dashboard) {
      dispatch(_pending_loans({ search: searchTerm }));
      setHasActiveSearch(true);
    }
    if (isLoanRequestPage) {
      dispatch(all_loan_requests({ search: searchTerm }));
      setHasActiveSearch(true); 
    }
    if (isLoanProductsPage) {
      dispatch(_loan_products_all({ search: searchTerm }));
      setHasActiveSearch(true);
    }
    if (isRepaymentFilterModal) {
      dispatch(loan_repayment({ search: searchTerm }));
      setHasActiveSearch(true);
    }
    if (isLoanHistoryFilterModal) { 
      dispatch(fetchLoanRequests({ search: searchTerm }));
      setHasActiveSearch(true);
    }
    if (isCustomerPage) { 
      dispatch(fetchCustomerLoanRequests({ search: searchTerm }));
      setHasActiveSearch(true);
    }
      if (isFinancialFilterModal) { 
      dispatch(transactionhistory({ search: searchTerm }));
      setHasActiveSearch(true);
    }
  };

  const handleSearchSubmit = useCallback(
    (searchTerm: string) => {
      onSearchSubmit(searchTerm);
      setIsSearchModalOpen(false);
    },
    [onSearchSubmit]
  );

  const onClearSearch = () => {
    if (dashboard) {
      dispatch(
        _pending_loans({
          search: "",
          min_amount: minAmount,
          max_amount: maxAmount,
          start_date: startDate,
          min_credit_score: minCreditScore,
          max_credit_score: maxCreditScore,
          min_user_income: minUserIncome,
          max_user_income: maxUserIncome,
        })
      );
      setHasActiveSearch(false);
    }

    if (isLoanProductsPage) {
      dispatch(
        _loan_products_all({
          search: "", 
          sort_by: "DESC",
          start_date: "",
          end_date: "",
          limit: "",
          paginate: true,
          page: 1,
        })
      );
      setHasActiveSearch(false);
    }

    if (isLoanRequestPage) {
      
      dispatch(
       all_loan_requests ({
          search: "", 
          sort_by: "DESC",
          start_date: "",
          end_date: "",
          limit: "",
          page: 1,
        })
      );
      setHasActiveSearch(false);
    }

    if (isRepaymentFilterModal) {
      dispatch(loan_repayment({
        search: "",
        start_due_date: undefined,
        end_due_date: undefined,
        start_disbursal_date: undefined,
        end_disbursal_date: undefined,
        min_loan_duration: undefined,
        max_loan_duration: undefined,
        status: undefined,
        paginate: true,
        page: 1
      }));
      setHasActiveSearch(false);
    }

    if (isLoanHistoryFilterModal) {
      dispatch(fetchLoanRequests({
        search: "",
        email: undefined,
        min_amount: undefined,
        max_amount: undefined,
        min_credit_score: undefined,
        max_credit_score: undefined,
        status: undefined,
        page: 1,
        limit: undefined,
        sort_by: undefined,
        start_date: undefined,
        end_date: undefined,
        
      }));
      setHasActiveSearch(false);
    }

    if (isCustomerPage) { 
      dispatch(fetchCustomerLoanRequests({
        search: "",
        email: undefined,
        min_credit_score: undefined,
        max_credit_score: undefined,
        start_date: undefined,
        end_date: undefined,
        page: 1,
      }));
      setHasActiveSearch(false);
    }
    if (isFinancialFilterModal) { 
      dispatch(transactionhistory({
        search: "", 
        min_amount: undefined,
        max_amount: undefined,
        start_date: undefined,
        end_date: undefined,
        status: undefined,
        page: 1,
      }));
      setHasActiveSearch(false);
    }
  
  };

  const onClearFilter = () => {
    if (dashboard) {
      dispatch(
        _pending_loans({
          search: search,
          min_amount: undefined, 
          max_amount: undefined,
          start_date: undefined,
          min_credit_score: undefined, 
          max_credit_score: undefined,
          min_user_income: undefined,
          max_user_income: undefined,
          
        })
      );
      setHasActiveFilter(false);
    }
    console.log("Filter reset.");
 if (isLoanRequestPage) {
   
      dispatch(
       all_loan_requests ({
          search: "",
          sort_by: "DESC",
          start_date: "",
          end_date: "",
          limit: "",
          page: 1,
        })
      );
      setHasActiveFilter(false);
    }
    if (isLoanProductsPage) {
      dispatch(
        _loan_products_all({
          search: "", 
          sort_by: "DESC",
          start_date: "",
          end_date: "",
          limit: "",
          paginate: true,
          page: 1,
          filter_by: "", 
          min_loan_duration: undefined, 
          max_loan_duration: undefined,
        })
      );
      setHasActiveFilter(false);
    }
    if (isRepaymentFilterModal) {
      dispatch(loan_repayment({
        search: "", 
        start_due_date: undefined,
        end_due_date: undefined,
        start_disbursal_date: undefined,
        end_disbursal_date: undefined,
        min_loan_duration: undefined,
        max_loan_duration: undefined,
        status: undefined,
        paginate: true,
        page: 1
      }));
      setHasActiveFilter(false);
    }
    if (isLoanHistoryFilterModal) { 
      dispatch(fetchLoanRequests({
        search: "",
        email: undefined,
        min_amount: undefined,
        max_amount: undefined,
        min_credit_score: undefined,
        max_credit_score: undefined,
        status: undefined,
        page: 1,
        limit: undefined,
        sort_by: undefined,
        start_date: undefined,
        end_date: undefined,
      }));
      setHasActiveFilter(false);
    }
    if (isCustomerPage) { 
      dispatch(fetchCustomerLoanRequests({
        search: "", 
        email: undefined,
        min_credit_score: undefined,
        max_credit_score: undefined,
        start_date: undefined,
        end_date: undefined,
        page: 1,
      }));
      setHasActiveFilter(false);
    }

    if (isFinancialFilterModal) { 
      dispatch(transactionhistory({
        search: "",
        min_amount: undefined,
        max_amount: undefined,
        start_date: undefined,
        end_date: undefined,
        status: undefined,
        page: 1,
      }));
      setHasActiveFilter(false);
    }
  };

  return (
    <div className="flex justify-between items-center mt-10 mb-3 bg-[#FAFAFA]">
      <div className="md:flex gap-4 grid grid-cols-2 items-center">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex items-center gap-2 pr-[46px] pl-[17px] py-2 border rounded-lg bg-white text-[#8A8B9F] font-bold text-xs"
        >
          <LucideSearch size={16} color="#8A8B9F" />
          {searchName}
        </button>

        {hasActiveSearch && (
          <button
            onClick={onClearSearch}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white text-red-500 font-bold text-xs"
            title="Clear Search"
          >
            <XCircle size={16} />
            Clear Search
          </button>
        )}

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 pr-[49px] pl-[17px] py-2 border rounded-lg bg-white text-[#8A8B9F] font-bold text-xs"
        >
          <ListFilter size={16} color="#8A8B9F" />
          Filter
        </button>

        {hasActiveFilter && (
          <button
            onClick={onClearFilter}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white text-red-500 font-bold text-xs"
            title="Clear Filter"
          >
            <XCircle size={16} />
            Clear Filter
          </button>
        )}
      </div>
      {/* {showSeeAll && (
        <a
          href="#"
          onClick={onSeeAllClick}
          className="text-[#156064] font-bold text-sm"
        >
          See All
        </a>
      )} */}

      {isLoanProductsPage && (
        <LoanProductFilter
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          setHasActiveFilter={setHasActiveFilter}
        />
      )}

      {isLoanRequestPage && (
        <LoanRequestFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
         setHasActiveFilter={setHasActiveFilter}
        />
      )}

      {isRepaymentFilterModal && (
        <RepaymentFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          setHasActiveFilter={setHasActiveFilter}
        />
      )}

      {isLoanHistoryFilterModal && ( 
        <LoanHistoryFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          setHasActiveFilter={setHasActiveFilter}
        />
      )}

      {isFinancialFilterModal && (
        <FinancialFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
            setHasActiveFilter={setHasActiveFilter}
        />
      )}
      {dashboard && (
        <PendingLoanRequestFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          setHasActiveFilter={setHasActiveFilter}
        />
      )}
      {isCustomerPage && (
        <CustomerFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          setHasActiveFilter={setHasActiveFilter}
        />
      )}
      <SearchInputModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
};

export default Search;
