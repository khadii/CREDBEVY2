import { useDashboard } from '@/app/Context/DahboardContext';
import React, { useEffect, useState } from 'react';
import TableWithPagination from '../table/tablewWthPagination';
import { CustomCheckbox } from '../CheckboxForTable/TablecheckBox';
import { StatusWithOptions } from './StatusWithOptions';
import { formatCurrency } from '@/app/lib/utillity/formatCurrency';


interface StatusWithOptionsProps {
  status: string;
  uuid: string;
  activeDropdown: string | null;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}


interface FinancialTableProps {
  laon_table_data_all: any[];
  titleProps?: any;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  bulkAction?: any;
}

const FinancialTable: React.FC<FinancialTableProps> = ({
  laon_table_data_all = [],
  // titleProps,
  currentPage,
  totalPages,
  setCurrentPage,
  bulkAction
}) => {
  const loanHeaders = [
    "Payee",
    "Type",
    "Amount",
    "Transactions ID",
    "Date",
    "Method",
    "Status",
  ];

  const titleProps = {
    mainTitle: "Transaction History",
    count: 90 + "transactions",
    subtitle: "List of transactions processed",
  };

  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const { selectedIds, setSelectedIds } = useDashboard();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (laon_table_data_all && laon_table_data_all.length > 0) {
      setSelectedIds([]);
    }
  }, [laon_table_data_all, setSelectedIds]);

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
    if (selectedIds.length === laon_table_data_all.length && laon_table_data_all.length > 0) {
      setIsHeaderChecked(true);
    } else {
      setIsHeaderChecked(false);
    }
  }, [selectedIds, laon_table_data_all]);

  const handleToggle = (id: string) => {
    setSelectedIds((prevSelectedIds: string[]) => {
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
      const allUuids = laon_table_data_all.map((item: any) => item.transaction_reference);
      setSelectedIds(allUuids);
    } else {
      setSelectedIds([]);
    }
  };

  const renderHeader = () => (
    <CustomCheckbox
      id={-1}
      checked={isHeaderChecked}
      onChange={handleHeaderToggle}
    />
  );

  const renderStatus = (status: string, transaction_reference: string) => (
    <StatusWithOptions 
      status={status} 
      uuid={transaction_reference} 
      activeDropdown={activeDropdown} 
      setActiveDropdown={setActiveDropdown} 
    />
  );

  const renderRow = (item: any, index: number) => (
    <>
      <td className="pl-[27px] py-4 px-6">
        <div
          className="flex items-center gap-4 h-full"
        
        >
          <div   onClick={(e) => e.stopPropagation()}>
            <CustomCheckbox
            id={item.transaction_reference}
            checked={selectedIds.includes(item?.transaction_reference)}
            onChange={() => handleToggle(item?.transaction_reference)}
          />
          </div>
          
          <p className="truncate max-w-[120px]">{item?.account_name}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item?.transaction_type}</td>
      <td className="truncate max-w-[120px] py-4 px-6">
        {formatCurrency(item.amount)}
      </td>
      <td className="truncate max-w-[35px] py-4 px-6">
        {item?.transaction_reference}
      </td>
      <td className="truncate max-w-[110px] py-4 px-6">{item.transaction_date}</td>
      <td className="truncate max-w-[154px] py-4 px-6">
        {item?.transaction_type}
      </td>
      <td className="truncate max-w-[154px] py-4 px-4">
        {renderStatus(item.verified, item.transaction_reference)}
      </td>
    </>
  );

  return (
    <div>
      <TableWithPagination
        headers={loanHeaders}
        data={laon_table_data_all}
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
        showAddProductButton = {false}
      />
    </div>
  );
};

export default FinancialTable;