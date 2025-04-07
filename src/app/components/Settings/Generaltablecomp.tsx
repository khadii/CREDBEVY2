import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LucideChevronDown, Plus } from "lucide-react";

import TableRow from "../TableTwo/TableRow";
import TableHeader from "../TableTwo/modifiedTabletwo/TableHeader";
import Pagination from "../TableTwo/modifiedTabletwo/tablePagination";

interface TableProps<T> {
  headers: string[];
  data: T[];
  titleProps: {
    mainTitle: string;
    count: string;
    subtitle: string;
  };
  href: string;

  setStep?: (step: number) => void;
  renderRow: (item: T, index: number) => React.ReactNode;
  showAddUserButton?: boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  isHeaderChecked: boolean;
  handleHeaderToggle: () => void;
  renderHeader?: (
    isHeaderChecked: boolean,
    handleHeaderToggle: () => void
  ) => React.ReactNode;
}

const SettingsTable = <T,>({
  headers,
  data,
  titleProps,
  href,

  setStep,
  renderRow,
  setCurrentPage,
  currentPage,
  totalPages,
  isHeaderChecked,
  handleHeaderToggle,
  renderHeader,
  showAddUserButton = false // Default value added
}: TableProps<T>) => {
  const router = useRouter();

  const handleRowClick = (index: number) => {
    router.push(`${href}`);
  };

  return (
    <div className="rounded-lg mt-3 w-full bg-white">
      <div className="flex justify-between items-center pb-6 py-6 px-6 border rounded-lg border-b-0 rounded-b-none">
        <div className="bg-white">
          <div className="flex items-center w-full gap-3 bg-white">
            <h2 className="text-lg font-bold flex items-center col-span-2 text-[#333333]">
              {titleProps.mainTitle}
            </h2>
            <span className="text-xs px-2 py-[2px] font-semibold bg-[#FEF1FFAD] items-center border border-[#F1CFF4] justify-center rounded-full col-span-1 text-[#156064] flex">
              {titleProps.count}
            </span>
          </div>
          <p className="text-[#333333] text-sm font-semibold">
            {titleProps.subtitle}
          </p>
        </div>
        <div className="flex gap-[12px]">
          {showAddUserButton && (
            <button
              className="bg-[#156064] text-white px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-extrabold"
              onClick={() => setStep && setStep(2)}
            >
              <Plus size={16} /> Add User
            </button>
          )}
          <button className="bg-[#24262D] text-white px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-extrabold">
            Bulk Action <LucideChevronDown size={16} />
          </button>
        </div>
      </div>
     
      <table className="w-full text-left">
        <TableHeader
          headers={headers}
          renderHeader={renderHeader}
          isHeaderChecked={isHeaderChecked}
          handleHeaderToggle={handleHeaderToggle}
        />
        <tbody className="text-[#333333] font-semibold text-xs">
          {data?.map((item: T, index: number) => (
            <TableRow
              key={index}
              item={item}
              index={index}
              onClick={() => handleRowClick(index)}
              renderRow={renderRow}
            />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SettingsTable;