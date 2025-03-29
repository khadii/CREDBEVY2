import React from 'react';
import Card from './FinancialCard';
import CreditScoreGauge from '../LoanDetials/CreditScoreDashboard';
import CreditInfoCard from './CreditInfoCard ';

const FinancialGrid = ({LoanRequest_Data}:{LoanRequest_Data:any}) => {

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value).replace('NGN', 'N');
  };

  // Get credit info from the API response or use defaults
  const creditScore = LoanRequest_Data?.loan?.user?.credit_score || 0;
  const totalCreditLimit = LoanRequest_Data?.loan?.financial_info?.average_credit 
    ? formatCurrency(LoanRequest_Data.loan.financial_info.average_credit * 1.5) 
    : 'N4,483,224.03';
  const bankAccounts = LoanRequest_Data?.loan?.financial_info?.perform_loans 
    ? LoanRequest_Data.loan.financial_info.perform_loans 
    : '5';
  const availableCreditPercent = '89%'; // This might need to be calculated from API data
  const creditLimit = LoanRequest_Data?.loan?.financial_info?.average_credit 
    ? formatCurrency(LoanRequest_Data.loan.financial_info.average_credit) 
    : 'N2,332,675.00';
  return (
    <><div className=" bg-[#EDFEFF] flex w-full py-[53px] pr-[22px]">
      <div className="grid grid-cols-2 w-full  items-start">
        <div className='w-full pt-[55px]'>
          <CreditScoreGauge creditScore={LoanRequest_Data?.loan.user.credit_score} />
        </div>
        <div className="grid grid-cols-2 gap-5 w-full pt-[40px] ">
        <Card
              title="Total Credit Limit"
              value={totalCreditLimit}
              description="Total CL" />

            <Card
              title="Bank Accounts"
              value={bankAccounts.toString()}
              description="Bank Accounts" />

            <Card
              title="Available Credit Percent"
              value={availableCreditPercent}
              description="Available Credit%" />

            <Card
              title="Credit Limit"
              value={creditLimit}
              description="Credit Limit" />
          </div>
      </div>
    </div><CreditInfoCard /></>
  );
};

export default FinancialGrid;
