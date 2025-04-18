"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, LucideSearch } from "lucide-react";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { fetchUserData } from "@/app/Redux/auth/userdata";


export default function TopBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector((state: RootState) => state.user);
  const user = data?.data;

  // Fetch user data only once when component mounts
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

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
    <div className="flex items-center justify-between h-full min-h-[72px] w-full bg-white px-4 sm:px-6 md:pr-[76px] md:pl-[41px]">
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
        <div className="flex items-center space-x-2">
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
        </div>
      </div>
    </div>
  );
}