import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Designation } from "../DesignationService";


interface DesignationTableProps {
  sortedDesignations: Designation[];
  handleSort: (column: string) => void;
  sortIcon: (column: string) => React.ReactNode;
  handleEditDrawerOpen: (designation: Designation) => void;
  handleDeleteConfirmation: (id: string) => void;
  translate: (key: string) => string;
  formClass?: string; // Optional prop, if applicable
}

const DesignationTable: React.FC<DesignationTableProps> = ({
  sortedDesignations,
  handleSort,
  sortIcon,
  handleEditDrawerOpen,
  handleDeleteConfirmation,
  translate,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("S/L")}>
        <div className="flex items-center">
          {translate("S/L")}
          {sortIcon("S/L")}
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
      {sortedDesignations.map((designation, index) => (
        <Table.Row
          key={designation.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {designation.name}
          </Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(designation)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(designation.id!)}
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

export default DesignationTable;
