import React, { useState, useContext } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { ExpenseContext } from "../Provider";
import { toast, ToastContainer } from "react-toastify";
import EditExpenseForm from "../Form";
import ExpenseList from "../Table";
import { useTranslation } from "../../Translator/Provider";
import { Expense } from "../FarmExpenseService";


const ExpenseTable: React.FC = () => {
  const { expenses, deleteExpense, addExpense, editExpense } =
    useContext(ExpenseContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] =  useState<Expense | null>(null);
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";
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

  const handleUpdateExpense = async (updatedExpenseData: Expense) => {
    try {
      if(selectedExpense)
      await editExpense(selectedExpense.id, updatedExpenseData);
      setIsEditDrawerOpen(false);
      toast.success("Expense updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating Expense.");
    }
  };

  const handleDeleteConfirmation = async (id: string) => {
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


  const filteredExpenses = expenses.filter((expense:Expense) =>
    Object.values(expense).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedExpenses = sortBy
    ? filteredExpenses.slice().sort((a:Expense, b:Expense) => {
        const aValue = a[sortBy as keyof Expense]?? "";
        const bValue = b[sortBy as keyof Expense]?? "";
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredExpenses;


  return (
    <>
      {isEditDrawerOpen && (
        <EditExpenseForm
          expense={selectedExpense || undefined}
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
        <ExpenseList
          currentExpenses={sortedExpenses}
          handleSort={handleSort}
          sortIcon={sortIcon}
          handleEditDrawerOpen={handleEditDrawerOpen}
          handleDeleteConfirmation={handleDeleteConfirmation}
          translate={translate}
          formClass={formClass} itemsPerPage={0}          
          />

        <ToastContainer />
      </div>
    </>
  );
};

export default ExpenseTable;
