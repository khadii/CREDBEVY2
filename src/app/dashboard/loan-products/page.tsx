'use client'
import Layout from '@/app/components/Layout/Layout';
import Dashboard from '@/app/components/LoanProduct/Dashboard';
import Customers from '@/app/components/LoanProduct/FirstAdd';
import Form from '@/app/components/LoanProduct/Form';
import React, { useState } from 'react';

export default function Page() {
  const [step, setStep] = useState(1);

  const switchPage = (step: number) => {
    switch (step) {
      case 1:
        return <Customers setStep={setStep} />;
      case 2:
        return <Form setStep={setStep} />;
      case 3:
        return <Dashboard setStep={setStep} />;
      default:
        return null;
    }
  };

  return <Layout>{switchPage(step)}</Layout>;
}
