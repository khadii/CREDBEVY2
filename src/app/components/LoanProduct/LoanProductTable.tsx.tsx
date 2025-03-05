import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LucideChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { FaCircle } from "react-icons/fa";
import LoanProductTable from "@/app/components/LoanProduct/MainTable";

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
  name: string;
  type: string;
  amount: string;
  creditScore: string;
  duration: string;
  revenueGenerated: string;
  status: "Active" | "Repaid" | "Overdue" | "Inactive";
  imageUrl?: string; // Optional field for image URL
}

export const LoanProduct = ({ setStep }: { setStep: any }) => {
  const loanHeaders = [
    "Product Name",
    "Type",
    "Amount",
    "Credit Score",
    "Duration",
    "Revenue Generated",
    "Status"
  ];

  const loanData: LoanData[] = [
    {
      name: "Employee Loans",
      type: "Personal",
      amount: "₦ 134,000,000.00",
      creditScore: "743",
      duration: "3 Months",
      revenueGenerated: "₦ 123,373,000,000.00",
      status: "Inactive",
      imageUrl: "https://bit.ly/dan-abramov",
    },
    {
      name: "Employee Loans",
      type: "Personal",
      amount: "₦ 134,000,000.00",
      creditScore: "743",
      duration: "3 Months",
      revenueGenerated: "₦ 123,373,000,000.00",
      status: "Active",
      imageUrl: "https://bit.ly/dan-abramov",
    },
    {
      name: "Business Loans",
      type: "Corporate",
      amount: "₦ 200,500,000.00",
      creditScore: "812",
      duration: "6 Months",
      revenueGenerated: "₦ 150,000,000,000.00",
      status: "Active",
      imageUrl: "https://bit.ly/dan-abramov",
    },
    {
      name: "Student Loans",
      type: "Education",
      amount: "₦ 50,000,000.00",
      creditScore: "690",
      duration: "12 Months",
      revenueGenerated: "₦ 35,000,000,000.00",
      status: "Repaid",
      imageUrl: "https://bit.ly/dan-abramov",
    },
    {
      name: "Vehicle Loans",
      type: "Auto",
      amount: "₦ 80,000,000.00",
      creditScore: "720",
      duration: "5 Months",
      revenueGenerated: "₦ 60,000,000,000.00",
      status: "Overdue",
      imageUrl: "https://bit.ly/dan-abramov",
    },
    {
      name: "Home Loans",
      type: "Mortgage",
      amount: "₦ 300,000,000.00",
      creditScore: "850",
      duration: "24 Months",
      revenueGenerated: "₦ 270,000,000,000.00",
      status: "Active",
      imageUrl: "https://bit.ly/dan-abramov",
    },
    {
      name: "Startup Loans",
      type: "Business",
      amount: "₦ 500,000,000.00",
      creditScore: "770",
      duration: "18 Months",
      revenueGenerated: "₦ 450,000,000,000.00",
      status: "Inactive",
      imageUrl: "https://bit.ly/dan-abramov",
    },
  ];

  const titleProps = {
    mainTitle: "Loan Products",
    count: "200 Products",
    subtitle: "List of loan product created"
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
            Active
          </button>
        );
      case "Repaid":
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
      case "Inactive":
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
        <div className="flex items-center gap-4 h-full">
          <input type="checkbox" onClick={(e) => e.stopPropagation()} />
          <img
            src={item.imageUrl || "https://bit.ly/dan-abramov"}
            alt={item.name}
            className="w-8 h-8 rounded-full"
          />
          <p className="truncate max-w-[120px]">{item.name}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item.type}</td>
      <td className="truncate max-w-[120px] py-4 px-6">{item.amount}</td>
      <td className="truncate max-w-[35px] py-4 px-6">{item.creditScore}</td>
      <td className="truncate max-w-[110px] py-4 px-6">{item.duration}</td>
      <td className="truncate max-w-[154px] py-4 px-6">{item.revenueGenerated}</td>
      <td className="truncate max-w-[154px] py-4 px-4">
        {renderStatus(item.status)}
      </td>
    </>
  );

  return (
    <LoanProductTable
      headers={loanHeaders}
      data={loanData}
      titleProps={titleProps}
      href="/dashboard/loan-products/performance"
      itemsPerPage={5}
      renderRow={renderRow}
      setStep={setStep}
    />
  );
};