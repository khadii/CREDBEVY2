"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDashboard } from "@/app/Context/DahboardContext";
import { CSSProperties } from "react";
import { RootState } from "@/app/Redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function ProfileCardCustomrs({ id }: { id: any }) {
  // Mock data from the image
  const user = {
    firstname: "Oripeloye",
    lastname: "Timilehin",
    date_of_birth: "Dec, 16, 199X",
    email: "Timilehinoripeloye@gmail.com",
    phone: "+2349055380387",
    address: "10, Lawani Street, Abule Oja, Yaba, Lagos",
    state: "Lagos State",
    country: "Nigeria",
    gender: "Male",
    status: "Active",
    credit_score: 660
  };

  const fullName = `${user.firstname} ${user.lastname}`;
  const credit_score = user.credit_score || 0;

  // Format date of birth (modified to handle the existing format)
  const formatDateOfBirth = (dateString: string) => {
    if (!dateString) return "N/A";
    return dateString; // Return as-is since it's already formatted
  };

  // Create user data from API response
  const getUserData = () => {
    return [
      { label: "Date of Birth", value: formatDateOfBirth(user.date_of_birth) },
      { label: "Email", value: user.email || "N/A" },
      { label: "Phone", value: user.phone || "N/A" },
      { label: "Address", value: user.address || "N/A" },
      { label: "State", value: user.state || "N/A" },
      { label: "Country", value: user.country || "N/A" },
      { label: "Gender", value: user.gender || "N/A" },
      { label: "Status", value: user.status || "N/A" },
    ];
  };

  const userData = getUserData();

  return (
    <div className="bg-[#FFFFFF] flex flex-col items-center rounded-lg text-center h-[1100px] border-[1px]">
      {/* Profile Image */}
      <Image
        src={
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${user?.firstname || "U"}${user?.lastname ? `+${user.lastname}` : ""}`
          )}&background=random`
        }
        alt={`${user?.firstname || "User"}'s avatar`}
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
      <h2 className="text-2xl font-bold text-[#333333] truncate max-w-72">
        {fullName}
      </h2>

      {/* Buttons */}
      <div className="mt-6 grid justify-center gap-2">
        <div className="w-[83px] h-[23px] rounded-[16px] border border-solid pt-[2px] pr-[8px] pb-[2px] pl-[6px] flex justify-center items-center text-xs font-semibold text-[#42BE65] border-[#BFFFD1]">
          <Image 
            src="/Image/appproveddot.svg" 
            alt="Approved icon" 
            height={8} 
            width={8} 
            className="mr-1" 
          />
          Repaid
        </div>
      </div>

      {/* Credit Score */}
      <p className="mt-[32px] text-[12px] font-bold text-[#8A8B9F]">
        Credit Score
      </p>
      <p className="text-[32px] font-bold text-[#42BE65]">{credit_score}</p>

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