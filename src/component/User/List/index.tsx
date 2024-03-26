import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../Provider";
import { User } from "../types";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useTranslation } from "../../Translator/Provider";

const UserTable: React.FC = () => {
  const { users, toggleStatus, deleteUser } = useContext(UserContext);
  const { translate,language } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of users per page
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort users based on the selected field
  const sortedUsers = sortBy
    ? filteredUsers.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] < b[sortBy]
          ? 1
          : -1
      )
    : filteredUsers;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUser = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination end

  const handleToggleStatus = (id: number) => {
    toggleStatus(id);
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

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // If the user confirms, directly call handleDelete
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteUser(id);
      setIsDeleting(false);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center"></div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder={translate("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 ml-2"
          />
          <Link
            to="/add-user"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("adduser")}
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">{translate("UserTable")}</h1>{" "}
      {/* Translate table title */}
      <div className="rtl:mirror-x">
        <table className="min-w-full bg-white border-collapse">
          {/* Table header */}
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 cursor-pointer">
                <div className="flex items-center">{translate("image")}</div>{" "}
                {/* Translate table header */}
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  {translate("staffName")} {/* Translate table header */}
                  {sortIcon("name")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  {translate("email")}
                  {sortIcon("email")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("mobile")}
              >
                <div className="flex items-center">
                  {translate("mobile")}
                  {sortIcon("mobile")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("designation")}
              >
                <div className="flex items-center">
                  {translate("designation")}
                  {sortIcon("designation")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("joiningDate")}
              >
                <div className="flex items-center">
                  {translate("joiningDate")}
                  {sortIcon("joiningDate")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("salary")}
              >
                <div className="flex items-center">
                  {translate("salary")}
                  {sortIcon("GrossSalary")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">{translate("status")}</div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                {translate("action")}
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {currentUser.map((User) => (
              <tr key={User.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={User.image}
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {User.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {User.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {User.mobile}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {User.designation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {User.joiningDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {User.grossSalary}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <label
                    className={`inline-flex items-center cursor-pointer ${
                      formClass === "rtl" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={User.status}
                      onChange={() => handleToggleStatus(User.id)}
                    />
                    <div
                      className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 ${
                        formClass === "ltr"
                          ? "peer-checked:after:-translate-x-full"
                          : "peer-checked:before:translate-x-full"
                      } peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 ${
                        formClass === "rtl"
                          ? "peer-checked:after:-translate-x-full"
                          : "peer-checked:after:translate-x-full"
                      } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform duration-200 ease-in-out dark:border-gray-600 peer-checked:bg-green-600`}
                    ></div>
                    <span
                      className={`ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 ${
                        formClass === "rtl" ? "me-3" : "ms-3"
                      }`}
                    >
                      {User.status
                        ? translate("active")
                        : translate("inactive")}
                    </span>
                  </label>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center">
                    <Link
                      to={`/edit-user/${User.id}`}
                      className="text-blue-500 hover:underline flex items-center mr-2"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </Link>
                    <button
                      onClick={() => handleDeleteConfirmation(User.id)}
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
      </div>
      {/* Pagination */}
      <Pagination
        totalItems={sortedUsers.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default UserTable;
