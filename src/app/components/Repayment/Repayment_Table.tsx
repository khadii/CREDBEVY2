import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";
import { useDashboard } from "@/app/Context/DahboardContext";
import TableWithPagination from "../table/tablewWthPagination";
import { StatusWithOptions } from "../LoanProduct/StatusWithOptions";
// import { StatusWithOptions } from "./StatusWithOptions";

interface LoanData {
  id: string;

  duration: string;
  total_revenue_generated: string;
  status: "Active" | "Repaid" | "Overdue" | "Inactive";
  imageUrl?: string;
  uuid: string;
  user_name: string;
  date_due: string;
  amount_due: string;
  amount_paid: string;
  disbursal_date: string;
}

export const Repayment_Table = ({
  bulkAction,
  laon_table_data_all,
  setCurrentPage,
  currentPage,
  totalPages,
  total_count,
}: {
  laon_table_data_all: any;
  setCurrentPage: any;
  currentPage: any;
  totalPages: any;
  total_count: any;
  bulkAction: any;
}) => {
  const loanHeaders = [
    "Name",
    "Date Due",
    "Amount Due",
    "Amount Paid",
    "Disbursal Date",
    "Duration",
    "Status",
  ];

  const titleProps = {
    mainTitle: "All Repayments",
    count: total_count + " Repayments",
    subtitle: "List of all loans and their status",
  };

  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const { selectedIds, setSelectedIds } = useDashboard();
  useEffect(() => {
    if (laon_table_data_all && laon_table_data_all.length > 0) {
      setSelectedIds([]);
    }
  }, [laon_table_data_all]);
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
  
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  

  // Effect to update the header checkbox state based on selectedIds
  useEffect(() => {
    if (selectedIds.length === laon_table_data_all.length) {
      setIsHeaderChecked(true);
    } else {
      setIsHeaderChecked(false);
    }
  }, [selectedIds, laon_table_data_all]);

  // const handleToggle = (uuid: string) => {
  //   setSelectedIds((prevSelectedIds: any) => {
  //     if (prevSelectedIds.includes(uuid)) {
  //       return prevSelectedIds.filter((selectedId: any) => selectedId !== uuid);
  //     } else {
  //       return [...prevSelectedIds, uuid];
  //     }
  //   });
  // };


  const handleToggle = (id: string) => {
    setSelectedIds((prevSelectedIds: any) => {
      // Ensure prevSelectedIds is an array
      const currentIds = Array.isArray(prevSelectedIds) ? prevSelectedIds : [];
      
      if (currentIds.includes(id)) {
        return currentIds.filter(selectedId => selectedId !== id);
      } else {
        return [...currentIds, id];
      }
    });
  };

  const handleHeaderToggle = () => {
    const newHeaderState = !isHeaderChecked;
    setIsHeaderChecked(newHeaderState);

    if (newHeaderState) {
      const allUuids = laon_table_data_all.map((item: LoanData) => item.uuid);
      setSelectedIds(allUuids);
    } else {
      setSelectedIds([]);
    }
  };

  const renderHeader = (
    isHeaderChecked: boolean,
    handleHeaderToggle: () => void
  ) => (
    <CustomCheckbox
      id={-1}
      checked={isHeaderChecked}
      onChange={handleHeaderToggle}
    />
  );


  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const renderStatus = (status: string, uuid: string) => (
    <StatusWithOptions 
      status={status} 
      uuid={uuid} 
      activeDropdown={activeDropdown} 
      setActiveDropdown={setActiveDropdown} 
    />
  );
  const renderRow = (item: LoanData, index: number) => (
    <>
    
      <td className="pl-[27px] py-4 px-6 ">
        <div
          className="flex items-center gap-4 h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <CustomCheckbox
            id={item.uuid}
            checked={selectedIds.includes(item.uuid)}
            onChange={() => handleToggle(item.uuid)}
          />
          <p className="truncate max-w-[120px]">{item.user_name ?? 'N/A'}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item.date_due ?? 'N/A'}</td>
      <td className="truncate max-w-[120px] py-4 px-6">
        {item.amount_due ?? 'N/A'}
      </td>
      <td className="truncate max-w-[35px] py-4 px-6">
        {item.amount_paid ?? 'N/A'}
      </td>
      <td className="truncate max-w-[110px] py-4 px-6">{item.disbursal_date ?? 'N/A'}</td>
      <td className="truncate max-w-[154px] py-4 px-6">
        {item.duration ?? 'N/A'}
      </td>
      <td className="truncate max-w-[154px] py-4 px-4">
      {renderStatus(item.status, item.uuid)}
      </td>
    </>
  );

  return (
    <TableWithPagination
    showAddProductButton={false}
      headers={loanHeaders}
      data={laon_table_data_all}
      titleProps={titleProps}
      href="/dashboard/repayment/details"
      renderRow={renderRow}
      renderHeader={renderHeader}
      isHeaderChecked={isHeaderChecked}
      handleHeaderToggle={handleHeaderToggle}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
      bulkAction={bulkAction}
    />
  );
};
