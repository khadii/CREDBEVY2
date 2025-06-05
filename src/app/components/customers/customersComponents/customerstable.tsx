import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/app/Context/DahboardContext";
import TableWithPagination from "../../table/tablewWthPagination";
import { CustomCheckbox } from "../../CheckboxForTable/TablecheckBox";
import { StatusWithOptionsCustomers } from "./Status";




interface CustomerLoanData {
  id: string;
  name: string;
  email: string;
  phone: string;
  credit_score: string;
  date_time: string;
  status: "Pending" | "Approved" | "Denied";
  uuid: string;
  image?:string
}

export const CustomersTable = ({
  bulkAction,
  loan_table_data_all,
  setCurrentPage,
  currentPage,
  totalPages,
  total_count,
}: {
  loan_table_data_all: any;
  setCurrentPage: any;
  currentPage: any;
  totalPages: any;
  total_count: any;
  bulkAction: any;
}) => {
  const customerHeaders = [
    "Name",
    "Email Address",
    "Phone Number",
    "Credit Score",
    "Date/Time",
    "Status",
  ];

  const titleProps = {
    mainTitle: "Customers",
    count: total_count + " Loans",
    subtitle: "List of all loans and their status",
  };

  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const { selectedIds, setSelectedIds } = useDashboard();
  
  useEffect(() => {
    if (loan_table_data_all && loan_table_data_all.length > 0) {
      setSelectedIds([]);
    }
  }, [loan_table_data_all]);
  
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
  
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (selectedIds.length === loan_table_data_all.length) {
      setIsHeaderChecked(true);
    } else {
      setIsHeaderChecked(false);
    }
  }, [selectedIds, loan_table_data_all]);

  const handleToggle = (id: string) => {
    setSelectedIds((prevSelectedIds: any) => {
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
      const allUuids = loan_table_data_all.map((item: CustomerLoanData) => item.uuid);
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
    <StatusWithOptionsCustomers 
      status={status} 
      uuid={uuid} 
      activeDropdown={activeDropdown} 
      setActiveDropdown={setActiveDropdown} 
    />
  );

  const renderRow = (item: CustomerLoanData, index: number) => (
    <>
      <td className="pl-[27px] py-4 px-6">
        <div className="flex items-center gap-4 h-full">
          <div onClick={(e) => e.stopPropagation()}>
            <CustomCheckbox
              id={item.uuid}
              checked={selectedIds.includes(item.uuid)}
              onChange={() => handleToggle(item.uuid)}
            />
          </div>
             {item.image && (
              <img
                src={item.image}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
          <p className="truncate max-w-[120px]">{item.name}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item.email}</td>
      <td className="truncate max-w-[120px] py-4 px-6">{item.phone}</td>
      <td className="truncate max-w-[35px] py-4 px-6">{item.credit_score}</td>
      <td className="truncate max-w-[110px] py-4 px-6">{item.date_time}</td>
      <td className="truncate max-w-[154px] py-4 px-4">
        {renderStatus(item.status, item.uuid)}
      </td>
    </>
  );

  return (
    <TableWithPagination
      headers={customerHeaders}
      data={loan_table_data_all}
      titleProps={titleProps}
      href="#"
      renderRow={renderRow}
      renderHeader={renderHeader}
      isHeaderChecked={isHeaderChecked}
      handleHeaderToggle={handleHeaderToggle}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
      bulkAction={bulkAction}
      showAddProductButton={false}
    />
  );
};