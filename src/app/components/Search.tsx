"use client"; // Ensure this component is client-side rendered

import React, { useState, useCallback } from "react";
import { LucideSearch, ListFilter, XCircle } from "lucide-react"; // Import XCircle for clear button
import { useDashboard } from "../Context/DahboardContext";
import { usePathname } from "next/navigation";
import LoanProductFilter from "./Modals/filter/loanProductFilter";
import LoanRequestFilterModal from "./Modals/filter/LoanRequestFilterModal";
import RepaymentFilterModal from "./Modals/filter/RepaymentFilter";
import LoanHistoryFilterModal from "./Modals/filter/LoanHistoryFilter"; // Import LoanHistoryFilterModal
import FinancialFilterModal from "./Modals/filter/FinancialsFilter";
import SearchInputModal from "./SearchInputModal";
import PendingLoanRequestFilterModal from "./Modals/filter/PendingLoanReuest";
import { _pending_loans } from "../Redux/dashboard/dashboardThunk";
import { AppDispatch } from "../Redux/store";
import { useDispatch } from "react-redux";
import { _loan_products_all } from "../Redux/Loan_Product/loan_product_thunk";
import { loan_repayment } from "../Redux/Repayment/repayment_thunk";
import { fetchLoanRequests } from "../Redux/LoanHistory/loanRequests_thunk";


interface LoanRequestActionsProps {
  onSearchSubmit?: (searchTerm: string) => void; // Callback for search submission
  showSeeAll?: boolean;
  searchName?: string;
}

const Search: React.FC<LoanRequestActionsProps> = ({
  showSeeAll = true,
  searchName = "Search",
}) => {
  const { filter, setFilter } = useDashboard(); // Assuming useDashboard provides search and filter values
  const pathname = usePathname();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hasActiveSearch, setHasActiveSearch] = useState(false);
  const [hasActiveFilter, setHasActiveFilter] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const isLoanProductsPage = pathname === "/dashboard/loan-products";
  const isLoanRequestPage = pathname === "/dashboard/loan-request";
  const dashboard = pathname === "/dashboard";
  const isRepaymentFilterModal = pathname === "/dashboard/repayment";
  const isLoanHistoryFilterModal = pathname === "/dashboard/loan-history"; // Define for loan history page
  const isFinancialFilterModal = pathname === "/dashboard/financials";
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
  } = useDashboard(); // These dashboard context values are likely for _pending_loans

  const onSearchSubmit = (searchTerm: any) => {
    if (dashboard) {
      dispatch(_pending_loans({ search: searchTerm }));
      setHasActiveSearch(true);
    }
    if (isLoanRequestPage) {
      // Assuming _loan_products_all is also used for Loan Requests for search
      // You might need a specific thunk for Loan Requests if filters differ
      dispatch(_loan_products_all({ search: searchTerm }));
      setHasActiveSearch(true); // Assuming this page also shows search status
    }
    if (isLoanProductsPage) {
      dispatch(_loan_products_all({ search: searchTerm }));
      setHasActiveSearch(true);
    }
    if (isRepaymentFilterModal) {
      dispatch(loan_repayment({ search: searchTerm }));
      setHasActiveSearch(true);
    }
    if (isLoanHistoryFilterModal) { // New: Loan History search
      dispatch(fetchLoanRequests({ search: searchTerm }));
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
          search: "", // Clear search term
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
          search: "", // Clear search term
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
      // Assuming _loan_products_all is used for Loan Requests
      dispatch(
        _loan_products_all({
          search: "", // Clear search term
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

    if (isRepaymentFilterModal) {
      dispatch(loan_repayment({
        search: "",
        start_due_date: undefined, // Reset all potential repayment filters
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

    if (isLoanHistoryFilterModal) { // New: Loan History clear search
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
  };

  const onClearFilter = () => {
    if (dashboard) {
      dispatch(
        _pending_loans({
          search: search, // Keep current search term
          min_amount: undefined, // Clear amount filters
          max_amount: undefined,
          start_date: undefined, // Clear date filters
          min_credit_score: undefined, // Clear credit score filters
          max_credit_score: undefined,
          min_user_income: undefined, // Clear income filters
          max_user_income: undefined,
        })
      );
      setHasActiveFilter(false);
    }
    console.log("Filter reset.");

    if (isLoanProductsPage) {
      dispatch(
        _loan_products_all({
          search: "", // Clear search term for simplicity on filter clear
          sort_by: "DESC",
          start_date: "",
          end_date: "",
          limit: "",
          paginate: true,
          page: 1,
          filter_by: "", // Clear status filter
          min_loan_duration: undefined, // Clear duration filters
          max_loan_duration: undefined,
        })
      );
      setHasActiveFilter(false);
    }
    if (isRepaymentFilterModal) {
      dispatch(loan_repayment({
        search: "", // Clear search as well for a full filter reset
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
    if (isLoanHistoryFilterModal) { // New: Loan History clear filter
      dispatch(fetchLoanRequests({
        search: "", // Clear search as well for a full filter reset
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
    // Add similar blocks for Loan Request, Loan History, Financial filters if they are tied to this component
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
        />
      )}
      {dashboard && (
        <PendingLoanRequestFilterModal
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
