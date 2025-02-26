import React from "react";

interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead className="bg-[#FFFFFF] text-[#8A8B9F] font-bold text-xs border">
      <tr className="h-[44px]">
        {headers.map((header, index) => (
          <th key={index} className="py-3 px-6 truncate">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;