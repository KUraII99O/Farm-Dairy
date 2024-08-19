import React from "react";
import { Table } from "flowbite-react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { ColorTableProps } from "../../../types/types";




const ColorTable: React.FC<ColorTableProps> = ({
  colors, // Accept colors instead of sortedColors
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  handleEditDrawerOpen,
  translate,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("id")}>
        <div className="flex items-center">
          {translate("S/L")}
          {sortIcon("id")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("colorName")}>
        <div className="flex items-center">
          {translate("Color Name")}
          {sortIcon("colorName")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("Action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {colors.map((colors, index) => (
        <Table.Row
          key={colors.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1} {/* Display row number */}
          </Table.Cell>
          <Table.Cell>{colors.name}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(colors)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(colors.id)}
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

export default ColorTable;
