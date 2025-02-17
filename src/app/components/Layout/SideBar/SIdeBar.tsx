"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Wallet,
  Package,
  FileText,
  History,
  BarChart3,
  Users,
  Grid,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Financials", href: "/financials", icon: Wallet },
  { name: "Loan Products", href: "/loan-products", icon: Package },
  { name: "Loan Request", href: "/loan-request", icon: FileText },
  { name: "Loan History", href: "/loan-history", icon: History },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Integrations", href: "/integrations", icon: Grid },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const logo2 = "/Image/LOGO2.svg";
  const line = "/Image/Line.svg";

  return (
    <div className="flex flex-col bg-[#1C1C28] text-white  min-h-[360dvh] ">
         <div className="w-full flex justify-center pt-12 ">
              <img src={logo2} alt="Credbevy Logo" className="h-7 w-auto" />
            </div>
            <div className="w-full flex justify-center mt-7 h-full">
              <img src={line} alt="Credbevy Logo" className="h-2 w-40" />
            </div>

      <nav className="space-y-6 px-3 sticky top-1 ">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium mt-10 hover:bg-[#EDFEFF] hover:text-[#156064] hover:font-bold  hover:text-base ${
                pathname === item.href ? "bg-[#EDFEFF] text-[#156064] font-bold  text-base" : "text-gray-300 text-base font-medium"
              }`}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
        
          <p className="hidden md:block">
          {item.name}
          </p>
            
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
