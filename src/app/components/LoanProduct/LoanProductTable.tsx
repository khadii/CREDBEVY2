import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";
import { useDashboard } from "@/app/Context/DahboardContext";
import TableWithPagination from "../table/tablewWthPagination";
import { StatusWithOptions } from "./StatusWithOptions";
import { formatCurrency } from "@/app/lib/utillity/formatCurrency";

interface LoanData {
  id: string;
  product_name: string;
  loan_type: string;
  maximum_amount: any;
  minimum_credit_score: string;
  maximum_credit_score: string;
  duration: string;
  total_revenue_generated: any;
  status: "Active" | "Repaid" | "Overdue" | "Inactive";
  imageUrl?: string;
  uuid: string;
}

export const LoanProduct = ({
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
    "Product Name",
    "Type",
    "Amount",
    "Credit Score",
    "Duration",
    "Revenue Generated",
    "Status",
  ];

  const titleProps = {
    mainTitle: "Loan Products",
    count: total_count + " Products",
    subtitle: "List of loan product created",
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
         
        >
          <div  onClick={(e) => e.stopPropagation()}>
             <CustomCheckbox
            id={item.uuid}
            checked={selectedIds.includes(item.uuid)}
            onChange={() => handleToggle(item.uuid)}
          />
          </div>
         
          <p className="truncate max-w-[120px]">{item.product_name}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item.loan_type}</td>
      <td className="truncate max-w-[120px] py-4 px-6">
 {formatCurrency(item.maximum_amount)}
      </td>
      <td className="truncate max-w-[35px] py-4 px-6">
        {item.minimum_credit_score}/{item.maximum_credit_score}
      </td>
      <td className="truncate max-w-[110px] py-4 px-6">{item.duration}</td>
      <td className="truncate max-w-[154px] py-4 px-6">
        {formatCurrency(item.total_revenue_generated)}
      </td>
      <td className="truncate max-w-[154px] py-4 px-4">
      {renderStatus(item.status, item.uuid)}
      </td>
    </>
  );

  return (
    <TableWithPagination
      headers={loanHeaders}
      data={laon_table_data_all}
      titleProps={titleProps}
      href="/dashboard/loan-products/performance"
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
