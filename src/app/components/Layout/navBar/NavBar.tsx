"use client";

import { Search, Bell, LucideSearch } from "lucide-react";

export default function TopBar() {
    const userimg = "/Image/Ellipse.svg";
    const search = "/Image/search.svg";
  return (
    <div className="flex items-center justify-between h-full min-h-[72px] w-full  bg-white  pr-[76px] pl-[41px]">
      {/* Search Bar */}
      <div className="flex items-center ">
    <div>
     <LucideSearch size={16} color="#8A8B9F" />
    </div>
        <input
          type="search"
          placeholder="What are you looking for?"
          className="ml-2 flex-1 bg-transparent outline-none text-[#A1A6B0] font-semibold text-xs"
        />
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center space-x-4 w-full justify-end">
        {/* Notification Icon */}
        <div className="relative">
          <Bell className="text-gray-500" size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile */}
       <div className="flex space-x-4">
       <p className="border border-l-[1px] border-[#A1A6B0]">

</p>

       <div className="flex items-center space-x-2">
          <img
            src={userimg}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-[10px] font-semibold text-[#333333]">Company Name</p>
            <p className="text-[8px] text-[#A1A6B0]">Companyname@gmail.com</p>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
}
