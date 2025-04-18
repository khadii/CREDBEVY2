"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../FormInputs/iputDetails";
import CheckToggleButton from "../FormInputs/CheckToggle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { all_roles_permissions, permissions_by_module, update_role } from "@/app/Redux/Userr_Role/user_role_thunk";
import { useDashboard } from "@/app/Context/DahboardContext";
import { resetUpdateRoleState } from "@/app/Redux/Userr_Role/updateRoleSlice";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: { roleName: string; description: string; permissions: Permission[] }) => void;
}

interface Permission {
  resource: string;
  name: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

const EditRoleModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, message } = useSelector((state: RootState) => state.permissions);
  const { data:permissionsByModuleData, loading:permissionsByModuleLoading, error:permissionsByModuleError } = useSelector((state: RootState) => state.permissionsByModule);
  const { loading:updateRoleLoading, success:updateRoleSuccess, error:updateRoleError,message:updateRoleMessage} = useSelector((state: RootState) =>  state.updateRole);

  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    if (isOpen) {
      dispatch(all_roles_permissions());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (isOpen) {
      dispatch(permissions_by_module());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (data && data.length > 0) {
      const groupedPermissions: Record<string, Permission> = {};

      data.forEach((perm) => {
        const module = perm.module;
        if (!groupedPermissions[module]) {
          groupedPermissions[module] = {
            resource: module,
            name: module,
            create: false,
            read: false,
            update: false,
            delete: false
          };
        }

        // Set the corresponding permission flag
        if (perm.action === 'create') groupedPermissions[module].create = true;
        if (perm.action === 'read') groupedPermissions[module].read = true;
        if (perm.action === 'update') groupedPermissions[module].update = true;
        if (perm.action === 'delete') groupedPermissions[module].delete = true;
      });

      setPermissions(Object.values(groupedPermissions));
    }
  }, [data]);

  const validationSchema = Yup.object({
    roleName: Yup.string().required("Role Name is required"),
    description: Yup.string().required("Description is required"),
  });
  const { selectedIds, setSelectedIds } = useDashboard();
  const formik = useFormik({
    initialValues: {
      roleName: "",
      // initialData?.name || "",
      description: ""
      // initialData?.description || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const roleData = {
        name: values.roleName,
        description: values.description,
        permissions: permissions,
        id: selectedIds
      };
      
      dispatch(update_role(roleData));
    },
  });
 // Handle success/error notifications
 useEffect(() => {
  if (updateRoleSuccess) {
    toast.success(updateRoleMessage);
    onClose();
    dispatch(resetUpdateRoleState());
  }

  if (updateRoleError) {
    toast.error(updateRoleError);
    dispatch(resetUpdateRoleState());
  }
}, [updateRoleSuccess, updateRoleError, dispatch, onClose]);
  const togglePermission = (index: number, field: keyof Omit<Permission, 'resource' | 'name'>) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index] = {
      ...updatedPermissions[index],
      [field]: !updatedPermissions[index][field]
    };
    setPermissions(updatedPermissions);
  };

  if (!isOpen) return null;

  if (loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="bg-white rounded-lg p-8">
        <p>Loading permissions...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191CBA]">
      <div className="bg-white rounded-lg p-8">
        <p className="text-red-500">Error: {error}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">
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
          <h2 className="text-2xl font-semibold text-[#333333]" id="edit-role-modal-title">
            Edit Role
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
                  {permissions.map((permission, index) => (
                    <tr key={index} className="">
                      <td className="py-4 text-sm font-semibold text-[#333333] capitalize">
                        {permission.resource}
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
                // onClick={onClose}
                className="px-[81px] py-[10px] border border-[#333333] rounded-[4px] text-xs font-bold text-[#333333] hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-[81px] py-[10px] border border-[#156064] bg-[#156064] rounded-[4px] text-xs font-bold text-white hover:bg-opacity-90 transition-colors"
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