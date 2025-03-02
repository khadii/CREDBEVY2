"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CollateralSelection from "../FormInputs/CollateralSelection";
import OptionInput from "../FormInputs/OptionInput";
import InputField from "../FormInputs/iputDetails";
import { CircleAlert } from "lucide-react";
import AmountInput from "../FormInputs/Input";

export default function Form({ setStep }: { setStep: any }) {
  const loanOption = ["Personal loan", "Public Loan"];
  const Repayment_Frequency = ["Monthly", "Yearly"];
  const categoryOptions = ["Secured Loan", "Unsecured Loan"];
  const DiscountdurationOptions = ["A week", "2 Weeks", "3 weeks", "4 weeks", "5 weeks"];

  const validationSchema = Yup.object({
    Product_Name: Yup.string().required("Product Name is required"),
    minAmount: Yup.string()
    .max(999999999, "Minimum Amount should not exceed ₦999,999,999")
    .required("Minimum Amount is required"),
  maxAmount: Yup.string()
    .max(999999999, "Maximum Amount should not exceed ₦999,999,999")
    .required("Maximum Amount is required"),
    loanType: Yup.string().required("Loan Type is required"),
    repaymentFrequency: Yup.string().required("Repayment Frequency is required"),
    duration: Yup.string().required("Duration is required"),
    interestRate: Yup.string().required("Interest Rate is required"),
    category: Yup.string().required("Category is required"),
    selectedCollaterals: Yup.array().min(1, "At least one collateral is required"),
    minCreditScore: Yup.string().max(3, "minCreditScore should not exceed three numbers").required("Minimum Credit Score is required"),
    maxCreditScore: Yup.string().max(3, "maxCreditScore should not exceed three numbers").required("Maximum Credit Score is required"),
    minimumIncome: Yup.string()
    .max(999999999, "Minimum Income should not exceed ₦999,999,999")
    .required("Minimum Income is required"),
    employmentStatus: Yup.string().required("Employment Status is required"),
    percentage: Yup.string().max(2, "percentage should not exceed two numbers").required("Percentage is required"),
    Discountduration: Yup.string().required("Discount Duration is required"),
  });

  const formik = useFormik({
    initialValues: {
      selectedCollaterals: ["Car", "Property"],
      amount: "80,000,000.00",
      duration: "3 Months",
      Product_Name: "Employee Loan",
      minAmount: "",
      maxAmount: "",
      interestRate: "30%",
      repaymentFrequency: "Monthly",
      loanType: "Personal Loan",
      category: "Secured Loan",
      minCreditScore: "",
      maxCreditScore: "",
      minimumIncome: "",
      employmentStatus: "",
      percentage: "",
      Discountduration: "A week",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      setStep(3);
    },
  });

  return (
    <>
      <p className="font-semibold text-4xl text-[#333333] mb-3 bg-[#FAFAFA]">Loan Products</p>
      <h1 className="font-bold text-[#8A8B9F] text-[14px] mb-[36px] flex flex-row items-center gap-2">
        Fill in the details below to add a loan product <CircleAlert size={14} />
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-[24px] pb-[76px]">
        <div className="w-full max-w-[822px] h-full min-h-[528px] px-[24px] pt-[24px]  pb-[60px] bg-white border-[#E5EAEF] rounded-lg border">
          <p className="text-[#333333] text-[20px] font-bold mb-[24px]">Product Info</p>

          <div className="mb-[24px] w-full">
            <InputField
              label="Product Name"
              placeholder="Enter Product Name"
              value={formik.values.Product_Name}
              onChange={formik.handleChange("Product_Name")}
              error={formik.touched.Product_Name && formik.errors.Product_Name}
              required
            />
          </div>
          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <AmountInput
                label="Minimum Amount"
                placeholder="Enter minimum amount"
                value={formik.values.minAmount}
                onChange={formik.handleChange("minAmount")}
                error={formik.touched.minAmount && formik.errors.minAmount}
                required
              />
            </div>
            <div>
              <AmountInput
                label="Maximum Amount"
                placeholder="Enter maximum amount"
                value={formik.values.maxAmount}
                onChange={formik.handleChange("maxAmount")}
                error={formik.touched.maxAmount && formik.errors.maxAmount}
                required
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <OptionInput
                label="Loan Type"
                value={formik.values.loanType}
                onChange={(value) => formik.setFieldValue("loanType", value)}
                error={formik.touched.loanType && formik.errors.loanType}
                required
                options={loanOption}
              />
            </div>
            <div>
              <OptionInput
                label="Repayment Frequency"
                value={formik.values.repaymentFrequency}
                onChange={(value) => formik.setFieldValue("repaymentFrequency", value)}
                error={formik.touched.repaymentFrequency && formik.errors.repaymentFrequency}
                required
                options={Repayment_Frequency}
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <InputField
                label="Duration"
                placeholder="Enter Duration"
                value={formik.values.duration}
                onChange={formik.handleChange("duration")}
                error={formik.touched.duration && formik.errors.duration}
                required
              />
            </div>
            <div>
              <InputField
                label="Interest Rate"
                placeholder="Enter Interest Rate"
                value={formik.values.interestRate}
                onChange={formik.handleChange("interestRate")}
                error={formik.touched.interestRate && formik.errors.interestRate}
                required
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <OptionInput
                label="Category"
                value={formik.values.category}
                onChange={(value) => formik.setFieldValue("category", value)}
                error={formik.touched.category && formik.errors.category}
                required
                options={categoryOptions}
              />
            </div>
            <div>
              <CollateralSelection
                label="Accepted Collateral"
                defaultSelectedOptions={formik.values.selectedCollaterals}
                onChange={(selectedOptions) => formik.setFieldValue("selectedCollaterals", selectedOptions)}
                error={formik.touched.selectedCollaterals && formik.errors.selectedCollaterals}
                required
              />
            </div>
          </div>
        </div>
        {/* form2 */}

        <div className="w-full max-w-[822px] h-full min-h-[262px] px-[24px] pt-[24px]  pb-[46px] bg-white border-[#E5EAEF] rounded-lg border">
          <p className="text-[#333333] text-[20px] font-bold mb-[24px]">Eligibility Criteria</p>
          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <InputField
                label="Minimum Credit Score"
                placeholder="Enter Minimum Credit Score"
                value={formik.values.minCreditScore}
                onChange={formik.handleChange("minCreditScore")}
                error={formik.touched.minCreditScore && formik.errors.minCreditScore}
                required
              />
            </div>
            <div>
              <InputField
                label="Maximum Credit Score"
                placeholder="Enter Maximum Credit Score"
                value={formik.values.maxCreditScore}
                onChange={formik.handleChange("maxCreditScore")}
                error={formik.touched.maxCreditScore && formik.errors.maxCreditScore}
                required
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <AmountInput
                label="Minimum Income"
                placeholder="Enter Minimum Income"
                value={formik.values.minimumIncome}
                onChange={formik.handleChange("minimumIncome")}
                error={formik.touched.minimumIncome && formik.errors.minimumIncome}
                required
              />
            </div>
            <div>
              <InputField
                label="Employment Status"
                placeholder="Enter Employment Status"
                value={formik.values.employmentStatus}
                onChange={formik.handleChange("employmentStatus")}
                error={formik.touched.employmentStatus && formik.errors.employmentStatus}
                required
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-[822px] h-full max-h-[193px] px-[24px] pt-[24px]  pb-[61px] bg-white border-[#E5EAEF] rounded-lg border">
          <p className="text-[#333333] text-[20px] font-bold mb-[24px]">Discount</p>
          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <InputField
                label="Percentage"
                placeholder="Enter Percentage"
                value={formik.values.percentage}
                onChange={formik.handleChange("percentage")}
                error={formik.touched.percentage && formik.errors.percentage}
                required
              />
            </div>
            <div>
              <OptionInput
                label="Duration"
                value={formik.values.Discountduration}
                onChange={(value) => formik.setFieldValue("Discountduration", value)}
                error={formik.touched.Discountduration && formik.errors.Discountduration}
                required
                options={DiscountdurationOptions}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-[822px]  pt-[24px]  flex justify-end">
          <button
            type="submit"
            className="bg-[#156064] text-white w-[134px] h-[36px] rounded-[4px] text-center text-[12px] font-bold"
          >
            Add Product
          </button>
        </div>
      </form>
    </>
  );
}