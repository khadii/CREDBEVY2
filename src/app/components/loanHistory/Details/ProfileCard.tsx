"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDashboard } from "@/app/Context/DahboardContext";
import { CSSProperties } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { fetchSingleLoanRequest } from "@/app/Redux/LoanHistory/singleLoanRequestSlice";
import { GoDotFill } from "react-icons/go";
import NoDataFound from "../../NoDataFound";

interface ProfileCardProps {
  loanUuid: string;
}

interface CreditRating {
  text: string;
  color: string;
}

export default function ProfileCard({ loanUuid }: ProfileCardProps) {
  const { data: loanData, loading, error } = useSelector(
    (state: RootState) => state.historysingleLoanRequest);

      const dispatch = useDispatch<AppDispatch>();

      
    useEffect(() => {
    if (loanUuid) {
      dispatch(fetchSingleLoanRequest(loanUuid));
    }
  }, [dispatch,loanUuid]);

  const formatDateOfBirth = (dateString: string) => {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getCreditRating = (score: any): CreditRating => {
  if (score >= 800) return { text: "Excellent", color: "text-emerald-500" };
  if (score >= 740) return { text: "Very Good", color: "text-emerald-500" };
  if (score >= 670) return { text: "Good", color: "text-emerald-500" };
  if (score >= 580) return { text: "Fair", color: "text-yellow-500" };
  return { text: "Poor", color: "text-red-500" };
};
  const getUserData = () => {
    if (!loanData?.user) return [];
    
    return [
      { label: "Date of Birth", value: formatDateOfBirth(loanData.user.date_of_birth) },
      { label: "Email", value: loanData.user.email || "N/A" },
      { label: "Phone", value: loanData.user.phone || "N/A" },
      { label: "Address", value: loanData.user.address || "N/A" },
      { label: "State", value: loanData.user.state || "N/A" },
      { label: "Country", value: loanData.user.country || "N/A" },
      { label: "Gender", value: loanData.user.gender || "N/A" },
    ];
  };

  

  const userData = getUserData();
  const fullName = loanData?.user ? `${loanData.user.first_name} ${loanData.user.middle_name ? loanData.user.middle_name + ' ' : ''}${loanData.user.last_name}` : "User";
  const credit_score = loanData?.user.credit_score || 0;
  const status = loanData?.request_details.status || "N/A";

  if (loading || !loanData)  {
    return (
      <div className="pt-[34px] bg-white rounded-lg h-[1100px] w-full border-[1px] p-6">
       
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-[#FFFFFF] flex flex-col items-center rounded-lg text-center h-[1100px] border-[1px] justify-center">Error loading profile: {error}</div>;
  }


 const rating: CreditRating = getCreditRating(credit_score);
  return (
    <div className="bg-[#FFFFFF] flex flex-col items-center rounded-lg text-center h-[1100px] border-[1px]">
      {/* Profile Image */}
      <Image
        src={
          loanData.user.selfie_base_image_64 
            ? `data:image/jpeg;base64,${loanData.user.selfie_base_image_64}`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                `${loanData.user.first_name || "U"}${loanData.user.last_name ? `+${loanData.user.last_name}` : ""}`
              )}&background=random`
        }
        alt={`${loanData.user.first_name || "User"}'s avatar`}
        width={96}
        height={96}
        className="w-24 h-24 mx-auto mb-4 mt-[48px] rounded-full object-cover"
        unoptimized={true}
        onError={(e) => {
          e.currentTarget.src =
            "https://ui-avatars.com/api/?name=User&background=random";
        }}
      />
      
      {/* Name */}
      <h2 className="text-2xl font-bold text-[#333333] truncate max-w-72">
        {fullName}
      </h2>

    
      {/* Credit Score */}
      <p className="mt-[32px] text-[12px] font-bold text-[#8A8B9F]">
        Credit Score
      </p>
   <p className={`mt-2 text-[32px] font-bold ${rating.color}`}>
  {credit_score}
</p>


      {/* User Details */}
      <div className="w-full space-y-5 mt-[38px] flex flex-col items-center justify-center px-[23px]">
        {userData.map((item, index) => (
          <div
            key={index}
            className="flex w-full text-[12px] font-medium text-[#8A8B9F] text-left gap-[38px] items-center"
          >
            <div className="w-[73px]">{item.label}:</div>
            <div className="text-left truncate w-[225px] text-pretty break-words">
              <p className={item.label === "Email" ? "break-words" : ""}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}