import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

interface MilkSaleRecord {
  id: string;
  Date: string;
  userId: string;
  AccountNo: string;
  invoice: string;
  StallNo: string;
  AnimalID: string;
  Liter: string;
  Fate: string;
  Price: string;
  Total: string;
  CollectedFrom: string;
  addedBy: string;
}

interface MilkSaleListProps {
  currentMilkSales: MilkSaleRecord[];
  handleSort: (field: keyof MilkSaleRecord) => void;
  sortIcon: (field: keyof MilkSaleRecord) => React.ReactNode;
  handleDeleteConfirmation: (id: string) => void;
  translate: (key: string) => string;
  formClass?: string;
  soldByUser?: string;
}

const MilkSaleList: React.FC<MilkSaleListProps> = ({
  currentMilkSales,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
}) => {
  return (
    <div className="rtl:mirror-x">
      <Table>
        <Table.Head>
          <Table.HeadCell onClick={() => handleSort("invoice")}>
            <div className="flex items-center">
              {translate("invoice")}
              {sortIcon("invoice")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("Date")}>
            <div className="flex items-center">
              {translate("Date")}
              {sortIcon("Date")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("AccountNo")}>
            <div className="flex items-center">
              {translate("Account No")}
              {sortIcon("AccountNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("StallNo")}>
            <div className="flex items-center">
              {translate("Stall No")}
              {sortIcon("StallNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("AnimalID")}>
            <div className="flex items-center">
              {translate("Animal ID")}
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
              {translate("Collected From")}
              {sortIcon("CollectedFrom")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("addedBy")}>
            <div className="flex items-center">
              {translate("Added By")}
              {sortIcon("addedBy")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("Action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentMilkSales.map((sale) => (
            <Table.Row key={sale.id}>
              <Table.Cell>{sale.Date}</Table.Cell>
              <Table.Cell>{sale.AccountNo}</Table.Cell>
              <Table.Cell>{sale.StallNo}</Table.Cell>
              <Table.Cell>{sale.AnimalID}</Table.Cell>
              <Table.Cell>{sale.Liter}</Table.Cell>
              <Table.Cell>{sale.Fate}</Table.Cell>
              <Table.Cell>{sale.Price}</Table.Cell>
              <Table.Cell>{sale.Total}</Table.Cell>
              <Table.Cell>{sale.CollectedFrom}</Table.Cell>
              <Table.Cell>{sale.addedBy}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <Link
                    to={`/edit-milk-sale/${String(sale.id)}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(sale.id)}
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

export default MilkSaleList;
