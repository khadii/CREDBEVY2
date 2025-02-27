// pages/customers.js
import Head from 'next/head';
import Link from 'next/link';

export default function Customers({setStep}:{setStep:any}) {
  return (
    <div className="min-h-scree">
      <div>
        <title>Customers</title>
        <meta name="description" content="Manage your customers" />
      </div>
      
      <div className="">
        {/* Header */}
        <h1 className="text-[34px] font-bold text-[#333333] mb-16 ">Customers</h1>
        
        {/* Empty state container */}
        <div className="flex flex-col items-center justify-center mt-24 ">
          {/* Illustration of empty customer cards */}
          <div className="relative w-64 h-32 mb-6 space-y-4">
            {/* Third card */}
            <div className="absolute top-0 w-48 h-10 bg-blue-50 rounded-md shadow-sm left-8 flex items-center pl-10">
              <div className="h-1 bg-gray-200 w-24"></div>
            </div>
            
            {/* Second card */}
            <div className="absolute top-10 w-48 h-10 bg-blue-50 rounded-md shadow-sm left-8 flex items-center pl-10">
              <div className="h-1 bg-gray-200 w-24"></div>
            </div>
            
            {/* First card */}
            <div className="absolute top-20 w-48 h-10 bg-blue-50 rounded-md shadow-sm left-8 flex items-center pl-10 ">
              <div className="h-1 bg-gray-200 w-24"></div>
            </div>
          
          </div>
          
          {/* Empty state message */}
          <p className="text-[#8A8B9F] font-bold text-sm mb-4">You do not have any customers yet</p>
          
          {/* CTA Button */}
          <div>
            <button className="bg-[#156064] hover:bg-[#156064] text-white text-sm w-[134px] h-[36px] rounded-lg font-bold text-[12px] transition-colors" onClick={()=>setStep(2)}>
              Get Customers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}