import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LucideChevronDown, ChevronLeft, ChevronRight, Check, LucideThumbsUp, LucideThumbsDown } from "lucide-react";
import { FaCircle } from "react-icons/fa";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";
import { useDashboard } from "@/app/Context/DahboardContext";
import TableWithPagination from "../table/tablewWthPagination";
import ApproveRequest from "../Modals/ApproveRequest";
import DeclineRequest from "../Modals/DeclineRequest";
import Modal from "../Modals/indicateInterest";
import TableWithOutPagination from "../table/tableWithOutPagination";
import { formatToNaira } from "@/app/lib/Naira";

// Add this CSS to your global styles or component
const responsiveStyles = `
  @media (max-width: 768px) {
    .loan-request-container {
      padding: 0.5rem;
    }
    .loan-request-table {
      overflow-x: auto;
      display: block;
    }
    .loan-request-table table {
      min-width: 600px;
    }
    .loan-request-actions {
      flex-direction: column;
      gap: 0.5rem;
    }
    .loan-request-name {
      min-width: 120px;
    }
    .loan-request-quick-actions {
      min-width: 100px;
    }
  }
`;

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
  id: string; 
  first_name: string;
  last_name:String
  average_income: string;
  amount_requested: string;
  credit_score: string;
  interest_rate:string
  loan_duration: string;
  image?: string; 
  loan_uuid: string; 
  info_status:any
}

export const LoanRequest= ({ bulkAction, laon_table_data_all, total_count }: { laon_table_data_all: any, total_count: any,  bulkAction:any }) => {
  const loanHeaders = [
    "Name",
    "Average Income",
    "Amount Requested",
    "C.S",
    "I.R",
    "Duration",
    "Quick Actions"
  ];

  const titleProps = {
    mainTitle: "All Loan request",
    count: total_count + " request",
    subtitle: "All loan request made "
  };
 
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const { selectedIds, setSelectedIds } = useDashboard();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenApproveRequest, setIsModalOpenApproveRequest] = useState(false);
  const [isModalOpenDeclineRequest, setIsModalOpenDeclineRequest] = useState(false);

  useEffect(() => {
    if (laon_table_data_all && laon_table_data_all.length > 0) {
      setSelectedIds([]);
    }
  }, [laon_table_data_all]);

  useEffect(() => {
    if (selectedIds.length === laon_table_data_all?.length) {
      setIsHeaderChecked(true);
    } else {
      setIsHeaderChecked(false);
    }
  }, [selectedIds, laon_table_data_all]);


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
      const allloan_uuids = laon_table_data_all.map((item: LoanData) => item.loan_uuid);
      setSelectedIds(allloan_uuids);
    } else {
      setSelectedIds([]);
    }
  };

  const renderHeader = (isHeaderChecked: boolean, handleHeaderToggle: () => void) => (
    <CustomCheckbox id={-1} checked={isHeaderChecked} onChange={handleHeaderToggle} />
  );

  const renderRow = useCallback((item: LoanData, index: number) => (
    <>
      <td className="pl-[27px] py-4 px-6 loan-request-name">
        <div className="flex items-center gap-4 h-full" >
        <div onClick={(e) => e.stopPropagation()}>
            <CustomCheckbox
            id={item.loan_uuid}
            checked={selectedIds?.includes(item.loan_uuid)}
            onChange={() => handleToggle(item.loan_uuid)}
          />
        </div>
          {item.image && (
            <img
              src={item.image} 
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          )}
          <p className="truncate max-w-[140px]">{`${item.first_name} ${item.last_name}`}</p>
        </div>
      </td>
      <td className="truncate max-w-[120px] py-4 px-6">
        {formatToNaira(item.average_income)}
      </td>
      <td className="truncate max-w-[120px] py-4 px-6">
        {formatToNaira(item.amount_requested)}
      </td>
      <td className="truncate max-w-[75px] py-4 px-6">
        {item.credit_score}
      </td>
      <td className="truncate max-w-[85px] py-4 px-6">
        {item.interest_rate}
      </td>
      <td className="truncate max-w-[110px] py-4 px-6">
        {item.loan_duration}
      </td>
      <td className="truncate max-w-[154px] py-4 px-6 loan-request-quick-actions" onClick={(e) => e.stopPropagation()}>
        {item.info_status === "INTERESTED" && (
          <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
            <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
            Interested
          </button>
        )}
        {item.info_status === "NOT_INTERESTED" && (
                    <button className="flex items-center border   border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1] px-2 h-[23px] rounded-full text-xs font-semibold">
          {/* <div className="flex items-center gap-2 border border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1] px-2 h-[23px] rounded-full text-xs font-semibold"> */}
            <FaCircle className="text-[#E33A24] w-2 h-2 mr-1" />
            Not interested
          </button>
        )}
        {!item.info_status && (
          <div className="flex w-full gap-[27px] loan-request-actions">
            <LucideThumbsUp
              onClick={() =>{ setIsModalOpen(true); setSelectedIds(item.loan_uuid)}}
              size={24}
              className="text-[#067647] cursor-pointer"
            />
            <LucideThumbsDown
              onClick={() => {setIsModalOpenDeclineRequest(true); setSelectedIds(item.loan_uuid)}}
              size={24}
              className="text-[#B42318] cursor-pointer"
            />
          </div>
        )}
      </td>
    </>
  ), [isModalOpenApproveRequest, isModalOpenDeclineRequest, isModalOpen, selectedIds, handleToggle]);

  return (
    <>
      {/* <style>{responsiveStyles}</style> */}
      <div className="loan-request-container">
        <TableWithOutPagination
          headers={loanHeaders}
          data={laon_table_data_all}
          titleProps={titleProps}
          href="/dashboard/loan-request/details"
          renderRow={renderRow}
          renderHeader={renderHeader}
          isHeaderChecked={isHeaderChecked}
          handleHeaderToggle={handleHeaderToggle}
          showAddProductButton={false}
          bulkAction={bulkAction}
          // className="loan-request-table"
        />
        <ApproveRequest
          isOpen={isModalOpenApproveRequest}
          onClose={() => setIsModalOpenApproveRequest(false)}
        />
        <DeclineRequest
          isOpen={isModalOpenDeclineRequest}
          onClose={() => setIsModalOpenDeclineRequest(false)}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};