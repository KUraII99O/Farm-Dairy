import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";

const StallTable = ({
  sortedStalls,
  handleSort,
  sortIcon,
  handleToggleStatus,
  handleEditDrawerOpen,
  handleDeleteConfirmation,
  translate,
  formClass,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("id")}>
        <div className="flex items-center">
          {translate("id")}
          {sortIcon("id")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("stallNumber")}>
        <div className="flex items-center">
          {translate("stallnumber")}
          {sortIcon("stallNumber")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("status")}>
        <div className="flex items-center">
          {translate("status")}
          {sortIcon("status")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("details")}</Table.HeadCell>
      <Table.HeadCell>{translate("action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedStalls.map((stall) => (
        <Table.Row
          key={stall.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {stall.id}
          </Table.Cell>
          <Table.Cell>{stall.stallNumber}</Table.Cell>
          <Table.Cell>
            <label
              className={`inline-flex items-center cursor-pointer ${
                formClass === "rtl" ? "flex-row-reverse" : ""
              }`}
            >
              <input
                type="checkbox"
                className="sr-only peer"
                checked={stall.status}
                onChange={() =>
                  handleToggleStatus(
                    stall.id,
                    stall.status ? "false" : "true"
                  )
                }
              />
              <div
                className={`relative w-11 h-6 rounded-full peer ${
                  stall.status ? "bg-green-600" : "bg-red-600"
                } ${
                  formClass === "ltr"
                    ? "peer-checked:after:-translate-x-full"
                    : "peer-checked:before:translate-x-full"
                } ${
                  formClass === "rtl"
                    ? "peer-checked:after:-translate-x-full"
                    : "peer-checked:after:translate-x-full"
                } after:border-white after:content-[''] after:absolute after:top-0.5 ${
                  formClass === "rtl"
                    ? "peer-checked:after:-translate-x-full"
                    : "peer-checked:after:translate-x-full"
                } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform duration-200 ease-in-out dark:border-gray-600 peer-checked:bg-green-600`}
              ></div>
              <span
                className={`ms-3 text-sm font-medium ${
                  stall.status ? "text-gray-900" : "text-red-600"
                } dark:text-gray-300 ${
                  formClass === "rtl" ? "me-3" : "ms-3"
                }`}
              >
                {stall.status ? translate("available") : translate("booked")}
              </span>
            </label>
          </Table.Cell>
          <Table.Cell>{stall.details}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(stall)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5  ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(stall.id)}
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

export default StaffTable;
