import React, { useState, useContext } from "react";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { ExpenseContext } from "../Provider";
import { toast, ToastContainer } from "react-toastify";
import EditExpenseForm from "../Form";

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, addExpense, editExpense } =
    useContext(ExpenseContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleSort = (fieldName: string) => {
    if (sortBy === fieldName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(fieldName);
      setSortOrder("asc");
    }
  };

  const handleEditDrawerOpen = (expense: any) => {
    setSelectedExpense(expense);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewExpense = async (newExpenseData: any) => {
    try {
      await addExpense(newExpenseData);
      setIsEditDrawerOpen(false);
      toast.success("New expense added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new expense.");
    }
  };

  const handleUpdateExpense = async (updatedExpenseData: any) => {
    try {
      await editExpense(selectedExpense.id, updatedExpenseData);
      setIsEditDrawerOpen(false);
      toast.success("Expense updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating Expense.");
    }
  };

  const handleDeleteConfirmation = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        toast.success("Expense deleted successfully!");
      } catch (error) {
        toast.error("An error occurred while deleting the expense.");
      }
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const dynamicSort = (property: string) => {
    let sortOrderValue = sortOrder === "asc" ? 1 : -1;
    return function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * sortOrderValue;
      } else if (a[property] > b[property]) {
        return 1 * sortOrderValue;
      } else {
        return 0;
      }
    };
  };

  const filteredExpenses = expenses.filter((expense) =>
    Object.values(expense).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedExpenses = sortBy
    ? filteredExpenses.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredExpenses;

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = sortedExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  return (
    <>
      {isEditDrawerOpen && (
        <EditExpenseForm
          expense={selectedExpense}
          onSubmit={selectedExpense ? handleUpdateExpense : handleAddNewExpense}
          onClose={() => setIsEditDrawerOpen(false)}
        />
      )}
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
          Expense List
        </h1>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  #
                  {sortIcon("id")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortIcon("date")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("purposeName")}
              >
                <div className="flex items-center">
                  Purpose Name
                  {sortIcon("purposeName")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("details")}
              >
                <div className="flex items-center">
                  Details
                  {sortIcon("details")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("totalAmount")}
              >
                <div className="flex items-center">
                  Total Amount
                  {sortIcon("totalAmount")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("addedBy")}
              >
                <div className="flex items-center">
                  Added By
                  {sortIcon("addedBy")}
                </div>
              </th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.purposeName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.details}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                {expense.totalAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.addedBy}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(expense)}
                      className="text-blue-500 hover:underline flex items-center mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(expense.id)}
                      className="text-red-500 hover:hover:underline flex items-center mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <AiOutlineDelete className="w-5 h-5 mr-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalItems={sortedExpenses.length}
          defaultItemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default ExpenseList;
