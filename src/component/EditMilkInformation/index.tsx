import React, { useState } from "react";
import { FaUserPlus, FaSave } from "react-icons/fa";

interface SalaryInformation {
  payDate: Date;
  month: string;
  year: string;
  employee: string;
  monthlySalary: number;
  additionMoney: number;
  note: string;
}

const EditMilkInformation: React.FC = () => {
  const [salaryInformation, setSalaryInformation] =
    useState<SalaryInformation>({
      payDate: new Date(),
      month: "",
      year: "",
      employee: "",
      monthlySalary: 0,
      additionMoney: 0,
      note: "",
    });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setSalaryInformation({ ...salaryInformation, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted salary information:", salaryInformation);
  };
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = Array.from({length: 50}, (_, i) => new Date().getFullYear() - i);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaUserPlus className="mr-2" />
        <span> Edit Information</span>
      </h2>
      <div className="flex flex-col space-y-1">
        <label htmlFor="payDate" className="text-sm font-medium text-gray-700">
        Account Number
        </label>
        <input
          type="NUMBER"
          id="payDate"
          name="payDate"
          
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="payDate" className="text-sm font-medium text-gray-700">
        Collected From Name * :
        </label>
        <input
          type="string"
          id="payDate"
          name="payDate"
         
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
  <label htmlFor="month" className="text-sm font-medium text-gray-700">
  Collected From Name * :
  </label>
  <select
    id="string"
    name="month"
    onChange={(e) => handleChange(e)}
    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    required
  >
    <option value="">--Select Month--</option>
    {months.map((month, index) => (
      <option key={index} value={month}>{month}</option>
    ))}
  </select>
</div>
<div className="flex flex-col space-y-1">
  <label htmlFor="year" className="text-sm font-medium text-gray-700">
  Stall Number * :
  </label>
  <select
    id="year"
    name="year"
    value={salaryInformation.year}
    onChange={(e) => handleChange(e)}
    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    required
  >
    <option value="">--Select Year--</option>
    {years.map((year, index) => (
      <option key={index} value={year}>{year}</option>
    ))}
  </select>
</div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="employee" className="text-sm font-medium text-gray-700">
        Animal ID * :
        </label>
        <input
          type="text"
          id="employee"
          name="employee"
          value={salaryInformation.employee}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="monthlySalary" className="text-sm font-medium text-gray-700">
        Liter * :
        </label>
        <input
          type="number"
          id="monthlySalary"
          name="monthlySalary"
          value={salaryInformation.monthlySalary}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="additionMoney" className="text-sm font-medium text-gray-700">
        Fate (%) :
        </label>
        <input
          type="number"
          id="additionMoney"
          name="additionMoney"
          value={salaryInformation.additionMoney}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="additionMoney" className="text-sm font-medium text-gray-700">
        Price/Liter * :
        </label>
        <input
          type="number"
          id="additionMoney"
          name="additionMoney"
          value={salaryInformation.additionMoney}
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
          value={salaryInformation.note}
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

export default EditMilkInformation;
