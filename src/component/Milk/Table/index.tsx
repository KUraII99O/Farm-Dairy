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
  handleDeleteConfirmation: (id: string) => void;
  translate: (key: string) => string;
  formClass: string;
  itemsPerPage: number; 
  AddedByUser: string;
  // If pagination is involved
}

const MilkList: React.FC<MilkListProps> = ({
  currentMilks,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
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
          <Table.HeadCell onClick={() => handleSort("Date")}>
            <div className="flex items-center">
              {translate("Date")}
              {sortIcon("Date")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("AccountNo")}>
            <div className="flex items-center">
              {translate("AccountNo")}
              {sortIcon("AccountNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("StallNo")}>
            <div className="flex items-center">
              {translate("StallNo")}
              {sortIcon("StallNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("AnimalID")}>
            <div className="flex items-center">
              {translate("AnimalID")}
              {sortIcon("AnimalID")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("Liter")}>
            <div className="flex items-center">
              {translate("Liter")}
              {sortIcon("Liter")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("Fate")}>
            <div className="flex items-center">
              {translate("Fate")}
              {sortIcon("Fate")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("Price")}>
            <div className="flex items-center">
              {translate("Price")}
              {sortIcon("Price")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("Total")}>
            <div className="flex items-center">
              {translate("Total")}
              {sortIcon("Total")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("CollectedFrom")}>
            <div className="flex items-center">
              {translate("CollectedFrom")}
              {sortIcon("CollectedFrom")}
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
              <Table.Cell>{milk.AccountNo}</Table.Cell>
              <Table.Cell>{milk.StallNo}</Table.Cell>
              <Table.Cell>{milk.AnimalID}</Table.Cell>
              <Table.Cell>{milk.Liter}</Table.Cell>
              <Table.Cell>{milk.Fate}</Table.Cell>
              <Table.Cell>{milk.Price}</Table.Cell>
              <Table.Cell>{milk.Total}</Table.Cell>
              <Table.Cell>{milk.CollectedFrom}</Table.Cell>
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
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
};

export default MilkList;
