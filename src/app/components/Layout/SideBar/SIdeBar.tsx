"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const logo2 = "/Image/LOGO2.svg";
  const line = "/Image/Line.svg";

  return (
    <div className="flex flex-col bg-[#24262D] text-white sticky top-0 pb-6 md:min-w-64 w-full">
      {" "}
      {/* Set a fixed width */}
      <div className="w-full flex justify-center pt-12 ">
        <img src={logo2} alt="Credbevy Logo" className="h-[34px] w-auto" />
      </div>
      <div className="w-full flex justify-center mt-7 h-full mb-[49px]">
        <img src={line} alt="Credbevy Logo" className="h-[1px] w-40" />
      </div>
      <nav className=" px-3">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));

          const iconSrc = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center rounded-[4px] px-[26px] py-3 text-base mb-6 font-meduim ${
                isActive
                  ? "bg-[#EDFEFF] text-[#156064] font-bold text-base"
                  : "text-gray-300 text-base font-meduim"
              }`}
            >
              <Image
                src={iconSrc}
                alt={item.name}
                width={20}
                height={20}
                className="mr-3 h-5 w-5 flex-shrink-0"
              />
              <p className="hidden md:block">{item.name}</p>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

const menuItems = [
  {
    id: 1091,
    name: "Dashboard",
    href: "/dashboard",
    icon: "/icons/category.svg",
    activeIcon: "/icons/category-active.svg",
  },
  {
    id: 1092,
    name: "Financials",
    href: "/dashboard/financials",
    icon: "/icons/empty-wallet.svg",
    activeIcon: "/icons/empty-wallet-active.svg",
  },
  {
    id: 1093,
    name: "Loan Products",
    href: "/dashboard/loan-products",
    icon: "/icons/chart.svg",
    activeIcon: "/icons/chart-active.svg",
  },
  {
    id: 1094,
    name: "Loan Request",
    href: "/dashboard/loan-request",
    icon: "/icons/shopping-cart.svg",
    activeIcon: "/icons/shopping-cart-active.svg",
  },
  {
    id: 1095,
    name: "Repayment",
    href: "/dashboard/repayment",
    icon: "/icons/repeat.svg",
    activeIcon: "/icons/repeatactive.svg",
  },
  {
    id: 1096,
    name: "Loan History",
    href: "/dashboard/loan-history",
    icon: "/icons/bag.svg",
    activeIcon: "/icons/bag-active.svg",
  },
  {
    id: 1097,
    name: "Customers",
    href: "/dashboard/customers",
    icon: "/icons/profile-2user.svg",
    activeIcon: "/icons/profile-2user-active.svg",
  },
  {
    id: 1099,
    name: "Developer",
    href: "/dashboard/developer",
    icon: "/icons/developer.svg",
    activeIcon: "/icons/developeractive.svg",
  },
  {
    id: 1100,
    name: "Settings",
    href: "/dashboard/settings",
    icon: "/icons/setting-2.svg",
    activeIcon: "/icons/setting-2-active.svg",
  },
];







export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav Toggle */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#156064] text-white p-4 rounded-full shadow-lg"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute bottom-0 left-0 right-0 bg-[#24262D] rounded-t-2xl p-4">
            <div className="grid grid-cols-3 gap-4 py-4">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href + "/"));

                const iconSrc = isActive ? item.activeIcon : item.icon;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                      isActive
                        ? "bg-[#EDFEFF] text-[#156064]"
                        : "text-gray-300"
                    }`}
                  >
                    <Image
                      src={iconSrc}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="h-6 w-6 mb-1"
                    />
                    <span className="text-xs">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}