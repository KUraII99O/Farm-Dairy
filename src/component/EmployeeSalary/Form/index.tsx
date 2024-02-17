import React, { useEffect, useState } from "react";
import { FaUserPlus, FaSave } from "react-icons/fa";
import { EmployeeSalary, useEmployeeSalaryContext } from "../Provider";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeSalaryForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { addEmployeeSalary, employeeSalarys } = useEmployeeSalaryContext();
  const [salaryInformation, setSalaryInformation] = useState<EmployeeSalary>({
    id: 2,
    employeeName: "",
    payDate: "",
    month: "",
    monthlySalary: "",
    year: 0,
    salaryAmount: 0,
    additionMoney: 0,
    image: "",
    note: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const toUpdate = employeeSalarys.find((item) => item.id === parseInt(id));
    if (toUpdate) setSalaryInformation(toUpdate);
  }, [id, navigate]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSalaryInformation({ ...salaryInformation, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addEmployeeSalary(salaryInformation);
    navigate("/EmployeeSalary");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaUserPlus className="mr-2" />
        <span>Pay Information</span>
      </h2>
      <div className="flex flex-col space-y-1">
        <label htmlFor="payDate" className="text-sm font-medium text-gray-700">
          Pay Date * :
        </label>
        <input
          type="date"
          id="payDate"
          name="payDate"
          value={salaryInformation?.payDate.split("T")[0]}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="month" className="text-sm font-medium text-gray-700">
          Select Month * :
        </label>
        <input
          type="text"
          id="month"
          name="month"
          value={salaryInformation?.month}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="year" className="text-sm font-medium text-gray-700">
          Select Year * :
        </label>
        <input
          type="text"
          id="year"
          name="year"
          value={salaryInformation?.year}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="employeeName" className="text-sm font-medium text-gray-700">
          Select Employee * :
        </label>
        <input
          type="text"
          id="employeeName"
          name="employeeName"
          value={salaryInformation?.employeeName}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="monthlySalary"
          className="text-sm font-medium text-gray-700"
        >
          Monthly Salary :
        </label>
        <input
          type="number"
          id="monthlySalary"
          name="monthlySalary"
          value={salaryInformation?.monthlySalary}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="additionMoney"
          className="text-sm font-medium text-gray-700"
        >
          Addition Money :
        </label>
        <input
          type="number"
          id="additionMoney"
          name="additionMoney"
          value={salaryInformation?.additionMoney}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="note" className="text-sm font-medium text-gray-700">
          Note :
        </label>
        <textarea
          id="note"
          name="note"
          value={salaryInformation?.note}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="bg-secondary hover:bg-primary text-black px-4 py-2 rounded-md flex items-center"
        style={{ width: "100px" }}
      >
        <FaSave className="mr-2" style={{ verticalAlign: "middle" }} />
        Save
      </button>
    </form>
  );
};

export default EmployeeSalaryForm;
