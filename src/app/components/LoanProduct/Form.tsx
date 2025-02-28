'use client'
import React, { useState } from "react";
import CollateralSelection from "../FormInputs/CollateralSelection";
import OptionInput from "../FormInputs/OptionInput";
import InputField from "../FormInputs/iputDetails";
import MinimumAmountInput from "../FormInputs/Input";
import { CircleAlert } from "lucide-react";

export default function Form({setStep}:{setStep:any}) {

  const loanOption= ["  Personal loan", "  Public Loan"];
  const Repayment_Frequency=[
    'Monthly',
    'Yearly'
  ]
  const categoryOptions=[
    'Secured Loan',
    'unSecured Loan'
  ]

  const [selectedCollaterals, setSelectedCollaterals] = useState(["Car", "Property"]);
  const [amount, setAmount] = useState("80,000,000.00");
  const [duration, setDuration] = useState("3 Months");
  const [Product_Name, setProduct_Name] = useState("Employee Loan");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [interestRate, setInterestRate] = useState("30%");
  const [repaymentFrequency, setRepaymentFrequency] = useState("Monthly");
  const [loanType, setLoanType] = useState("Personal Loan");
  const [category, setCategory] = useState("Secured Loan");
  const [minCreditScore, setMinCreditScore] = useState("");
  const [maxCreditScore, setMaxCreditScore] = useState("");
  const [minimumIncome, setMinimumIncome] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [percentage, setPercentage] = useState("");
  const [Discountduration, setDiscountDuration] = useState("");

  const handleCollateralChange = (selectedOptions: string[]) => {
    setSelectedCollaterals(selectedOptions);
  };

  const handleAmountChange = (e: any) => {
    let value = e.target.value.replace(/[^\d.]/g, "");

    if (value) {
      const parts = value.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      value = parts.join(".");
      if (parts.length === 1) {
        value += ".00";
      } else if (parts[1].length === 1) {
        value += "0";
      } else if (parts[1].length > 2) {
        value = parts[0] + "." + parts[1].substring(0, 2);
      }
    }

    setAmount(value);
  };

  const handleDurationChange = (e: any) => {
    setDuration(e.target.value);
  };

  const handleProduct_NameChange = (e: any) => {
    setProduct_Name(e.target.value);
  };

  const handleMinAmountChange = (e: any) => {
    setMinAmount(e.target.value);
  };

  const handleMaxAmountChange = (e: any) => {
    setMaxAmount(e.target.value);
  };

  const handleInterestRateChange = (e: any) => {
    setInterestRate(e.target.value);
  };

  const handleRepaymentFrequencyChange = (selectedOption: string) => {
    setRepaymentFrequency(selectedOption);
  };

  const handleLoanTypeChange = (selectedOption: string) => {
    setLoanType(selectedOption);
  };

  const handleCategoryChange = (selectedOption: string) => {
    setCategory(selectedOption);
  };

  const handleMinCreditScoreChange = (e: any) => {
    setMinCreditScore(e.target.value);
  };

  const handleMaxCreditScoreChange = (e: any) => {
    setMaxCreditScore(e.target.value);
  };

  const handleMinimumIncomeChange = (e: any) => {
    setMinimumIncome(e.target.value);
  };

  const handleEmploymentStatusChange = (e: any) => {
    setEmploymentStatus(e.target.value);
  };

  const handlePercentageChange = (e: any) => {
    setPercentage(e.target.value);
  };

  const handleDiscountDurationChange = (e: any) => {
    setDiscountDuration(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Gather all form data
    const formData = {
      selectedCollaterals,
      amount,
      duration,
      Product_Name,
      minAmount,
      maxAmount,
      interestRate,
      repaymentFrequency,
      loanType,
      category,
      minCreditScore,
      maxCreditScore,
      minimumIncome,
      employmentStatus,
      percentage,
      Discountduration,
    };

    // Log the form data (you can replace this with an API call or other logic)
    console.log("Form Data:", formData);

    // Optionally, you can reset the form after submission
    // setSelectedCollaterals(['Car', 'Property']);
    // setAmount('80,000,000.00');
    // setDuration('3 Months');
    // setDuration2('3 Months');
  };

  return (
  <>
    <p className="font-semibold text-4xl text-[#333333] mb-3 bg-[#FAFAFA] ">
    Loan Products List
       </p>
       <h1 className="font-bold text-[#8A8B9F] text-[14px] mb-[36px] flex flex-row items-center gap-2">Fill in the details below to add a loan product <CircleAlert size={14} /></h1>
    <form onSubmit={handleSubmit} className="space-y-[24px] pb-[76px]">
      <div className="w-full max-w-[822px] h-full max-h-[528px] px-[24px] pt-[24px]  pb-[60px] bg-white border-[#E5EAEF] rounded-lg border">
        <p className="text-[#333333] text-[20px] font-bold mb-[24px]">Product Info</p>

        <div className="mb-[24px] w-full">
          <InputField
            label="Product Name"
            placeholder="Enter Product Name"
            value={Product_Name}
            onChange={handleProduct_NameChange}
            required
          />
        </div>
        <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
          <div>
            <MinimumAmountInput
              label="Minimum Amount"
              placeholder="Enter minimum amount"
              value={minAmount}
              onChange={handleMinAmountChange}
              required
            />
          </div>
          <div>
            <MinimumAmountInput
              label="Maximum Amount"
              placeholder="Enter maximum amount"
              value={maxAmount}
              onChange={handleMaxAmountChange}
              required
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
          <div>
            <OptionInput
              label="Loan Type"
              value={loanType}
              onChange={handleLoanTypeChange}
              required
              options={loanOption}
            />
          </div>
          <div>
            <OptionInput
              label="Repayment Frequency"
              value={repaymentFrequency}
              onChange={handleRepaymentFrequencyChange}
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
              value={duration}
              onChange={handleDurationChange}
              required
            />
          </div>
          <div>
            <InputField
              label="Interest Rate"
              placeholder="Enter Interest Rate"
              value={interestRate}
              onChange={handleInterestRateChange}
              required
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
          <div>
            <OptionInput
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              required
              options={categoryOptions}
            />
          </div>
          <div>
            <CollateralSelection
              label="Accepted Collateral"
              defaultSelectedOptions={selectedCollaterals}
              onChange={handleCollateralChange}
              required
            />
          </div>
        </div>
      </div>
      {/* form2 */}

      <div className="w-full max-w-[822px] h-full max-h-[262px] px-[24px] pt-[24px]  pb-[46px] bg-white border-[#E5EAEF] rounded-lg border">
        <p className="text-[#333333] text-[20px] font-bold mb-[24px]">Eligibility Criteria</p>
        <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
          <div>
            <InputField
              label="Minimum Credit Score"
              placeholder="Enter Minimum Credit Score"
              value={minCreditScore}
              onChange={handleMinCreditScoreChange}
              required
            />
          </div>
          <div>
            <InputField
              label="Maximum Credit Score"
              placeholder="Enter Maximum Credit Score"
              value={maxCreditScore}
              onChange={handleMaxCreditScoreChange}
              required
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 space-x-[24px] mb-[24px]">
          <div>
            <InputField
              label="Minimum Income"
              placeholder="Enter Minimum Income"
              value={minimumIncome}
              onChange={handleMinimumIncomeChange}
              required
            />
          </div>
          <div>
            <InputField
              label="Employment Status"
              placeholder="Enter Employment Status"
              value={employmentStatus}
              onChange={handleEmploymentStatusChange}
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
              value={percentage}
              onChange={handlePercentageChange}
              required
            />
          </div>
          <div>
            <InputField
              label="Duration"
              placeholder="Enter Duration"
              value={Discountduration}
              onChange={handleDiscountDurationChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[822px]  pt-[24px]  flex justify-end">
        <button type="submit" className="bg-[#156064] text-white w-[134px] h-[36px] rounded-[4px] text-center text-[12px] font-bold" onClick={()=>setStep(3)}>
        Add Product
        </button>
      </div>
    </form></>
  );
}