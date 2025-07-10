import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LucideChevronDown, Plus } from "lucide-react";

import TableRow from "../TableTwo/TableRow";
import Pagination from "../TableTwo/modifiedTabletwo/tablePagination";
import TableHeader from "../TableTwo/modifiedTabletwo/TableHeader";

interface TableProps<T> {
  headers: string[];
  data: T[];
  titleProps: {
    mainTitle: string;
    count: string;
    subtitle: string;
  };
  setCurrentPage: (page: number) => void;
  href: string;
  setStep?: (step: number) => void;
  currentPage: any;
  totalPages: number;
  renderRow: (item: T, index: number) => React.ReactNode;
  renderHeader?: (isHeaderChecked: boolean, handleHeaderToggle: () => void) => React.ReactNode;
  isHeaderChecked?: boolean;
  handleHeaderToggle?: () => void;
  bulkAction: () => void;
  showAddProductButton?: boolean; 
}

const TableWithPagination = <T,>({
  headers,
  data,
  titleProps,
  href,
  setStep,
  renderRow,
  setCurrentPage,
  currentPage,
  totalPages,
  renderHeader,
  isHeaderChecked,
  handleHeaderToggle,
  bulkAction,
  showAddProductButton = true,
}: TableProps<T>) => {
  const router = useRouter();

  const handleRowClick = (item: number) => {
    router.push(`${href}/${item}`);
  };

  return (
    <div className="rounded-lg mt-3 w-full bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 py-6 px-4 sm:px-6 border rounded-lg border-b-0 rounded-b-none gap-4 sm:gap-0">
        <div className="bg-white w-full sm:w-auto">
          <div className="flex flex-row sm:flex-row sm:items-center w-full gap-2 sm:gap-3 bg-white">
            <h2 className="text-base sm:text-lg font-bold flex items-center col-span-2 text-[#333333]">
              {titleProps.mainTitle}
            </h2>
            <p className="text-xs px-2 py-[2px] font-semibold bg-[#FEF1FFAD] items-center border border-[#F1CFF4] justify-center rounded-full col-span-1 text-[#156064] flex w-fit">
              {titleProps.count}
            </p>
          </div>
          <p className="text-[#333333] text-xs sm:text-sm font-semibold mt-1 sm:mt-0">
            {titleProps.subtitle}
          </p>
        </div>
        <div className="flex flex-row xs:flex-row gap-2 sm:gap-[12px] w-full sm:w-auto">
          {showAddProductButton && (
            <button
              className="bg-[#156064] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-xs font-extrabold w-full xs:w-auto whitespace-nowrap"
              onClick={() => router.push("/dashboard/loan-products/form")}
            >
              <Plus size={16} /> Add Product
            </button>
          )}
          <button
            className="bg-[#24262D] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-xs font-extrabold w-full xs:w-auto"
            onClick={() => bulkAction()}
          >
            Bulk Action <LucideChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <TableHeader
            headers={headers}
            renderHeader={renderHeader}
            isHeaderChecked={isHeaderChecked}
            handleHeaderToggle={handleHeaderToggle}
          />
          <tbody className="text-[#333333] font-semibold text-xs">
            {data?.map((item: any, index: any) => (
              <TableRow
                key={index}
                item={item}
                index={index}
                onClick={() => handleRowClick(item.uuid || item.loan_uuid)}
                renderRow={renderRow}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TableWithPagination;