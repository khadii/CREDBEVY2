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
    setHasActiveFilter: (hasActiveFilter:boolean) => void;
}

interface FormValues {
  loanType: string;
  dateFrom: string;
  dateTo: string;
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
  dateFrom: Yup.string().required("Start date is required"),
  dateTo: Yup.string()
    .required("End date is required")
    .test("is-after-start", "End date must be after start date", function (value) {
      const { dateFrom } = this.parent;
      return !value || !dateFrom || new Date(value) >= new Date(dateFrom);
    }),
  shortestDuration: Yup.string()
    .required("Shortest duration is required")
    .test("is-less-than-longest", "Shortest duration cannot be longer than longest duration", function (value) {
      const longestDuration = this.parent.longestDuration;
      if (!longestDuration || !value) return true;
      return parseDuration(value) <= parseDuration(longestDuration);
    }),
  longestDuration: Yup.string()
    .required("Longest duration is required")
    .test("is-greater-than-shortest", "Longest duration cannot be shorter than shortest duration", function (value) {
      const shortestDuration = this.parent.shortestDuration;
      if (!shortestDuration || !value) return true;
      return parseDuration(value) >= parseDuration(shortestDuration);
    }),
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

export default function LoanProductFilter({ isOpen, onClose, setHasActiveFilter }: ModalProps) {
    const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik<FormValues>({
  initialValues: {
  loanType: "",
  dateFrom: "",
  dateTo: "",
  shortestDuration: "",
  longestDuration: "",
  status: "",
},

    validationSchema,
onSubmit: (values, { resetForm }) => {
  const filters = {
    search: values.loanType,
    filter_by: values.status,
    start_date: values.dateFrom,
    end_date: values.dateTo,
    paginate: true,
    page: 1,
    shortest_duration: values.shortestDuration,
    longest_duration: values.longestDuration,
  };

  dispatch(_loan_products_all(filters));
  resetForm();
      setHasActiveFilter(true);
  onClose();
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

         {/* Date Range */}
<Title htmlFor="dateRange">Date Range</Title>
<div className="mb-4 grid grid-cols-2 gap-4">
  <div>
    <Label htmlFor="dateFrom">From:</Label>
    <InputField
      id="dateFrom"
      name="dateFrom"
      type="date"
      value={formik.values.dateFrom}
      onChange={formik.handleChange}
      placeholder="DD-MM-YYYY"
    />
    {formik.touched.dateFrom && formik.errors.dateFrom && (
      <div className="text-red-500 text-xs mt-1">{formik.errors.dateFrom}</div>
    )}
  </div>

  <div>
    <Label htmlFor="dateTo">To:</Label>
    <InputField
      id="dateTo"
      name="dateTo"
      type="date"
      value={formik.values.dateTo}
      onChange={formik.handleChange}
      placeholder="DD-MM-YYYY"
    />
    {formik.touched.dateTo && formik.errors.dateTo && (
      <div className="text-red-500 text-xs mt-1">{formik.errors.dateTo}</div>
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
                {/* <span className="ml-2 text-gray-600">months</span> Suffix */}
              </div>
              {formik.touched.shortestDuration && formik.errors.shortestDuration && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.shortestDuration}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="longestDuration">Longest:</Label>
              <div className="flex items-center">
                <InputField
                  id="longestDuration"
                  name="longestDuration"
                  type="number" 
                  value={formik.values.longestDuration} 
                  onChange={(e) => formik.setFieldValue("longestDuration", e.target.value)}
                  placeholder="12"
                />
                {/* <span className="ml-2 text-gray-600">months</span> */}
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