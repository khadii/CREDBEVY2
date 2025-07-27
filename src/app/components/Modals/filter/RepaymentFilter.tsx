import React from "react";
import Modal from "../wallet/modal"; // Assuming this path is correct
import { Dropdown, InputField, Label, Title } from "../wallet/fundWallet"; // Assuming these paths are correct
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; // Import useDispatch
import { AppDispatch } from "@/app/Redux/store"; // Adjust path as necessary for AppDispatch
import { loan_repayment } from "@/app/Redux/Repayment/repayment_thunk";


export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setHasActiveFilter: (hasActiveFilter:boolean) => void;
}

interface FormValues {
  dateDueFrom: string;
  dateDueTo: string;
  disbursalDateFrom: string;
  disbursalDateTo: string;
  minDuration: string;
  maxDuration: string;
  status: string;
}

const validationSchema = Yup.object().shape({
  dateDueFrom: Yup.date()
    .nullable()
    .max(Yup.ref("dateDueTo"), "From date cannot be after To date")
    .typeError("Invalid date"),
  dateDueTo: Yup.date()
    .nullable()
    .min(Yup.ref("dateDueFrom"), "To date cannot be before From date")
    .typeError("Invalid date"),

  disbursalDateFrom: Yup.date()
    .nullable()
    .max(Yup.ref("disbursalDateTo"), "From date cannot be after To date")
    .typeError("Invalid date"),
  disbursalDateTo: Yup.date()
    .nullable()
    .min(Yup.ref("disbursalDateFrom"), "To date cannot be before From date")
    .typeError("Invalid date"),

  minDuration: Yup.number()
    .typeError("Min duration must be a number")
    .positive("Min duration must be positive"),
    // .nullable(true), // Allow null for empty input
    // .test(
    //   "is-less-than-max",
    //   "Min duration cannot be greater than max duration",
    //   function (value) {
    //     const maxDuration = this.parent.maxDuration;
    //     if (value === undefined || value === null || maxDuration === undefined || maxDuration === null) return true;
    //     return value <= maxDuration;
    //   }
    // ),
  maxDuration: Yup.number()
    .typeError("Max duration must be a number")
    .positive("Max duration must be positive"),
    // .nullable(true), // Allow null for empty input
    // .test(
    //   "is-greater-than-min",
    //   "Max duration cannot be less than min duration",
    //   function (value) {
    //     const minDuration = this.parent.minDuration;
    //     if (value === undefined || value === null || minDuration === undefined || minDuration === null) return true;
    //     return value >= minDuration;
    //   }
    // ),

  status: Yup.string().nullable(), // Optional filter
});

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
  // Add other status options as needed
];

export default function RepaymentFilterModal({ isOpen, onClose, setHasActiveFilter }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<FormValues>({
    initialValues: {
      dateDueFrom: "",
      dateDueTo: "",
      disbursalDateFrom: "",
      disbursalDateTo: "",
      minDuration: "",
      maxDuration: "",
      status: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const filters = {
        start_due_date: values.dateDueFrom || undefined,
        end_due_date: values.dateDueTo || undefined,
        start_disbursal_date: values.disbursalDateFrom || undefined,
        end_disbursal_date: values.disbursalDateTo || undefined,
        min_loan_duration: values.minDuration ? Number(values.minDuration) : undefined,
        max_loan_duration: values.maxDuration ? Number(values.maxDuration) : undefined,
        status: values.status || undefined,
        paginate: true, // Assuming pagination is always true for filtering
        page: 1,      // Always reset to page 1 on new filter
      };

      dispatch(loan_repayment(filters));
      setHasActiveFilter(true);
      resetForm();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 z-50">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">Filter</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Date Due Range */}
          <Title>Date Due</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateDueFrom">From:</Label>
              <InputField
                id="dateDueFrom"
                name="dateDueFrom"
                type="date"
                value={formik.values.dateDueFrom}
                onChange={formik.handleChange}
              />
              {formik.touched.dateDueFrom && formik.errors.dateDueFrom && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.dateDueFrom}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="dateDueTo">To:</Label>
              <InputField
                id="dateDueTo"
                name="dateDueTo"
                type="date"
                value={formik.values.dateDueTo}
                onChange={formik.handleChange}
              />
              {formik.touched.dateDueTo && formik.errors.dateDueTo && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.dateDueTo}
                </div>
              )}
            </div>
          </div>

          {/* Disbursal Date Range */}
          <Title>Disbursal Date</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="disbursalDateFrom">From:</Label>
              <InputField
                id="disbursalDateFrom"
                name="disbursalDateFrom"
                type="date"
                value={formik.values.disbursalDateFrom}
                onChange={formik.handleChange}
              />
              {formik.touched.disbursalDateFrom &&
                formik.errors.disbursalDateFrom && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.disbursalDateFrom}
                  </div>
                )}
            </div>
            <div>
              <Label htmlFor="disbursalDateTo">To:</Label>
              <InputField
                id="disbursalDateTo"
                name="disbursalDateTo"
                type="date"
                value={formik.values.disbursalDateTo}
                onChange={formik.handleChange}
              />
              {formik.touched.disbursalDateTo &&
                formik.errors.disbursalDateTo && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.disbursalDateTo}
                  </div>
                )}
            </div>
          </div>

          {/* Duration Range */}
          <Title>Duration</Title>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minDuration">Min Months:</Label>
              <div className="flex items-center">
                <InputField
                  id="minDuration"
                  name="minDuration"
                  type="number"
                  value={formik.values.minDuration}
                  onChange={formik.handleChange}
                  placeholder="1"
                />
                {/* <span className="ml-2 text-gray-600">months</span> */}
              </div>
              {formik.touched.minDuration && formik.errors.minDuration && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.minDuration}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="maxDuration">Max Months:</Label>
              <div className="flex items-center">
                <InputField
                  id="maxDuration"
                  name="maxDuration"
                  type="number"
                  value={formik.values.maxDuration}
                  onChange={formik.handleChange}
                  placeholder="12"
                />
                {/* <span className="ml-2 text-gray-600">months</span> */}
              </div>
              {formik.touched.maxDuration && formik.errors.maxDuration && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.maxDuration}
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