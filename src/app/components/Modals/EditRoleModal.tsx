"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../FormInputs/iputDetails";
import CheckToggleButton from "../FormInputs/CheckToggle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { all_roles_permissions, permissions_by_module, single_role, update_role } from "@/app/Redux/Userr_Role/user_role_thunk";
import { useDashboard } from "@/app/Context/DahboardContext";
import { resetUpdateRoleState } from "@/app/Redux/Userr_Role/updateRoleSlice";
import toast from "react-hot-toast";
import AnimatedLoader from "../animation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Permission {
  id: number;
  name: string;
  module: string;
  action: string;
}

interface RolePermission {
  resource: string;
  name: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

const MODULE_ORDER = [
  'user', 'role', 'loan_requests', 'loan_products', 
  'loan_history', 'analytics', 'customers', 'settings', 
  'financials', 'integrations'
];

const EditRoleModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: updateRoleLoading, success: updateRoleSuccess, error: updateRoleError } = useSelector((state: RootState) => state.updateRole);
  const { data: singleRoleData, loading: singleRoleLoading } = useSelector((state: RootState) => state.singleRole);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const { selectedIds } = useDashboard();

  const initialPermissions: RolePermission[] = MODULE_ORDER.map(module => ({
    resource: module,
    name: module,
    create: false,
    read: false,
    update: false,
    delete: false
  }));

  useEffect(() => {
    if (isOpen && selectedIds) {
      dispatch(single_role({ id: selectedIds }));
    }
  }, [dispatch, isOpen, selectedIds]);

  // Initialize form with role data when loaded
  useEffect(() => {
    if (singleRoleData?.data?.role) {
      const role = singleRoleData.data.role;
      formik.setValues({
        roleName: role.name,
        description: role.description || ""
      });

      // Start with all permissions false
      const permissions = [...initialPermissions];

      // Mark permissions as true if they exist in the role
      if (singleRoleData.data.role.permissions) {
        singleRoleData.data.role.permissions.forEach((perm: Permission) => {
          const moduleIndex = MODULE_ORDER.indexOf(perm.module);
          if (moduleIndex >= 0) {
            switch(perm.action) {
              case 'create':
                permissions[moduleIndex].create = true;
                break;
              case 'read':
                permissions[moduleIndex].read = true;
                break;
              case 'update':
                permissions[moduleIndex].update = true;
                break;
              case 'delete':
                permissions[moduleIndex].delete = true;
                break;
            }
          }
        });
      }

      setRolePermissions(permissions);
    }
  }, [singleRoleData]);

  const validationSchema = Yup.object({
    roleName: Yup.string().required("Role Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      roleName: "",
      description: ""
    },
    validationSchema,
    onSubmit: (values) => {
      // Convert the rolePermissions to an array of permission IDs (1-40)
      const permissionIds: number[] = [];
      
      rolePermissions.forEach((perm, moduleIndex) => {
        const baseId = moduleIndex * 4 + 1; // Each module has 4 permissions (1-4, 5-8, etc.)
        
        if (perm.create) permissionIds.push(baseId);
        if (perm.read) permissionIds.push(baseId + 1);
        if (perm.update) permissionIds.push(baseId + 2);
        if (perm.delete) permissionIds.push(baseId + 3);
      });

      const roleData = {
        name: values.roleName,
        description: values.description,
        permissions: permissionIds,
        id: selectedIds
      };
      
      dispatch(update_role(roleData));
    },
  });

  // Handle success/error notifications
  useEffect(() => {
    if (updateRoleSuccess) {
      toast.success("Role updated successfully");
      handleClose();
      dispatch(resetUpdateRoleState());
    }

    if (updateRoleError) {
      toast.error(updateRoleError || "Failed to update role");
      dispatch(resetUpdateRoleState());
    }
  }, [updateRoleSuccess, updateRoleError, dispatch]);

  const togglePermission = (index: number, field: keyof Omit<RolePermission, 'resource' | 'name'>) => {
    const updatedPermissions = [...rolePermissions];
    updatedPermissions[index] = {
      ...updatedPermissions[index],
      [field]: !updatedPermissions[index][field]
    };
    setRolePermissions(updatedPermissions);
  };

  const handleClose = () => {
    // Reset form and permissions
    formik.resetForm();
    setRolePermissions(initialPermissions);
    onClose();
  };

  if (!isOpen) return null;

  if (singleRoleLoading) return (
    <div className="">
      {/* <div className="bg-white rounded-lg p-8"> */}
      <AnimatedLoader isLoading={singleRoleLoading}/>
      {/* </div> */}
    </div>
  );

  if (!singleRoleData?.data?.role) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="bg-white rounded-lg p-8">
        <p className="text-red-500">Error: Role data not found</p>
        <button onClick={handleClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 flex pl-6 pt-6 pr-4 justify-between w-full items-center border-b pb-4">
          <h2 className="text-2xl font-semibold text-[#333333]">
            Edit Role
          </h2>
          <button
            onClick={handleClose}
            className="text-[#333333] px-2 rounded-[4px] border font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6">
            {/* Basic Role Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <InputField
                  label="Role Name"
                  placeholder="Enter Role Name"
                  value={formik.values.roleName}
                  onChange={formik.handleChange("roleName")}
                  error={formik.touched.roleName && formik.errors.roleName}
                  required
                />
              </div>
              <div>
                <InputField
                  label="Description"
                  placeholder="Enter Description"
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  error={formik.touched.description && formik.errors.description}
                  required
                />
              </div>
            </div>

            {/* Permissions Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="text-left py-4 font-semibold text-xs text-[#8A8B9F]">MODULE</th>
                    <th className="text-left py-4 font-semibold text-xs text-[#8A8B9F]">CREATE</th>
                    <th className="text-left py-4 font-semibold text-xs text-[#8A8B9F]">READ</th>
                    <th className="text-left py-4 font-semibold text-xs text-[#8A8B9F]">UPDATE</th>
                    <th className="text-left py-4 font-semibold text-xs text-[#8A8B9F]">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {rolePermissions.map((permission, index) => (
                    <tr key={index}>
                      <td className="py-4 text-sm font-semibold text-[#333333] capitalize">
                        {permission.resource.replace('_', ' ')}
                      </td>
                      <td className="py-4 text-center">
                        <CheckToggleButton
                          isActive={permission.create}
                          onClick={() => togglePermission(index, 'create')}
                        />
                      </td>
                      <td className="py-4 text-center">
                        <CheckToggleButton
                          isActive={permission.read}
                          onClick={() => togglePermission(index, 'read')}
                        />
                      </td>
                      <td className="py-4 text-center">
                        <CheckToggleButton
                          isActive={permission.update}
                          onClick={() => togglePermission(index, 'update')}
                        />
                      </td>
                      <td className="py-4 text-center">
                        <CheckToggleButton
                          isActive={permission.delete}
                          onClick={() => togglePermission(index, 'delete')}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-between w-full mt-8">
              <button
                type="button"
                onClick={handleClose}
                className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-xs font-bold text-[#333333] hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateRoleLoading}
                className="px-[81px] py-[10px] border border-[#156064] bg-[#156064] rounded-[4px] text-xs font-bold text-white hover:bg-opacity-90 transition-colors disabled:opacity-70"
              >
                {updateRoleLoading ? 'Updating...' : 'Update Role'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;