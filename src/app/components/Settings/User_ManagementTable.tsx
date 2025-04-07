import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsTable from "./Generaltablecomp";
import { PencilLine, Trash2 } from "lucide-react";
import DeleteModal from "../Modals/DeleteModal";
import EditUserModal from "../Modals/EditUser";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { list_of_users } from "@/app/Redux/user_management/user_mananagement_thunk";

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
  const { data, loading, error } = useSelector((state: any) => state.userManagement);
  const users = data?.users?.data;
  const pagination = data?.users || {};
  
  const headers = ["Name", "Email Address", "Phone Number", "Date/Time", "Role", "Actions"];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [user_management] = useState({
    search: "",
    role: ""
  });

  // Debug logging
  useEffect(() => {
    console.log('Current users data:', users);
    console.log('Pagination data:', pagination);
  }, [users, pagination]);

  // Fetch users on component mount and page change
  useEffect(() => {
    dispatch(list_of_users({ ...user_management }));
  }, [dispatch, currentPage, user_management]);

  const toggleSelection = (uuid: string) => {
    setSelectedIds(prev => 
      prev.includes(uuid) 
        ? prev.filter(id => id !== uuid) 
        : [...prev, uuid]
    );
  };

  useEffect(() => {
    setIsHeaderChecked(selectedIds.length === users?.length && users.length > 0);
  }, [selectedIds, users]);

  const handleDelete = (uuid: string) => {
    console.log("Deleting user with uuid:", uuid);
    setIsDeleteModalOpen(false);
    // Add your actual delete logic here
  };

  const handleHeaderToggle = () => {
    const newHeaderState = !isHeaderChecked;
    setIsHeaderChecked(newHeaderState);
    setSelectedIds(newHeaderState ? users.map((user:any) => user.uuid) : []);
  };

  const renderHeader = () => (
    <CustomCheckbox 
      id="header" 
      checked={isHeaderChecked} 
      onChange={handleHeaderToggle} 
    />
  );

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? 'Invalid date' 
        : date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
    } catch {
      return 'Invalid date';
    }
  };

  const renderRole = (roles: Array<{ name: string }>) => {
    const roleName = roles[0]?.name || "No Role";
    const roleStyles = {
      "Super Admin": {
        bg: "bg-[#FEEEFF] border-[#FBCAFF]",
        text: "text-[#156064]"
      },
      "Contributor": {
        bg: "bg-[#FFF0F1] border-[#FFAAAE]",
        text: "text-[#FA4D56]"
      },
      "Viewer": {
        bg: "bg-[#EFFAF2] border-[#BFFFD1]",
        text: "text-[#42BE65]"
      },
      default: {
        bg: "bg-gray-100 border-gray-300",
        text: "text-gray-600"
      }
    };

    const style = roleStyles[roleName as keyof typeof roleStyles] || roleStyles.default;

    return (
      <span className={`px-[10px] py-[2px] rounded-[2px] border text-xs ${style.bg} ${style.text}`}>
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
      <td className="truncate max-w-[110px] py-4 px-6">{formatDate(item.created_at)}</td>
      <td className="truncate py-4 px-6">{renderRole(item.roles)}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          <button 
            className="text-gray-500" 
            onClick={() => setIsEditModalOpen(true)}
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

  if (loading && !users?.length) {
    return <div className="text-center py-8">Loading users...</div>;
  }

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
          count: `${pagination.total || 0} Users`,
          subtitle: "List of all users on the dashboard",
        }}
        href=""
        setStep={(step: number) => console.log(`Step: ${step}`)}
        renderRow={renderRow}
        showAddUserButton={true}
        isHeaderChecked={isHeaderChecked}
        handleHeaderToggle={handleHeaderToggle}
        renderHeader={renderHeader}
        currentPage={currentPage}
        totalPages={pagination.last_page}
        setCurrentPage={setCurrentPage}
      />
      
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => userToDelete && handleDelete(userToDelete)}
      />
      
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={() => {}}
      />
    </div>
  );
};

export default User_managementTable;