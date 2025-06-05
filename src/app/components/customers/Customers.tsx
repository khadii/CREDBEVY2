"use client";

import React, { useState } from "react";
import { YearDropdown } from "../Yeardropdown";
import Card from "../Card";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";
import Search from "../Search";
import { CustomersTable } from "./customersComponents/customerstable";

export default function Customers() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const Year = { year: selectedYear };
  const years = ["2022", "2023", "2024", "2025", "2026"];


    const stats = [
      {
        title: "Total Customers",
             amount: "20,000,000",
        percentage: "5, 18%",
        icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
      },
      {
        title: "Profit Generated",
              amount: "₦ 3,000,000,000",
        percentage: "5, 18%",
        icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
      },
      {
        title: "Total Amount Disbursed",
        amount: "₦ 3,000,000,000",
        percentage: "5, 18%",
        icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
      },
    ];
  return (
    <section className="  bg-[#FAFAFA]   ">
      <div className="">
        {/* title */}

        <p className="font-semibold text-4xl text-[#333333] mb-6 bg-[#FAFAFA]">
          Customers
        </p>
        {/* notification */}

        <YearDropdown
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <div></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              title={stat.title}
              amount={stat.amount}
              percentage={stat.percentage}
              icon={stat.icon}
            />
          ))}
        </div>
        <Search  showSeeAll={false}/>
        <CustomersTable loan_table_data_all={sampleCustomerLoansData} setCurrentPage={1} currentPage={1} totalPages={1} total_count={1} bulkAction={1}/>
      </div>
    </section>
  );
}


const sampleCustomerLoansData = [
  {
    id: "1",
    name: "Oripeloye Timilehin",
    email: "Timilehinoripeloye@gmail.com",
    phone: "09055380387",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Pending",
    uuid: "uuid1",
    image: "https://via.placeholder.com/150"
  },
  {
    id: "2",
    name: "Oripeloye Timilehin",
    email: "Timilehinoripeloye@gmail.com",
    phone: "09055380387",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Approved",
    uuid: "uuid2",
    image: "https://via.placeholder.com/150"
  },
  {
    id: "3",
    name: "Oripeloye Timilehin",
    email: "Timilehinoripeloye@gmail.com",
    phone: "09055380387",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Denied",
    uuid: "uuid3",
    image: "https://via.placeholder.com/150"
  },
  {
    id: "4",
    name: "Oripeloye Timilehin",
    email: "Timilehinoripeloye@gmail.com",
    phone: "09055380387",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Pending",
    uuid: "uuid4",
    image: "https://via.placeholder.com/150"
  },
  {
    id: "5",
    name: "Oripeloye Timilehin",
    email: "Timilehinoripeloye@gmail.com",
    phone: "09055380387",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Approved",
    uuid: "uuid5",
    image: "https://via.placeholder.com/150"
  }
];
