import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";

interface UserType {
  id: string;
  typeName: string;
  userId: string;
}

interface UserTypeTableProps {
  sortedUserTypes: UserType[];
  handleSort: (column: string) => void;
  sortIcon: (column: string) => JSX.Element;
  handleEditDrawerOpen: (userType: UserType) => void;
  handleDeleteConfirmation: (id: string) => void;
  translate: (key: string) => string;
  formClass?: string; // Optional prop
}

const UserTypeTable: React.FC<UserTypeTableProps> = ({
  sortedUserTypes,
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
          {translate("S/L")} {/* Serial Number */}
          {sortIcon("rowNumber")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("name")}>
        <div className="flex items-center">
          {translate("User Type")}
          {sortIcon("name")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("Action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedUserTypes.map((userType, index) => (
        <Table.Row
          key={userType.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1} {/* Display row number */}
          </Table.Cell>
          <Table.Cell>{userType.typeName}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(userType)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(userType.id)}
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

export default UserTypeTable;
