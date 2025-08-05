import React, { useState, useEffect } from "react";
import TableWithPagination from "../../table/tablewWthPagination";
import { CustomCheckbox } from "../../CheckboxForTable/TablecheckBox";
import { StatusWithOptionsCustomers } from "./Status";
import { formatDate } from "@/app/lib/formatdate";

interface CustomerLoanData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  credit_score: string;
  created_at: string;
  approval_status: "Pending" | "Approved" | "Denied";
  uuid: string;
  image?: string;
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
    count: total_count + " Customers",
    subtitle: "List of all Customers",
  };

  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Combine first and last name
  const formatName = (customer: CustomerLoanData) => {
    return `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'N/A';
  };

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
    if (selectedIds.length === loan_table_data_all?.length) {
      setIsHeaderChecked(true);
    } else {
      setIsHeaderChecked(false);
    }
  }, [selectedIds, loan_table_data_all]);

  const handleToggle = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
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
          <p className="truncate max-w-[120px]">{formatName(item)}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item.email ?? 'N/A'}</td>
      <td className="truncate max-w-[120px] py-4 px-6">{item.telephone ?? 'N/A'}</td>
      <td className="truncate max-w-[35px] py-4 px-6">{item.credit_score ?? 'N/A'}</td>
      <td className="truncate max-w-[110px] py-4 px-6">{formatDate(item.created_at )?? 'N/A'}</td>
      <td className="truncate max-w-[154px] py-4 px-4">
        {renderStatus(item.approval_status, item.uuid)}
      </td>
    </>
  );

  return (
    <TableWithPagination
      headers={customerHeaders}
      data={loan_table_data_all}
      titleProps={titleProps}
      href="/dashboard/customers/details"
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