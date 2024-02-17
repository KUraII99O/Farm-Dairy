import React, { useState } from "react";
import { FaList, FaTrashAlt, FaEdit } from "react-icons/fa";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

interface Sale {
  id: number;
  date: string;
  accountNo: string;
  stallNo: string;
  animalId: string;
  liter: number;
  fate: string;
  price: number;
  total: number;
  collectedFrom: string;
  addedBy: string;
}

const CollectMilkList: React.FC = () => {
  const [sales] = useState<Sale[]>([
    {
      id: 1,
      date: "2021-02-11",
      accountNo: "6754",
      stallNo: "A8",
      animalId: "012",
      liter: 11,
      fate: "Sold",
      price: 59,
      total: 500,
      collectedFrom: " Doe",
      addedBy: "Admin",
    },
    {
      id: 2,
      date: "2019-02-11",
      accountNo: "43867",
      stallNo: "A4",
      animalId: "011",
      liter: 14,
      fate: "Sold",
      price: 51,
      total: 500,
      collectedFrom: "John ",
      addedBy: "Admin",
    },
    {
      id: 3,
      date: "2029-02-11",
      accountNo: "12345546",
      stallNo: "A18",
      animalId: "021",
      liter: 18,
      fate: "Sold",
      price: 54,
      total: 500,
      collectedFrom: "quiin",
      addedBy: "Admin",
    },
    {
      id: 4,
      date: "2020-02-11",
      accountNo: "12346556",
      stallNo: "A130",
      animalId: "090",
      liter: 18,
      fate: "Sold",
      price: 598,
      total: 500,
      collectedFrom: "will",
      addedBy: "Admin",
    },
    {
      id: 5,
      date: "2020-02-11",
      accountNo: "12346556",
      stallNo: "A130",
      animalId: "090",
      liter: 18,
      fate: "Sold",
      price: 598,
      total: 500,
      collectedFrom: "will",
      addedBy: "Admin",
    },
    {
      id: 6,
      date: "2020-02-11",
      accountNo: "12346556",
      stallNo: "A130",
      animalId: "090",
      liter: 18,
      fate: "Sold",
      price: 598,
      total: 500,
      collectedFrom: "will",
      addedBy: "Admin",
    },
    {
      id: 7,
      date: "2020-02-11",
      accountNo: "12346556",
      stallNo: "A130",
      animalId: "090",
      liter: 18,
      fate: "Sold",
      price: 598,
      total: 500,
      collectedFrom: "will",
      addedBy: "Admin",
    },
    {
      id: 8,
      date: "2020-02-11",
      accountNo: "12346556",
      stallNo: "A130",
      animalId: "090",
      liter: 18,
      fate: "Sold",
      price: 598,
      total: 500,
      collectedFrom: "will",
      addedBy: "Admin",
    },
    {
      id: 9,
      date: "2020-02-11",
      accountNo: "12346556",
      stallNo: "A130",
      animalId: "090",
      liter: 18,
      fate: "Sold",
      price: 598,
      total: 500,
      collectedFrom: "will",
      addedBy: "Admin",
    },
    {
      id: 10,
      date: "2020-02-11",
      accountNo: "12346556",
      stallNo: "A130",
      animalId: "090",
      liter: 18,
      fate: "Sold",
      price: 598,
      total: 500,
      collectedFrom: "will",
      addedBy: "Admin",
    },
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

  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;

  const currentSales = sales
    .filter(
      (sale) =>
        sale.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.stallNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.collectedFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.addedBy.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortedColumn) {
        const aValue = a[sortedColumn as keyof Sale];
        const bValue = b[sortedColumn as keyof Sale];
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
        <span>Collect Milk List</span>
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
                <span className="mr-1">ID</span>
                {sortedColumn === "id" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                <span className="mr-1">Date</span>
                {sortedColumn === "date" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("accountNo")}
            >
              <div className="flex items-center">
                <span className="mr-1">Account No</span>
                {sortedColumn === "accountNo" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("stallNo")}
            >
              <div className="flex items-center">
                <span className="mr-1">Stall No</span>
                {sortedColumn === "stallNo" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("animalId")}
            >
              <div className="flex items-center">
                <span className="mr-1">Animal ID</span>
                {sortedColumn === "animalId" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            {/* Repeat similar structure for other columns */}
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("liter")}
            >
              <div className="flex items-center">
                <span className="mr-1">Liter</span>
                {sortedColumn === "liter" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("fate")}
            >
              <div className="flex items-center">
                <span className="mr-1">Fate</span>
                {sortedColumn === "fate" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center">
                <span className="mr-1">Price</span>
                {sortedColumn === "price" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("total")}
            >
              <div className="flex items-center">
                <span className="mr-1">Total</span>
                {sortedColumn === "total" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("collectedFrom")}
            >
              <div className="flex items-center">
                <span className="mr-1">Collected From</span>
                {sortedColumn === "collectedFrom" &&
                  (sortDirection === "asc" ? <FiArrowDown /> : <FiArrowUp />)}
              </div>
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("addedBy")}
            >
              <div className="flex items-center">
                <span className="mr-1">Added By</span>
                {sortedColumn === "addedBy" &&
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
              <td className="px-4 py-2 border">{sale.date}</td>
              <td className="px-4 py-2 border">{sale.accountNo}</td>
              <td className="px-4 py-2 border">{sale.stallNo}</td>
              <td className="px-4 py-2 border">{sale.animalId}</td>
              <td className="px-4 py-2 border">{sale.liter}</td>
              <td className="px-4 py-2 border">{sale.fate}</td>
              <td className="px-4 py-2 border">{sale.price}</td>
              <td className="px-4 py-2 border">{sale.total}</td>
              <td className="px-4 py-2 border">{sale.collectedFrom}</td>
              <td className="px-4 py-2 border">{sale.addedBy}</td>
              <td className="px-4 py-2 border">
                <Link to="/EditMilkCollection">
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

export default CollectMilkList;
