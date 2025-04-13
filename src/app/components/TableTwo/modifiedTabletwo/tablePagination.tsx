import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
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

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to determine which page numbers to show
  const getPageNumbers = () => {
    // For small number of pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // For larger number of pages, use ellipsis
    let pages = [];
    
    // Always include first page
    pages.push(1);
    
    // Logic for middle pages
    if (currentPage <= 3) {
      pages.push(2, 3, 4, '...');
    } else if (currentPage >= totalPages - 2) {
      pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
    }
    
    // Always include last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center border-t border py-4 px-2 sm:px-6 rounded-lg rounded-t-none">
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          className="p-1 sm:ml-2"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft
            size={18}
            className={currentPage === 1 ? "text-gray-300" : "text-gray-600 hover:text-gray-900"}
          />
        </button>

        <div className="hidden sm:flex items-center">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                className={`mx-1 ${
                  currentPage === page
                    ? "bg-gray-200 text-gray-900 w-8 h-8 flex items-center justify-center rounded"
                    : "text-gray-500 w-8 h-8 flex items-center justify-center hover:text-gray-900"
                }`}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="mx-1 text-gray-500">...</span>
            )
          ))}
        </div>

        {/* Mobile view just shows current page / total */}
        <div className="flex sm:hidden items-center">
          <span className="text-sm text-gray-500">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          className="p-1 sm:mr-2"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight
            size={18}
            className={
              currentPage === totalPages ? "text-gray-300" : "text-gray-600 hover:text-gray-900"
            }
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;