import React, { useState } from "react";
import SettingsTable from "./Generaltablecomp";
import { Edit, Trash2, Check, PencilLine, Delete } from "lucide-react";
import DeleteModal from "../Modals/DeleteModal";

import EditRoleModal from "../Modals/EditRoleModal";
import { CustomCheckbox } from "../CheckboxForTable/TablecheckBox";

const User_Roles = () => {
  interface RoleData {
    id: number;
    name: string;
    description: string;
    users: number;
    lastModified: string;
    selected: boolean;
  }

  const [roleData, setRoleData] = React.useState<RoleData[]>([
    {
      id: 1,
      name: "Admin",
      description: "The super admin can add, edit anything on the dashboard",
      users: 4,
      lastModified: "9/17/2023, 11:28 PM",
      selected: false
    },
    {
      id: 2,
      name: "Contributor",
      description: "The super admin can add, edit anything on the dashboard",
      users: 5,
      lastModified: "9/17/2023, 11:28 PM",
      selected: false
    },
    {
      id: 3,
      name: "Viewer",
      description: "The super admin can add, edit anything on the dashboard",
      users: 10,
      lastModified: "9/17/2023, 11:28 PM",
      selected: false
    },
  ]);

  const headers = ["Role Name", "Description", "Users", "Last Modified"];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);


  const toggleSelection = (id: number) => {
    setRoleData(roleData.map(role => 
      role.id === id ? { ...role, selected: !role.selected } : role
    ));
  };

  const handleEdit = (id: number) => {
    console.log(`Edit role with id: ${id}`);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: any) => {
    setRoleData(roleData.filter(role => role.id !== id));
    setIsDeleteModalOpen(false);
  };



  const renderRow = (item: RoleData, index: number) => (
    <>
      <td className="pl-[27px] py-4 px-6">
        <div className="flex items-center gap-4 h-full">
          <CustomCheckbox 
            id={item.id} 
            checked={item.selected} 
            onChange={toggleSelection} 
          />
          <p className="truncate max-w-[120px]">{item.name}</p>
        </div>
      </td>
      <td className="truncate max-w-[300px] py-4 px-6">{item.description}</td>
      <td className="truncate max-w-[120px] py-4 px-6">{item.users}</td>
      <td className="truncate max-w-[180px] py-4 px-6">{item.lastModified}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          <button className="text-gray-500" onClick={ () => setIsEditModalOpen(true)}>
            <PencilLine size={20} />
          </button>
          <button className="text-[#E33A24] hover:text-[#E33A24]" onClick={() => {
            setRoleToDelete(item.id);
            setIsDeleteModalOpen(true);
          }}>
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </>
  );

  return (
    <div className="w-full min-h-screen">
      <SettingsTable
        headers={headers}
        data={roleData}
        titleProps={{
          mainTitle: "User Roles",
          count: "200 Users",
          subtitle: "List of all user roles on the dashboard",
        }}
        href=""
        // itemsPerPage={5}
        setStep={(step: number) => console.log(`Step: ${step}`)}
        // renderRow={renderRow}
        showAddUserButton={false} renderRow={function (item: RoleData, index: number): React.ReactNode {
          throw new Error("Function not implemented.");
        } } currentPage={0} totalPages={0} setCurrentPage={function (page: number): void {
          throw new Error("Function not implemented.");
        } } isHeaderChecked={false} handleHeaderToggle={function (): void {
          throw new Error("Function not implemented.");
        } }      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (roleToDelete !== null) {
            handleDelete(roleToDelete);
          }
        }}
      />
      <EditRoleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={() => {
          // Add logic to handle edit confirmation
        }}
      />
    </div>
  );
};

export default User_Roles;