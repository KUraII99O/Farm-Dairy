import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";

// Define the type for an individual animal type
interface AnimalType {
  id: string;
  name: string;
  userId: string;
}

// Define the type for the props of AnimalTypeTable
interface AnimalTypeTableProps {
  sortedAnimalTypes: AnimalType[];
  handleSort: (key: string) => void;
  sortIcon: (key: string) => React.ReactNode;
  handleEditDrawerOpen: (animalType: AnimalType) => void;
  handleDeleteConfirmation: (id: string) => void;
  translate: (text: string) => string;
  formClass: string;
}

const AnimalTypeTable: React.FC<AnimalTypeTableProps> = ({
  sortedAnimalTypes,
  handleSort,
  sortIcon,
  handleEditDrawerOpen,
  handleDeleteConfirmation,
  translate,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("rowNumber")}>
        <div className="flex items-center">
          {translate("ID")}
          {sortIcon("rowNumber")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("name")}>
        <div className="flex items-center">
          {translate("Animal Type Name")}
          {sortIcon("name")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("Action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedAnimalTypes.map((animalType, index) => (
        <Table.Row
          key={animalType.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1} {/* Display row number */}
          </Table.Cell>
          <Table.Cell>{animalType.name}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(animalType)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(animalType.id)}
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

export default AnimalTypeTable;
