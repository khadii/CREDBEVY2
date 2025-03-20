import React from 'react'
import LoanPerformance from '../../loanPerformance'
import Layout from '@/app/components/Layout/Layout'


export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <Layout>
      <LoanPerformance params={id} />
    </Layout>
  )
}
