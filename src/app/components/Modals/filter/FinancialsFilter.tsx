import React from "react";
import Modal from "../wallet/modal"; // Assuming this path is correct
import { Dropdown, InputField, Label, Title } from "../wallet/fundWallet"; // Assuming these paths are correct
import { useFormik } from "formik";
import * as Yup from "yup";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper functions for Naira formatting (reused from previous implementations)
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
  payee: string;
  transactionType: string;
  minAmount: string;
  maxAmount: string;
  transactionId: string;
  dateFrom: string;
  dateTo: string;
  paymentMethod: string;
  status: string;
}

const validationSchema = Yup.object().shape({
  payee: Yup.string().trim().nullable(),
  transactionType: Yup.string().nullable(),

  minAmount: Yup.string()
    .test("is-number", "Must be a number", (value) => {
      return !value || !isNaN(Number(parseNaira(value)));
    })
    .test("is-positive-or-zero", "Must be a positive number or zero", (value) => {
      return !value || Number(parseNaira(value)) >= 0;
    })
    .test(
      "is-less-than-max",
      "Min amount cannot be greater than max amount",
      function (value) {
        const maxAmount = this.parent.maxAmount;
        if (!maxAmount || !value) return true;
        return Number(parseNaira(value)) <= Number(parseNaira(maxAmount));
      }
    ),
  maxAmount: Yup.string()
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
        const minAmount = this.parent.minAmount;
        if (!minAmount || !value) return true;
        return Number(parseNaira(value)) >= Number(parseNaira(minAmount));
      }
    ),

  transactionId: Yup.string().trim().nullable(),

  dateFrom: Yup.date()
    .nullable()
    .max(Yup.ref('dateTo'), "From date cannot be after To date")
    .typeError("Invalid date"),
  dateTo: Yup.date()
    .nullable()
    .min(Yup.ref('dateFrom'), "To date cannot be before From date")
    .typeError("Invalid date"),

  paymentMethod: Yup.string().nullable(),
  status: Yup.string().nullable(),
});

const transactionTypeOptions = [
  { value: "credit", label: "Credit" },
  { value: "debit", label: "Debit" },
  { value: "transfer", label: "Transfer" },
  // Add more transaction types as needed
];

const paymentMethodOptions = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "card_payment", label: "Card Payment" },
  { value: "ussd", label: "USSD" },
  // Add more payment methods as needed
];

const transactionStatusOptions = [
  { value: "successful", label: "Successful" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "reversed", label: "Reversed" },
  // Add more status options as needed
];

export default function FinancialFilterModal({ isOpen, onClose }: ModalProps) {
  const formik = useFormik<FormValues>({
    initialValues: {
      payee: "",
      transactionType: "",
      minAmount: "",
      maxAmount: "",
      transactionId: "",
      dateFrom: "",
      dateTo: "",
      paymentMethod: "",
      status: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Transaction filter submitted with values:", {
        ...values,
        minAmount: parseNaira(values.minAmount),
        maxAmount: parseNaira(values.maxAmount),
      });
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
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">Filter</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Payee */}
          <div className="mb-4">
            <Label htmlFor="payee">Payee:</Label>
            <InputField
              id="payee"
              name="payee"
              type="text"
              value={formik.values.payee}
              onChange={formik.handleChange}
              placeholder="e.g. John Doe"
            />
            {formik.touched.payee && formik.errors.payee && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.payee}
              </div>
            )}
          </div>

          {/* Type */}
          <div className="mb-4">
            <Label htmlFor="transactionType">Type:</Label>
            <Dropdown
              id="transactionType"
              name="transactionType"
              value={formik.values.transactionType}
              onChange={(value) => formik.setFieldValue("transactionType", value)}
              options={transactionTypeOptions}
              placeholder="Select Type"
            />
            {formik.touched.transactionType && formik.errors.transactionType && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.transactionType}
              </div>
            )}
          </div>

          {/* Amount Range */}
          <Title>Amount</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minAmount">Min Amount:</Label>
              <InputField
                id="minAmount"
                name="minAmount"
                type="text"
                value={formik.values.minAmount}
                onChange={(e) => handleAmountChange("minAmount", e.target.value)}
                placeholder="₦0"
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
                type="text"
                value={formik.values.maxAmount}
                onChange={(e) => handleAmountChange("maxAmount", e.target.value)}
                placeholder="₦500,000"
              />
              {formik.touched.maxAmount && formik.errors.maxAmount && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.maxAmount}
                </div>
              )}
            </div>
          </div>

          {/* Transaction ID */}
          <div className="mb-4">
            <Label htmlFor="transactionId">Transaction ID:</Label>
            <InputField
              id="transactionId"
              name="transactionId"
              type="text"
              value={formik.values.transactionId}
              onChange={formik.handleChange}
              placeholder="e.g. TXN123456789"
            />
            {formik.touched.transactionId && formik.errors.transactionId && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.transactionId}
              </div>
            )}
          </div>

          {/* Date Range */}
          <Title>Date</Title>
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

          {/* Method Dropdown */}
          <div className="mb-4">
            <Label htmlFor="paymentMethod">Method:</Label>
            <Dropdown
              id="paymentMethod"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={(value) => formik.setFieldValue("paymentMethod", value)}
              options={paymentMethodOptions}
              placeholder="Select Method"
            />
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.paymentMethod}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="mb-4">
            <Label htmlFor="status">Status</Label>
            <Dropdown
              id="status"
              name="status"
              value={formik.values.status}
              onChange={(value) => formik.setFieldValue("status", value)}
              options={transactionStatusOptions}
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