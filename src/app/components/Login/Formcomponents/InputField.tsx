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
  <div className="w-full">
    <Field
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className="w-full rounded-[4px] border border-gray-300 px-6 py-5 focus:border-[#0F5959] focus:outline-none text-[#24262D]"
    />
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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <Field
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-[4px] border border-gray-300 px-6 py-5 focus:border-[#0F5959] focus:outline-none text-[#24262D]"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 "
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
