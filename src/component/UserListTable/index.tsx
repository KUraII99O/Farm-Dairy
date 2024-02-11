import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaList } from "react-icons/fa";
interface Staff {
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
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: 1,
      image: "/path/to/image1.jpg",
      name: "John Doe",
      email: "john@example.com",
      mobile: "1234567890",
      designation: "Accountant	",
      UserType: "Admin",
      salary: 50000,
      status: true,
    },
    {
      id: 2,
      image: "/path/to/image2.jpg",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543210",
      designation: "Accountant",
      UserType: "Accountant	",
      salary: 60000,
      status: false,
    },
    {
      id: 3,
      image: "/path/to/image2.jpg",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543210",
      designation: "Accountant	",
      UserType: "Marketing Executive	",
      salary: 60000,
      status: true,
    },
    {
      id: 4,
      image: "/path/to/image2.jpg",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543210",
      designation: "Accountant",
      UserType: "Accountant",
      salary: 60000,
      status: false,
    },
    
    {
      id: 5,
      image: "/path/to/image2.jpg",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543210",
      designation: "Executive	",
      UserType: "Marketing Executive",
      salary: 60000,
      status: false,
    },
    {
      id: 6,
      image: "/path/to/image2.jpg",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543210",
      designation: "Executive	",
      UserType: "Marketing Executive",
      salary: 60000,
      status: false,
    },
    
  ]);

  const toggleStatus = (id: number) => {
    setStaffList((prevStaffList) =>
      prevStaffList.map((staff) =>
        staff.id === id ? { ...staff, status: !staff.status } : staff
      )
    );

    const changedStaff = staffList.find((staff) => staff.id === id);
    const statusMessage = changedStaff?.status
      ? "Status Enable Successfully"
      : "Status Disable Successfully";

    toast.success(statusMessage, {
      position: "top-right",
    });
  };

  const deleteStaff = (id: number) => {
    setStaffList((prevStaffList) =>
      prevStaffList.filter((staff) => staff.id !== id)
    );
  };

  return (
    <div className="overflow-x-auto">
       <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                < FaList  className="mr-2" /> {/* Add FaUserPlus icon */}
                <span>User List</span>
            </h2>
      <div className="mb-4 flex justify-end">
        <Link to="/addstaff">
          <button className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded">
            Add Staff
          </button>
        </Link>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Staff Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Mobile No</th>
            <th className="px-4 py-2 border">Designation</th>
            <th className="px-4 py-2 border">User Type</th>
            <th className="px-4 py-2 border">Salary</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id}>
              <td className="border px-4 py-2">
                <img src={staff.image} />
              </td>
              <td className="border px-4 py-2">{staff.id}</td>
              <td className="border px-4 py-2">{staff.name}</td>
              <td className="border px-4 py-2">{staff.email}</td>
              <td className="border px-4 py-2">{staff.mobile}</td>
              <td className={`border px-4 py-2 ${staff.designation === 'Executive' ? 'bg-gray-200' : ''}`}>
                {staff.designation}
              </td>
              <td className={`border px-4 py-2 ${staff.UserType === 'Executive' ? 'bg-green-200' : ''}`}>
                {staff.UserType}
              </td>
              <td className="border px-4 py-2">{staff.salary}</td>
              <td className="border px-4 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={staff.status}
                    onChange={() => toggleStatus(staff.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {staff.status ? "Active" : "Inactive"}
                  </span>
                </label>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => console.log("Edit clicked for ID", staff.id)}
                >
                  {/* Edit icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.293 3.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.267-1.266l1-3a1 1 0 0 1 .242-.391l9-9zM14 7l-1-1L5 15l1 1 2-2 8-8-1-1z" />
                  </svg>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteStaff(staff.id)}
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