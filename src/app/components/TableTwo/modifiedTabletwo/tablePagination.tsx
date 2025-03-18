import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage:any

}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage
 
}) => {
  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
    setCurrentPage(page)
   
  };

  return (
    <div className="flex justify-center items-center border-t-[1px] py-[20px] px-6 border rounded-lg rounded-t-none">
      <div className="flex items-center gap-2">
        <button
          className="ml-[10px]"
          onClick={() => Math.max(1, setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft
            size={18}
            className={currentPage === 1 ? "text-gray-300" : "text-gray-600"}
          />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`ml-[10px] ${
              currentPage === page
                ? "bg-[#DADADA66] text-[#333333] w-8 h-8 flex items-center justify-center rounded"
                : "text-[#8A8B9F]"
            }`}
            onClick={() => handlePageChange(page) }
          >
            {page}
          </button>
        ))}

        <button
          className="ml-[10px]"
          onClick={() => Math.min(totalPages, setCurrentPage(currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight
            size={18}
            className={
              currentPage === totalPages ? "text-gray-300" : "text-gray-600"
            }
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;