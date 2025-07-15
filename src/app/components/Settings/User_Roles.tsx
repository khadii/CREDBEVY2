import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsTable from "./Generaltablecomp";
import { PencilLine, Trash2 } from "lucide-react";
import EditRoleModal from "../Modals/EditRoleModal";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { UserRoles } from "@/app/Redux/Userr_Role/user_role_thunk";
import { setCurrentPage } from "@/app/Redux/Userr_Role/Get_All_User_Role";
import { useDashboard } from "@/app/Context/DahboardContext";
import { delete_user_role } from "@/app/Redux/Userr_Role/user_role_thunk";
import { clearDeleteUserRoleState } from "@/app/Redux/Userr_Role/delete_user_role";
import DeleteModal from "../Modals/DeleteModal";
import { clearDeleteUserState } from "@/app/Redux/user_management/delete_user";
import toast from "react-hot-toast";
import AnimatedLoader from "../animation";
import { formatDate } from "@/app/lib/formatdate";
import ErrorDisplay from "../ErrorDisplay";
// import { clearDeleteUserRoleState } from "@/app/Redux/Userr_Role/delete_user_role_slice";

interface RoleData {
  id: number;
  name: string;
  description: string | null;
  users?: number;
  lastModified?: string;
  guard_name: string;
  partner_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const User_Roles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data,
    loading,
    error,
    currentPage,
    search,
    roleFilter
  } = useSelector((state: RootState) => state.userRoles);
  
  const {
    loading: deleteStateloading,
    error: deleteStateerror,
    message: deleteStatemessage,
    success: deleteStatesuccess,
  } = useSelector((state: RootState) => state.deleteUserrole);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);
  const { selectedIds, setSelectedIds } = useDashboard();
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const headers = ["Role Name", "Description", "Guard Name", "Last Modified"];

  useEffect(() => {
    dispatch(UserRoles({ 
      search, 
      role: roleFilter, 
      page: currentPage 
    }));
  }, [dispatch, search, roleFilter, currentPage]);

// Handle delete success/error
useEffect(() => {
  if (deleteStatesuccess && deleteStatemessage) {
    toast.success(deleteStatemessage);
    dispatch(UserRoles({ 
      search, 
      role: roleFilter, 
      page: currentPage 
    }));
    setIsDeleteModalOpen(false);
    dispatch(clearDeleteUserRoleState());
  }
  
  if (deleteStateerror) {
    toast.error(deleteStateerror);
    dispatch(clearDeleteUserRoleState());
  }
}, [deleteStatesuccess, deleteStateerror, deleteStatemessage, dispatch, search, roleFilter, currentPage]);

  // Reset selections when data changes
  useEffect(() => {
    if (data.roles && data.roles.length > 0) {
      setSelectedIds([]);
    }
  }, [data.roles]);

  // Update header checkbox state based on selections
  useEffect(() => {
    if (data.roles && data.roles.length > 0) {
      setIsHeaderChecked(selectedIds.length === data.roles.length);
    }
  }, [selectedIds, data.roles]);

  // const handleToggle = (id: number) => {
  //   setSelectedIds((prevSelectedIds: number[]) => {
  //     if (prevSelectedIds.includes(id)) {
  //       return prevSelectedIds.filter(selectedId => selectedId !== id);
  //     } else {
  //       return [...prevSelectedIds, id];
  //     }
  //   });
  // };

  const handleToggle = (id: number) => {
    setSelectedIds((prevSelectedIds: any) => {
      // Ensure prevSelectedIds is an array
      const currentIds = Array.isArray(prevSelectedIds) ? prevSelectedIds : [];
      
      if (currentIds.includes(id)) {
        return currentIds.filter(selectedId => selectedId !== id);
      } else {
        return [...currentIds, id];
      }
    });
  };
  const handleHeaderToggle = () => {
    const newHeaderState = !isHeaderChecked;
    setIsHeaderChecked(newHeaderState);

    if (newHeaderState) {
      const allIds = data.roles.map((role: RoleData) => role.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Edit role with id: ${id}`);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(delete_user_role({ user_id: id.toString() }));
  };

  const renderHeader = () => (
    <CustomCheckbox
      id="header"
      checked={isHeaderChecked}
      onChange={handleHeaderToggle}
    />
  );

  const renderRow = (item: RoleData, index: number) => (
    <>
      <td className="pl-[27px] py-4 px-6">
        <div className="flex items-center gap-4 h-full">
          <CustomCheckbox 
            id={item.id} 
            checked={selectedIds.includes(item.id)} 
            onChange={() => handleToggle(item.id)} 
          />
          <p className="truncate max-w-[120px]">{item.name}</p>
        </div>
      </td>
      <td className="truncate max-w-[300px] py-4 px-6">
        {item.description || "No description"}
      </td>
      <td className="truncate max-w-[120px] py-4 px-6">{item.guard_name}</td>
      <td className="truncate max-w-[180px] py-4 px-6">
        {formatDate(item.updated_at )|| formatDate(item.created_at) || "N/A"}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
        <button 
  className="text-gray-500" 
  onClick={() => {
    handleEdit(item.id);
    setSelectedIds([item.id]); // Wrap in array
  }}
>
  <PencilLine size={20} />
</button>
          <button 
            className="text-[#E33A24] hover:text-[#E33A24]" 
            onClick={() => {
              setRoleToDelete(item.id);
              setIsDeleteModalOpen(true);
             
            }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </>
  );

  

return (
  <>
    {error ? (
      <ErrorDisplay error={error} title={error} />
    ) : (
      <>
        <div className="w-full min-h-screen">
          <SettingsTable
            headers={headers}
            data={data.roles}
            titleProps={{
              mainTitle: "User Roles",
              count: `${data.total_roles} Roles`,
              subtitle: "List of all user roles on the dashboard",
            }}
            href=""
            showAddUserButton={false}
            renderRow={renderRow}
            currentPage={currentPage}
            totalPages={data.last_page}
            setCurrentPage={(page: number) => dispatch(setCurrentPage(page))}
            isHeaderChecked={isHeaderChecked}
            handleHeaderToggle={handleHeaderToggle}
            renderHeader={renderHeader}
          />

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              dispatch(clearDeleteUserRoleState());
            }}
            onConfirm={() => {
              if (roleToDelete !== null) {
                handleDelete(roleToDelete);
              }
            }}
            isLoading={deleteStateloading}
            error={deleteStateerror}
          />
        </div>
      </>
    )}

    <EditRoleModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
    />

    <AnimatedLoader isLoading={loading || deleteStateloading} />
  </>
);

};

export default User_Roles;