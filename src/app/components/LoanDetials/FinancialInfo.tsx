"use client";

import { useState, useEffect } from "react";
import { Tabs } from "../Tabs";
import DocumentsTable from "./DocTable";
import { useDashboard } from "@/app/Context/DahboardContext";

export default function FinancialInfo() {
  const { interested, setInterested } = useDashboard();
  const tabs = [
    { name: "All Request" },
    { name: "Employment info" },
    { name: "Financial info" },
    { name: "Credit info" },
    { name: "Documents" },
    { name: "Prediction" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [showDocumentsTable, setShowDocumentsTable] = useState(false);

  const Request_Details = [
    { label: "Loan Amount", value: "N 344, 373, 790.00" },
    { label: "Monthly Repayment", value: "N 123, 543, 893.00" },
    { label: "Loan Purpose", value: "Home Improvement" },
    { label: "Loan Terms", value: "12 Months" },
    { label: "Interest Rate", value: "35%" },
    { label: "Request Date", value: "09/06/2023, 9:43 PM" },
  ];
  const Employment_Info = [
    { label: "Employment Status", value: "Self - Employed" },
    { label: "Current Employer:", value: "Self - Employed" },
    { label: "Job Title:", value: "C.E.O" },
    { label: "Monthly Income:", value: "N 4, 000, 000.00" },
  ];
  const financialData = [
    { label: "Average Debt", value: "N 344,474,455.00" },
    { label: "Average Credit", value: "N 264,676,664.00" },
    { label: "Average Balance", value: "N 903,043,564.00" },
    { label: "Average Income", value: "N 344,474,455.00" },
    { label: "Average Expenses", value: "N 292,936,112.00" },
    { label: "Performing Loans", value: "6" },
    { label: "Account Name", value: "Oripeloye Timilehin" },
    { label: "Account Number", value: "0423807582" },
    { label: "Financial Institution", value: "Guarantee Trust Bank (GTB)" },
    { label: "BVN", value: "1283673484" },
  ];
  const financialDataNotinterested = [
    { label: "Average Debt", value: "N 344,474,455.00" },
    { label: "Average Credit", value: "N 264,676,664.00" },
    { label: "Average Balance", value: "N 903,043,564.00" },
    { label: "Average Income", value: "N 344,474,455.00" },
    { label: "Average Expenses", value: "N 292,936,112.00" },
    { label: "Performing Loans", value: "6" },
    { label: "Account Name", value: "Oripeloye Timilehin" },
    { label: "Account Number", value: "/Image/RectangleBig.svg" },
    { label: "Financial Institution", value: "/Image/RectangleBig.svg" },
    { label: "BVN", value: "/Image/RectangleBig.svg" },
  ];

  const [data, setData] = useState(Request_Details);

  const financialdata = interested ? financialData : financialDataNotinterested;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab); 
    setShowDocumentsTable(tab === "Documents"); 

    switch (tab) {
      case "All Request":
        setData(Request_Details);
        break;
      case "Employment info":
        setData(Employment_Info);
        break;
      case "Financial info":
        setData(financialdata);
        break;
      case "Documents":
        break;
      default:
        setData([]); 
        break;
    }
  };

  
  useEffect(() => {
    if (activeTab === "Financial info") {
      setData(financialdata);
    }
  }, [interested, activeTab]); 

  return (
    <div
      className={`pt-[34px] bg-white rounded-lg ${ interested?'h-[857px]':'h-[900px]'}  w-full border-[1px]`}
    >
      <div className="flex mb-[42px]  pl-[24px]">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      </div>

      {/* User Details */}
      {showDocumentsTable ? (
        <div
          className={`w-full  ${
            activeTab === "Documents" ? "px-[24px]" : "pl-[24px]"
          }`}
        >
          {" "}
          <DocumentsTable />
        </div>
      ) : (
        <div className="w-full space-y-5 mt-[38px] flex flex-col items-center justify-center ">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex w-full text-[16px] font-medium text-[#8A8B9F] text-left gap-[38px]  pl-[24px] items-center"
            >
              <div className="w-[154px] ">{item.label}:</div>
              <div className="text-left truncate w-[300px] text-pretty break-words">
                <p className={item.label === "Email" ? "break-words" : ""}>
                  {interested ? (
                    item.value
                  ) : (
                    <>
                      {item.label !== "Account Number" &&
                      item.label !== "Financial Institution" &&
                      item.label !== "BVN" ? (
                        <span>{item.value}</span>
                      ) : (
                        <img
                          src={item.value}
                          alt={item.label}
                          className="w-full h-full"
                        />
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}