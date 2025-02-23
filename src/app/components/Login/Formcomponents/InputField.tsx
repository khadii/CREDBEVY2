"use client";

import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
  type: string;
  name: string;
  placeholder: string;
}

export const FormField = ({ type, name, placeholder }: FormFieldProps) => (
  <div className="w-full relative">
    <Field
      type={type}
      id={name}
      name={name}
      autoComplete="off"
      // onFocus={(e:any) => e.target.removeAttribute("readonly")}
      placeholder=" "
      className="w-full rounded-[4px] pt-7  border border-[#8A8B9F] px-6 h-[64px] focus:border-[#8A8B9F] focus:outline-none text-[#333333] peer "
    />
    <label
      htmlFor={name}
      className="absolute left-6 top-1 font-bold text-sm text-[#333333] transition-all duration-200 pointer-events-none peer-focus:top-1  peer-focus:font-bold peer-focus:text-sm peer-focus:text-[#333333] peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-sm   "
    >
      {placeholder}
    </label>
    <ErrorMessage
      name={name}
      component="div"
      className="mt-1 text-sm text-red-600"
    />
  </div>
);

export const PasswordFormField = ({
  type,
  name,
  placeholder,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <Field
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={name}
        name={name}
        placeholder=" "
        className="w-full rounded-[4px] pt-7  border border-[#8A8B9F] px-6 h-[64px] focus:border-[#8A8B9F] focus:outline-none text-[#333333] peer "
      />
      <label
        htmlFor={name}
        className="absolute left-6 top-1 font-bold text-sm text-[#333333] transition-all duration-200 pointer-events-none peer-focus:top-1  peer-focus:font-bold peer-focus:text-sm peer-focus:text-[#333333] peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-sm   "
      >
        {placeholder}
      </label>
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );
};
