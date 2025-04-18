'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

export default function LoanModal({open, setOpen,setState}:{open:any, setOpen:any,setState:any}) {
//   const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    // <div className="fixed inset-0 bg-[#17191CBA] flex items-center justify-center z-50">
      <div className="w-full max-w-[544px] max-h-[675px] overflow-hidden bg-white rounded-[8px]  px-6 pt-[28px] pb-[40px]">
        <div className="flex items-center justify-between mb-[50px] ">
          <h2 className="text-2xl font-semibold text-[#333333]">Indicate Interest</h2>

          <button
          onClick={() => setOpen(false)}
             className="text-[#333333] px-2 rounded-[4px] border font-bold text-xs"
          >
             ✕
           </button>
        </div>

        <div className=" xl:space-y-4 space-y-2  ">
          {[
            ['Name:', 'Oripeloye Timilehin'],
            ['Credit Score:',<span className="text-[#156064] font-semibold text-base">760</span>],
            ['Monthly Income:', '₦700,000.00'],
            ['Loan Amount:', '₦700,000.00'],
            ['Monthly Repayment:', '₦82,000.00'],
            ['Loan Purpose:', 'Home Improvement'],
            ['Loan Tenure:', '12 Months'],
            ['Interest Rate:', '35%'],
            ['Request Date:', '09/06/204, 9:46 PM'],
            ['Loan Product:', 'Sunday School Loan'],
            ['Fees (40%):', <span className="text-[#156064] font-semibold text-base">₦1,000.00</span>],
          ].map(([label, value], idx) => (
            <div key={idx} className="grid grid-cols-2 gap-[186px]">
              <div className="text-[#8A8B9F] text-base">{label}</div>
              <div className="text-base text-[#8A8B9F] text-right">{value}</div>
            </div>
          ))}
        </div>

        <div className="flex space-x-[px] justify-between mt-[44px]">
               <button
                onClick={() => setOpen(false)}
               className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-[12px] font-bold text-[#333333]"
          >
            Cancel
             </button>
            <button
            onClick={()=>setState(2)}
               className="px-[81px] py-[10px] border border-[#156064] bg-[#156064] rounded-[4px] text-[12px] font-bold text-white"
              >
                Indicate Interest
                </button>
             </div>
      {/* </div> */}
    </div>
  )
}
