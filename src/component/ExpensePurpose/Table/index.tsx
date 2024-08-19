import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";

const ExpensePurposeTable = ({
  sortedExpensePurposes,
  handleSort,
  sortIcon,
  handleEditDrawerOpen,
  handleDeleteConfirmation,
  translate,
  formClass,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("rowNumber")}>
        <div className="flex items-center">
          {translate("row")}
          {sortIcon("rowNumber")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("name")}>
        <div className="flex items-center">
          {translate("name")}
          {sortIcon("name")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedExpensePurposes.map((expensePurpose, index) => (
        <Table.Row
          key={expensePurpose.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1} {/* Display row number */}
          </Table.Cell>
          <Table.Cell>{expensePurpose.name}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(expensePurpose)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(expensePurpose.id)}
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
);

export default ExpensePurposeTable;
