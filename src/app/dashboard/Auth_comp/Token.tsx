"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/app/Redux/store";
import toast from "react-hot-toast";

import { useEffect, useRef, useState } from "react";
import {
  clearOtpData,
  clearResendStatus,
  clearVerificationError,
} from "@/app/Redux/auth/AuthTwoSlice";
import { loginUser, resendOtp, verifyTwoFa } from "@/app/Redux/auth/AuthTwo";
import AnimatedLoader from "@/app/components/animation";
import {
  FormField,
  PasswordFormField,
} from "@/app/components/Login/Formcomponents/InputField";

export default function LoginFlow() {
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const logo = "/Image/cred.svg";

  // Redux state
  const {
    loading,
    error,
    otpData,
    verificationLoading,
    verificationError,
    resendLoading,
    resendSuccess,
    isAuthenticated,
    token,
  } = useSelector((state: any) => state.auth);

  // Local state
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, token, router]);

  // Show OTP screen when we receive OTP data
  useEffect(() => {
    if (otpData?.partnerUserId) {
      setShowOtpScreen(true);
    }
  }, [otpData]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearVerificationError());
      dispatch(clearResendStatus());
    };
  }, [dispatch]);

  // Login Form
  const loginInitialValues = {
    email: "",
    password: "",
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Password is required"),
  });

  const handleLoginSubmit = async (values: typeof loginInitialValues) => {
    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      toast.success("OTP sent to your email!");
    }
  };

  // OTP Handling
  const handleOtpInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedData[i] || "";
    }
    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!otpData?.partnerUserId) {
      toast.error("Session expired. Please login again.");
      setShowOtpScreen(false);
      dispatch(clearOtpData());
      return;
    }

    const result = await dispatch(
      verifyTwoFa({
        partner_user_id: otpData.partnerUserId,
        otp: otp,
      })
    );

    if (verifyTwoFa.fulfilled.match(result)) {
      toast.success("Login successful!");
      // The useEffect will handle the redirect when isAuthenticated becomes true
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0) return; // Block if cooldown is active

    if (!otpData?.partnerUserId) {
      toast.error("Session expired. Please login again.");
      setShowOtpScreen(false);
      dispatch(clearOtpData());
      return;
    }

    setResendCooldown(30); // Start 30-second delay

    dispatch(resendOtp(otpData.partnerUserId)).then((result: any) => {
      if (resendOtp.fulfilled.match(result)) {
        toast.success("New OTP sent to your email.");
      } else {
        toast.error("Failed to resend OTP.");
      }
    });
  };

  if (showOtpScreen) {
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
                  <h1 className="text-center text-2xl font-bold text-[#333333] mb-[4px]">
                    Two factor authentication
                  </h1>
                  <p className="font-semibold text-sm text-[#8A8B9F] text-center">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>
                <div
                  className={`flex justify-center gap-3 mb-8 ${
                    shake ? "animate-pulse" : ""
                  }`}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOtpInputChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className={`w-10 h-12 rounded-[8px] focus:outline-none text-center text-[40px] font-bold mb-[48px] sm:w-[80px] sm:h-[80px] border-[4px] bg-[#FAFAFA] text-[#333333] ${
                        digit ? "" : "border-[#156064] focus:border-[#156064]"
                      } ${shake ? "animate-bounce border-red-400" : ""}`}
                      autoComplete="off"
                      disabled={verificationLoading}
                    />
                  ))}
                </div>

                {verificationError && (
                  <p className="text-red-500 text-center mb-4">
                    {verificationError}
                  </p>
                )}

                <div className="w-full mb-3 px-5 sm:px-24">
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full rounded-[4px] bg-[#0F5959] h-[58px] text-center text-base font-bold text-white hover:bg-[#0F5959]/90 disabled:bg-gray-400"
                    disabled={verificationLoading || code.some((d) => !d)}
                  >
                    {verificationLoading ? "Verifying..." : "Verify"}
                  </button>

                  <div className="text-center mt-6">
                    <span className="font-medium text-sm text-[#333333] mt-[12px] text-center">
                      Didn't get the code?{" "}
                    </span>
                    <button
                      onClick={handleResendOtp}
                      disabled={resendCooldown > 0}
                      className={`font-semibold transition-colors duration-200 ${
                        resendCooldown > 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#156064] hover:text-[#0F5959]/90 hover:underline"
                      }`}
                    >
                      {resendCooldown > 0
                        ? `Resend (${resendCooldown}s)`
                        : "Resend"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AnimatedLoader isLoading={verificationLoading || resendLoading} />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen">
      <div className="w-full flex justify-center pb-72">
        <div className="max-w-7xl w-full md:p-0 p-6">
          <div className="mb-24 pt-16 md:pl-28">
            <img src={logo} alt="Credbevy Logo" className="h-8 w-auto" />
          </div>
          <div className="">
            <div className="mx-auto max-w-[400px] max-h-[362px]">
              <h1 className="mb-14 text-center text-2xl font-bold text-[#333333]">
                Login
              </h1>
              <Formik
                initialValues={loginInitialValues}
                validationSchema={loginValidationSchema}
                onSubmit={handleLoginSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-6">
                      <FormField type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="relative">
                      <PasswordFormField
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}

                    <div className="w-full mt-10">
                      <button
                        type="submit"
                        className="mt-6 w-full rounded-[4px] bg-[#0F5959] h-[58px] text-center text-base font-bold text-white hover:bg-[#0F5959]/90 disabled:bg-gray-400"
                        disabled={loading || isSubmitting}
                      >
                        {loading || isSubmitting ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <AnimatedLoader isLoading={loading} />
    </div>
  );
}
