import React from 'react';
import LoanPerformance from '../../loanPerformance';
import Layout from '@/app/components/Layout/Layout';
import Form from '@/app/components/LoanProduct/FormPut';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Layout>
      <Form product_id={id}/>
    </Layout>
  );
}
