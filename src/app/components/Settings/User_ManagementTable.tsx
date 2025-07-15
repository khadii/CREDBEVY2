import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsTable from "./Generaltablecomp";
import { PencilLine, Trash2 } from "lucide-react";
import DeleteModal from "../Modals/DeleteModal";
import EditUserModal from "../Modals/EditUser";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { delete_user, list_of_users } from "@/app/Redux/user_management/user_mananagement_thunk";
import toast from "react-hot-toast";
import AnimatedLoader from "../animation";
import TableWithPagination from "../table/tablewWthPagination";
import { useDashboard } from "@/app/Context/DahboardContext";
import { clearDeleteUserState } from "@/app/Redux/user_management/delete_user";
import Add_User from "../Modals/Add_User";
import { formatDate } from "@/app/lib/formatdate";

interface UserData {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  created_at: string;
  roles: Array<{
    name: string;
  }>;
}

const User_managementTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, success } = useSelector(
    (state: any) => state.userManagement
  );
  const {loading:deleteloading, error:deleteError, success:Success,message} = useSelector(
    (state: any) => state.delete_user
  );
  const users = data?.data.users?.data;
  // const pagination = data?.users || {};



  const headers = [
    "Name",
    "Email Address",
    "Phone Number",
    "Date/Time",
    "Role",
    "Actions",
  ];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [Add_UserModal, setAdd_UserModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const { selectedIds, setSelectedIds } = useDashboard();
  const [currentPage, setCurrentPage] = useState(1);

  const user_management = {
    search: "",
    role: "",
    page: currentPage,
  }

  // Debug logging
  useEffect(() => {
    if (success) {
      // toast.success(data.message);
    }
    if (error) {
      // toast.error(error);
    }
  }, [success, error]);

  // Fetch users on component mount and page change
  useEffect(() => {
    dispatch(list_of_users({ ...user_management }));
  }, [dispatch, user_management.page]);


  useEffect(()=>{
    if(Success){
      toast.success(message)
      dispatch(clearDeleteUserState())
      dispatch(list_of_users({ ...user_management }));
    }
    if(deleteError){
      toast.error(deleteError)
      dispatch(clearDeleteUserState())
      dispatch(list_of_users({ ...user_management }));
    }
    },[deleteError,Success,dispatch])



  // const toggleSelection = (uuid: string) => {
  //   setSelectedIds((prev:any) =>
  //     prev.includes(uuid) ? prev.filter((id:any) => id !== uuid) : [...prev, uuid]
  //   );
  // };

  const toggleSelection = (id: string) => {
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

  useEffect(() => {
    setIsHeaderChecked(
      selectedIds.length === users?.length && users.length > 0
    );
  }, [selectedIds, users]);

  const handleDelete = async (uuid: string) => {
    console.log("Deleting user with uuid:", uuid);
    setIsDeleteModalOpen(false);
    
    try {
      // Dispatch the delete action
      await dispatch(delete_user({ user_id: uuid }));
      
      // If successful, you might want to:
      // 1. Refresh the user list
      // 2. Show a success notification
      console.log("User deleted successfully");
      
      // Example of showing a success message:
      // if (message) {
      //   alert(message); // Or use a proper notification system
      // }
      
    } catch (err) {
      console.error("Failed to delete user:", err);
      // Show error message to user
      if (error) {
        alert(error); // Or use a proper notification system
      }
    }
  };


  const handleHeaderToggle = () => {
    const newHeaderState = !isHeaderChecked;
    setIsHeaderChecked(newHeaderState);
    setSelectedIds(newHeaderState ? users.map((user: any) => user.uuid) : []);
  };

  const renderHeader = () => (
    <CustomCheckbox
      id="header"
      checked={isHeaderChecked}
      onChange={handleHeaderToggle}
    />
  );

 
  const renderRole = (roles: Array<{ name: string }>) => {
    const roleName = roles[0]?.name || "No Role";
    const roleStyles = {
      "Super Admin": {
        bg: "bg-[#FEEEFF] border-[#FBCAFF]",
        text: "text-[#156064]",
      },
      Contributor: {
        bg: "bg-[#FFF0F1] border-[#FFAAAE]",
        text: "text-[#FA4D56]",
      },
      Viewer: {
        bg: "bg-[#EFFAF2] border-[#BFFFD1]",
        text: "text-[#42BE65]",
      },
      default: {
        bg: "bg-gray-100 border-gray-300",
        text: "text-gray-600",
      },
    };

    const style =
      roleStyles[roleName as keyof typeof roleStyles] || roleStyles.default;

    return (
      <span
        className={`px-[10px] py-[2px] rounded-[2px] border text-xs ${style.bg} ${style.text}`}
      >
        {roleName}
      </span>
    );
  };

  const renderRow = (item: UserData) => (
    <>
      <td className="pl-[27px] py-4 px-6">
        <div className="flex items-center gap-4 h-full">
          <CustomCheckbox
            id={item.uuid}
            checked={selectedIds.includes(item.uuid)}
            onChange={() => toggleSelection(item.uuid)}
          />
          <img
            src={`https://ui-avatars.com/api/?name=${item.first_name}+${item.last_name}&background=random`}
            alt={`${item.first_name} ${item.last_name}`}
            className="w-8 h-8 rounded-full"
          />
          <p className="truncate max-w-[120px]">{`${item.first_name} ${item.last_name}`}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item.email}</td>
      <td className="truncate max-w-[120px] py-4 px-6">{item.phone_number}</td>
      <td className="truncate max-w-[110px] py-4 px-6">
        {formatDate(item.created_at)}
      </td>
      <td className="truncate py-4 px-6">{renderRole(item.roles)}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          <button
            className="text-gray-500"
            onClick={() => {setIsEditModalOpen(true);
              setSelectedIds(item.uuid)}
            }
          >
            <PencilLine size={20} />
          </button>
          <button
            className="text-[#E33A24] hover:text-[#E33A24]"
            onClick={() => {
              setUserToDelete(item.uuid);
              setIsDeleteModalOpen(true);
            }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </>
  );

  // if (loading && !users?.length) {
  //   return <div className="text-center py-8">Loading users...</div>;
  // }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!loading && !error && data?.length === 0) {
    return <div className="text-center py-8">No users found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
       <SettingsTable
        headers={headers}
        data={users}
        titleProps={{
          mainTitle: "User Management",
          count: `${data?.data.total_users} Users`,
          subtitle: "List of all users on the dashboard",
        }}
        href=""
        handle_add_user={() =>{setAdd_UserModal(true)}}
        renderRow={renderRow}
        showAddUserButton={true}
        isHeaderChecked={isHeaderChecked}
        handleHeaderToggle={handleHeaderToggle}
        renderHeader={renderHeader}
        currentPage={currentPage}
        totalPages={data?.data.users?.last_page}
        setCurrentPage={setCurrentPage}
      /> 

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => userToDelete && handleDelete(userToDelete)}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)} currentPage={currentPage}       
      />
      <Add_User
        isOpen={Add_UserModal}
        onClose={() => setAdd_UserModal(false)} onConfirm={() => { } } currentPage={currentPage}  />
      <AnimatedLoader isLoading={loading || deleteloading} />
    </div>
  );
};

export default User_managementTable;
