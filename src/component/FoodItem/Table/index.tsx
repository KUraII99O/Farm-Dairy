import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";

// Define the type for an individual food item
interface FoodItem {
  id: string;
  name: string;
  userId: string;
}

// Define the type for the props of FoodItemTable
interface FoodItemTableProps {
  sortedFoodItems: FoodItem[];
  handleSort: (key: string) => void;
  sortIcon: (key: string) => React.ReactNode;
  handleEditDrawerOpen: (foodItem: FoodItem) => void;
  handleDeleteConfirmation: (id: string) => void;
  translate: (text: string) => string;
  formClass: string;
}

const FoodItemTable: React.FC<FoodItemTableProps> = ({
  sortedFoodItems,
  handleSort,
  sortIcon,
  handleEditDrawerOpen,
  handleDeleteConfirmation,
  translate,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("id")}>
        <div className="flex items-center">
          {translate("#ID")}
          {sortIcon("id")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("name")}>
        <div className="flex items-center">
          {translate("Name")}
          {sortIcon("name")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("Action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedFoodItems.map((foodItem, index) => (
        <Table.Row
          key={foodItem.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1} {/* Display row number */}
          </Table.Cell>
          <Table.Cell>{foodItem.name}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(foodItem)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(foodItem.id)}
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

export default FoodItemTable;
