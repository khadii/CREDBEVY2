"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import KeyInput from "../FormInputs/developerInput";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";
import {
  fetch_api_keys,
  reset_api_keyss,
} from "@/app/Redux/developer/developerthunk";

const API_Keys = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector((state: any) => state.apiKey);
  const [isRotating, setIsRotating] = useState(false);
  const {
    loading: resetapiloading,
    error: resetapierror,
    data: resetapidata,
    success: resetapisuccess,
  } = useSelector((state: any) => state.resetapi);

  const handleClick = () => {
    setIsRotating(true);
    dispatch(reset_api_keyss());
    // Reset the rotation after animation completes
    setTimeout(() => {
      setIsRotating(false);
    }, 1000); // 500ms matches the transition duration
  };

  useEffect(()=>{
      if(resetapisuccess){
      dispatch(fetch_api_keys())
      toast.success('reset successful')
    }
    if(resetapierror){
      toast.error(error ||' reset failed')
    }
  },[dispatch,resetapierror,resetapisuccess])
  const [formData, setFormData] = useState({
    apiKey: "",
    Secretkey: "",
    BaseURL: "",
    WAN: "45738399312",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetch_api_keys());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        apiKey: data.api_key || "",
        Secretkey: data.secret_key || "",
        BaseURL: data.sandbox_url || "",
      }));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
              <div
                className="items-center flex justify-end gap-1 mt-3 cursor-pointer"
                onClick={handleClick}
              >
                <div
                  className={`transition-transform duration-500 ease-in-out ${
                    isRotating ? "rotate-180" : ""
                  }`}
                >
                  <Image
                    src="/icons/rotate-right.svg"
                    alt="svg"
                    height={16}
                    width={16}
                    className={`transition-transform duration-500 ${
                      isRotating ? "rotate-360" : ""
                    }`}
                  />
                </div>{" "}
                <p className="font-inter font-medium text-[12px] leading-[20px] tracking-[0px] align-middle text-[#156064]">
                  Reset API keys
                </p>{" "}
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
