import React, { useState, useEffect } from "react";
import {
  LucideThumbsUp,
  LucideThumbsDown,
  LucideChevronDown,
  Check,
} from "lucide-react"; 
import { FaCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Modal from "../Modals/indicateInterest";
import DeclineRequest from "../Modals/DeclineRequest";
import ApproveRequest from "../Modals/ApproveRequest";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";


interface TableProps {
  headers: string[];
  data: Array<{
    first_name?: string;
    last_name?: string;
    average_income?: string;
    amount_requested?: string;
    credit_score?: number;
    interest_rate?: string;
    loan_duration?: string;
    info_status?: string;
    image?: string; // Add image property
    
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
  const [toggleStates, setToggleStates] = useState<boolean[]>([]); 

  
  useEffect(() => {
    if (data && data.length > 0) {
      setToggleStates(data.map(() => false)); 
    }
  }, [data]);

  const handleRowClick = (index: number) => {
    router.push(href); 
  };

  // Handle individual checkbox toggle
  const handleToggle = (index: number) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);

    // Update header checkbox state if all checkboxes are checked or unchecked
    const allChecked = newToggleStates.every((state) => state);
    const allUnchecked = newToggleStates.every((state) => !state);
    if (allChecked) {
      setIsHeaderChecked(true);
    } else if (allUnchecked) {
      setIsHeaderChecked(false);
    }
  };

  // Handle header checkbox toggle
  const [isHeaderChecked, setIsHeaderChecked] = useState(false); 
  const handleHeaderToggle = () => {
    const newHeaderState = !isHeaderChecked;
    setIsHeaderChecked(newHeaderState);

    // Update all individual checkboxes to match the header checkbox state
    const newToggleStates = data.map(() => newHeaderState);
    setToggleStates(newToggleStates);
  };

  
  return (
    <div className="rounded-lg mt-3 w-full">
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
        setIsModalOpenApproveRequest={() => setIsModalOpenApproveRequest(true)}
      />
      <div className="flex justify-between items-center pb-6 py-6 px-6 border rounded-lg border-b-0 rounded-b-none bg-white">
        <div>
          <div className="grid grid-cols-3 w-full gap-3 bg-white">
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
                <CustomCheckbox
                  id={-1} // Use a unique ID for the header checkbox
                  checked={isHeaderChecked}
                  onChange={() => handleHeaderToggle()}
                />
                Name
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
          {data?.map((req, index) => (
            <tr
              key={index}
              className="border-t odd:bg-gray-100 even:bg-white h-[72px] cursor-pointer"
            >
              <td className="pl-[27px] py-4 px-6">
                <div className="flex items-center gap-4 h-full" onClick={(e) => e.stopPropagation()}>
                  <CustomCheckbox
                    id={index}
                    checked={toggleStates[index] ?? false}
                    onChange={() => handleToggle(index)}
                  />
                  <img
                    src={req.image} // Use the image property from the data array
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="truncate max-w-[140px]">{`${req.first_name} ${req.last_name}`}</p>
                </div>
              </td>
              <td
                className="truncate max-w-[120px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.average_income}
              </td>
              <td
                className="truncate max-w-[120px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.amount_requested}
              </td>
              <td
                className="truncate max-w-[75px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.credit_score}
              </td>
              <td
                className="truncate max-w-[85px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.interest_rate}
              </td>
              <td
                className="truncate max-w-[110px] py-4 px-6"
                onClick={() => handleRowClick(index)}
              >
                {req.loan_duration}
              </td>
              <td className="truncate max-w-[154px] py-4 px-4">
                {req.info_status !== "NOT_INTERESTED" && (
                  <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
                    <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
                    Interested
                  </button>
                )}
                {req.info_status === "NOT_INTERESTED" && (
                  <button className="flex items-center gap-2 border border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1] px-2 h-[23px] rounded-full text-xs font-semibold">
                    <FaCircle className="text-[#E33A24] w-2 h-2 mr-1" />
                    Not interested
                  </button>
                )}
                {!req.info_status && (
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

      <div className="flex justify-between items-center pb-6 py-2 px-6 border rounded-lg border-t-0 rounded-t-none"></div>
    </div>
  );
};

export default Table;




