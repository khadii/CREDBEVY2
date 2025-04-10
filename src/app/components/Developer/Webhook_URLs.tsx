"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import KeyInput from "../FormInputs/developerInput";
import Image from "next/image";

const Webhook_URLs = () => {
  const [formData, setFormData] = useState({
    LoanProduct: "CB_TEST_JSUBUFWJBF45",
    LoanRequest: "FBSIFEIUE984393JFNJDODC",
    IndicateInterest: "https://sandbox.credbevy.com",
    ApproveLoan: "45738399312",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   // e.preventDefault();
  //   // toast.success("Form submitted!");
  //   // console.log("Form data:", formData);
  // };

  return (
    <>
      <div className=" px-6 pt-6 pb-[93px] bg-white rounded-lg max-w-[822px] max-h-screen border">
        <div>
          <p className=" font-semibold text-[20px] leading-[24px] tracking-[-0.5px] text-[#333333] mb-6">
            Webhook URLs
          </p>

          {/* API Key field with copy functionality */}
          <div className="space-y-6 mb-6">
            <KeyInput
              label="Loan Product "
              placeholder="Enter your Loan Product "
              value={formData.LoanProduct}
              onChange={handleChange}
              name="LoanProduct "
              copyable={true}
            />
            <div>
              <KeyInput
                label="Loan Request "
                placeholder="Enter your Loan Request "
                value={formData.LoanRequest}
                onChange={handleChange}
                name="LoanRequest "
                copyable={true}
              />
              {/* refresh */}
            </div>
          </div>
          <div className="space-y-6">
            <KeyInput
              label="Indicate Interest"
              placeholder="Enter Indicate Interest"
              value={formData.IndicateInterest}
              onChange={handleChange}
              name="IndicateInterest"
              copyable={true}
            />
            <KeyInput
              label="Approve Loan"
              placeholder="Enter your Approve Loan"
              value={formData.ApproveLoan}
              onChange={handleChange}
              name="ApproveLoan"
              copyable={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Webhook_URLs;
