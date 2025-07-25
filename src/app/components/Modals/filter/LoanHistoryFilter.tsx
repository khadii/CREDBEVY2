import React from "react";
// import Modal from "../wallet/modal";
// import { Dropdown, InputField, Label, Title } from "../wallet/fundWallet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; // Import useDispatch
import { AppDispatch } from "@/app/Redux/store"; // Adjust path as necessary for AppDispatch

import { fetchLoanRequests } from "@/app/Redux/LoanHistory/loanRequests_thunk";
import Modal from "../wallet/modal";
import { Dropdown, InputField, Label, Title } from "../wallet/fundWallet";
// import { fetchLoanRequests } from "@/app/Redux/Loan_Product/loan_product_thunk"; // Adjust path to your thunk file

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setHasActiveFilter: (hasActive: boolean) => void; // Add this prop
}

const formatNaira = (value: string | number) => {
  if (!value) return "";
  const num = typeof value === "string" ? value.replace(/\D/g, "") : value;
  if (!num) return "";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(num));
};

const parseNaira = (value: string) => {
  return value.replace(/₦|,|\s/g, "");
};

interface FormValues {
  emailAddress: string;
  minAmountRequested: string;
  maxAmountRequested: string;
  minCreditScore: string;
  maxCreditScore: string;
  status: string;
}

const validationSchema = Yup.object().shape({
  emailAddress: Yup.string().trim().email("Invalid email address").nullable(),

  minAmountRequested: Yup.string()
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive-or-zero", "Must be a positive number or zero", (value) => {
      return !value || Number(parseNaira(value)) >= 0;
    })
    .test("is-less-than-max", "Min amount cannot be greater than max amount", function (value) {
      const maxAmount = this.parent.maxAmountRequested;
      if (!maxAmount || !value) return true;
      return Number(parseNaira(value)) <= Number(parseNaira(maxAmount));
    }),

  maxAmountRequested: Yup.string()
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive", "Must be positive", (value) => {
      return !value || Number(parseNaira(value)) > 0;
    })
    .test("is-greater-than-min", "Max amount cannot be less than min amount", function (value) {
      const minAmount = this.parent.minAmountRequested;
      if (!minAmount || !value) return true;
      return Number(parseNaira(value)) >= Number(parseNaira(minAmount));
    }),

  minCreditScore: Yup.number()
    .typeError("Min score must be a number")
    .integer("Min score must be an integer")
    .min(0, "Min score cannot be negative")
    .max(1000, "Min score cannot exceed 1000")
    .nullable(),

  maxCreditScore: Yup.number()
    .typeError("Max score must be a number")
    .integer("Max score must be an integer")
    .min(0, "Max score cannot be negative")
    .max(1000, "Max score cannot exceed 1000")
    .nullable()
    .test("is-greater-than-min", "Max score cannot be less than min score", function (value) {
      const minScore = this.parent.minCreditScore;
      if (value === undefined || minScore === undefined || value === null || minScore === null) return true;
      return value >= minScore;
    }),

  status: Yup.string().nullable(),
});

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function LoanHistoryFilterModal({ isOpen, onClose, setHasActiveFilter }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<FormValues>({
    initialValues: {
      emailAddress: "",
      minAmountRequested: "",
      maxAmountRequested: "",
      minCreditScore: "",
      maxCreditScore: "",
      status: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const filters = {
        email: values.emailAddress || undefined,
        min_amount: values.minAmountRequested ? Number(parseNaira(values.minAmountRequested)) : undefined,
        max_amount: values.maxAmountRequested ? Number(parseNaira(values.maxAmountRequested)) : undefined,
        min_credit_score: values.minCreditScore ? Number(values.minCreditScore) : undefined,
        max_credit_score: values.maxCreditScore ? Number(values.maxCreditScore) : undefined,
        status: values.status || undefined,
        page: 1, // Always reset to page 1 on new filter
      };

      dispatch(fetchLoanRequests(filters));
      setHasActiveFilter(true); 
      resetForm();
      onClose();
    },
  });

  const handleAmountChange = (field: keyof FormValues, value: string) => {
    const parsedValue = parseNaira(value);
    formik.setFieldValue(field, formatNaira(parsedValue));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#333333]">Filter</h2>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Address */}
          <div className="mb-4">
            <Label htmlFor="emailAddress">Email Address:</Label>
            <InputField
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              placeholder="e.g. user@example.com"
            />
            {formik.touched.emailAddress && formik.errors.emailAddress && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.emailAddress}
              </div>
            )}
          </div>

          {/* Amount Requested */}
          <Title>Amount Requested</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minAmountRequested">Min Amount:</Label>
              <InputField
                id="minAmountRequested"
                name="minAmountRequested"
                type="text"
                value={formik.values.minAmountRequested}
                onChange={(e:any) => handleAmountChange("minAmountRequested", e.target.value)}
                placeholder="₦0"
              />
              {formik.touched.minAmountRequested && formik.errors.minAmountRequested && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.minAmountRequested}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="maxAmountRequested">Max Amount:</Label>
              <InputField
                id="maxAmountRequested"
                name="maxAmountRequested"
                type="text"
                value={formik.values.maxAmountRequested}
                onChange={(e:any) => handleAmountChange("maxAmountRequested", e.target.value)}
                placeholder="₦500,000"
              />
              {formik.touched.maxAmountRequested && formik.errors.maxAmountRequested && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.maxAmountRequested}
                </div>
              )}
            </div>
          </div>

          {/* Credit Score */}
          <Title>Credit Score</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minCreditScore">Min Score:</Label>
              <InputField
                id="minCreditScore"
                name="minCreditScore"
                type="number"
                value={formik.values.minCreditScore}
                onChange={formik.handleChange}
                placeholder="400"
              />
              {formik.touched.minCreditScore && formik.errors.minCreditScore && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.minCreditScore}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="maxCreditScore">Max Score:</Label>
              <InputField
                id="maxCreditScore"
                name="maxCreditScore"
                type="number"
                value={formik.values.maxCreditScore}
                onChange={formik.handleChange}
                placeholder="800"
              />
              {formik.touched.maxCreditScore && formik.errors.maxCreditScore && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.maxCreditScore}
                </div>
              )}
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="mb-4">
            <Label htmlFor="status">Status</Label>
            <Dropdown
              id="status"
              name="status"
              value={formik.values.status}
              onChange={(value:any) => formik.setFieldValue("status", value)}
              options={statusOptions}
              placeholder="Select Status"
            />
            {formik.touched.status && formik.errors.status && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.status}
              </div>
            )}
          </div>

          <div className="w-full mt-[40px]">
            <button
              type="submit"
              className="w-full bg-[#156064] text-white py-[10px] px-4 rounded-[4px] hover:bg-[#0e4a4d] transition-colors font-semibold text-xs"
            >
              Apply Filter
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
