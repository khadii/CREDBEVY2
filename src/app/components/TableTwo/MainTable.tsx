import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LucideChevronDown, Plus } from "lucide-react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

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
  setStep:any;
  renderRow: (item: T, index: number) => React.ReactNode;
}

const GenericTable = <T,>({
  headers,
  data,
  titleProps,
  href,
  itemsPerPage,
  setStep,
  renderRow,
}: TableProps<T>) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleRowClick = (index: number) => {
    router.push(`${href}/${index}`);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="rounded-lg mt-3 w-full">
      <div className="flex justify-between items-center pb-6 py-6 px-6 border rounded-lg border-b-0 rounded-b-none">
          <div>
                <div className="flex items-center w-full gap-3">
                  <h2 className="text-lg font-bold flex items-center col-span-2 text-[#333333]">
                    {titleProps.mainTitle}
                  </h2>
                  <span className="text-xs px-2 py-[2px] font-semibold bg-[#FEF1FFAD] items-center border border-[#F1CFF4] justify-center rounded-full col-span-1 text-[#156064] flex">
                  {titleProps.count}
                  </span>
                </div>
                <p className="text-[#333333] text-sm font-semibold">
                  {titleProps.subtitle}
                </p>
              </div>
          <div className="flex gap-[12px]">
          <button className="bg-[#156064] text-white px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-extrabold" onClick={()=>setStep(2)}>
           <Plus size={16}  /> Add Product
        </button>
          <button className="bg-[#24262D] text-white px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-extrabold">
          Bulk Action <LucideChevronDown size={16} /> 
        </button>
      
          </div>
      </div>

      <table className="w-full text-left">
        <TableHeader headers={headers} />
        <tbody className="text-[#333333] font-semibold text-xs">
          {currentData.map((item, index) => (
            <TableRow
              key={index}
              item={item}
              index={index}
              onClick={() => handleRowClick(index)}
              renderRow={renderRow}
            />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default GenericTable;