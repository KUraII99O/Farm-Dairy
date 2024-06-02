import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const EmployeeList = ({
  currentEmployees,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  handleEditDrawerOpen,

  translate,
  formClass,
}) => (
  <div className="rtl:mirror-x">
    <Table>
      <Table.Head>
        <Table.HeadCell onClick={() => handleSort("image")}>
          <div className="flex items-center">{translate("image")}</div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("name")}>
          <div className="flex items-center">
            {translate("employeeName")}
            {sortIcon("name")}
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
        <Table.HeadCell onClick={() => handleSort("salaryAmount")}>
          <div className="flex items-center">
            {translate("salaryAmount")}
            {sortIcon("salaryAmount")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("additionAmount")}>
          <div className="flex items-center">
            {translate("additionAmount")}
            {sortIcon("additionAmount")}
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
        {currentEmployees.map((employee) => (
          <Table.Row key={employee.id}>
            <Table.Cell>
              <img
                src={employee.image}
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
            </Table.Cell>
            <Table.Cell>{employee.name}</Table.Cell>
            <Table.Cell>{employee.payDate}</Table.Cell>
            <Table.Cell>{employee.month}</Table.Cell>
            <Table.Cell>{employee.year}</Table.Cell>
            <Table.Cell>{employee.salaryAmount}</Table.Cell>
            <Table.Cell>{employee.additionAmount}</Table.Cell>
            <Table.Cell>{employee.total}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(employee)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5  ml-2" />
              </button>
                <button
                  onClick={() => handleDeleteConfirmation(employee.id)}
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
  </div>
);

export default EmployeeList;
