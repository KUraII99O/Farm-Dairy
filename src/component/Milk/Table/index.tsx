import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const MilkList = ({
  currentMilks,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
  formClass,
  addedByUser 
}) => {
  // Get user name from localStorage

  return (
    <div className="rtl:mirror-x">
      <Table>
        <Table.Head>
          <Table.HeadCell onClick={() => handleSort("date")}>
            <div className="flex items-center">
              {translate("date")}
              {sortIcon("date")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("accountNo")}>
            <div className="flex items-center">
              {translate("accountNo")}
              {sortIcon("accountNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("stallNo")}>
            <div className="flex items-center">
              {translate("stallNo")}
              {sortIcon("stallNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("animalId")}>
            <div className="flex items-center">
              {translate("animalId")}
              {sortIcon("animalId")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("liter")}>
            <div className="flex items-center">
              {translate("liter")}
              {sortIcon("liter")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("fat")}>
            <div className="flex items-center">
              {translate("fat")}
              {sortIcon("fat")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("price")}>
            <div className="flex items-center">
              {translate("price")}
              {sortIcon("price")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("total")}>
            <div className="flex items-center">
              {translate("total")}
              {sortIcon("total")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("collectedFrom")}>
            <div className="flex items-center">
              {translate("collectedFrom")}
              {sortIcon("collectedFrom")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("addedBy")}>
            <div className="flex items-center">
              {translate("addedBy")}
              {sortIcon("addedBy")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentMilks.map((milk) => (
            <Table.Row key={milk.id}>
              <Table.Cell>{milk.Date}</Table.Cell>
              <Table.Cell>{milk.AccountNo}</Table.Cell>
              <Table.Cell>{milk.StallNo}</Table.Cell>
              <Table.Cell>{milk.AnimalID}</Table.Cell>
              <Table.Cell>{milk.Liter}</Table.Cell>
              <Table.Cell>{milk.Fate}</Table.Cell>
              <Table.Cell>{milk.Price}</Table.Cell>
              <Table.Cell>{milk.Total}</Table.Cell>
              <Table.Cell>{milk.CollectedFrom}</Table.Cell>
              {/* Display addedByUser instead of milk.addedBy */}
              <Table.Cell>{milk.AddedBy}</Table.Cell> {/* Render the AddedBy field */}
              <Table.Cell>
                <div className="flex items-center">
                  <Link
                    to={`/edit-milk/${String(milk.id)}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(milk.id)}
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
};

export default MilkList;
