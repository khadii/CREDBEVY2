"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useDashboard } from "@/app/Context/DahboardContext";
import { CSSProperties } from "react";
import { RootState } from "@/app/Redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function ProfileCard({ id }: { id: any }) {
  // Demo user data
  const user = {
    first_name: "John",
    middle_name: "Michael",
    last_name: "Doe",
    date_of_birth: "1990-05-15",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    state: "New York",
    country: "United States",
    gender: "Male",
    selfie_base_image_64: "", // Leave empty to use avatar fallback
  };

  const fullName = `${user.first_name} ${user.middle_name ? user.middle_name + ' ' : ''}${user.last_name}`;
  const creditScore = 750;

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
  const data = userData.map((item) => {

    return {
      ...item,
    };
  });

  return (
    <div
      className={`bg-[#FFFFFF] flex flex-col items-center rounded-lg text-center  h-[1100px]
      } border-[1px]`}
    >
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
      <h2 className="text-2xl font-bold text-[#333333] truncate max-w-72">
        {fullName}
      </h2>

      {/* Buttons */}
      <div className="mt-6 grid justify-center gap-2">
        <div className="w-[83px] h-[23px] rounded-[16px] border border-solid pt-[2px] pr-[8px] pb-[2px] pl-[6px] flex justify-center items-center text-xs font-semibold text-[#42BE65] border-[#BFFFD1]">
          <Image src="/Image/appproveddot.svg" 
           alt="Approved icon" height={8} width={8} className="mr-1" />
          Repaid
        </div>
      </div>

      {/* Credit Score */}
      <p className="mt-[32px] text-[12px] font-bold text-[#8A8B9F]">
        Credit Score
      </p>
      <p className="text-[32px] font-bold text-[#42BE65]">{creditScore}</p>

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
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}