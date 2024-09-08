import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import Pagination from "../../Pagination";

interface Expense {
  id: string;
  Date: string;
  purposeName: string;
  details: string;
  totalAmount: string;
  AddedBy: string;
}

interface ExpenseListProps {
  currentExpenses: Expense[];
  handleSort: (fieldName: string) => void;
  sortIcon: (fieldName: string) => React.ReactNode;
  handleEditDrawerOpen: (expense: Expense) => void;
  handleDeleteConfirmation: (id: string) => void;
  translate: (key: string) => string;
  formClass: string;
  itemsPerPage: number; // If pagination is involved
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  currentExpenses,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  handleEditDrawerOpen,
  translate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpensesPage = currentExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="rtl:mirror-x">
      <Table>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("date")}>
            <div className="flex items-center">{translate("Date")}</div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("purposeName")}>
            <div className="flex items-center">
              {translate("Purpose Name")}
              {sortIcon("purposeName")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("details")}>
            <div className="flex items-center">
              {translate("Details")}
              {sortIcon("details")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("totalAmount")}>
            <div className="flex items-center">
              {translate("Total Amount")}
              {sortIcon("totalAmount")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("addedBy")}>
            <div className="flex items-center">
              {translate("Added By")}
              {sortIcon("addedBy")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("Action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentExpensesPage.map((expense, index) => (
            <Table.Row key={expense.id}>
              <Table.Cell>{indexOfFirstExpense + index + 1}</Table.Cell>
              <Table.Cell>{expense.Date}</Table.Cell>
              <Table.Cell>{expense.purposeName}</Table.Cell>
              <Table.Cell>{expense.details}</Table.Cell>
              <Table.Cell>{expense.totalAmount}</Table.Cell>
              <Table.Cell>{expense.AddedBy}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <button
                    onClick={() => handleEditDrawerOpen(expense)}
                    className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                  >
                    <BsPencil className="w-5 h-5 ml-2" />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(expense.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                  >
                    <AiOutlineDelete className="w-5 h-5 mr-1" />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Pagination controls */}
      <Pagination
        totalItems={currentExpenses.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
};

export default ExpenseList;
