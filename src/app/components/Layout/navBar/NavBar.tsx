"use client";

import { fetchCompanyInfo } from "@/app/Redux/company_info/company_info_thunk";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { Bell, LucideSearch } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TopBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.companyInfo
  );

  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  if (loading) {
    return <div className="flex justify-center p-4">fetching company's info.....</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  // Type guard 
  const companyData = data as {
    company_name?: string;
    company_logo?: string;
    partner_contact_email?: string;
  } | null;

  return (
    <div className="flex items-center justify-between h-full min-h-[72px] w-full bg-white px-4 sm:px-6 md:pr-[76px] md:pl-[41px]">
      {/* Search Bar */}
      <div className="hidden sm:flex items-center p-2 rounded-md bg-white w-full max-w-xs">
        <LucideSearch size={16} color="#8A8B9F" />
        <input
          type="search"
          placeholder="What are you looking for?"
          className="ml-2 flex-1 bg-transparent outline-none text-[#A1A6B0] font-semibold text-xs"
        />
      </div>

      {/* Mobile Search Icon */}
      <div className="sm:hidden">
        <LucideSearch size={20} color="#8A8B9F" />
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <Bell className="text-gray-500" size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Divider */}
        <div className="hidden md:block border-l border-[#A1A6B0] h-8"></div>

        {/* Company Profile */}
        <div className="flex items-center space-x-2">
          {companyData?.company_logo ? (
            <img 
              src={companyData.company_logo} 
              alt="Company Logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-500">
                {companyData?.company_name?.charAt(0) || 'C'}
              </span>
            </div>
          )}
          <div className="hidden sm:block">
            <p className="text-[10px] font-semibold text-[#333333]">
              {companyData?.company_name || "Company Name"}
            </p>
            <p className="text-[8px] text-[#A1A6B0]">
              {companyData?.partner_contact_email || "contact@company.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}