import React from "react";
import ProfileCard from "./ProfileCard";
import Layout from "../Layout/Layout";
import FinancialInfo from "./FinancialInfo";

export default function Loandetails() {

  return (
    <Layout>
      <div className="w-full bg-[#FAFAFA] pb-[60px] flex flex-col  h-full">
        <div><p className="mb-[32px] text-[34px] font-bold">Loan Request Details</p></div>
      <div className="w-full flex gap-6 ">
      <div className="md:w-[32%] w-full ">
          <ProfileCard />
        </div>
        <div className="w-[68%] ">
          {" "}
          <FinancialInfo />
        </div>
      </div>
      </div>
    </Layout>
  );
}



