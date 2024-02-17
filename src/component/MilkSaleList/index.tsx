import React, { useState } from "react";
import { FaList, FaTrashAlt, FaEdit } from "react-icons/fa";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

interface MilkSale {
  id: number;
  Invoice: string;
  Date: string;
  AccountNo: string;
  Name: string;
  Contact: string;
  Email: string;
  Litre: string;
  Price: string;
  Total: string;
  Paid: string;
  Due: string;
  SoldBy: string;
}

const MilkCollectionList: React.FC = () => {
  const [sales] = useState<MilkSale[]>([
    {
      id: 1,
      Invoice: "INV01",
      Date: "2021-02-11",
      AccountNo: "6754",
      Name: "A8",
      Contact: "012",
      Email: "rana@gmail.com"	,
      Litre: "Sold",
      Price: "59",
      Total: "500",
      Paid: "Doe",
      Due: "Admin",
      SoldBy: "John",
    },
    {
      id: 2,
      Invoice: "INB001",
      Date: "2021-02-11",
      AccountNo: "6754",
      Name: "A8",
      Contact: "012",
      Email: "rana@gmail.com",
      Litre: "Sold",
      Price: "59",
      Total: "500",
      Paid: "Doe",
      Due: "Admin",
      SoldBy: "John",
    },
    {
      id: 3,
      Invoice: "INL002",
      Date: "2021-02-11",
      AccountNo: "6754",
      Name: "A8",
      Contact: "012",
      Email: "rana@gmail.com",
      Litre: "Sold",
      Price: "59",
      Total: "500",
      Paid: "Doe",
      Due: "Admin",
      SoldBy: "John",
    },
    {
      id: 4,
      Invoice: "FNV007",
      Date: "2021-02-11",
      AccountNo: "6754",
      Name: "A8",
      Contact: "012",
      Email: "rana@gmail.com",
      Litre: "Sold",
      Price: "59",
      Total: "500",
      Paid: "Doe",
      Due: "Admin",
      SoldBy: "John",
    },
    // Add more data here as required
  ]);

  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const handleSort = (column: string) => {
    if (column === sortedColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterMilkSales = (sale: MilkSale) =>
  sale.Invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
  sale.Date.toLowerCase().includes(searchTerm.toLowerCase()) ||
  sale.AccountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
  sale.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  sale.Contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
  sale.Paid.toLowerCase().includes(searchTerm.toLowerCase()) ||
  sale.Due.toLowerCase().includes(searchTerm.toLowerCase());

  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;

  const currentSales = sales
    .filter(filterMilkSales)
    .sort((a, b) => {
      if (sortedColumn) {
        const aValue = a[sortedColumn as keyof MilkSale];
        const bValue = b[sortedColumn as keyof MilkSale];
        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      } else {
        return 0;
      }
    });

  const currentSalesPaginated = currentSales.slice(
    indexOfFirstSale,
    indexOfLastSale
  );

  return (
    <div className="overflow-x-auto">
    

      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaList className="mr-2" />
        <span>Milk Collection List</span>
      </h2>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border px-4 py-2 rounded"
        />
        <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded ml-2">
          Collect New
        </button>
      </div>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                <span className="mr-1">#</span>
                {sortedColumn === "id" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Invoice")}
            >
              <div className="flex items-center">
                <span className="mr-1">Invoice</span>
                {sortedColumn === "Invoice" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Date")}
            >
              <div className="flex items-center">
                <span className="mr-1">Date</span>
                {sortedColumn === "Date" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("AccountNo")}
            >
              <div className="flex items-center">
                <span className="mr-1">Account No</span>
                {sortedColumn === "AccountNo" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Name")}
            >
              <div className="flex items-center">
                <span className="mr-1">Name</span>
                {sortedColumn === "Name" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Contact")}
            >
              <div className="flex items-center">
                <span className="mr-1">Contact</span>
                {sortedColumn === "Contact" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Email")}
            >
              <div className="flex items-center">
                <span className="mr-1">Email</span>
                {sortedColumn === "Email" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Litre")}
            >
              <div className="flex items-center">
                <span className="mr-1">Litre</span>
                {sortedColumn === "Litre" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Price")}
            >
              <div className="flex items-center">
                <span className="mr-1">Price</span>
                {sortedColumn === "Price" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Total")}
            >
              <div className="flex items-center">
                <span className="mr-1">Total</span>
                {sortedColumn === "Total" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Paid")}
            >
              <div className="flex items-center">
                <span className="mr-1">Paid</span>
                {sortedColumn === "Paid" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("Due")}
            >
              <div className="flex items-center">
                <span className="mr-1">Due</span>
                {sortedColumn === "Due" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("SoldBy")}
            >
              <div className="flex items-center">
                <span className="mr-1">Sold By</span>
                {sortedColumn === "SoldBy" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSalesPaginated.map((sale) => (
            <tr key={sale.id} className="bg-white">
              <td className="px-4 py-2 border">{sale.id}</td>
              <td className="px-4 py-2 border">{sale.Invoice}</td>
              <td className="px-4 py-2 border">{sale.Date}</td>
              <td className="px-4 py-2 border">{sale.AccountNo}</td>
              <td className="px-4 py-2 border">{sale.Name}</td>
              <td className="px-4 py-2 border">{sale.Contact}</td>
              <td className="px-4 py-2 border">{sale.Email}</td>
              <td className="px-4 py-2 border">{sale.Litre}</td>
              <td className="px-4 py-2 border">{sale.Price}</td>
              <td className="px-4 py-2 border">{sale.Total}</td>
              <td className="px-4 py-2 border">{sale.Paid}</td>
              <td className="px-4 py-2 border">{sale.Due}</td>
              <td className="px-4 py-2 border">{sale.SoldBy}</td>
              <td className="px-4 py-2 border">
                <Link to="/EditMilkSalee">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </Link>
                <button className="text-red-500 hover:text-red-700 ml-2">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 items-center">
        <div>
          <span className="mr-2">Items per page:</span>
          <select
            className="border px-2 py-1 rounded"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Page:</span>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 rounded mr-2"
            disabled={currentPage === 1}
          >
            <BiChevronLeft />
          </button>
          {Array.from(
            { length: Math.ceil(currentSales.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-gray-300" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 rounded ml-2"
            disabled={
              currentPage === Math.ceil(currentSales.length / itemsPerPage)
            }
          >
            <BiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilkCollectionList;
