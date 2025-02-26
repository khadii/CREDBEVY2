import React from "react";

interface TableRowProps<T> {
  item: T;
  index: number;
  onClick: () => void;
  renderRow: (item: T, index: number) => React.ReactNode;
}

const TableRow = <T,>({ item, index, onClick, renderRow }: TableRowProps<T>) => {
  return (
    <tr
      className="border-t odd:bg-gray-100 even:bg-white h-[72px] cursor-pointer"
      onClick={onClick}
    >
      {renderRow(item, index)}
    </tr>
  );
};

export default TableRow;