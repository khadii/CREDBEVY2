'use client'
import Layout from '@/app/components/Layout/Layout';
import Dashboard from '@/app/components/LoanProduct/Dashboard';
import Customers from '@/app/components/LoanProduct/FirstAdd';
import Form from '@/app/components/LoanProduct/Form';
import React from 'react'

export default function page() {
  return (
    <Layout>
      <Dashboard/>
    </Layout>
  )
}

