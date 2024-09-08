import React, { useState } from "react";
import { useManageUserType } from "../Provider"; // Adjust path as necessary
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import UserTypeTable from "../Table";
import EditUserTypeForm from "../Form";
import { Drawer } from "flowbite-react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";



interface UserType  {
  id: string;
  typeName: string;
  userId: string;
};




const UserTypeList: React.FC = () => {
  const { userTypes, deleteUserType, addUserType, editUserType } = useManageUserType();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedUserType, setSelectedUserType]= useState<UserType | null>(null);
  const { translate, language } = useTranslation();

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user type?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUserType(id);
      toast.success("User type deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting user type.");
    }
  };

  const handleSort = (fieldName: string) => {
    if (sortBy === fieldName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(fieldName);
      setSortOrder("asc");
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleEditDrawerOpen = (userType: any) => {
    setSelectedUserType(userType);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewUserType = async (newUserTypeData: any) => {
    try {
      await addUserType(newUserTypeData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New user type added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new user type.");
    }
  };

  const handleUpdateUserType = async (updatedUserTypeData: UserType) => {
    if (selectedUserType) {
    try {
      await editUserType(selectedUserType.id, updatedUserTypeData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("User type updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating user type.");
    }
  }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedUserType(null);
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  // Ensure userTypes is an array
  const validUserTypes = Array.isArray(userTypes) ? userTypes : [];

  const indexOfLastUserType = currentPage * itemsPerPage;
  const indexOfFirstUserType = indexOfLastUserType - itemsPerPage;
  const currentUserTypes = validUserTypes.slice(indexOfFirstUserType, indexOfLastUserType);

  const sortedUserTypes = sortBy
    ? currentUserTypes.slice().sort((a, b) => {
        const aValue = a[sortBy as keyof UserType];
        const bValue = b[sortBy as keyof UserType];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentUserTypes;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
      <div className="flex items-center"></div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300"
          />
          <button
            onClick={() => handleEditDrawerOpen(null)}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New
          </button>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        User Type List
      </h1>
      <UserTypeTable
        sortedUserTypes={sortedUserTypes}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleEditDrawerOpen={handleEditDrawerOpen}
        handleDeleteConfirmation={handleDeleteConfirmation}
        formClass={formClass}
        translate={translate}
      />
      <Drawer
        open={isEditDrawerOpen}
        onClose={handleCloseDrawer}
        position="right" // Set the position to "right"
      >
        <Drawer.Header>
          <h2 className="text-xl font-bold">
            {selectedUserType ? translate("editUserType") : translate("addNewUserType")}
          </h2>
        </Drawer.Header>
        <Drawer.Items>
          <EditUserTypeForm
            userType={selectedUserType}
            onSubmit={selectedUserType ? handleUpdateUserType : handleAddNewUserType}
            onClose={handleCloseDrawer}
          />
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={validUserTypes.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
      <ToastContainer />
    </div>
  );
};

export default UserTypeList;
