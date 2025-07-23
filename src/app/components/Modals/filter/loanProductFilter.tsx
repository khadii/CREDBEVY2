import React from "react";
import Modal from "../wallet/modal";
import { Dropdown, InputField, Label, Title } from "../wallet/fundWallet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { _loan_products_all } from "@/app/Redux/Loan_Product/loan_product_thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  loanType: string;
  minAmount: string;
  maxAmount: string;
  shortestDuration: string;
  longestDuration: string;
  status: string;
}

const formatDuration = (value: string) => {
  if (!value) return "";
  const num = value.replace(/\D/g, "");
  return num ? `${num} months` : "";
};

const parseDuration = (value: string) => {
  return value.replace(/\D/g, "");
};

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

const validationSchema = Yup.object().shape({
  loanType: Yup.string().required("Loan type is required"),
  minAmount: Yup.string()
    .required("Minimum amount is required")
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive", "Must be positive", (value) => {
      return !value || Number(parseNaira(value)) > 0;
    })
    .test(
      "is-less-than-max",
      "Minimum amount cannot be greater than maximum amount",
      function (value) {
        const maxAmount = this.parent.maxAmount;
        if (!maxAmount || !value) return true;
        return Number(parseNaira(value)) <= Number(parseNaira(maxAmount));
      }
    ),
  maxAmount: Yup.string()
    .required("Maximum amount is required")
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive", "Must be positive", (value) => {
      return !value || Number(parseNaira(value)) > 0;
    })
    .test(
      "is-greater-than-min",
      "Maximum amount cannot be less than minimum amount",
      function (value) {
        const minAmount = this.parent.minAmount;
        if (!minAmount || !value) return true;
        return Number(parseNaira(value)) >= Number(parseNaira(minAmount));
      }
    ),
  shortestDuration: Yup.string()
    .required("Shortest duration is required")
    .test(
      "is-less-than-longest",
      "Shortest duration cannot be longer than longest duration",
      function (value) {
        const longestDuration = this.parent.longestDuration;
        if (!longestDuration || !value) return true;
        return parseDuration(value) <= parseDuration(longestDuration);
      }
    ),
  longestDuration: Yup.string()
    .required("Longest duration is required")
    .test(
      "is-greater-than-shortest",
      "Longest duration cannot be shorter than shortest duration",
      function (value) {
        const shortestDuration = this.parent.shortestDuration;
        if (!shortestDuration || !value) return true;
        return parseDuration(value) >= parseDuration(shortestDuration);
      }
    ),
  status: Yup.string().required("Status is required"),
});

const options = [
  { value: "Personal Loan", label: "Personal Loan" },
  { value: "Business Loan", label: "Business Loan" },
  { value: "Mortgage Loan", label: "Mortgage Loan" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default function LoanProductFilter({ isOpen, onClose }: ModalProps) {
    const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik<FormValues>({
    initialValues: {
      loanType: "",
      minAmount: "",
      maxAmount: "",
      shortestDuration: "",
      longestDuration: "",
      status: "",
    },
    validationSchema,
   onSubmit: (values, { resetForm }) => {
  const filters = {
    search: values.loanType,
    filter_by: values.status,
    start_date: "", 
    end_date: "",  
    paginate: true,
    page: 1,
    max_amount: parseNaira(values.maxAmount),
    shortest_duration: values.shortestDuration,
    longest_duration: values.longestDuration,
  };

  dispatch(_loan_products_all(filters));
  resetForm(); // Reset form after submit
  onClose();   // Close the modal
},

  });

  const handleDurationChange = (
    field: "shortestDuration" | "longestDuration",
    value: string
  ) => {
    const numValue = value.replace(/\D/g, "");
    const formattedValue = numValue ? `${numValue} months` : "";
    formik.setFieldValue(field, formattedValue);
  };

  const handleAmountChange = (
    field: "minAmount" | "maxAmount",
    value: string
  ) => {
    const parsedValue = parseNaira(value);
    formik.setFieldValue(field, formatNaira(parsedValue));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 z-50">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">Filter</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Loan Type Dropdown - unchanged from previous implementation */}
          <div className="mb-4">
            <Label htmlFor="loanType">Type</Label>
            <Dropdown
              id="loanType"
              name="loanType"
              value={formik.values.loanType}
              onChange={(value) => formik.setFieldValue("loanType", value)}
              options={options}
              placeholder="Select Loan Type"
            />
            {formik.touched.loanType && formik.errors.loanType && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.loanType}
              </div>
            )}
          </div>

          {/* Average Income Fields - updated implementation */}
          <Title htmlFor="averageIncome">Average Income</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minAmount">Min Amount:</Label>
              <InputField
                id="minAmount"
                name="minAmount"
                type="text" // Changed to text
                value={formik.values.minAmount}
                onChange={(e) => handleAmountChange("minAmount", e.target.value)}
                placeholder="₦200,000"
              />
              {formik.touched.minAmount && formik.errors.minAmount && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.minAmount}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="maxAmount">Max Amount:</Label>
              <InputField
                id="maxAmount"
                name="maxAmount"
                type="text" // Changed to text
                value={formik.values.maxAmount}
                onChange={(e) => handleAmountChange("maxAmount", e.target.value)}
                placeholder="₦200,000"
              />
              {formik.touched.maxAmount && formik.errors.maxAmount && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.maxAmount}
                </div>
              )}
            </div>
          </div>

        {/* Duration Fields - updated implementation */}
          <Title htmlFor="duration">Duration</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shortestDuration">Shortest:</Label>
              <div className="flex items-center"> {/* Add a flex container */}
                <InputField
                  id="shortestDuration"
                  name="shortestDuration"
                  type="number" // Changed to number to allow only numeric input
                  value={formik.values.shortestDuration} // This will now hold just the number
                  onChange={(e) => formik.setFieldValue("shortestDuration", e.target.value)} // Direct update to number
                  placeholder="3" // Updated placeholder
                />
                <span className="ml-2 text-gray-600">months</span> {/* Suffix */}
              </div>
              {formik.touched.shortestDuration && formik.errors.shortestDuration && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.shortestDuration}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="longestDuration">Longest:</Label>
              <div className="flex items-center"> {/* Add a flex container */}
                <InputField
                  id="longestDuration"
                  name="longestDuration"
                  type="number" // Changed to number to allow only numeric input
                  value={formik.values.longestDuration} // This will now hold just the number
                  onChange={(e) => formik.setFieldValue("longestDuration", e.target.value)} // Direct update to number
                  placeholder="12" // Updated placeholder
                />
                <span className="ml-2 text-gray-600">months</span> {/* Suffix */}
              </div>
              {formik.touched.longestDuration && formik.errors.longestDuration && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.longestDuration}
                </div>
              )}
            </div>
          </div>

          {/* Status Dropdown - unchanged from previous implementation */}
          <div className="mb-4">
            <Label htmlFor="status">Status</Label>
            <Dropdown
              id="status"
              name="status"
              value={formik.values.status}
              onChange={(value) => formik.setFieldValue("status", value)}
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