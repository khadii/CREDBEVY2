"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import KeyInput from "../FormInputs/developerInput";
import Image from "next/image";

const API_Keys = () => {
  const [formData, setFormData] = useState({
    apiKey: "CB_TEST_JSUBUFWJBF45",
    Secretkey: "FBSIFEIUE984393JFNJDODC",
    BaseURL: "https://sandbox.credbevy.com",
    WAN: "45738399312",
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
            API Keys
          </p>

          {/* API Key field with copy functionality */}
          <div className="space-y-6 mb-[55px]">
            <KeyInput
              label="API Key"
              placeholder="Enter your API key"
              value={formData.apiKey}
              onChange={handleChange}
              name="apiKey"
              copyable={true}
            />
            <div>
              <KeyInput
                label="Secret key"
                placeholder="Enter your Secret key"
                value={formData.Secretkey}
                onChange={handleChange}
                name="Secretkey"
                copyable={true}
              />

              {/* refresh */}

              <div className=" items-center flex justify-end gap-1 mt-3 cursor-pointer ">
                <Image
                  src={"/icons/rotate-right.svg"}
                  alt={"svg"}
                  height={16}
                  width={16}
                />

                <p className="font-inter font-medium text-[12px] leading-[20px] tracking-[0px] align-middle text-[#156064]">
                  Reset API keys
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <KeyInput
              label="Base URL"
              placeholder="Enter your API key"
              value={formData.BaseURL}
              onChange={handleChange}
              name="BaseURL"
              copyable={true}
            />
            <KeyInput
              label="Wallet Account Number"
              placeholder="Enter your Wallet Account Number"
              value={formData.WAN}
              onChange={handleChange}
              name="WAN"
              copyable={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default API_Keys;
