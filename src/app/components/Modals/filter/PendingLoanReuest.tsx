import React from "react";
import Modal from "../wallet/modal"; // Assuming this path is correct
import { InputField, Label, Title } from "../wallet/fundWallet"; // Assuming these paths are correct
import { useFormik } from "formik";
import * as Yup from "yup";
import { _pending_loans } from "@/app/Redux/dashboard/dashboardThunk";
import { AppDispatch } from "@/app/Redux/store";
import { useDispatch } from "react-redux";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setHasActiveFilter: (hasActiveFilter:boolean) => void;
}

// Helper functions for Naira formatting (reused from previous implementation)
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
  dateFrom: string;
  dateTo: string;
  minAverageIncome: string;
  maxAverageIncome: string;
  minAmountRequested: string;
  maxAmountRequested: string;
  minCreditScore: string;
  maxCreditScore: string;
}

const validationSchema = Yup.object().shape({
  dateFrom: Yup.date()
    .nullable()
    .max(Yup.ref("dateTo"), "From date cannot be after To date")
    .typeError("Invalid date")
    .required("From date is required"),
  dateTo: Yup.date()
    .nullable()
    .min(Yup.ref("dateFrom"), "To date cannot be before From date")
    .typeError("Invalid date")
    .required("To date is required"),

  minAverageIncome: Yup.string()
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive", "Must be positive", (value) => {
      return !value || Number(parseNaira(value)) >= 0; // Allow zero for min amounts
    })
    .test(
      "is-less-than-max",
      "Min income cannot be greater than max income",
      function (value) {
        const maxIncome = this.parent.maxAverageIncome;
        if (!maxIncome || !value) return true;
        return Number(parseNaira(value)) <= Number(parseNaira(maxIncome));
      }
    ),
  maxAverageIncome: Yup.string()
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive", "Must be positive", (value) => {
      return !value || Number(parseNaira(value)) > 0;
    })
    .test(
      "is-greater-than-min",
      "Max income cannot be less than min income",
      function (value) {
        const minIncome = this.parent.minAverageIncome;
        if (!minIncome || !value) return true;
        return Number(parseNaira(value)) >= Number(parseNaira(minIncome));
      }
    ),

  minAmountRequested: Yup.string()
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive", "Must be positive", (value) => {
      return !value || Number(parseNaira(value)) >= 0; // Allow zero for min amounts
    })
    .test(
      "is-less-than-max",
      "Min amount cannot be greater than max amount",
      function (value) {
        const maxAmount = this.parent.maxAmountRequested;
        if (!maxAmount || !value) return true;
        return Number(parseNaira(value)) <= Number(parseNaira(maxAmount));
      }
    ),
  maxAmountRequested: Yup.string()
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive", "Must be positive", (value) => {
      return !value || Number(parseNaira(value)) > 0;
    })
    .test(
      "is-greater-than-min",
      "Max amount cannot be less than min amount",
      function (value) {
        const minAmount = this.parent.minAmountRequested;
        if (!minAmount || !value) return true;
        return Number(parseNaira(value)) >= Number(parseNaira(minAmount));
      }
    ),

  minCreditScore: Yup.number()
    .typeError("Min score must be a number")
    .integer("Min score must be an integer")
    .min(0, "Min score cannot be negative")
    .max(1000, "Min score cannot exceed 1000") // Assuming typical credit score range
    .test(
      "is-less-than-max",
      "Min score cannot be greater than max score",
      function (value) {
        const maxScore = this.parent.maxCreditScore;
        if (value === undefined || maxScore === undefined) return true; // Handle empty or undefined values
        return value <= maxScore;
      }
    ),
  maxCreditScore: Yup.number()
    .typeError("Max score must be a number")
    .integer("Max score must be an integer")
    .min(0, "Max score cannot be negative")
    .max(1000, "Max score cannot exceed 1000") // Assuming typical credit score range
    .test(
      "is-greater-than-min",
      "Max score cannot be less than min score",
      function (value) {
        const minScore = this.parent.minCreditScore;
        if (value === undefined || minScore === undefined) return true; // Handle empty or undefined values
        return value >= minScore;
      }
    ),
});

export default function PendingLoanRequestFilterModal({
  isOpen,
  onClose,
  setHasActiveFilter
}: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<FormValues>({
    initialValues: {
      dateFrom: "",
      dateTo: "",
      minAverageIncome: "",
      maxAverageIncome: "",
      minAmountRequested: "",
      maxAmountRequested: "",
      minCreditScore: "",
      maxCreditScore: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const filterPayload = {
        end_date: values.dateTo,
        start_date: values.dateFrom,
        min_amount: parseNaira(values.minAmountRequested),
        max_amount: parseNaira(values.maxAmountRequested),
        min_credit_score: values.minCreditScore,
        max_credit_score: values.maxCreditScore,
        min_user_income: parseNaira(values.minAverageIncome),
        max_user_income: parseNaira(values.maxAverageIncome),
      };

      dispatch(_pending_loans(filterPayload));
      setHasActiveFilter(true)

      console.log("Filter submitted with values:", filterPayload);
      onClose();
      resetForm();
    },
  });

  const handleAmountChange = (field: keyof FormValues, value: string) => {
    const parsedValue = parseNaira(value);
    formik.setFieldValue(field, formatNaira(parsedValue));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 z-50">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">Filter</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Date Range */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFrom">From:</Label>
              <InputField
                id="dateFrom"
                name="dateFrom"
                type="date"
                value={formik.values.dateFrom}
                onChange={formik.handleChange}
                placeholder="DD-MM-YYYY" // Placeholder for visual guidance
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
                placeholder="DD-MM-YYYY" // Placeholder for visual guidance
              />
              {formik.touched.dateTo && formik.errors.dateTo && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.dateTo}
                </div>
              )}
            </div>
          </div>

          {/* Average Income */}
          <Title htmlFor="averageIncome">Average Income</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minAverageIncome">Min Amount:</Label>
              <InputField
                id="minAverageIncome"
                name="minAverageIncome"
                type="text"
                value={formik.values.minAverageIncome}
                onChange={(e) =>
                  handleAmountChange("minAverageIncome", e.target.value)
                }
                placeholder="₦200,000"
              />
              {formik.touched.minAverageIncome &&
                formik.errors.minAverageIncome && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.minAverageIncome}
                  </div>
                )}
            </div>

            <div>
              <Label htmlFor="maxAverageIncome">Max Amount:</Label>
              <InputField
                id="maxAverageIncome"
                name="maxAverageIncome"
                type="text"
                value={formik.values.maxAverageIncome}
                onChange={(e) =>
                  handleAmountChange("maxAverageIncome", e.target.value)
                }
                placeholder="₦200,000"
              />
              {formik.touched.maxAverageIncome &&
                formik.errors.maxAverageIncome && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.maxAverageIncome}
                  </div>
                )}
            </div>
          </div>

          {/* Amount Requested */}
          <Title htmlFor="amountRequested">Amount Requested</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minAmountRequested">Min Amount:</Label>
              <InputField
                id="minAmountRequested"
                name="minAmountRequested"
                type="text"
                value={formik.values.minAmountRequested}
                onChange={(e) =>
                  handleAmountChange("minAmountRequested", e.target.value)
                }
                placeholder="₦200,000"
              />
              {formik.touched.minAmountRequested &&
                formik.errors.minAmountRequested && (
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
                onChange={(e) =>
                  handleAmountChange("maxAmountRequested", e.target.value)
                }
                placeholder="₦200,000"
              />
              {formik.touched.maxAmountRequested &&
                formik.errors.maxAmountRequested && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.maxAmountRequested}
                  </div>
                )}
            </div>
          </div>

          {/* Credit Score */}
          <Title htmlFor="creditScore">Credit Score</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minCreditScore">Min Score:</Label>
              <InputField
                id="minCreditScore"
                name="minCreditScore"
                type="number" // Use type="number" for credit score
                value={formik.values.minCreditScore}
                onChange={formik.handleChange}
                placeholder="400"
              />
              {formik.touched.minCreditScore &&
                formik.errors.minCreditScore && (
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
                type="number" // Use type="number" for credit score
                value={formik.values.maxCreditScore}
                onChange={formik.handleChange}
                placeholder="800"
              />
              {formik.touched.maxCreditScore &&
                formik.errors.maxCreditScore && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.maxCreditScore}
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
