"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, LucideSearch } from "lucide-react";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { fetchUserData } from "@/app/Redux/auth/userdata";
import { HiOutlineLogout } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { useDashboard } from "@/app/Context/DahboardContext";

export default function TopBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector((state: RootState) => state.user);
  const user = data?.data;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch user data only once when component mounts
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);
  const { logout,setLogout } = useDashboard();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  // Memoize user avatar URL to prevent unnecessary regenerations
  const userAvatarUrl = useMemo(() => {
    const firstName = user?.first_name || 'U';
    const lastName = user?.last_name || 's';
    return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
  }, [user]);

  if (loading && !user) {
    return <div className="flex justify-center p-4">Loading user data...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex  relative items-center justify-between h-full min-h-[72px] w-full bg-white px-4 sm:px-6 md:pr-[76px] md:pl-[41px]">
      {/* Search Bar */}
      <div className="hidden sm:flex items-center p-2 rounded-md bg-white w-full max-w-xs">
        <LucideSearch size={16} color="#8A8B9F" />
        <input
          type="search"
          placeholder="What are you looking for?"
          className="ml-2 flex-1 bg-transparent outline-none text-[#A1A6B0] font-semibold text-xs"
          aria-label="Search input"
        />
      </div>

      {/* Mobile Search Icon */}
      <div className="sm:hidden">
        <LucideSearch size={20} color="#8A8B9F" aria-label="Mobile search" />
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Notification Icon */}
        <button className="relative focus:outline-none" aria-label="Notifications">
          <Bell className="text-gray-500" size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="hidden md:block border-l border-[#A1A6B0] h-8" aria-hidden="true"></div>

        {/* User Profile */}
        <div className=" flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={userAvatarUrl}
              alt={user ? `${user.first_name} ${user.last_name}` : "User avatar"}
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />

            <div className="hidden sm:block">
              <p className="text-[10px] font-semibold text-[#333333]">
                {user ? `${user.first_name} ${user.last_name}` : "User Name"}
              </p>
              <p className="text-[8px] text-[#A1A6B0]">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-2 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-200 flex items-center">
                    <img
              src={userAvatarUrl}
              alt={user ? `${user.first_name} ${user.last_name}` : "User avatar"}
              className="w-8 h-8 rounded-full mr-2"
              width={32}
              height={32}
            />
             <div>   <p className="text-[10px] font-bold text-[#333333] ">
                  {user ? `${user.first_name} ${user.last_name}` : "User Name"}
                </p>
                <p className="text-[8px] font-semibold text-[#A1A6B0] truncate">
                  {user?.email || "user@example.com"}
                </p></div>
              </div>
              <a
                href="#"
                className="flex font-semibold px-4 py-2 text-sm text-[#8A8B9F] hover:bg-gray-100 items-center"
              >
              <Bell size={24} className="text-[#8A8B9F] mr-2" />    Notification
              </a>
              <a
                href="/dashboard/settings"
                className=" font-semibold px-4 py-2 text-sm text-[#8A8B9F] hover:bg-gray-100 flex items-center"
              >
               <LuSettings size={24} className="text-[#8A8B9F] mr-2" /> Settings
              </a>
              <a
               onClick={()=>setLogout(true)}
                className=" font-semibold px-4 py-2 text-sm text-[#FA4D56] hover:bg-gray-100 flex items-center"
              >
               <TbLogout2 size={24}  className="text-[#FA4D56] mr-2"/> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}