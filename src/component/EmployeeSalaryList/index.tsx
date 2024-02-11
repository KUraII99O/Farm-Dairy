import React, { useState } from "react";
import { FaList, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SalaryRecord {
  id: number;
  employeeName: string;
  payDate: string;
  month: string;
  year: number;
  salaryAmount: number;
  additionAmount: number;
  image: string;
}

const Salary: React.FC = () => {
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>([
    {
      id: 1,
      employeeName: " Doe",
      payDate: "2024-02-10",
      month: "January",
      year: 2024,
      salaryAmount: 50000,
      additionAmount: 5000,
      image: "/path/to/image1.jpg",
    },
    {
      id: 2,
      employeeName: "John ",
      payDate: "2024-02-10",
      month: "January",
      year: 2024,
      salaryAmount: 50000,
      additionAmount: 5000,
      image: "/path/to/image1.jpg",
    },
    {
      id: 3,
      employeeName: "John Doe",
      payDate: "2024-02-10",
      month: "January",
      year: 2024,
      salaryAmount: 50000,
      additionAmount: 5000,
      image: "/path/to/image1.jpg",
    },
    {
      id: 4,
      employeeName: "John Doe",
      payDate: "2024-02-10",
      month: "January",
      year: 2024,
      salaryAmount: 50000,
      additionAmount: 5000,
      image: "/path/to/image1.jpg",
    },
    {
      id: 5,
      employeeName: "John Doe",
      payDate: "2024-02-10",
      month: "January",
      year: 2024,
      salaryAmount: 50000,
      additionAmount: 5000,
      image: "/path/to/image1.jpg",
    },
    // Add more salary records as needed
  ]);

  const deleteSalaryRecord = (id: number) => {
    setSalaryRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaList className="mr-2" />
        Employee Salary List
      </h2>
      <div className="mb-4 flex justify-end">
        <Link to="/CreateSalary">
          <button className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded">
            Add New
          </button>
        </Link>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">S/L</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Employee Name</th>
            <th className="px-4 py-2 border">Pay Date</th>
            <th className="px-4 py-2 border">Month</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Salary Amount</th>
            <th className="px-4 py-2 border">Addition Amount</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {salaryRecords.map((record, index) => (
            <tr key={record.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2"><img src={record.image} alt="Employee" /></td>
              <td className="border px-4 py-2">{record.employeeName}</td>
              <td className="border px-4 py-2">{record.payDate}</td>
              <td className="border px-4 py-2">{record.month}</td>
              <td className="border px-4 py-2">{record.year}</td>
              <td className="border px-4 py-2">{record.salaryAmount}</td>
              <td className="border px-4 py-2">{record.additionAmount}</td>
              <td className="border px-4 py-2">{record.salaryAmount + record.additionAmount}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => console.log("Edit clicked for ID", record.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteSalaryRecord(record.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salary;
