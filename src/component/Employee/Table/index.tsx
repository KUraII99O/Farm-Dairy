import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Employee } from "../EmployeeService";

// Define the new Employee type


interface EmployeeTableProps {
  sortedEmployees: Employee[];
  handleSort: (field: keyof Employee) => void;
  sortIcon: (field: keyof Employee) => React.ReactNode;
  handleEditDrawerOpen: (employee: Employee) => void;
  handleDeleteConfirmation: (id: string) => void;

  translate: (key: string) => string;
  formClass?: string;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  sortedEmployees,
  handleSort,
  sortIcon,
  handleEditDrawerOpen,
  handleDeleteConfirmation,
  translate,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("image")}>
        {translate("image")}
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("employeeName")}>
        <div className="flex items-center">
          {translate("employeeName")}
          {sortIcon("employeeName")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("payDate")}>
        <div className="flex items-center">
          {translate("payDate")}
          {sortIcon("payDate")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("month")}>
        <div className="flex items-center">
          {translate("month")}
          {sortIcon("month")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("year")}>
        <div className="flex items-center">
          {translate("year")}
          {sortIcon("year")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("monthlySalary")}>
        <div className="flex items-center">
          {translate("monthlySalary")}
          {sortIcon("monthlySalary")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("additionMoney")}>
        <div className="flex items-center">
          {translate("additionMoney")}
          {sortIcon("additionMoney")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("total")}>
        <div className="flex items-center">
          {translate("total")}
          {sortIcon("total")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedEmployees.map((employee, index) => (
        <Table.Row
          key={index}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell>
            <img src={employee.image} alt={employee.employeeName} className="w-10 h-10 rounded-full" />
          </Table.Cell>
          <Table.Cell>{employee.employeeName}</Table.Cell>
          <Table.Cell>{employee.payDate}</Table.Cell>
          <Table.Cell>{employee.month}</Table.Cell>
          <Table.Cell>{employee.year}</Table.Cell>
          <Table.Cell>{employee.monthlySalary}</Table.Cell>
          <Table.Cell>{employee.additionMoney}</Table.Cell>
          <Table.Cell>{employee.total}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(employee)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(employee.id!)}
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

export default EmployeeTable;
