import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaEye } from "react-icons/fa";

const SalesList = ({
  currentSales,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
  formClass,
  handleViewDetails,
}) => (
  <div className="rtl:mirror-x overflow-x-auto">
    <Table className="min-w-full">
      <Table.Head>
        <Table.HeadCell onClick={() => handleSort("id")}>
          <div className="flex items-center">{translate("#ID")}</div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("date")}>
          <div className="flex items-center">
            {translate("date")}
            {sortIcon("date")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("customerName")}>
          <div className="flex items-center">
            {translate("customerName")}
            {sortIcon("customerName")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("customerPhone")} className="hidden lg:table-cell">
          <div className="flex items-center">
            {translate("customerPhone")}
            {sortIcon("customerPhone")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("customerEmail")} className="hidden lg:table-cell">
          <div className="flex items-center">
            {translate("customerEmail")}
            {sortIcon("customerEmail")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("address")} className="hidden lg:table-cell">
          <div className="flex items-center">
            {translate("address")}
            {sortIcon("address")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("totalPrice")} className="hidden md:table-cell">
          <div className="flex items-center">
            {translate("totalPrice")}
            {sortIcon("totalPrice")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("totalPaid")} className="hidden md:table-cell">
          <div className="flex items-center">
            {translate("totalPaid")}
            {sortIcon("totalPaid")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("due")} className="hidden md:table-cell">
          <div className="flex items-center">
            {translate("due")}
            {sortIcon("due")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell onClick={() => handleSort("note")} className="hidden lg:table-cell">
          <div className="flex items-center">
            {translate("note")}
            {sortIcon("note")}
          </div>
        </Table.HeadCell>
        <Table.HeadCell>{translate("action")}</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {currentSales.map((sale, index) => (
          <Table.Row key={sale.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{sale.date}</Table.Cell>
            <Table.Cell>{sale.customerName}</Table.Cell>
            <Table.Cell className="hidden lg:table-cell">{sale.customerPhone}</Table.Cell>
            <Table.Cell className="hidden lg:table-cell">{sale.customerEmail}</Table.Cell>
            <Table.Cell className="hidden lg:table-cell">{sale.address}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">{sale.totalPrice}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">{sale.totalPaid}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">{sale.due}</Table.Cell>
            <Table.Cell className="hidden lg:table-cell">{sale.note}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center space-x-2">
                <Link
                  to={`/Cow-Sale-invoice/${sale.id}`}
                  className="text-blue-500 hover:underline flex items-center"
                >
                  <LiaFileInvoiceSolid className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => handleViewDetails(sale)}
                  className="text-secondary hover:text-primary focus:outline-none flex items-center"
                >
                  <FaEye className="w-5 h-5" />
                </button>

                <Link
                  to={`/edit-sale/${String(sale.id)}`}
                  className="text-blue-500 hover:underline flex items-center"
                >
                  <BsPencil className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDeleteConfirmation(sale.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                >
                  <AiOutlineDelete className="w-5 h-5" />
                </button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default SalesList;
