import Image from "next/image";
import React from "react";

export default function AddCustomer() {
  return (
    <>
      <p className="text-[34px] font-semibold text-[#333333] mb-[100px]">
        Customers
      </p>
      <div className=" w-full flex  flex-col justify-center items-center h-1/2">
        <Image
          src={"/emptyCustomer.svg"}
          alt={"EmptyCustomer"}
          width={268}
          height={303}
        />

        <p className="font-semibold text-2xl mb-[12px]">No Customers</p>
        <p className="font-medium text-sm mb-[16px]">
          You do not have any customers yet.
        </p>
        <button className="bg-[#156064] py-[15px] px-[98px] text-white font-semibold rounded-[8px] whitespace-nowrap">
          Get Customers
        </button>
      </div>
    </>
  );
}
