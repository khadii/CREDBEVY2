"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import CollateralSelection from "../FormInputs/CollateralSelection";
import InputField from "../FormInputs/iputDetails";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const EditUserModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("User Name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    roles: Yup.array().min(1, "At least one role is required"),
    isActive: Yup.boolean().required("Active status is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      address: "",
      email: "",
      password: "",
      roles: ["Super Admin", "Editor"],
      isActive: true,
    },
    validationSchema,
    onSubmit: (values) => {
      onConfirm();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-modal-title"
    >
      <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 flex pl-6 pt-6 pr-4 justify-between w-full items-center border-b pb-4">
          <h2 className="text-2xl font-semibold text-[#333333]">
            Edit User
          </h2>
          <button
            onClick={onClose}
            className="text-[#333333] px-2 rounded-[4px] border font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <InputField
                  label="First Name"
                  placeholder="Enter First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  error={formik.touched.firstName && formik.errors.firstName}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <InputField
                  label="Last Name"
                  placeholder="Enter Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  error={formik.touched.lastName && formik.errors.lastName}
                  required
                />
              </div>

              {/* User Name */}
              <div>
                <InputField
                  label="User Name"
                  placeholder="Enter User Name"
                  value={formik.values.userName}
                  onChange={formik.handleChange("userName")}
                  error={formik.touched.userName && formik.errors.userName}
                  required
                />
              </div>

              {/* Address */}
              <div>
                <InputField
                  label="Address"
                  placeholder="Enter Address"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  error={formik.touched.address && formik.errors.address}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <InputField
                  label="Email"
                  placeholder="Enter Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  error={formik.touched.email && formik.errors.email}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <InputField
                  label="Password"
                  placeholder="Enter Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  error={formik.touched.password && formik.errors.password}
                  required
                  type="password"
                />
              </div>

              {/* User's roles */}
              <div className="col-span-1 md:col-span-2">
                <CollateralSelection
                  label="User's roles"
                  availableOptions={availableOptions}
                  defaultSelectedOptions={formik.values.roles}
                  onChange={(selectedOptions) =>
                    formik.setFieldValue("roles", selectedOptions)
                  }
                  error={formik.touched.roles && formik.errors.roles}
                  required
                  visibility="block"
                />
                <p className="font-medium text-xs text-[#666687]">A user can have one or several roles</p>
              </div>

              {/* Active toggle */}
              <div>
                <label className="block text-xs font-bold text-[#333333] mb-1">
                  Active
                </label>
                <div className="flex w-full max-w-[193px] h-10 bg-[#DCDCE4] justify-between items-center px-1 border rounded-[4px]">
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue("isActive", false)}
                    className={`px-4 py-1 text-xs font-bold rounded-[4px] ${
                      !formik.values.isActive ? "bg-white text-[#007D69] w-[92px] h-8" : "bg-[#DCDCE4] text-[#8A8B9F]"
                    }`}
                  >
                    FALSE
                  </button>
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue("isActive", true)}
                    className={`px-4 py-1 text-xs font-bold rounded-[4px] ${
                      formik.values.isActive ? "bg-white text-[#007D69] w-[92px] h-8" : "bg-[#DCDCE4] text-[#8A8B9F]"
                    }`}
                  >
                    TRUE
                  </button>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-between w-full mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-xs font-bold text-[#333333] hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-[81px] py-[10px]border border-[#156064] bg-[#156064] rounded-[4px] text-xs font-bold text-white hover:bg-opacity-90 transition-colors"
              >
                Proceed
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;

const availableOptions = ["Super Admin", "Editor", "User"];