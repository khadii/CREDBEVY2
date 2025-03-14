import React from 'react';
import Card from './FinancialCard';
import CreditScoreGauge from '../LoanDetials/CreditScoreDashboard';
import CreditInfoCard from './CreditInfoCard ';

const FinancialGrid: React.FC = () => {
  return (
    <><div className=" bg-blue-50 flex w-full py-[53px] pr-[22px]">
      <div className="grid grid-cols-2 w-full  items-start">
        <div className='w-full pt-[55px]'>
          <CreditScoreGauge creditScore={660} />
        </div>
        <div className="grid grid-cols-2 gap-5 w-full pt-[40px] ">
          <Card
            title="Total Credit Limit"
            value="N4,483,224.03"
            description="Total Credit Limit" />

          <Card
            title="Bank Accounts"
            value="5"
            description="Bank Accounts" />

          <Card
            title="Available Credit Percent"
            value="89%"
            description="Available Credit Percent" />

          <Card
            title="Credit Limit"
            value="N2,332,675.00"
            description="Credit Limit" />
        </div>
      </div>
    </div><CreditInfoCard /></>
  );
};

export default FinancialGrid;
