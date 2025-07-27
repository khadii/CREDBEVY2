import React from "react";
import Modal from "../wallet/modal";
import { Dropdown, InputField, Label, Title } from "../wallet/fundWallet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/Redux/store"; // Adjust path as necessary
import { fetchCustomerLoanRequests } from "@/app/Redux/customer/customer_request_slice";


export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setHasActiveFilter: (hasActive: boolean) => void;
}

interface FormValues {
  emailAddress: string;
  minCreditScore: string;
  maxCreditScore: string;
  dateFrom: string;
  dateTo: string;
}

const validationSchema = Yup.object().shape({
  emailAddress: Yup.string().trim().email("Invalid email address").nullable(),
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
  dateFrom: Yup.date()
    .nullable()
    .max(Yup.ref("dateTo"), "From date cannot be after To date")
    .typeError("Invalid date"),
  dateTo: Yup.date()
    .nullable()
    .min(Yup.ref("dateFrom"), "To date cannot be before From date")
    .typeError("Invalid date"),
});

export default function CustomerFilterModal({ isOpen, onClose, setHasActiveFilter }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<FormValues>({
    initialValues: {
      emailAddress: "",
      minCreditScore: "",
      maxCreditScore: "",
      dateFrom: "",
      dateTo: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const filters = {
        email: values.emailAddress || undefined,
        min_credit_score: values.minCreditScore ? Number(values.minCreditScore) : undefined,
        max_credit_score: values.maxCreditScore ? Number(values.maxCreditScore) : undefined,
        start_date: values.dateFrom || undefined,
        end_date: values.dateTo || undefined,
      };

      dispatch(fetchCustomerLoanRequests(filters));
      setHasActiveFilter(true); 
      resetForm();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 z-50">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">Filter Customers</h2>

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
              placeholder="e.g. customer@example.com"
            />
            {formik.touched.emailAddress && formik.errors.emailAddress && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.emailAddress}
              </div>
            )}
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
                placeholder="300"
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
                placeholder="850"
              />
              {formik.touched.maxCreditScore && formik.errors.maxCreditScore && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.maxCreditScore}
                </div>
              )}
            </div>
          </div>

          {/* Date Range */}
          <Title>Date Range</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFrom">From:</Label>
              <InputField
                id="dateFrom"
                name="dateFrom"
                type="date"
                value={formik.values.dateFrom}
                onChange={formik.handleChange}
              />
              {formik.touched.dateFrom && formik.errors.dateFrom && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.dateFrom}
                </div>
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
              />
              {formik.touched.dateTo && formik.errors.dateTo && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.dateTo}
                </div>
              )}
            </div>
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
