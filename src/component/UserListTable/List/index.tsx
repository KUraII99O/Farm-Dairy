import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaList } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

interface User {
  id: number;
  image: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  UserType: string;
  salary: number;
  status: boolean;
}

const UserTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [userList, setUserList] = useState<User[]>([
    {
      id: 1,
      image: "/path/to/image1.jpg",
      name: "bin",
      email: "bin@example.com",
      mobile: "0987643654",
      designation: "Accountant	",
      UserType: "Marketing Executive	",
      salary: 6589,
      status: true,
    },
    {
      id: 2,
      image: "/path/to/image1.jpg",
      name: "lila",
      email: "lila@example.com",
      mobile: "99872348",
      designation: "Executive	",
      UserType: "Accountant",
      salary: 4600,
      status: true,
    },
    {
      id: 3,
      image: "/path/to/image1.jpg",
      name: "zooe",
      email: "zooe@example.com",
      mobile: "6433290",
      designation: "Accountant	",
      UserType: "Accountant	",
      salary: 86786,
      status: true,
    },
    {
      id: 4,
      image: "/path/to/image1.jpg",
      name: " Doe",
      email: "Doe@example.com",
      mobile: "986758675",
      designation: "Executive	",
      UserType: "Marketing Executive	",
      salary: 8769,
      status: true,
    },

    {
      id: 5,
      image: "/path/to/image1.jpg",
      name: " elise",
      email: "elise@example.com",
      mobile: "3298767",
      designation: "Executive	",
      UserType: "Marketing Executive	",
      salary: 4860,
      status: true,
    },

    {
      id: 6,
      image: "/path/to/image1.jpg",
      name: " fat",
      email: "far@example.com",
      mobile: "86759870",
      designation: "Executive	",
      UserType: "Accountant	",
      salary: 2990,
      status: true,
    },
  ]);

  const toggleStatus = (id: number) => {
    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );

    const changedUser = userList.find((user) => user.id === id);
    const statusMessage = changedUser?.status
      ? "Status Enabled Successfully"
      : "Status Disabled Successfully";

    toast.success(statusMessage, {
      position: "top-right",
    });
  };

  const deleteUser = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setUserList((prevUserList) =>
        prevUserList.filter((user) => user.id !== id)
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (criteria: string) => {
    if (sortCriteria === criteria || sortCriteria === `-${criteria}`) {
      setSortCriteria(sortCriteria.startsWith("-") ? criteria : `-${criteria}`);
    } else {
      setSortCriteria(criteria);
    }
  };

  // Sorting Logic
  const sortedList = sortCriteria
    ? [...userList].sort((a, b) => {
        const fieldA = sortCriteria.startsWith("-")
          ? b[sortCriteria.slice(1) as keyof User]
          : a[sortCriteria as keyof User];
        const fieldB = sortCriteria.startsWith("-")
          ? a[sortCriteria.slice(1) as keyof User]
          : b[sortCriteria as keyof User];

        if (typeof fieldA === "string" && typeof fieldB === "string") {
          return fieldA.localeCompare(fieldB);
        } else if (typeof fieldA === "number" && typeof fieldB === "number") {
          return fieldA - fieldB;
        } else {
          // If the types are different, maintain the original order
          return 0;
        }
      })
    : userList;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaList className="mr-2" />
        <span>User List</span>
      </h2>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Link to="/addstaff">
          <button className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded ml-2">
            Add User
          </button>
        </Link>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <td className="px-4 py-2 border">Image</td>
            <td className="px-4 py-2 border">id</td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                <span>Staff Name</span>
                {sortCriteria === "name" && <FiArrowDown className="ml-1" />}
                {sortCriteria === "-name" && <FiArrowUp className="ml-1" />}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("email")}
            >
              <div className="flex items-center">
                <span>Email</span>
                {sortCriteria === "email" && <FiArrowDown className="ml-1" />}
                {sortCriteria === "-email" && <FiArrowUp className="ml-1" />}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("mobile")}
            >
              <div className="flex items-center">
                <span>Mobile No</span>
                {sortCriteria === "mobile" && <FiArrowDown className="ml-1" />}
                {sortCriteria === "-mobile" && <FiArrowUp className="ml-1" />}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("designation")}
            >
              <div className="flex items-center">
                <span>Designation</span>
                {sortCriteria === "designation" && (
                  <FiArrowDown className="ml-1" />
                )}
                {sortCriteria === "-designation" && (
                  <FiArrowUp className="ml-1" />
                )}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("joiningDate")}
            >
              <div className="flex items-center">
                <span>Joining Date</span>
                {sortCriteria === "joiningDate" && (
                  <FiArrowDown className="ml-1" />
                )}
                {sortCriteria === "-joiningDate" && (
                  <FiArrowUp className="ml-1" />
                )}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("salary")}
            >
              <div className="flex items-center">
                <span>Salary</span>
                {sortCriteria === "salary" && <FiArrowDown className="ml-1" />}
                {sortCriteria === "-salary" && <FiArrowUp className="ml-1" />}
              </div>
            </td>
            <td className="px-4 py-2 border">Status</td>
            <td className="px-4 py-2 border">Action</td>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                <img
                  src={user.image}
                  alt={`Image of ${user.name}`}
                  className="h-12 w-12 object-cover rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.mobile}</td>
              <td
                className={`border px-4 py-2 ${
                  user.designation === "Executive" ? "bg-gray-200" : ""
                }`}
              >
                {user.designation}
              </td>
              <td
                className={`border px-4 py-2 ${
                  user.UserType === "Executive" ? "bg-green-200" : ""
                }`}
              >
                {user.UserType}
              </td>
              <td className="border px-4 py-2">{user.salary}</td>
              <td className="border px-4 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={user.status}
                    onChange={() => toggleStatus(user.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {user.status ? "Active" : "Inactive"}
                  </span>
                </label>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => console.log("Edit clicked for ID", user.id)}
                >
                  {/* Edit icon */}
                  <Link to={"/user/"+user.id+"/edit"}>

                   
                
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 hover:text-blue-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.293 3.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.267-1.266l1-3a1 1 0 0 1 .242-.391l9-9zM14 7l-1-1L5 15l1 1 2-2 8-8-1-1z" />
                    </svg>
                  </Link>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteUser(user.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1h2a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h2V3zm10 6a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a1 1 0 0 1 1-1h8zm-4 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 items-center">
        <div>
          <span className="mr-2">Items per page:</span>
          <select
            className="border px-2 py-1 rounded"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Page:</span>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-3 py-1 rounded mr-2"
            disabled={currentPage === 1}
          >
            <BiChevronLeft />
          </button>
          {Array.from(
            { length: Math.ceil(sortedList.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-gray-300" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-3 py-1 rounded ml-2"
            disabled={
              currentPage === Math.ceil(sortedList.length / itemsPerPage)
            }
          >
            <BiChevronRight />
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UserTable;
