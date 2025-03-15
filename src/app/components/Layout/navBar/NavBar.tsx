"use client";

import { Search, Bell, LucideSearch } from "lucide-react";

export default function TopBar() {
  const userimg = "/Image/Ellipse.svg";
  
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

        {/* Divider - Hidden on small screens */}
        <div className="hidden md:block border-l border-[#A1A6B0] h-8"></div>

        {/* Profile - Condensed on small screens */}
        <div className="flex items-center space-x-2">
          <img
            src={userimg}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden sm:block">
            <p className="text-[10px] font-semibold text-[#333333]">Company Name</p>
            <p className="text-[8px] text-[#A1A6B0]">Companyname@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}