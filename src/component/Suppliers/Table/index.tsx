import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";

// Define the type for an individual supplier
interface Supplier {
  id: string;
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  image: string;
}

// Define the type for the props of SupplierTable
interface SupplierTableProps {
  sortedSuppliers: Supplier[];
  handleSort: (key: string) => void;
  sortIcon: (key: string) => React.ReactNode;
  handleEditDrawerOpen: (supplier: Supplier) => void;
  handleDeleteConfirmation: (id: string) => void;
  translate: (text: string) => string;
  formClass: string;
}

const SupplierTable: React.FC<SupplierTableProps> = ({
  sortedSuppliers,
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
      <Table.HeadCell>{translate("Image")}</Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("name")}>
        <div className="flex items-center">
          {translate("Supplier Name")}
          {sortIcon("name")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("Company Name")}</Table.HeadCell>
      <Table.HeadCell>{translate("Phone Number")}</Table.HeadCell>
      <Table.HeadCell>{translate("Email")}</Table.HeadCell>
      <Table.HeadCell>{translate("Action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedSuppliers.map((supplier, index) => (
        <Table.Row
          key={supplier.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1} {/* Display row number */}
          </Table.Cell>
          <Table.Cell>
            <img src={supplier.image} alt={supplier.name} className="w-10 h-10 rounded-full" />
          </Table.Cell>
          <Table.Cell>{supplier.name}</Table.Cell>
          <Table.Cell>{supplier.companyName}</Table.Cell>
          <Table.Cell>{supplier.phoneNumber}</Table.Cell>
          <Table.Cell>{supplier.email}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(supplier)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(supplier.id)}
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

export default SupplierTable;
