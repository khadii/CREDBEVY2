"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import ApproveRequest from "../Modals/ApproveRequest";
import DeclineRequest from "../Modals/DeclineRequest";
import Modal from "../Modals/indicateInterest";
import Modal2 from "../Modals/acceeptInterest";
import Modal3 from "../Modals/DeclineInterest";
import { useEffect, useState } from "react";
import { useDashboard } from "@/app/Context/DahboardContext";
import { CSSProperties } from "react";
import { RootState } from "@/app/Redux/store";
import { useSelector } from "react-redux";
import SpinningFaceExact from "../credbevyLoader";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";

type CreditRating = {
  text: string;
  color: string;
};

const getCreditRating = (score: number): CreditRating => {
  if (score >= 800) return { text: "Excellent", color: "text-emerald-500" };
  if (score >= 740) return { text: "Very Good", color: "text-emerald-500" };
  if (score >= 670) return { text: "Good", color: "text-emerald-500" };
  if (score >= 580) return { text: "Fair", color: "text-yellow-500" };
  return { text: "Poor", color: "text-red-500" };
};

export default function ProfileCard({ id }: { id: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpenApproveRequest, setIsModalOpenApproveRequest] = useState(false);
  const [isModalOpenDeclineRequest, setIsModalOpenDeclineRequest] = useState(false);
  
  const {
    interested,
    setInterested,
    setSelectedIds,
    Request_Details,
    LoanApproved,
    setLoanApproved,
    LoanDeclined,
    setLoanDeclined
  } = useDashboard();

  const { loading: LoanRequest_loading, data: LoanRequest_Data } = useSelector(
    (state: RootState) => state.loanRequest.single_loan_products_request
  );

  // Format date of birth
  const formatDateOfBirth = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Create user data from API response
  const getUserData = () => {
    if (!LoanRequest_Data?.loan?.user) return [];

    const user = LoanRequest_Data.loan.user;
    return [
      { label: "Date of Birth", value: formatDateOfBirth(user.date_of_birth) },
      { label: "Email", value: user.email },
      { label: "Phone", value: user.phone || "N/A" },
      { label: "Address", value: user.address },
      { label: "State", value: user.state },
      { label: "Country", value: user.country },
      { label: "Gender", value: user.gender },
    ];
  };

  const userData = getUserData();
  const data = interested
    ? userData
    : userData.map((item) => {
        // For not interested state, blur all except state and country
        if (item.label === "State" || item.label === "Country") {
          return item;
        }
        return {
          ...item,
          value: "Confidential",
        };
      });

  // Define blurStyles with explicit CSSProperties type
  const blurStyles: CSSProperties = {
    filter: "blur(4px)",
    userSelect: "none",
    pointerEvents: "none",
  };

  const user = LoanRequest_Data?.loan?.user;
  const fullName = `${user?.first_name} ${
    user?.middle_name ? user?.middle_name + " " : ""
  }${user?.last_name}`;
  const creditScore = user?.credit_score || 660;

  useEffect(() => {
    if (LoanRequest_Data?.loan?.request_details) {
      setLoanApproved(LoanRequest_Data?.loan?.request_details.approval_status === "APPROVED");
    }
    if (LoanRequest_Data?.loan?.request_details) {
      setLoanDeclined(LoanRequest_Data?.loan?.request_details.approval_status === "DECLINED");
    }
  }, [LoanRequest_Data?.loan?.request_details.status, LoanRequest_Data, setLoanApproved, setLoanDeclined]);

  return (
    <div
      className={`bg-[#FFFFFF] flex flex-col items-center rounded-lg text-center ${
        interested ? "h-[1100px]" : "h-[1100px]"
      } border-[1px]`}
    >
      <ApproveRequest
        isOpen={isModalOpenApproveRequest}
        onClose={() => setIsModalOpenApproveRequest(false)}
      />
      <DeclineRequest
        isOpen={isModalOpenDeclineRequest}
        onClose={() => setIsModalOpenDeclineRequest(false)}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Modal2
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
      />
      <Modal3
        isOpen={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
      />
      
      {/* Profile Image */}
      <Image
        src={
          user?.selfie_base_image_64 ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${user?.first_name || "U"}${
              user?.middle_name ? `+${user.middle_name}` : ""
            }`
          )}&background=random`
        }
        alt={`${user?.first_name || "User"}'s avatar`}
        width={96}
        height={96}
        className="w-24 h-24 mx-auto mb-4 mt-[48px] rounded-full"
        unoptimized={true}
        onError={(e) => {
          e.currentTarget.src =
            "https://ui-avatars.com/api/?name=User&background=random";
        }}
      />
      
      {/* Name */}
 <h2 className="text-2xl font-semibold text-[#333333] max-w-72 break-words">
  {fullName}
</h2>

      {/* Buttons */}
      <div className="mt-6 grid justify-center gap-2">
         {LoanApproved ? (
          <div className="w-[83px] h-[23px] rounded-[16px] border border-solid pt-[2px] pr-[8px] pb-[2px] pl-[6px] flex justify-center items-center text-xs font-semibold text-[#42BE65] border-[#BFFFD1]">
            <Image src="/Image/appproveddot.svg"
              alt="Approved icon" height={8} width={8} className="mr-1" />
            Approved
          </div>
        ): 
        LoanDeclined?( <div className="w-[83px] h-[23px] rounded-[16px] border border-solid pt-[2px] pr-[8px] pb-[2px] pl-[6px] flex justify-center items-center text-xs font-semibold text-[#E33A24] border-[#FFBAB1]">
          <GoDotFill size={24} className="mr-1" />
          Declined
        </div>) :
         (
          interested ? (
            <>
              <div>
                <button
                  className="flex items-center px-[41px] w-full gap-2 h-[36px] bg-[#42BE65] text-white rounded-[4px]"
                  onClick={() => {
                    setIsModalOpen2(true);
                    setSelectedIds(id);
                  }}
                >
                  <div>
                    <FaRegCheckCircle size={18} />
                  </div>
                  <p className="text-[12px] font-semibold flex-1">
                    Accept Request
                  </p>
                </button>
              </div>
              <div>
                <button
                  className="flex items-center px-[41px] w-full gap-2 h-[36px] bg-[#FA4D56] text-white rounded-[4px]"
                  onClick={() => {
                    setIsModalOpen3(true);
                    setSelectedIds(id);
                  }}
                >
                  <div>
                    <FaRegTimesCircle size={18} />
                  </div>
                  <p className="text-[12px] font-semibold flex-1">
                    Decline Request
                  </p>
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  className="flex items-center px-[41px] w-full gap-2 h-[36px] bg-[#42BE65] text-white rounded-[4px]"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedIds(id);
                  }}
                >
                  <div>
                    <ThumbsUp size={18} />
                  </div>
                  <p className="text-[12px] font-semibold flex-1">Interested</p>
                </button>
              </div>
              <div>
                <button
                  className="flex items-center px-[41px] w-full gap-2 h-[36px] bg-[#FA4D56] text-white rounded-[4px]"
                  onClick={() => {
                    setIsModalOpenDeclineRequest(true);
                    setSelectedIds(id);
                  }}
                >
                  <div>
                    <ThumbsDown size={18} />
                  </div>
                  <p className="text-[12px] font-semibold flex-1">Not Interested</p>
                </button>
              </div>
            </>
          )
        )}
      </div>

      {/* Credit Score */}
      <p className="mt-[32px] text-[12px] font-bold text-[#8A8B9F]">
        Credit Score
      </p>
      <div className="flex flex-col items-center">
        <p className={`text-[32px] font-bold ${getCreditRating(creditScore).color}`}>
          {creditScore}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {getCreditRating(creditScore).text}
        </p>
      </div>

      {/* User Details */}
      <div className="w-full space-y-5 mt-[38px] flex flex-col items-center justify-center px-[23px]">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex w-full text-[12px] font-medium text-[#8A8B9F] text-left gap-[38px] items-center"
          >
            <div className="w-[73px]">{item.label}:</div>
            <div className="text-left truncate w-[225px] text-pretty break-words">
              <p className={item.label === "Email" ? "break-words" : ""}>
                {interested ? (
                  item.value
                ) : (
                  <>
                    {item.label === "State" || item.label === "Country" ? (
                      <span>{item.value}</span>
                    ) : (
                      <span style={blurStyles}>{item.value}</span>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}