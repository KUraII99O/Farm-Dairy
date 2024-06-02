import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const MilkSaleList = ({
  currentMilkSales,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
  formClass,
  soldByUser,
}) => {
  return (
    <div className="rtl:mirror-x">
      <Table>
        <Table.Head>
          <Table.HeadCell onClick={() => handleSort("invoice")}>
            <div className="flex items-center">
              {translate("Invoice")}
              {sortIcon("invoice")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("accountNo")}>
            <div className="flex items-center">
              {translate("Account No")}
              {sortIcon("accountNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("name")}>
            <div className="flex items-center">
              {translate("Name")}
              {sortIcon("name")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("contact")}>
            <div className="flex items-center">
              {translate("Contact")}
              {sortIcon("contact")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("email")}>
            <div className="flex items-center">
              {translate("Email")}
              {sortIcon("email")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("liter")}>
            <div className="flex items-center">
              {translate("Liter")}
              {sortIcon("liter")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("price")}>
            <div className="flex items-center">
              {translate("Price")}
              {sortIcon("price")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("total")}>
            <div className="flex items-center">
              {translate("Total")}
              {sortIcon("total")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("paid")}>
            <div className="flex items-center">
              {translate("Paid")}
              {sortIcon("paid")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("due")}>
            <div className="flex items-center">
              {translate("Due")}
              {sortIcon("due")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("soldBy")}>
            <div className="flex items-center">
              {translate("Sold by")}
              {sortIcon("soldBy")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("Action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentMilkSales.map((sale) => (
            <Table.Row key={sale.id}>
              <Table.Cell>{sale.invoice}</Table.Cell>
              <Table.Cell>{sale.AccountNo}</Table.Cell>
              <Table.Cell>{sale.Name}</Table.Cell>
              <Table.Cell>{sale.Contact}</Table.Cell>
              <Table.Cell>{sale.Email}</Table.Cell>
              <Table.Cell>{sale.Liter}</Table.Cell>
              <Table.Cell>{sale.Price}</Table.Cell>
              <Table.Cell>{sale.Total}</Table.Cell>
              <Table.Cell>{sale.Paid}</Table.Cell>
              <Table.Cell>{sale.Due}</Table.Cell>
              <Table.Cell>{sale.soldBy}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <Link
                    to={`/edit-sale/${String(sale.id)}`}
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
