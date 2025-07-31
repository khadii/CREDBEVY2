
import WelcomeWizard from '@/app/components/Welcome';
import { _single_loan_products_request } from '@/app/Redux/Loan_request/loan_request_thunk';

import React from 'react'




type PageProps = {
  params: Promise<{ token: string }>;
};
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { token } = resolvedParams;

  return (
    <div>      <WelcomeWizard token={token}/></div>
  )
}
