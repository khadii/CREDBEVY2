"use client"; // Ensure this component is client-side rendered

import React, { useState } from "react";
import { LucideSearch, ListFilter } from "lucide-react";
import { useDashboard } from "../Context/DahboardContext";
import { usePathname } from "next/navigation";
import LoanProductFilter from "./Modals/filter/loanProductFilter";
import LoanRequestFilterModal from "./Modals/filter/LoanRequestFilterModal";
import RepaymentFilterModal from "./Modals/filter/RepaymentFilter";
import LoanHistoryFilterModal from "./Modals/filter/LoanHistoryFilter";
import FinancialFilterModal from "./Modals/filter/FinancialsFilter";

interface LoanRequestActionsProps {
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onSeeAllClick?: () => void;
  showSeeAll?: boolean; // Optional prop to control visibility of the "See All" link
  searchName?: string;
}

const Search: React.FC<LoanRequestActionsProps> = ({
  onSearchClick,
  onFilterClick,
  onSeeAllClick,
  showSeeAll = true, // Default value is true
  searchName = "Search",
}) => {
  const { filter, setFilter } = useDashboard();
  const pathname = usePathname();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const isLoanProductsPage = pathname === "/dashboard/loan-products";
  const isLoanRequestPage = pathname === "/dashboard/loan-request";

  const isRepaymentFilterModal = pathname === "/dashboard/repayment";
  const isLoanHistoryFilterModal = pathname === "/dashboard/loan-history";
  const isFinancialFilterModal = pathname === "/dashboard/financials";

  return (
    <div className="justify-between items-center mt-6 mb-3 bg-[#FAFAFA] hidden md:flex lg:flex">
      <div className="flex gap-4">
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 pr-[46px] pl-[17px] py-3 border rounded-lg bg-white text-[#8A8B9F] font-bold text-xs"
        >
          <LucideSearch size={16} color="#8A8B9F" />
          {searchName}
        </button>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 pr-[49px] pl-[17px] py-2 border rounded-lg bg-white text-[#8A8B9F] font-bold text-xs"
        >
          <ListFilter size={16} color="#8A8B9F" />
          Filter
        </button>
      </div>
      {showSeeAll && (
        <a
          href="#"
          onClick={onSeeAllClick}
          className="text-[#156064] font-bold text-sm"
        >
          See All
        </a>
      )}

      {isLoanProductsPage && (
        <LoanProductFilter
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
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
        />
      )}

      {isLoanHistoryFilterModal && (
        <LoanHistoryFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {isFinancialFilterModal && (
        <FinancialFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default Search;
