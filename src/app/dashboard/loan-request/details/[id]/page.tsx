import Loandetails from '@/app/components/LoanDetials/Loandetails'
import React from 'react'


type PageProps = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div><Loandetails id={id}/></div>
  )
}
