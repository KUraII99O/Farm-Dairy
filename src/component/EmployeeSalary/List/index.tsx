import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaList } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { EmployeeSalary, useEmployeeSalaryContext } from "../Provider";

const SalaryTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const { employeeSalarys } = useEmployeeSalaryContext();

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

  const deleteUser = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this information ?"
    );
    if (confirmed) {
      // setUserList((prevUserList) =>
      //   prevUserList.filter((user) => user.id !== id)
      // );
    }
  };

  const sortedList = React.useMemo(() => {
    if (!sortCriteria) return employeeSalarys;

    return [...employeeSalarys]
      .filter((user) =>
        user.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const fieldA = sortCriteria.startsWith("-")
          ? b[sortCriteria.slice(1) as keyof EmployeeSalary]
          : a[sortCriteria as keyof EmployeeSalary];
        const fieldB = sortCriteria.startsWith("-")
          ? a[sortCriteria.slice(1) as keyof EmployeeSalary]
          : b[sortCriteria as keyof EmployeeSalary];

        if (typeof fieldA === "string" && typeof fieldB === "string") {
          return fieldA.localeCompare(fieldB);
        } else if (typeof fieldA === "number" && typeof fieldB === "number") {
          return fieldA - fieldB;
        } else {
          // If the types are different, maintain the original order
          return 0;
        }
      });
  }, [sortCriteria, employeeSalarys, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentUsers = sortedList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaList className="mr-2" />
        <span>Employee Salary List</span>
      </h2>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Link to="/salary/create">
          <button className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded ml-2">
            Create New
          </button>
        </Link>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <td className="px-4 py-2 border">S/L</td>
            <td className="px-4 py-2 border">Image</td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("employeeName")}
            >
              <div className="flex items-center">
                <span>Employee Name</span>
                {sortCriteria === "employeeName" && (
                  <FiArrowDown className="ml-1" />
                )}
                {sortCriteria === "-employeeName" && (
                  <FiArrowUp className="ml-1" />
                )}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("payDate")}
            >
              <div className="flex items-center">
                <span>Pay Date</span>
                {sortCriteria === "payDate" && <FiArrowDown className="ml-1" />}
                {sortCriteria === "-payDate" && <FiArrowUp className="ml-1" />}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("month")}
            >
              <div className="flex items-center">
                <span>Month</span>
                {sortCriteria === "month" && <FiArrowDown className="ml-1" />}
                {sortCriteria === "-month" && <FiArrowUp className="ml-1" />}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("year")}
            >
              <div className="flex items-center">
                <span>Year</span>
                {sortCriteria === "year" && <FiArrowDown className="ml-1" />}
                {sortCriteria === "-year" && <FiArrowUp className="ml-1" />}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("salaryAmount")}
            >
              <div className="flex items-center">
                <span>Salary Amount</span>
                {sortCriteria === "salaryAmount" && (
                  <FiArrowDown className="ml-1" />
                )}
                {sortCriteria === "-salaryAmount" && (
                  <FiArrowUp className="ml-1" />
                )}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("additionAmount")}
            >
              <div className="flex items-center">
                <span>Addition Amount</span>
                {sortCriteria === "additionAmount" && (
                  <FiArrowDown className="ml-1" />
                )}
                {sortCriteria === "-additionAmount" && (
                  <FiArrowUp className="ml-1" />
                )}
              </div>
            </td>
            <td
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("totalAmount")} // Sort by total amount
            >
              <div className="flex items-center">
                <span>Total</span>
                {sortCriteria === "totalAmount" && (
                  <FiArrowDown className="ml-1" />
                )}
                {sortCriteria === "-totalAmount" && (
                  <FiArrowUp className="ml-1" />
                )}
              </div>
            </td>
            <td className="px-4 py-2 border">Action</td>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                {user.id}
              </td>
              <td className="border px-4 py-2">
                <img
                  src={user.image}
                  alt={`Image of ${user.employeeName}`}
                  className="h-12 w-12 object-cover rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{user.employeeName}</td>
              <td className="border px-4 py-2">{user.payDate}</td>
              <td className="border px-4 py-2">{user.monthlySalary}</td>{" "}
              {/* Render Month */}
              <td className="border px-4 py-2">{user.year}</td>{" "}
              {/* Render Year */}
              <td className="border px-4 py-2">{user.salaryAmount}</td>
              <td className="border px-4 py-2">{user.additionMoney}</td>
              <td className="border px-4 py-2">
                {user.salaryAmount + user.additionMoney}
              </td>
              <td className="border px-4 py-2">
                <Link to="/">
                  <Link to={"/salary/"+user.id+"/edit"}>
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
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
                  </Link>
                </Link>
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
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to the first page when changing items per page
            }}
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
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
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
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-gray-300" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
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

export default SalaryTable;
