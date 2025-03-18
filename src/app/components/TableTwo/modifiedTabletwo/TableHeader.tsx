import React from "react";

interface TableHeaderProps {
  headers: string[];
  renderHeader?: (isHeaderChecked: boolean, handleHeaderToggle: () => void) => React.ReactNode;
  isHeaderChecked?: boolean;
  handleHeaderToggle?: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers, renderHeader, isHeaderChecked, handleHeaderToggle }) => {
  return (
    <thead className="bg-[#FFFFFF] text-[#8A8B9F] font-bold text-xs border">
      <tr className="h-[44px]">
        {/* First header with checkbox */}
        <th className="py-3 pl-6 truncate">
          <div className="flex items-center gap-4">
            {renderHeader && isHeaderChecked !== undefined && handleHeaderToggle && (
              <>{renderHeader(isHeaderChecked, handleHeaderToggle)}</>
            )}
            <span>{headers[0]}</span>
          </div>
        </th>

        {/* Remaining headers */}
        {headers.slice(1).map((header, index) => (
          <th key={index + 1} className="py-3 px-6 truncate">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;