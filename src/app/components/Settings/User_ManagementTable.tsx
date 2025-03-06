import React, { useState } from "react";
import SettingsTable from "./Generaltablecomp";
import { Edit, Trash2, Check, PencilLine, Delete } from "lucide-react";
import DeleteModal from "../Modals/DeleteModal";
import EditUserModal from "../Modals/EditUser";

// import DeleteModal from "../Modals/DeleteModal";

const User_managementTable = () => {
  interface UserData {
    id: number;
    name: string;
    email: string;
    phone: string;
    dateTime: string;
    role: "Admin" | "Contributors" | "Viewer";
    selected: boolean;
  }

  const [userData, setUserData] = React.useState<UserData[]>([
    {
      id: 1,
      name: "Oripeloye Timilehin",
      email: "Timilehinoripeloye@gmail.com",
      phone: "09055380387",
      dateTime: "9/4/2023, 09:31 AM",
      role: "Admin",
      selected: false
    },
    {
      id: 2,
      name: "Oripeloye Timilehin",
      email: "Timilehinoripeloye@gmail.com",
      phone: "09055380387",
      dateTime: "9/4/2023, 09:31 AM",
      role: "Contributors",
      selected: false
    },
    {
      id: 3,
      name: "Oripeloye Timilehin",
      email: "Timilehinoripeloye@gmail.com",
      phone: "09055380387",
      dateTime: "9/4/2023, 09:31 AM",
      role: "Contributors",
      selected: false
    },
    {
      id: 4,
      name: "Oripeloye Timilehin",
      email: "Timilehinoripeloye@gmail.com",
      phone: "09055380387",
      dateTime: "9/4/2023, 09:31 AM",
      role: "Viewer",
      selected: false
    },
    {
      id: 5,
      name: "Oripeloye Timilehin",
      email: "Timilehinoripeloye@gmail.com",
      phone: "09055380387",
      dateTime: "9/4/2023, 09:31 AM",
      role: "Viewer",
      selected: false
    }
  ]);

  const headers = ["Name", "Email Address", "Phone Number", "Date/Time", "Role", "Actions"];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIEditModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const CustomCheckbox = ({ id, checked, onChange }: { id: number; checked: boolean; onChange: (id: number) => void }) => {
    return (
      <div 
        className={`w-4 h-4 rounded-md flex items-center justify-center cursor-pointer ${checked ? 'bg-[#156064]' : 'border-2 border-gray-300'}`}
        onClick={() => onChange(id)}
      >
        {checked && <Check size={12} color="white" />}
      </div>
    );
  };

  const toggleSelection = (id: number) => {
    setUserData(userData.map(user => 
      user.id === id ? { ...user, selected: !user.selected } : user
    ));
  };

  const handleEdit = (id: number) => {
    console.log(`Edit user with id: ${id}`);
  };

  const handleDelete = (id: any) => {
    setUserData(userData.filter(user => user.id !== id));
    setIsDeleteModalOpen(false);
  };

  const renderRole = (role: "Admin" | "Contributors" | "Viewer") => {
    let bgColor = "";
    let textColor = "";

    if (role === "Admin") {
      bgColor = "bg-[#FEEEFF] border-[#FBCAFF]";
      textColor = "text-[#156064]";
    } else if (role === "Contributors") {
      bgColor = "bg-[#FFF0F1] border-[#FFAAAE]";
      textColor = "text-[#FA4D56]";
    } else if (role === "Viewer") {
        bgColor = "bg-[#EFFAF2] border-[#BFFFD1]";
      textColor = "text-[#42BE65]";
    }

    return (
      <span className={`px-[10px] py-[2px] rounded-[2px] border text-xs ${bgColor} ${textColor}`}>
        {role}
      </span>
    );
  };

  const renderRow = (item: UserData, index: number) => (
    <>
      <td className="pl-[27px] py-4 px-6">
        <div className="flex items-center gap-4 h-full">
          <CustomCheckbox 
            id={item.id} 
            checked={item.selected} 
            onChange={toggleSelection} 
          />
          <img
             src="https://bit.ly/dan-abramov"
            alt={item.name}
            className="w-8 h-8 rounded-full"
          />
          <p className="truncate max-w-[120px]">{item.name}</p>
        </div>
      </td>
      <td className="truncate max-w-[200px] py-4 px-6">{item.email}</td>
      <td className="truncate max-w-[120px] py-4 px-6">{item.phone}</td>
      <td className="truncate max-w-[110px] py-4 px-6">{item.dateTime}</td>
      <td className="truncate  py-4 px-6">
        {renderRole(item.role)}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          <button className="text-gray-500" onClick={()=>setIEditModalOpen(true)}>
            <PencilLine size={20} />
          </button>
          <button className="text-[#E33A24] hover:text-[#E33A24]" onClick={() => {
            setUserToDelete(item.id);
            setIsDeleteModalOpen(true);
          }}>
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </>
  );

  return (
    <div>
      <SettingsTable
        headers={headers}
        data={userData}
        titleProps={{
          mainTitle: "User Management",
          count: "200 Users",
          subtitle: "List of all users on the dashboard",
        }}
        href=""
        itemsPerPage={5}
        setStep={(step: number) => console.log(`Step: ${step}`)}
        renderRow={renderRow}
        showAddUserButton={true}
      />
   <DeleteModal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  onConfirm={() => {
    if (userToDelete !== null) {
      handleDelete(userToDelete);
    }
  }}
/>
<EditUserModal
  isOpen={isEditModalOpen}
  onClose={() => setIEditModalOpen(false)}
  onConfirm={() => {

    }
  }
/>
    </div>
  );
};

export default User_managementTable;