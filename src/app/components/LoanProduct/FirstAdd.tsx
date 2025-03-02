// pages/customers.js
import Head from 'next/head';
import Link from 'next/link';

export default function Customers({setStep}:{setStep:any}) {
  return (
    <div className="min-h-screen">
      <div>
        <title>Loan Products</title>
        <meta name="description" content="Manage your customers" />
      </div>
      
      <div className="">
        {/* Header */}
        <h1 className="text-[34px] font-bold  mb-16 text-[#333333]">Customers</h1>
        
        {/* Empty state container */}
        <div className="flex flex-col items-center justify-center mt-24 ">
          {/* Illustration of empty customer cards */}
          <div className="relative w-full h-full mb-6 justify-center flex">
          <img
          src='/Image/Chatsillustration.svg'
          alt='/Image/Chatsillustration.svg'
          className='w-ful h-full object-cover'
          />

          </div>
          
          {/* Empty state message */}
          <p className=" text-[#333333] font-bold text-[24px] mb-[24px]">No Loan Product Yet</p>
          <p className=" text-[#333333] max-w-[400px] font-semibold text-[14px] mb-[24px] text-center">You do not have any loan product yet. Click the button below to create one.</p>
          
          {/* CTA Button */}
          <div>
            <button className="bg-[#156064] hover:bg-[#156064] text-white text-sm w-[279px] h-[44px] rounded-lg font-bold text-[12px] transition-colors" onClick={()=>setStep(2)}>
            Add New Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}