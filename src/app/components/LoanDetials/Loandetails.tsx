
'use client'

import React, { useEffect } from "react";
import ProfileCard from "./ProfileCard";
import Layout from "../Layout/Layout";
import FinancialInfo from "./FinancialInfo";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";

export default function Loandetails({id}:{id:any}) {

  const dispatch = useDispatch<AppDispatch>();
  const Userid = {
    product_id: id,
  };
  useEffect(() => {
    dispatch(_single_loan_products_request(Userid));
  }, [dispatch, Userid.product_id ]);
  const {
    loading,
    success,
    error,
    data,
  } = useSelector((state: RootState) => state.loanRequest.single_loan_products_request);



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



