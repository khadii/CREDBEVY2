import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LucideChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { FaCircle } from "react-icons/fa";
import LoanProductTable from "@/app/components/LoanProduct/MainTable";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";

interface TableProps<T> {
  headers: string[];
  data: T[];
  titleProps: {
    mainTitle: string;
    count: string;
    subtitle: string;
  };
  href: string;
  itemsPerPage: number;
  renderStatus?: (status: string) => React.ReactNode;
  renderRow: (item: T, index: number) => React.ReactNode;
}

interface LoanData {
  product_name: string;
  loan_type: string;
  maximum_amount: string;
  minimum_credit_score: string;
  duration: string;
  total_revenue_generated: string;
  status: "Active" | "Repaid" | "Overdue" | "Inactive";
  imageUrl?: string; // Optional field for image URL
}

export const LoanProduct = ({ setStep, laon_table_data_all, setCurrentPage, currentPage, totalPages,total_count }: { setStep: any, laon_table_data_all: any, setCurrentPage: any, currentPage: any, totalPages: any ,total_count:any}) => {
  const loanHeaders = [
    "Product Name",
    "Type",
    "Amount",
    "Credit Score",
    "Duration",
    "Revenue Generated",
    "Status"
  ];

  const titleProps = {
    mainTitle: "Loan Products",
    count: total_count + " Products",
    subtitle: "List of loan product created"
  };

  const [toggleStates, setToggleStates] = useState<boolean[]>([]);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);

  useEffect(() => {
    if (laon_table_data_all && laon_table_data_all.length > 0) {
      setToggleStates(laon_table_data_all.map(() => false));
    }
  }, [laon_table_data_all]);

  const handleToggle = (index: number) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);

    const allChecked = newToggleStates.every((state) => state);
    if (allChecked) {
      setIsHeaderChecked(true);
    } else {
      setIsHeaderChecked(false);
    }
  };

  const handleHeaderToggle = () => {
    const newHeaderState = !isHeaderChecked;
    setIsHeaderChecked(newHeaderState);

    const newToggleStates = laon_table_data_all.map(() => newHeaderState);
    setToggleStates(newToggleStates);
  };

  const renderHeader = (isHeaderChecked: boolean, handleHeaderToggle: () => void) => (
    <CustomCheckbox id={-1} checked={isHeaderChecked} onChange={handleHeaderToggle} />
  );

  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return (
          <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
            Active
          </button>
        );
      case "repaid":
        return (
          <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
            Repaid
          </button>
        );
      case "Overdue":
        return (
          <button className="flex items-center gap-2 border border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#E33A24] w-2 h-2 mr-1" />
            Overdue
          </button>
        );
      case "inactive":
        return (
          <button className="flex items-center border border-[#FFF2C2] bg-[#FFFBEF] text-[#F4C418] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#F4C418] w-2 h-2 mr-1" />
            Inactive
          </button>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const renderRow = (item: LoanData, index: number) => (
    <>
      <td className="pl-[27px] py-4 px-6">
        <div className="flex items-center gap-4 h-full" onClick={(e) => e.stopPropagation()}>
          <CustomCheckbox id={index} checked={toggleStates[index]} onChange={handleToggle} />
          <p className="truncate max-w-[120px]">{item.product_name}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item.loan_type}</td>
      <td className="truncate max-w-[120px] py-4 px-6">{item.maximum_amount}</td>
      <td className="truncate max-w-[35px] py-4 px-6">{item.minimum_credit_score}</td>
      <td className="truncate max-w-[110px] py-4 px-6">{item.duration}</td>
      <td className="truncate max-w-[154px] py-4 px-6">{item.total_revenue_generated}</td>
      <td className="truncate max-w-[154px] py-4 px-4">
        {renderStatus(item.status)}
      </td>
    </>
  );

  return (
    <LoanProductTable
      headers={loanHeaders}
      data={laon_table_data_all}
      titleProps={titleProps}
      href="/dashboard/loan-products/performance"
      renderRow={renderRow}
      renderHeader={renderHeader}
      isHeaderChecked={isHeaderChecked}
      handleHeaderToggle={handleHeaderToggle}
      setStep={setStep}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
};