"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CollateralSelection from "../FormInputs/CollateralSelection";
import OptionInput from "../FormInputs/OptionInput";
import InputField from "../FormInputs/iputDetails";
import { CircleAlert } from "lucide-react";
import AmountInput from "../FormInputs/Input";
import { formatNaira } from "@/app/lib/utillity/nairaFormat";
import CustomizedButton from "../CustomizedButton";

export default function Form({ setStep }: { setStep: any }) {
  const [unsecured, setUnsecured] = useState(false);
  const loanOption = ["Personal Loan", "Business Loans", "Mortgage Loans"];
  const Repayment_Frequency = ["Monthly", "Yearly"];
  const DurationOptions = ["3 Months", "6 Months", "9 Months", "12 Months", "24 Months"];
  const categoryOptions = ["Secured Loan", "Unsecured Loan"];
  const DiscountdurationOptions = ["A week", "2 Weeks", "3 weeks", "4 weeks", "5 weeks"];
  const employmentStatus = ["Employed", "Unemployed"];

  const validationSchema = Yup.object({
    Product_Name: Yup.string().required("Product Name is required"),
    minAmount: Yup.string()
      .matches(/^\d+$/, "Minimum Amount must be a number")
      .max(9, "Minimum Amount should not exceed ₦999,999,999")
      .required("Minimum Amount is required")
      .test("min-max", "Minimum Amount should not be greater than Maximum Amount", function (value) {
        const { maxAmount } = this.parent;
        return !value || !maxAmount || parseInt(value) <= parseInt(maxAmount);
      }),
    maxAmount: Yup.string()
      .matches(/^\d+$/, "Maximum Amount must be a number")
      .max(9, "Maximum Amount should not exceed ₦999,999,999")
      .required("Maximum Amount is required")
      .test("max-min", "Maximum Amount should be greater than Minimum Amount", function (value) {
        const { minAmount } = this.parent;
        return !value || !minAmount || parseInt(value) >= parseInt(minAmount);
      }),
    loanType: Yup.string().required("Loan Type is required"),
    repaymentFrequency: Yup.string().required("Repayment Frequency is required"),
    duration: Yup.string().required("Duration is required"),
    interestRate: Yup.string().required("Interest Rate is required"),
    category: Yup.string().required("Category is required"),
    selectedCollaterals: Yup.array().min(1, "At least one collateral is required"),
    minCreditScore: Yup.string()
    .max(3, "minCreditScore should not exceed three numbers")
    .required("Minimum Credit Score is required")
    .test(
      "min-max-credit",
      "Minimum Credit Score should not be greater than Maximum Credit Score",
      function (value) {
        const { maxCreditScore } = this.parent;
        return !value || !maxCreditScore || parseInt(value) <= parseInt(maxCreditScore);
      }
    ),
  maxCreditScore: Yup.string()
    .max(3, "maxCreditScore should not exceed three numbers")
    .required("Maximum Credit Score is required")
    .test(
      "max-min-credit",
      "Maximum Credit Score must be greater than or equal to Minimum Credit Score",
      function (value) {
        const { minCreditScore } = this.parent;
        return !value || !minCreditScore || parseInt(value) >= parseInt(minCreditScore);
      }
    ),
    minimumIncome: Yup.string()
      .max(999999999, "Minimum Income should not exceed ₦999,999,999")
      .required("Minimum Income is required"),
    employmentStatus: Yup.string().required("Employment Status is required"),
    percentage: Yup.string()
      .max(2, "percentage should not exceed two numbers")
      .required("Percentage is required"),
    Discountduration: Yup.string().required("Discount Duration is required"),
  });

  const formik = useFormik({
    initialValues: {
      selectedCollaterals: ["Car", "Property"],
      amount: "80,000,000.00",
      duration: "",
      Product_Name: "",
      minAmount: "",
      maxAmount: "",
      interestRate: "",
      repaymentFrequency: "",
      loanType: "",
      category: "",
      minCreditScore: "",
      maxCreditScore: "",
      minimumIncome: "",
      employmentStatus: "",
      percentage: "",
      Discountduration: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      setStep(3);
    },
  });

  function formattedValue(maxAmount: string): string {
    throw new Error("Function not implemented.");
  }

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
                label="Maximum Amount"
                placeholder="Enter maximum amount"
                value={formatNaira(formik.values.maxAmount)}
                onChange={(e) => {
                  let newValue = e.target.value.replace(/,/g, "");
                  if (/^\d{0,9}$/.test(newValue)) {
                    if (newValue >= formik.values.minAmount || formik.values.minAmount === "") {
                      formik.setFieldValue("maxAmount", newValue);
                    }
                  }
                }}
                error={formik.touched.maxAmount && formik.errors.maxAmount}
                required
              />
            </div>
            <div>
              <AmountInput
                label="Minimum Amount"
                placeholder="Enter minimum amount"
                value={formatNaira(formik.values.minAmount)}
                onChange={(e) => {
                  let newValue = e.target.value.replace(/,/g, "");
                  if (/^\d{0,9}$/.test(newValue)) {
                    if (newValue <= formik.values.maxAmount || formik.values.maxAmount === "") {
                      formik.setFieldValue("minAmount", newValue);
                    }
                  }
                }}
                error={formik.touched.minAmount && formik.errors.minAmount}
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
                placeholder="Select Loan Type"
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
                placeholder="Select Repayment Frequency"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <OptionInput
                label="Duration"
                value={formik.values.duration}
                onChange={(value) => formik.setFieldValue("duration", value)}
                error={formik.touched.duration && formik.errors.duration}
                required
                options={DurationOptions}
                placeholder="Select Duration"
              />
            </div>
            <div>
              <InputField
                label="Interest Rate"
                placeholder="Enter Interest Rate"
                value={formik.values.interestRate}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^\d{0,2}$/.test(newValue)) {
                    formik.setFieldValue("interestRate", newValue);
                  }
                }}
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
                onChange={(value) => {
                  formik.setFieldValue("category", value);
                  if (value === "Unsecured Loan") {
                    setUnsecured(true);
                  } else if (value === "Secured Loan") {
                    setUnsecured(false);
                  }
                }}
                error={formik.touched.category && formik.errors.category}
                required
                options={categoryOptions}
                placeholder="Select Category"
              />
            </div>

            <div>
              <CollateralSelection
                label="Accepted Collateral"
                defaultSelectedOptions={formik.values.selectedCollaterals}
                onChange={(selectedOptions) =>
                  formik.setFieldValue("selectedCollaterals", selectedOptions)
                }
                error={formik.touched.selectedCollaterals && formik.errors.selectedCollaterals}
                required
                visibility={unsecured ? "hidden" : "block"}
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
      onChange={(e) => {
        const newValue = e.target.value;

        // Allow only numeric input and limit to 3 digits
        if (/^\d{0,3}$/.test(newValue)) {
          // Set the value in Formik
          formik.setFieldValue("minCreditScore", newValue);

          // Validate minCreditScore against maxCreditScore dynamically
          if (formik.values.maxCreditScore && parseInt(newValue) > parseInt(formik.values.maxCreditScore)) {
            formik.setFieldError("minCreditScore", "Minimum Credit Score should not be greater than Maximum Credit Score");
          } else {
            formik.setFieldError("minCreditScore", ""); // Clear the error if validation passes
          }
        }
      }}
      error={formik.touched.minCreditScore && formik.errors.minCreditScore}
      required
    />
  </div>
  <div>
    <InputField
      label="Maximum Credit Score"
      placeholder="Enter Maximum Credit Score"
      value={formik.values.maxCreditScore}
      onChange={(e) => {
        const newValue = e.target.value;

        // Allow only numeric input and limit to 3 digits
        if (/^\d{0,3}$/.test(newValue)) {
          // Set the value in Formik
          formik.setFieldValue("maxCreditScore", newValue);

          // Validate maxCreditScore against minCreditScore dynamically
          if (formik.values.minCreditScore && parseInt(newValue) < parseInt(formik.values.minCreditScore)) {
            formik.setFieldError("maxCreditScore", "Maximum Credit Score must be greater than or equal to Minimum Credit Score");
          } else {
            formik.setFieldError("maxCreditScore", ""); // Clear the error if validation passes
          }
        }
      }}
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
                value={formatNaira(formik.values.minimumIncome)}
                onChange={(e) => {
                  let newValue = e.target.value.replace(/,/g, "");
                  if (/^\d{0,9}$/.test(newValue)) {
                    {
                      formik.setFieldValue("minimumIncome", newValue);
                    }
                  }
                }}
                error={formik.touched.minimumIncome && formik.errors.minimumIncome}
                required
              />
            </div>
            <div>
              <OptionInput
                label="Employment Status"
                value={formik.values.employmentStatus}
                onChange={formik.handleChange("employmentStatus")}
                error={formik.touched.employmentStatus && formik.errors.employmentStatus}
                required
                options={employmentStatus}
                placeholder="Select Employment Status"
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
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^\d{0,2}$/.test(newValue)) {
                    formik.setFieldValue("percentage", newValue);
                  }
                }}
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
                placeholder="Select Discount Duration"
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-[822px]  pt-[24px]  flex justify-end">
         <CustomizedButton text={'Add Product'} />
        </div>
      </form>
    </>
  );
}