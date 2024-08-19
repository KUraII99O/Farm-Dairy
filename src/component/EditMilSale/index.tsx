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

const EditMilkSalee: React.FC = () => {
  const [salaryInformation, setSalaryInformation] = useState<SalaryInformation>(
    {
      payDate: new Date(),
      month: "",
      year: "",
      employee: "",
      monthlySalary: 0,
      additionMoney: 0,
      note: "",
    }
  );

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
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
        <select
          id="string"
          name="month"
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="">--Select Month--</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="payDate" className="text-sm font-medium text-gray-700">
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
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="employee" className="text-sm font-medium text-gray-700">
          Name * :
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
        <label htmlFor="employee" className="text-sm font-medium text-gray-700">
          Contact :{" "}
        </label>
        <input
          type="number"
          id="employee"
          name="employee"
          value={salaryInformation.employee}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="employee" className="text-sm font-medium text-gray-700">
          Email * :
        </label>
        <input
          type="email"
          id="employee"
          name="employee"
          value={salaryInformation.employee}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="note" className="text-sm font-medium text-gray-700">
          Address :
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
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="additionMoney"
          className="text-sm font-medium text-gray-700"
        >
          Litre * :
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
        <label
          htmlFor="additionMoney"
          className="text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="additionMoney"
          className="text-sm font-medium text-gray-700"
        >
          Total :
        </label>
        <input
          type="number"
          id="additionMoney"
          name="additionMoney"
          value={salaryInformation.additionMoney}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="additionMoney"
          className="text-sm font-medium text-gray-700"
        >
          Paid :
        </label>
        <input
          type="number"
          id="additionMoney"
          name="additionMoney"
          value={salaryInformation.additionMoney}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="additionMoney"
          className="text-sm font-medium text-gray-700"
        >
          Due * :{" "}
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

export default EditMilkSalee;
