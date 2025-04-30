import React from 'react'

export default function Prediction() {
  return (
    <div className='p-6 w-full border rounded-lg h-[445px]'>
     <p className=" font-semibold text-[18px] leading-[100%] tracking-[-0.5px] text-[#333333] mb-[4px]">
  Credbevy AI - Prediction Model
</p>

<h1 className=" font-medium text-[14px] leading-[100%] tracking-[-0.5px] text-[#333333]">
  Prediction model on the assumed success of loans
</h1>

<div className="space-y-[24px] mt-[61px]">
  <p className="text-[#333333] text-[14px] leading-[100%] tracking-[-0.5px]">
    <span className="font-semibold">Approval Probability:</span>
    <span className="font-medium inline-block"> This applicant has a <span className="text-[#156064] font-semibold">65%</span> chance of approval based on your criteria</span>
  </p>

  <p className="text-[#333333] text-[14px] leading-[100%] tracking-[-0.5px]">
    <span className="font-semibold">Credit Score:</span>
    <span className="font-medium inline-block">This applicant met <span className="text-[#156064] font-semibold">80%</span> of your credit score range</span>
  </p>

  <p className="text-[#333333] text-[14px] leading-[100%] tracking-[-0.5px]">
    <span className="font-semibold">Income:</span>
    <span className="font-medium inline-block">This applicant earns <span className="text-[#156064] font-semibold">1.2X</span> of your minimum income requirement</span>
  </p>
</div>



    </div>
  )
}
