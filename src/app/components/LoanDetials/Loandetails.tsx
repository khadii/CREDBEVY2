'use client'

import React, { useEffect } from "react";
import ProfileCard from "./ProfileCard";
import Layout from "../Layout/Layout";
import FinancialInfo from "./FinancialInfo";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import SpinningFaceExact from "../credbevyLoader";
import AnimatedLoader from "../animation";
import ErrorDisplay from "../ErrorDisplay";
import { useRouter } from "next/navigation";

export default function LoanDetails({ id }: { id: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const {
    loading: LoanRequest_loading,
    error: LoanRequest_error,
    data: LoanRequest_Data
  } = useSelector((state: RootState) => state.loanRequest.single_loan_products_request);

  useEffect(() => {
    if (id) {
      dispatch(_single_loan_products_request({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (LoanRequest_error === 'Unauthorized') {
      router.push("/");
    }
  }, [LoanRequest_error, router]);

  return (
    <Layout>
      {LoanRequest_error ? (
        <ErrorDisplay error={LoanRequest_error} />
      ) : LoanRequest_loading ? (
        <AnimatedLoader isLoading={LoanRequest_loading} />
      ) : (
        <div className="w-full bg-[#FAFAFA] pb-[60px] flex flex-col h-full">
          <div>
            <p className="mb-[32px] text-[34px] font-bold">Loan Request Details</p>
          </div>
          <div className="w-full flex gap-6">
            <div className="md:w-[32%] w-full">
              <ProfileCard id={id} />
            </div>
            <div className="w-[68%]">
              <FinancialInfo id={id} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}