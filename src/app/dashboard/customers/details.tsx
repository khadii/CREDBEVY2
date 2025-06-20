import RepaymentDetails from '@/app/components/customers/customersComponents/RepaymentDetails'
import React from 'react'

export default function Details({id}:{id:any}) {
  return (
    <div>
      <RepaymentDetails id={id}/>
    </div>
  )
}
