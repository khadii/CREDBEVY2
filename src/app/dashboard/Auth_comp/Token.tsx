"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/app/Redux/auth/authThunks";
import { AppDispatch } from "@/app/Redux/store";
import toast from "react-hot-toast";
import {
  FormField,
  PasswordFormField,
} from "@/app/components/Login/Formcomponents/InputField";
import AnimatedLoader from "@/app/components/animation";
import { useRef, useState } from "react";

export default function Token() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const logo = "/Image/cred.svg";

  const [errors, setErrors] = useState({ pin: "" });
  const handleChange = (index: number, value: string) => {
    if (errors.pin) {
      setErrors({ pin: "" });
    }
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<HTMLInputElement[]>([]);
  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen">
      <div className="w-full flex justify-center pb-72">
        <div className="max-w-7xl w-full md:p-0 p-6">
          <div className="mb-24 pt-16 md:pl-28">
            <img src={logo} alt="Credbevy Logo" className="h-8 w-auto" />
          </div>
          <div className=" ">
            <div className="mx-auto max-w-[600px] max-h-[362px]">
              <div className="mb-14 w-full justify-center flex flex-col items-center">
                <h1 className=" text-center text-2xl font-bold text-[#333333] mb-[4px]">
                  Two factor authentication
                </h1>
                <p className="font-semibold text-sm text-[#8A8B9F] text-center ">
                  2 Factor Authentication Required. Enter the code sent to your
                  email
                </p>
              </div>
              <div className="flex justify-center space-x-6">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className={`w-[80px] h-[80px] border-[4px] ${
                      errors.pin && digit === ""
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#156064] focus:ring-[#156064]"
                    } rounded-[8px] focus:outline-none focus:ring-2 text-center text-[40px] font-bold mb-[48px]`}
                  />
                ))}
              </div>
              <div className="w-full mb-3 px-24">
                <button
                  type="submit"
                  className=" w-full rounded-[4px] bg-[#0F5959] h-[58px] text-center text-base font-bold text-white hover:bg-[#0F5959]/90 disabled:bg-gray-400"
                  disabled={loading}
                >
                  {"Login"}
                </button>
                <p className="font-medium text-sm text-[#333333] mt-[12px] text-center">
                  Didn’t get the code? 
                  <span className="font-semibold text-[#156064]">Resend</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatedLoader isLoading={loading}></AnimatedLoader>
    </div>
  );
}
