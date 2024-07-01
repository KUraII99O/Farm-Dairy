import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";

interface MilkListProps {
  currentMilks: any[]; // Replace 'any' with the actual type of milk data
  handleSort: (fieldName: string) => void;
  sortIcon: (fieldName: string) => React.ReactNode;
  handleDeleteConfirmation: (id: number) => void;
  translate: (key: string) => string;
  formClass: string;
  itemsPerPage: number; // If pagination is involved
}

const MilkList: React.FC<MilkListProps> = ({
  currentMilks,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
  formClass,
  AddedByUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Calculate pagination indexes
  const indexOfLastMilk = currentPage * itemsPerPage;
  const indexOfFirstMilk = indexOfLastMilk - itemsPerPage;
  const currentMilksPage = currentMilks.slice(indexOfFirstMilk, indexOfLastMilk);

  const handlePageChange = (page:number, itemsPerPage:number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };
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
          {currentMilksPage.map((milk) => (
            <Table.Row key={milk.id}>
              <Table.Cell>{milk.Date}</Table.Cell>
              <Table.Cell>{milk.accountNo}</Table.Cell>
              <Table.Cell>{milk.stallNo}</Table.Cell>
              <Table.Cell>{milk.animalId}</Table.Cell>
              <Table.Cell>{milk.liter}</Table.Cell>
              <Table.Cell>{milk.fat}</Table.Cell>
              <Table.Cell>{milk.price}</Table.Cell>
              <Table.Cell>{milk.total}</Table.Cell>
              <Table.Cell>{milk.collectedFrom}</Table.Cell>
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
      <Pagination
        totalItems={currentMilks.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MilkList;
