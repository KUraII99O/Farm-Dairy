import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../../Pagination";

const CowList = ({
  currentCows,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  handleViewDetails,
  toggleCowStatus,
  translate,
  formClass,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastCow = currentPage * itemsPerPage;
  const indexOfFirstCow = indexOfLastCow - itemsPerPage;
  const currentCowsPage = currentCows.slice(indexOfFirstCow, indexOfLastCow);

  const handlePageChange = (page, itemsPerPage) => {
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
          <Table.HeadCell onClick={() => handleSort("gender")}>
            <div className="flex items-center">
              {translate("Gender")}
              {sortIcon("gender")}
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
          <Table.HeadCell onClick={() => handleSort("pregnantStatus")}>
            <div className="flex items-center">
              {translate("Pregnant Status")}
              {sortIcon("pregnantStatus")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("milkPerDay")}>
            <div className="flex items-center">
              {translate("Milk Per Day")}
              {sortIcon("milkPerDay")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("animalStatus")}>
            <div className="flex items-center">
              {translate("Animal Status")}
              {sortIcon("animalStatus")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("Action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentCowsPage.map((cow, index) => (
            <Table.Row key={cow.id}>
              <Table.Cell>{indexOfFirstCow + index + 1}</Table.Cell>
              <Table.Cell>
                <img
                  src={cow.image}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
              </Table.Cell>
              <Table.Cell>{cow.gender}</Table.Cell>
              <Table.Cell>{cow.animalType}</Table.Cell>
              <Table.Cell>{cow.buyDate}</Table.Cell>
              <Table.Cell>{cow.buyingPrice}</Table.Cell>
              <Table.Cell>{cow.pregnantStatus}</Table.Cell>
              <Table.Cell>{cow.milkPerDay}</Table.Cell>
              <Table.Cell className="px-4 py-2">
                <label
                  className={`inline-flex items-center cursor-pointer ${
                    formClass === "rtl" ? "flex-row-reverse" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={cow.status}
                    onChange={() => toggleCowStatus(cow.id, !cow.status)} // Toggle the status directly
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
                    {cow.status ? translate("active") : translate("inactive")}{" "}
                    {/* Use cow.status directly */}
                  </span>
                </label>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(cow)}
                    className="text-secondary hover:text-primary focus:outline-none flex mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>
                  <Link
                    to={`/Edit-Cow/${cow.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(cow.id)}
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
        totalItems={currentCows.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CowList;
