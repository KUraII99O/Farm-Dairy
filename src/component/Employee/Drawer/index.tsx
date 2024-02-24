import React, { useState, useContext } from "react";
import { EmployeeContext } from "../Provider";
import { GrUserWorker } from "react-icons/gr";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addEmployee, employees } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    PayDate: "",
    employee: "",
    Month: "",
    Year: "",
    SalaryAmount: "",
    AdditionAmount: "",
    Note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddEmployee = () => {
    addEmployee(formData);
    onClose();
  };

  return (
    
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="fixed top-0 right-0 h-full w-1/3 bg-white z-50 p-4">
        <div className="flex flex-col space-y-1">
        <div className="flex items-center mb-4">
          <GrUserWorker className="text-3xl mr-2" />
          <h2 className="text-xl font-semibold">Employee Salary</h2>
        </div>
          <label className="text-sm font-medium text-gray-700">Pay Date</label>
          <input
            style={{ width: "800px" }}
            type="text"
            name="PayDate"
            value={formData.PayDate}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="employee"
            className="text-sm font-medium text-gray-700"
          >
            Select Employee * :
          </label>
          <select
            style={{ width: "800px" }}
            id="employee"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Select Month * :
          </label>
          <select
            style={{ width: "800px" }}
            id="Month"
            name="Month"
            value={formData.Month}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Month --</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="Year" className="text-sm font-medium text-gray-700">
            Select Year * :
          </label>
          <select
            style={{ width: "800px" }}
            id="Year"
            name="Year"
            value={formData.Year}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Year --</option>
            {Array.from({ length: 15 }, (_, index) => {
              const year = 2010 + index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="SalaryAmount"
            className="text-sm font-medium text-gray-700"
          >
            Monthly Salary :
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            id="SalaryAmount"
            name="SalaryAmount"
            value={formData.SalaryAmount}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="AdditionAmount"
            className="text-sm font-medium text-gray-700"
          >
            Addition Money :
          </label>
          <input
            type="number"
            style={{ width: "800px" }}
            id="AdditionAmount"
            name="AdditionAmount"
            value={formData.AdditionAmount}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="Note"
            className="text-sm font-medium text-gray-700"
          >
            Note:
          </label>
          <textarea
            style={{ width: "800px" }}
            id="Note"
            name="Note"
            value={formData.Note}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleAddEmployee}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary mt-2"
          >
            Save
          </button>
          <button onClick={onClose} className="text-gray-600 focus:outline-none">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDrawer;
