import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table,ToggleSwitch  } from "flowbite-react";
import { Link } from "react-router-dom"; 

const StaffList = ({
  currentStaff,
  handleSort,
  sortIcon,
  handleToggleStatus,
  handleDeleteConfirmation,
  translate,
  formClass,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("image")}>
        <div className="flex items-center">
          {translate("image")}
          {sortIcon("image")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("name")}>
        <div className="flex items-center">
          {translate("staffName")}
          {sortIcon("name")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("email")}>
        <div className="flex items-center">
          {translate("email")}
          {sortIcon("email")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("mobile")}>
        <div className="flex items-center">
          {translate("mobile")}
          {sortIcon("mobile")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("designation")}>
        <div className="flex items-center">
          {translate("designation")}
          {sortIcon("designation")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("joiningDate")}>
        <div className="flex items-center">
          {translate("joiningDate")}
          {sortIcon("joiningDate")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("salary")}>
        <div className="flex items-center">
          {translate("salary")}
          {sortIcon("GrossSalary")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("status")}>
        <div className="flex items-center">{translate("status")}</div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {currentStaff.map((staffMember) => (
        <Table.Row key={staffMember.id}>
          <Table.Cell >
            <img
              src={staffMember.image}
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
          </Table.Cell>
          <Table.Cell >
            {staffMember.name}
          </Table.Cell>
          <Table.Cell >
            {staffMember.email}
          </Table.Cell>
          <Table.Cell >
            {staffMember.mobile}
          </Table.Cell>
          <Table.Cell >
            {staffMember.designation}
          </Table.Cell>
          <Table.Cell >
            {staffMember.joiningDate}
          </Table.Cell>
          <Table.Cell >
            {staffMember.grossSalary}
          </Table.Cell>
          <Table.Cell >
          <label
            className={`inline-flex items-center cursor-pointer ${
              formClass === "rtl" ? "flex-row-reverse" : ""
            }`}
          >
            <ToggleSwitch
              className="sr-only peer"
              checked={staffMember.status}
              onChange={() =>
                handleToggleStatus(
                  staffMember.id,
                  !staffMember.status // Pass the new status value directly
                )
              }
            />
            </label>
          </Table.Cell>
          <Table.Cell >
            <div className="flex items-center">
              <Link
                to={`/edit-staff/${staffMember.id}`}
                className="text-blue-500 hover:underline flex items-center mr-2"
              >
                <BsPencil className="w-5 h-5 mr-1" />
              </Link>
              <button
                onClick={() => handleDeleteConfirmation(staffMember.id)}
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

export default StaffList;
