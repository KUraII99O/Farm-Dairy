import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaList } from "react-icons/fa";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface Staff {
  id: number;
  image: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  joiningDate: string;
  salary: number;
  status: boolean;
}

const StaffTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: 1,
      image: "https://www.coogfans.com/uploads/db5902/original/3X/8/1/81173237ffa580ef710b0862fdddaac163274db1.jpeg",
      name: "jhon",
      email: "john@example.com",
      mobile: "5067891234",
      designation: "Accountant",
      joiningDate: "07/14/2022  ",
      salary: 1260,
      status: true,
    },
    {
      id: 2,
      image: "https://i.pinimg.com/originals/c8/2f/a2/c82fa243a9db86c13b349757b15c9276.jpg",
      name: " Smith",
      email: "jane@example.com",
      mobile: "3145926087",
      designation: "Accountant",
      joiningDate: "04/03/2019     ",
      salary: 2005,
      status: false,
    },
    {
      id: 3,
      image: "https://i.pinimg.com/originals/94/95/b5/9495b5f76964fa398bddf89ec9fd80c1.jpg",
      name: "will",
      email: "jane@example.com",
      mobile: "3145926087",
      designation: "Accountant",
      joiningDate: "10/26/2021",
      salary: 9008,
      status: true,
    },
    {
      id: 4,
      image: "https://i.pinimg.com/originals/88/a6/3d/88a63d6f8e6012e9ad395caacaa81138.jpg",
      name: "kamie",
      email: "jane@example.com",
      mobile: "6092874153",
      designation: "Executive",
      joiningDate: "12/09/2018",
      salary: 2760,
      status: false,
    },
    {
      id: 5,
      image: "https://i.pinimg.com/originals/b5/53/5e/b5535ecf87e6007a23c674afc1617a7b.jpg",
      name: "nali",
      email: "jane@example.com",
      mobile: "8241759360",
      designation: "Executive",
      joiningDate: "08/20/2023 ",
      salary: 4000,
      status: false,
    },
    {
      id: 6,
      image: "https://i.pinimg.com/originals/16/2b/ac/162baca7d9b8617b59514864cda41ef7.jpg",
      name: "vavi",
      email: "jane@example.com",
      mobile: "7150263849",
      designation: "Executive",
      joiningDate: "05/01/2020 ",
      salary: 2008,
      status: false,
    },
    {
      id: 7,
      image: "https://i.pinimg.com/originals/4d/db/1a/4ddb1a7eca362a0f1610383a0532b3bb.jpg",
      name: "zafa",
      email: "jane@example.com",
      mobile: "4321987650",
      designation: "Accountant",
      joiningDate: "11/18/2024 ",
      salary: 8890,
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
    const confirmed = window.confirm(
      "Are you sure you want to delete this staff member?"
    );
    if (confirmed) {
      setStaffList((prevStaffList) =>
        prevStaffList.filter((staff) => staff.id !== id)
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

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const filteredAndSortedStaff = staffList
  .filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a: Staff, b: Staff) => {
    if (sortCriteria) {
      const key: keyof Staff = sortCriteria.startsWith("-")
        ? sortCriteria.slice(1) as keyof Staff
        : sortCriteria as keyof Staff;
      const sortOrder = sortCriteria.startsWith("-") ? -1 : 1; // Determine sort order based on the prefix
      if (a[key] < b[key]) return -1 * sortOrder; // Multiply by sortOrder to reverse sort order if necessary
      if (a[key] > b[key]) return 1 * sortOrder;
      return 0;
    }
    return 0;
  });

const currentStaffList = filteredAndSortedStaff.slice(
  indexOfFirstItem,
  indexOfLastItem
);
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaList className="mr-2" />
        <span>Staff List</span>
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
            Add Staff
          </button>
        </Link>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
  <tr>
    <td className="px-4 py-2 border">Image</td>
    <td className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("name")}>
      <div className="flex items-center">
        <span>Staff Name</span>
        {sortCriteria === "name" && <FiArrowDown className="ml-1" />}
        {sortCriteria === "-name" && <FiArrowUp className="ml-1" />}
      </div>
    </td>
    <td className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("email")}>
      <div className="flex items-center">
        <span>Email</span>
        {sortCriteria === "email" && <FiArrowDown className="ml-1" />}
        {sortCriteria === "-email" && <FiArrowUp className="ml-1" />}
      </div>
    </td>
    <td className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("mobile")}>
      <div className="flex items-center">
        <span>Mobile No</span>
        {sortCriteria === "mobile" && <FiArrowDown className="ml-1" />}
        {sortCriteria === "-mobile" && <FiArrowUp className="ml-1" />}
      </div>
    </td>
    <td className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("designation")}>
      <div className="flex items-center">
        <span>Designation</span>
        {sortCriteria === "designation" && <FiArrowDown className="ml-1" />}
        {sortCriteria === "-designation" && <FiArrowUp className="ml-1" />}
      </div>
    </td>
    <td className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("joiningDate")}>
      <div className="flex items-center">
        <span>Joining Date</span>
        {sortCriteria === "joiningDate" && <FiArrowDown className="ml-1" />}
        {sortCriteria === "-joiningDate" && <FiArrowUp className="ml-1" />}
      </div>
    </td>
    <td className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("salary")}>
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
  {currentStaffList.map((staff) => (
    <tr key={staff.id}>
      <td className="border px-4 py-2">
        <img
          src={staff.image}
          alt={`Image of ${staff.name}`}
          className="h-12 w-12 object-cover rounded-full"
        />
      </td>
      <td className="border px-4 py-2">{staff.name}</td>
      <td className="border px-4 py-2">{staff.email}</td>
      <td className="border px-4 py-2">{staff.mobile}</td>
      <td className="border px-4 py-2">{staff.designation}</td>
      <td className="border px-4 py-2">{staff.joiningDate}</td>
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
    {Array.from({ length: Math.ceil(staffList.length / itemsPerPage) }, (_, i) => (
      <button
        key={i}
        onClick={() => paginate(i + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === i + 1 ? 'bg-gray-300' : ''
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => paginate(currentPage + 1)}
      className="px-3 py-1 rounded ml-2"
      disabled={currentPage === Math.ceil(staffList.length / itemsPerPage)}
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
export default StaffTable;
