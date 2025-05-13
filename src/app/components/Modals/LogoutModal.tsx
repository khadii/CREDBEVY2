"use client";

import { X } from "lucide-react";
import React from "react";
import CustomizedButton, { CustomizedButton2 } from "../CustomizedButton";
import { useDispatch } from "react-redux";

import { logout } from "@/app/Redux/auth/authSlice";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  onClose: () => void;
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
   onClose()
    router.push("/");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]"
      role="dialog"
    >
      <div className="bg-white px-[28px] pt-[24px] pb-[37px] max-w-2xl rounded-[8px]">
        <div className="w-full flex justify-between pb-24 items-center">
          <p className="text-[24px] text-[#333333] font-semibold">Log Out</p>
          <button
            onClick={onClose}
            className="text-[#333333] px-2 rounded-[4px] border font-bold text-xs hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <img src="/logout.svg" className="mb-[40px]" alt="Logout" />
          <p className="text-2xl text-[#333333] font-semibold mb-[16px]">
            Are you sure you want to Log out?
          </p>
          <h1 className="font-semibold text-[#8A8B9F] text-sm mb-32">
            Logging out takes you out of the app
          </h1>
        </div>
        <div className="flex justify-between gap-4">
          <CustomizedButton2
            text={"Cancel"}
            className="bg-white border border-[#333333] text-[#333333] hover:bg-gray-50"
            onClick={onClose}
          />
          <CustomizedButton2
            text={"Proceed"}
            className="bg-[#E33A24] text-white hover:bg-[#c93420]"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}
