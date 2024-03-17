import React, { useState, useContext, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { UserTypeContext } from "../Provider"; // Import UserTypeContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditUserTypeForm from "../Form"; // Update to use EditMonitoringServiceForm instead of EditFoodUnitForm

const UserTypeList: React.FC = () => {
  const { userTypes, deleteUserType, addUserType, editUserType } =
    useContext(UserTypeContext); // Use UserTypeContext
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user type?")) {
      handleDelete(id);
    }
  };

  useEffect(() => {
    // Retrieve logged-in user information from local storage
    const loggedInUserData = localStorage.getItem("loggedInUser");
    console.log("Logged-in user data from local storage:", loggedInUserData);
    if (loggedInUserData) {
      setLoggedInUser(JSON.parse(loggedInUserData));
    }
  }, []);

  const handleDelete = async (id: number) => {
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

  const handleAddNewUserType = async (newTypeData: any) => {
    try {
      // Add the user type along with the logged-in user information
      const userTypeDataWithUser = { ...newTypeData, user: loggedInUser };
      await addUserType(userTypeDataWithUser);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New user type added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new user type.");
    }
  };

  const handleUpdateUserType = async (updatedTypeData) => {
    try {
      await editUserType(selectedUserType.id, updatedTypeData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("User type updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating user type.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastUserType = currentPage * itemsPerPage;
  const indexOfFirstUserType = indexOfLastUserType - itemsPerPage;
  const currentUserTypes = userTypes.slice(
    indexOfFirstUserType,
    indexOfLastUserType
  );

  const sortedUserTypes = sortBy
    ? currentUserTypes.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
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
            className="p-2 rounded border border-gray-300 "
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
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                #ID
                {sortIcon("id")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("typeName")}
            >
              <div className="flex items-center">
                Name
                {sortIcon("typeName")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUserTypes
            .filter((type) =>
              type.typeName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((type) => (
              <tr key={type.id}>
                <td className="border border-gray-300 px-4 py-2">{type.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {type.typeName !== loggedInUser?.username
                    ? type.typeName
                    : "User"}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(type)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(type.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                    >
                      <AiOutlineDelete className="w-5 h-5 mr-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isEditDrawerOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-end">
          <div className="w-96 bg-white h-full shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedUserType ? "Edit User Type" : "Add New User Type"}
            </h2>
            <EditUserTypeForm
              userType={selectedUserType}
              onSubmit={
                selectedUserType ? handleUpdateUserType : handleAddNewUserType
              }
              onClose={() => setIsEditDrawerOpen(false)} // Assuming setIsEditDrawerOpen is the function to close the drawer
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={userTypes.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default UserTypeList;
