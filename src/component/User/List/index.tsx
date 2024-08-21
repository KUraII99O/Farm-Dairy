import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ManageUserContext } from "../Provider";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import { useTranslation } from "../../Translator/Provider";
import UserList from "../Table";


interface  User  {
  id: string;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  joiningDate: string;
  grossSalary: string;
  status: boolean;
  image: string;
}

const UserTable: React.FC = () => {
  const { users, toggleUserStatus, deleteUser } = useContext(ManageUserContext);
  const { translate, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [, setIsDeleting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();

  useEffect(() => {
    if (query.get("result") === "success") {
      toast.success("User Added successfully!");
      navigate(location.pathname, { replace: true });
    }
  }, [query, location.pathname, navigate]);  const filteredUsers = users.filter((user:User) =>
    Object.values(user).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort users based on the selected field
  const sortedUsers = sortBy
    ? filteredUsers.sort((a:any, b:any) =>
        sortOrder === "asc" ? (a[sortBy] > b[sortBy] ? 1 : -1) : a[sortBy] < b[sortBy] ? 1 : -1
      )
    : filteredUsers;

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
      toast.success("User deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("Failed to delete user.");
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
      <h1 className="text-xl font-bold mb-4">{translate("UserTable")}</h1>
      <div className="rtl:mirror-x">
        <UserList
          currentUser={sortedUsers}
          handleSort={handleSort}
          sortIcon={sortIcon}
          handleToggleStatus={toggleUserStatus} // Assuming toggleStatus is provided by ManageUserContext
          handleDeleteConfirmation={handleDeleteConfirmation}
          translate={translate}
          formClass={formClass}
        />
      </div>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default UserTable;
