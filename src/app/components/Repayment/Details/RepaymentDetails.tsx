
'use client'

import React, { useEffect } from "react";
import ProfileCard from "./ProfileCard";

import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import Layout from "../../Layout/Layout";
import AnimatedLoader from "../../animation";
import RepaymentInfo from "./repaymentInfo";
import { single_loan_repayments } from "@/app/Redux/Repayment/repayment_thunk";


interface RepaymentDetailsProps {
  id: string;
}

export default function RepaymentDetails({id}: RepaymentDetailsProps) {


  const { data, loading, error } = useSelector((state: any) => state.sinleloanRepayment);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(single_loan_repayments({user_id:id}));
  }, [dispatch, id]);

  const { loading: LoanRequest_loading } = useSelector(
    (state: RootState) => state.loanRequest.single_loan_products_request
  );

  
  return (
    <Layout>
      <div className="w-full bg-[#FAFAFA] pb-[60px] flex flex-col h-full">
        <div><p className="mb-[32px] text-[34px] font-bold">Repayment Detail</p></div>
        <div className="w-full flex gap-6">
          <div className="md:w-[32%] w-full">
            <ProfileCard id={id} />
          </div>
          <div className="w-[68%]">
            <RepaymentInfo id={id} />
          </div>
        </div>
        <AnimatedLoader isLoading={LoanRequest_loading || loading} />
      </div>
    </Layout>
  );
}


