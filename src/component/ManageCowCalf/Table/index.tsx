import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../../Pagination";

interface CalvesListProps {
  currentCalves: any[]; // Update with actual type of calf data
  handleSort: (fieldName: string) => void;
  sortIcon: (fieldName: string) => React.ReactNode;
  handleToggleStatus: (id: string, newStatus: boolean) => void; // Assuming calf status is toggled similarly
  handleDeleteConfirmation: (id: string) => void;
  handleViewDetails: (calf: any) => void; // Adjust if `calf` data type is different
  translate: (key: string) => string;
  formClass: string;
  itemsPerPage: number; // If pagination is involved
}

const CalvesList: React.FC<CalvesListProps> = ({
  currentCalves,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  handleViewDetails,
  handleToggleStatus,
  translate,
  formClass,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastCalf = currentPage * itemsPerPage;
  const indexOfFirstCalf = indexOfLastCalf - itemsPerPage;
  const currentCalvesPage = currentCalves.slice(
    indexOfFirstCalf,
    indexOfLastCalf
  );

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className={`rtl:mirror-x ${formClass === "rtl" ? "text-right" : ""}`}>
      <Table>
        <Table.Head>
          <Table.HeadCell onClick={() => handleSort("id")}>
            <div className="flex items-center">{translate("ID")}</div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("image")}>
            <div className="flex items-center">
              {translate("Image")}
              {sortIcon("image")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("motherId")}>
            <div className="flex items-center">
              {translate("Mother ID")}
              {sortIcon("motherId")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("animalType")}>
            <div className="flex items-center">
              {translate("Animal Type")}
              {sortIcon("animalType")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("buyDate")}>
            <div className="flex items-center">
              {translate("Buy Date")}
              {sortIcon("buyDate")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("buyingPrice")}>
            <div className="flex items-center">
              {translate("Buying Price")}
              {sortIcon("buyingPrice")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("status")}>
            <div className="flex items-center">
              {translate("Status")}
              {sortIcon("status")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("Action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentCalvesPage.map((calf, index) => (
            <Table.Row key={calf.id}>
              <Table.Cell>{indexOfFirstCalf + index + 1}</Table.Cell>
              <Table.Cell>
                <img
                  src={calf.image}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
              </Table.Cell>
              <Table.Cell>{calf.motherId}</Table.Cell>
              <Table.Cell>{calf.animalType}</Table.Cell>
              <Table.Cell>{calf.buyDate}</Table.Cell>
              <Table.Cell>{calf.buyingPrice}</Table.Cell>
              <Table.Cell className="px-4 py-2">
                <label
                  className={`inline-flex items-center cursor-pointer ${
                    formClass === "rtl" ? "flex-row-reverse" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={calf.status}
                    onChange={() => handleToggleStatus(calf.id, !calf.status)} // Toggle the status directly
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full  ${
                      formClass === "rtl"
                        ? "peer-checked:after:-translate-x-full"
                        : "peer-checked:before:translate-x-full"
                    } peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 ${
                      formClass === "rtl"
                        ? "peer-checked:after:-translate-x-full"
                        : "peer-checked:after:translate-x-full"
                    } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform duration-200 ease-in-out dark:border-gray-600`}
                    style={{
                      backgroundColor: calf.status ? "#EF4444" : "#34D399", // Red when sold, green when available
                    }}
                  ></div>
                  <span
                    className={`ms-3 text-sm font-medium ${
                      calf.status ? "text-red-600" : "text-green-600"
                    } ${formClass === "rtl" ? "me-3" : "ms-3"}`}
                  >
                    {calf.status ? translate("Sold") : translate("Available")}
                  </span>
                </label>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(calf)}
                    className="text-secondary hover:text-primary focus:outline-none flex mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>
                  <Link
                    to={`/Edit-Calf/${calf.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(calf.id)}
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
      <Pagination
        totalItems={currentCalves.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
};

export default CalvesList;
