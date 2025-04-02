import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Add this CSS to your global styles or component
const paginationStyles = `
  @media (max-width: 768px) {
    .pagination-container {
      padding: 0.5rem;
    }
    .pagination-buttons {
      flex-wrap: wrap;
      gap: 0.25rem;
      justify-content: center;
    }
    .page-button {
      min-width: 32px;
      height: 32px;
      margin: 0 2px;
    }
    .pagination-nav-buttons {
      margin: 0 4px;
    }
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: any;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
  };

  // Limit the number of visible page buttons on mobile
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);
    
    if (currentPage <= 2) {
      end = 3;
    } else if (currentPage >= totalPages - 1) {
      start = totalPages - 2;
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (start > 1) pages.unshift(1, '...');
    if (end < totalPages) pages.push('...', totalPages);
    
    return pages;
  };

  return (
    <>
      <style>{paginationStyles}</style>
      <div className="pagination-container flex justify-center items-center border-t-[1px] py-[20px] px-6 border rounded-lg rounded-t-none w-full ">
        <div className="pagination-buttons flex items-center gap-2">
          <button
            className="pagination-nav-buttons ml-[10px]"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft
              size={18}
              className={currentPage === 1 ? "text-gray-300" : "text-gray-600"}
            />
          </button>

          {getVisiblePages().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="mx-1">...</span>
            ) : (
              <button
                key={page}
                className={`page-button ml-[10px] ${
                  currentPage === page
                    ? "bg-[#DADADA66] text-[#333333] w-8 h-8 flex items-center justify-center rounded"
                    : "text-[#8A8B9F]"
                }`}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </button>
            )
          ))}

          <button
            className="pagination-nav-buttons ml-[10px]"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
    </>
  );
};

export default Pagination;