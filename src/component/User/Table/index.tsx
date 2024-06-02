import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const UserList = ({
  currentUser,
  handleSort,
  sortIcon,
  handleToggleStatus,
  handleDeleteConfirmation,
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
            {translate("userName")}
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
        {currentUser.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <img
                src={user.image}
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
            </Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.mobile}</Table.Cell>
            <Table.Cell>{user.designation}</Table.Cell>
            <Table.Cell>{user.joiningDate}</Table.Cell>
            <Table.Cell>{user.grossSalary}</Table.Cell>
            <Table.Cell>
              <label
                className={`inline-flex items-center cursor-pointer ${
                  formClass === "rtl" ? "flex-row-reverse" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={user.status}
                  onChange={() =>
                    handleToggleStatus(
                      user.id,
                      user.status ? "false" : "true"
                    )
                  }
                />
                <div
                  className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 ${
                    formClass === "ltr"
                      ? "peer-checked:after:-translate-x-full"
                      : "peer-checked:before:translate-x-full"
                  } peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 ${
                    formClass === "rtl"
                      ? "peer-checked:after:-translate-x-full"
                      : "peer-checked:after:translate-x-full"
                  } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform duration-200 ease-in-out dark:border-gray-600 peer-checked:bg-green-600`}
                ></div>
                <span
                  className={`ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 ${
                    formClass === "rtl" ? "me-3" : "ms-3"
                  }`}
                >
                  {user.status
                    ? translate("active")
                    : translate("inactive")}
                </span>
              </label>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center">
                <Link
                  to={`/edit-user/${String(user.id)}`}
                  className="text-blue-500 hover:underline flex items-center mr-2"
                >
                  <BsPencil className="w-5 h-5 mr-1" />
                </Link>
                <button
                  onClick={() => handleDeleteConfirmation(user.id)}
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

export default UserList;
