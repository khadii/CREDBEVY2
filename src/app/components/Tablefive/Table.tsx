import React, { useState } from "react";
import {
  LucideThumbsUp,
  LucideThumbsDown,
  LucideChevronDown,
} from "lucide-react";
import { FaCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Modal from "../Modals/indicateInterest";
import DeclineRequest from "../Modals/DeclineRequest";
import ApproveRequest from "../Modals/Approve Request";
import Pagination from "../TableTwo/Pagination";

interface TableProps {
  headers: string[];
  data: Array<{
    name: string;
    income: string;
    amount: string;
    cs: number;
    ir: string;
    duration: string;
    status?: string;
  }>;
  titleProps: {
    mainTitle: string;
    requestCount: string;
    subtitle: string;
  };
  href: string; // Add href as a prop
}

const Table: React.FC<TableProps> = ({ headers, data, titleProps, href }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenApproveRequest, setIsModalOpenApproveRequest] = useState(false);
  const [isModalOpenDeclineRequest, setIsModalOpenDeclineRequest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  const handleRowClick = (index: number) => {
    router.push(href); // Navigate to the specified href
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Slice the data to display only the rows for the current page
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="rounded-lg mt-3 w-full">
      <ApproveRequest isOpen={isModalOpenApproveRequest} onClose={() => setIsModalOpenApproveRequest(false)} />
      <DeclineRequest isOpen={isModalOpenDeclineRequest} onClose={() => setIsModalOpenDeclineRequest(false)} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setIsModalOpenApproveRequest={() => setIsModalOpenApproveRequest(true)} />
      <div className="flex justify-between items-center pb-6 py-6 px-6 border rounded-lg border-b-0 rounded-b-none">
        <div>
          <div className="grid grid-cols-3 w-full gap-3">
            <h2 className="text-lg font-bold flex items-center col-span-2 text-[#333333]">
              {titleProps.mainTitle}
            </h2>
            <span className="text-xs font-semibold bg-[#FEF1FFAD] items-center border border-[#F1CFF4] justify-center rounded-full col-span-1 text-[#156064] flex">
              {titleProps.requestCount}
            </span>
          </div>
          <p className="text-[#333333] text-sm font-semibold">
            {titleProps.subtitle}
          </p>
        </div>
        <button className="bg-[#24262D] text-white px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-extrabold">
          Bulk Action <LucideChevronDown size={16} />
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-[#FFFFFF] text-[#8A8B9F] font-bold text-xs border">
          <tr className="h-[44px]">
            <th className="pl-[27px] py-3 px-6">
              <div className="flex items-center gap-4 h-full">
                {" "}
                {/* Increased gap */}
                <input type="checkbox" /> Name
              </div>
            </th>
            <th className="py-3 px-6 truncate">Average Income</th>
            <th className="py-3 px-6 truncate">Amount Requested</th>
            <th className="py-3 px-6 truncate">C.S</th>
            <th className="py-3 px-6 truncate">I.R</th>
            <th className="py-3 px-6 truncate">Duration</th>
            <th className="py-3 px-6 truncate">Quick Actions</th>
          </tr>
        </thead>

        <tbody className="text-[#333333] font-semibold text-xs">
          {paginatedData.map((req, index) => (
            <tr
              key={index}
              className="border-t odd:bg-gray-100 even:bg-white h-[72px] cursor-pointer"
            >
              <td className="pl-[27px] py-4 px-6">
                <div className="flex items-center gap-4 h-full">
                  {" "}
                  {/* Increased gap */}
                  <input type="checkbox" />
                  <img
                    src="https://bit.ly/dan-abramov"
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="truncate max-w-[140px]">{req.name}</p>
                </div>
              </td>
              <td
                className="truncate max-w-[120px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.income}
              </td>
              <td
                className="truncate max-w-[120px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.amount}
              </td>
              <td
                className="truncate max-w-[75px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.cs}
              </td>
              <td
                className="truncate max-w-[85px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.ir}
              </td>
              <td
                className="truncate max-w-[110px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.duration}
              </td>
              <td className="truncate max-w-[154px] py-4 px-4">
                {req.status === "Interested" && (
                  <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
                    <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
                    Interested
                  </button>
                )}
                {req.status === "Not Interested" && (
                  <button className="flex items-center gap-2 border border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1] px-2 h-[23px] rounded-full text-xs font-semibold">
                    <FaCircle className="text-[#E33A24] w-2 h-2 mr-1" />
                    Not interested
                  </button>
                )}
                {!req.status && (
                  <div className="flex w-full gap-[27px]">
                    {" "}
                    {/* Increased gap */}
                    <LucideThumbsUp
                      onClick={() => setIsModalOpen(true)}
                      size={24}
                      className="text-[#067647] cursor-pointer"
                    />
                    <LucideThumbsDown
                      onClick={() => setIsModalOpenDeclineRequest(true)}
                      size={24}
                      className="text-[#B42318] cursor-pointer"
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;