import React from 'react';
import LoanPerformance from '../../loanPerformance';
import Layout from '@/app/components/Layout/Layout';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  // Resolve the params Promise
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Layout>
      <LoanPerformance params={{ id }} />
    </Layout>
  );
}
