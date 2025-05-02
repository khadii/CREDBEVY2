import { RootState } from '@/app/Redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

// Utility function to determine text color based on value
const getValueColor = (value: number, type: 'percentage' | 'multiplier'): string => {
  if (type === 'percentage') {
    return value < 30 ? 'text-red-500' : 'text-[#156064]';
  } else if (type === 'multiplier') {
    return value < 1 ? 'text-red-500' : 'text-[#156064]';
  }
  return 'text-[#156064]';
};

export default function Prediction() {
  const {
    loading: LoanRequest_loading,
    error: LoanRequest_SuccessError,
    data: LoanRequest_Data,
    user_info_status,
  } = useSelector(
    (state: RootState) => state.loanRequest.single_loan_products_request
  );

  return (
    <div className='p-6 w-full border rounded-lg h-[445px]'>
      <p className="font-semibold text-[18px] leading-[100%] tracking-[-0.5px] text-[#333333] mb-[4px]">
        Credbevy AI - Prediction Model
      </p>

      <h1 className="font-medium text-[14px] leading-[100%] tracking-[-0.5px] text-[#333333]">
        Prediction model on the assumed success of loans
      </h1>

      <div className="space-y-[24px] mt-[61px]">
        <p className="text-[#333333] text-[14px] leading-[100%] tracking-[-0.5px]">
          <span className="font-semibold">Approval Probability:</span>
          <span className="font-medium inline-block"> This applicant has a{' '}
            <span className={`font-semibold ${getValueColor(LoanRequest_Data?.loan.prediction.approval_chance, 'percentage')}`}>
              {LoanRequest_Data?.loan.prediction.approval_chance}%
            </span> chance of approval based on your criteria
          </span>
        </p>

        <p className="text-[#333333] text-[14px] leading-[100%] tracking-[-0.5px]">
          <span className="font-semibold">Credit Score:</span>
          <span className="font-medium inline-block">This applicant met{' '}
            <span className={`font-semibold ${getValueColor(LoanRequest_Data?.loan.prediction.credit_score_match.percentage, 'percentage')}`}>
              {LoanRequest_Data?.loan.prediction.credit_score_match.percentage}%
            </span> of your credit score range
          </span>
        </p>

        <p className="text-[#333333] text-[14px] leading-[100%] tracking-[-0.5px]">
          <span className="font-semibold">Income:</span>
          <span className="font-medium inline-block">This applicant earns{' '}
            <span className={`font-semibold ${getValueColor(LoanRequest_Data?.loan.prediction.income_comparison.multiplier, 'multiplier')}`}>
              {LoanRequest_Data?.loan.prediction.income_comparison.multiplier}X
            </span> of your minimum income requirement
          </span>
        </p>
      </div>
    </div>
  );
}