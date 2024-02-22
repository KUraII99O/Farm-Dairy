import React, { useState } from "react";
import { MilkSale } from "../Staff/types";

const InvoiceSearch: React.FC<{ sales: MilkSale[] }> = ({ sales }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSales, setFilteredSales] = useState<MilkSale[]>([]);

  const handleSearch = () => {
    const filtered = sales.filter((sale) =>
      sale.Invoice.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSales(filtered);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredSales([]);
  };

  return (
    <div className="flex flex-col items-center">
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by Invoice..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
        <button
          onClick={resetSearch}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Reset
        </button>
      </div>
      {filteredSales.length > 0 && (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Invoice</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Paid</th>
              <th className="px-4 py-2 border">Due</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id} className="bg-white">
                <td className="px-4 py-2 border">{sale.Invoice}</td>
                <td className="px-4 py-2 border">{sale.Date}</td>
                <td className="px-4 py-2 border">{sale.Total}</td>
                <td className="px-4 py-2 border">{sale.Paid}</td>
                <td className="px-4 py-2 border">{sale.Due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {filteredSales.length === 0 && searchTerm && (
        <div className="text-center mt-4 text-gray-700">No results found.</div>
      )}
    </div>
  );
};

export default InvoiceSearch;
