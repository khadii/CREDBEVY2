"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CollateralSelection from "../FormInputs/CollateralSelection";
import OptionInput from "../FormInputs/OptionInput";
import InputField from "../FormInputs/iputDetails";
import { CircleAlert } from "lucide-react";
import AmountInput from "../FormInputs/Input";
import { formatNaira } from "@/app/lib/utillity/nairaFormat";
import CustomizedButton from "../CustomizedButton";
import { useDispatch, useSelector } from "react-redux";

import { loan_products_single, update_loan } from "@/app/Redux/Loan_Product/loan_product_thunk";
import toast from "react-hot-toast";
import { AppDispatch } from "@/app/Redux/store";
import { useRouter, useParams } from "next/navigation";
import { resetLoanProductStateFormUpdate } from "@/app/Redux/Loan_Product/updateLoanProductSlice";
import AnimatedLoader from "../animation";

export default function UpdateLoanForm({product_id}:{product_id:any}) {
  const [unsecured, setUnsecured] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { success, error, loading, data } = useSelector(
    (state: any) => state.updateLoan
  );
  
  // Add selector for the single loan product data
  const { data: loanProductData, loading: productLoading } = useSelector(
    (state: any) => state.loanProductSingle
  );
  
  const router = useRouter();
  
  useEffect(() => {
    if (product_id) {
      dispatch(loan_products_single(product_id));
    }
  }, [product_id, dispatch]);

  // Set form initial values when loan product data is loaded
  useEffect(() => {
    if (loanProductData) {
    
      formik.setValues({
        selectedCollaterals: loanProductData?.category === "Unsecured Loan" ? [] : ["Car", "Property"],
        amount: "80,000,000.00", // Static value from your original form
        duration: loanProductData.duration || "",
        Product_Name: loanProductData.product_name || "",
        minAmount: loanProductData.minimum_amount?.toString() || "",
        maxAmount: loanProductData.maximum_amount?.toString() || "",
        interestRate: loanProductData.interest_rate?.toString() || "",
        repaymentFrequency: loanProductData.repayment_frequency || "",
        loanType: loanProductData.loan_type || "",
        category: loanProductData.category || "",
        minCreditScore: loanProductData.minimum_credit_score?.toString() || "",
        maxCreditScore: loanProductData.maximum_credit_score?.toString() || "",
        minimumIncome: loanProductData.minimum_income?.toString() || "",
        employmentStatus: loanProductData.employment_status || "",
        percentage: loanProductData.discount_percentage?.toString() || "",
        Discountduration: loanProductData.discount_duration || "",
      });

      // Set unsecured state based on category
      setUnsecured(loanProductData.category === "Unsecured Loan");
    }
  }, [loanProductData]);

  const loanOption = ["Personal Loan", "Business Loan", "Mortgage Loan"];
  const Repayment_Frequency = ["Monthly", "Yearly"];
  const DurationOptions = [
    "3 Months",
    "6 Months",
    "9 Months",
    "12 Months",
    "24 Months",
  ];
  const categoryOptions = ["Secured Loan", "Unsecured Loan"];
  const DiscountdurationOptions = [
    "A week",
    "2 Weeks",
    "3 weeks",
    "4 weeks",
    "5 weeks",
  ];
  const employmentStatus = ["Employed", "Unemployed"];

  const validationSchema = Yup.object({
    Product_Name: Yup.string().required("Product Name is required"),
    minAmount: Yup.string()
      .matches(/^\d+$/, "Minimum Amount must be a number")
      .max(9, "Minimum Amount should not exceed ₦999,999,999")
      .required("Minimum Amount is required")
      .test(
        "min-max",
        "Minimum Amount should not be greater than Maximum Amount",
        function (value) {
          const { maxAmount } = this.parent;
          return !value || !maxAmount || parseInt(value) <= parseInt(maxAmount);
        }
      ),
    maxAmount: Yup.string()
      .matches(/^\d+$/, "Maximum Amount must be a number")
      .max(9, "Maximum Amount should not exceed ₦999,999,999")
      .required("Maximum Amount is required")
      .test(
        "max-min",
        "Maximum Amount should be greater than Minimum Amount",
        function (value) {
          const { minAmount } = this.parent;
          return !value || !minAmount || parseInt(value) >= parseInt(minAmount);
        }
      ),
    loanType: Yup.string().required("Loan Type is required"),
    repaymentFrequency: Yup.string().required(
      "Repayment Frequency is required"
    ),
    duration: Yup.string().required("Duration is required"),
    interestRate: Yup.string().required("Interest Rate is required"),
    category: Yup.string().required("Category is required"),
    // selectedCollaterals: Yup.array().min(
    //   1,
    //   "At least one collateral is required"
    // ),
    minCreditScore: Yup.string()
      .max(3, "Minimum Credit Score should not exceed three digits")
      .required("Minimum Credit Score is required")
      .test(
        "min-credit-limit",
        "Minimum Credit Score should not be below 300",
        (value) => !value || parseInt(value) >= 300
      )
      .test(
        "min-max-credit",
        "Minimum Credit Score should not be greater than Maximum Credit Score",
        function (value) {
          const { maxCreditScore } = this.parent;
          return (
            !value ||
            !maxCreditScore ||
            parseInt(value) <= parseInt(maxCreditScore)
          );
        }
      ),
    maxCreditScore: Yup.string()
      .max(3, "Maximum Credit Score should not exceed three digits")
      .required("Maximum Credit Score is required")
      .test(
        "max-credit-limit",
        "Maximum Credit Score should be between 300 and 850",
        (value) => !value || (parseInt(value) >= 300 && parseInt(value) <= 850)
      )
      .test(
        "max-min-credit",
        "Maximum Credit Score must be greater than or equal to Minimum Credit Score",
        function (value) {
          const { minCreditScore } = this.parent;
          return (
            !value ||
            !minCreditScore ||
            parseInt(value) >= parseInt(minCreditScore)
          );
        }
      ),
    minimumIncome: Yup.string()
      .max(999999999, "Minimum Income should not exceed ₦999,999,999")
      .required("Minimum Income is required"),
    employmentStatus: Yup.string().required("Employment Status is required"),
    percentage: Yup.string()
      .max(2, "percentage should not exceed two numbers"),
    Discountduration: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      selectedCollaterals: unsecured ? [] : ["Car", "Property"],
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
      const productData = {
        credentials: {
          product_name: values.Product_Name,
          loan_type: values.loanType,
          repayment_frequency: values.repaymentFrequency,
          minimum_amount: values.minAmount,
          maximum_amount: values.maxAmount,
          duration: values.duration,
          interest_rate: values.interestRate,
          discount_percentage: values.percentage,
          discount_duration: values.Discountduration,
          minimum_credit_score: values.minCreditScore,
          maximum_credit_score: values.maxCreditScore,
          minimum_income: values.minimumIncome,
          employment_status: values.employmentStatus,
          category: values.category,
          collateral_uuids: values.selectedCollaterals,
        },
        product_id: product_id 
      };
      
      dispatch(update_loan(productData) as any);
    },
  });

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetLoanProductStateFormUpdate());
      router.push("/dashboard/loan-products");
    }
    if (error) {
      toast.error(error);
      dispatch(resetLoanProductStateFormUpdate());
    }
  }, [success, error, dispatch]);



  return (
    <>
      <p className="font-semibold text-4xl text-[#333333] mb-3 bg-[#FAFAFA]">
        Loan Products
      </p>
      <h1 className="font-bold text-[#8A8B9F] text-[14px] mb-[36px] flex flex-row items-center gap-2">
        Fill in the details below to update a loan product{" "}
        <CircleAlert size={14} />
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-[24px] pb-[76px]">
        <div className="w-full max-w-[822px] h-full min-h-[528px] px-[24px] pt-[24px]  pb-[60px] bg-white border-[#E5EAEF] rounded-lg border">
          <p className="text-[#333333] text-[20px] font-bold mb-[24px]">
            Product Info
          </p>

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
                    if (
                      newValue >= formik.values.minAmount ||
                      formik.values.minAmount === ""
                    ) {
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
                    if (
                      newValue <= formik.values.maxAmount ||
                      formik.values.maxAmount === ""
                    ) {
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
                onChange={(value) =>
                  formik.setFieldValue("repaymentFrequency", value)
                }
                error={
                  formik.touched.repaymentFrequency &&
                  formik.errors.repaymentFrequency
                }
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
            <InputField
              label="Interest Rate"
              placeholder="Enter Interest Rate"
              value={
                formik.values.interestRate
                  ? `${formik.values.interestRate}%`
                  : ""
              }
              onChange={(e) => {
                let newValue = e.target.value;

                // Remove the % symbol before validation
                newValue = newValue.replace(/%/g, "");

                // Validate the input (allow up to 2 digits and optional decimal)
                if (/^\d{0,2}(\.\d{0,1})?$/.test(newValue)) {
                  formik.setFieldValue("interestRate", newValue);
                }
              }}
              error={formik.touched.interestRate && formik.errors.interestRate}
              required
            />
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
                error={
                  formik.touched.selectedCollaterals &&
                  formik.errors.selectedCollaterals
                }
                required
                visibility={unsecured ? "hidden" : "block"}
              />
            </div>
          </div>
        </div>

        {/* Eligibility Criteria Section */}
        <div className="w-full max-w-[822px] h-full min-h-[262px] px-[24px] pt-[24px]  pb-[46px] bg-white border-[#E5EAEF] rounded-lg border">
          <p className="text-[#333333] text-[20px] font-bold mb-[24px]">
            Eligibility Criteria
          </p>
          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <InputField
                label="Minimum Credit Score"
                placeholder="Enter Minimum Credit Score"
                value={formik.values.minCreditScore}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^\d{0,3}$/.test(newValue)) {
                    formik.setFieldValue("minCreditScore", newValue);
                  }
                }}
                error={
                  formik.touched.minCreditScore && formik.errors.minCreditScore
                }
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
                  if (/^\d{0,3}$/.test(newValue)) {
                    formik.setFieldValue("maxCreditScore", newValue);
                  }
                }}
                error={
                  formik.touched.maxCreditScore && formik.errors.maxCreditScore
                }
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
                    formik.setFieldValue("minimumIncome", newValue);
                  }
                }}
                error={
                  formik.touched.minimumIncome && formik.errors.minimumIncome
                }
                required
              />
            </div>
            <div>
              <OptionInput
                label="Employment Status"
                value={formik.values.employmentStatus}
                onChange={(value) =>
                  formik.setFieldValue("employmentStatus", value)
                }
                error={
                  formik.touched.employmentStatus &&
                  formik.errors.employmentStatus
                }
                required
                options={employmentStatus}
                placeholder="Select Employment Status"
              />
            </div>
          </div>
        </div>

        {/* Discount Section */}
        <div className="w-full max-w-[822px] h-full max-h-[193px] px-[24px] pt-[24px]  pb-[61px] bg-white border-[#E5EAEF] rounded-lg border">
          <p className="text-[#333333] text-[20px] font-bold mb-[24px]">
            Discount
          </p>
          <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
            <div>
              <InputField
                label="Percentage"
                placeholder="Enter Percentage"
                value={
                  formik.values.percentage ? `${formik.values.percentage}%` : ""
                }
                onChange={(e) => {
                  let newValue = e.target.value;

                  // Remove the % symbol before validation
                  newValue = newValue.replace(/%/g, "");

                  // Validate the input (allow up to 2 digits)
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
                onChange={(value) =>
                  formik.setFieldValue("Discountduration", value)
                }
                error={
                  formik.touched.Discountduration &&
                  formik.errors.Discountduration
                }
                required
                options={DiscountdurationOptions}
                placeholder="Select Discount Duration"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div
          className={`w-full max-w-[822px]  pt-[24px]  flex justify-end ${
            loading && "cursor-not-allowed"
          }`}
        >
          <CustomizedButton
            text={loading ? "Updating Product..." : "Update Product"}
          />
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <AnimatedLoader isLoading={productLoading}/>
    </>
  );
}