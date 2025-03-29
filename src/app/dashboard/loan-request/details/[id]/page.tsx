import Loandetails from '@/app/components/LoanDetials/Loandetails'
import { _single_loan_products_request } from '@/app/Redux/Loan_request/loan_request_thunk';

import React from 'react'



type PageProps = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const product_id={
    id:id
  }
  
  

 
  
  return (
    <div><Loandetails id={id}/></div>
  )
}
