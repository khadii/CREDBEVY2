'use client';
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import Selection from "../FormInputs/Selection";
import InputField from "../FormInputs/iputDetails";
import { Add_user, list_of_users } from "@/app/Redux/user_management/user_mananagement_thunk";
import { AppDispatch, RootState } from "@/app/Redux/store";
import toast from "react-hot-toast";
import { resetUserState } from "@/app/Redux/user_management/add_user_slice";
import { all_roles_dropdownata } from "@/app/Redux/Userr_Role/user_role_thunk";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  currentPage: number;
}

const Add_User: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, currentPage, }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Get roles data from Redux store
  const { data: rolesData, loading: rolesLoading, error: rolesError } = useSelector(
    (state: RootState) => state.allRolesDropdown
  );
  
  const { loading, error, success, userData } = useSelector(
    (state: RootState) => state.adduser
  );

  // Fetch roles when component mounts
  useEffect(() => {
    dispatch(all_roles_dropdownata());
  }, [dispatch]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("User Name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    roles: Yup.array()
      .min(1, "At least one role is required")
      .of(Yup.string().required("Role is required")),
    isActive: Yup.boolean().required("Active status is required"),
  });
  const user_management = {
    search: "",
    role: "",
    page: currentPage,
  };
  useEffect(() => {
    if (success) {
      toast.success(userData.message);
       dispatch(list_of_users({ ...user_management }));
      dispatch(resetUserState());
      onClose();
    }
    if (error) {
      dispatch(resetUserState());
      toast.error(error);
    }
  }, [dispatch, success, error, userData?.message]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      address: "",
      email: "",
      password: "",
      roles: [] as string[],
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Find the selected role object
      const selectedRole = rolesData.find((role: any) => role.name === values.roles[0]);
      
      if (!selectedRole) {
        toast.error("Invalid role selected");
        return;
      }

      const userData = {
        first_name: values.firstName,
        last_name: values.lastName,
        user_name: values.userName,
        email: values.email,
        password: values.password,
        role_id: selectedRole.id, // Use the role ID from the API
        deactivated: values.isActive ? 0 : 1,
      };

      await dispatch(Add_user(userData)).unwrap();
    },
  });

  if (!isOpen) return null;

  // Prepare role options from API data
  const roleOptions = rolesData.map((role: any) => role.name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-modal-title"
    >
      <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex pl-6 pt-6 pr-4 justify-between w-full items-center border-b pb-4">
          <h2 className="text-2xl font-semibold text-[#333333]">Add User</h2>
          <button
            onClick={onClose}
            className="text-[#333333] px-2 rounded-[4px] border font-bold text-xs"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="p-6">
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="col-span-1 md:col-span-2">
                <Selection
                  label="User's roles"
                  placeholder={rolesLoading ? "Loading roles..." : "Select role"}
                  availableOptions={roleOptions}
                  defaultSelectedOptions={formik.values.roles}
                  onChange={(selectedOptions) =>
                    formik.setFieldValue("roles", selectedOptions)
                  }
                  error={formik.touched.roles && formik.errors.roles}
                  required
                  visibility="block"
                />
                <p className="font-medium text-xs text-[#666687]">
                  A user can have one or several roles
                </p>
                {rolesError && (
                  <p className="text-red-500 text-xs mt-1">{rolesError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#333333] mb-1">
                  Active
                </label>
                <div className="flex w-full max-w-[193px] h-10 bg-[#DCDCE4] justify-between items-center px-1 border rounded-[4px]">
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue("isActive", false)}
                    className={`px-4 py-1 text-xs font-bold rounded-[4px] ${
                      !formik.values.isActive
                        ? "bg-white text-[#007D69] w-[92px] h-8"
                        : "bg-[#DCDCE4] text-[#8A8B9F]"
                    }`}
                    disabled={loading}
                  >
                    FALSE
                  </button>
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue("isActive", true)}
                    className={`px-4 py-1 text-xs font-bold rounded-[4px] ${
                      formik.values.isActive
                        ? "bg-white text-[#007D69] w-[92px] h-8"
                        : "bg-[#DCDCE4] text-[#8A8B9F]"
                    }`}
                    disabled={loading}
                  >
                    TRUE
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-xs font-bold text-[#333333] hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-[81px] py-[10px] border border-[#156064] bg-[#156064] rounded-[4px] text-xs font-bold text-white hover:bg-opacity-90 transition-colors"
                disabled={loading}
              >
                {loading ? "Processing..." : "Proceed"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_User;