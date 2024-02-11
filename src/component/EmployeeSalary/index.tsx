import React, { useState } from "react";
import { FaInfo } from "react-icons/fa";

interface Employee {
  id: number;
  name: string;
}

interface Props {
  employees: Employee[];
}

const SalaryForm: React.FC<Props> = ({ employees }) => {
  const [payDate, setPayDate] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [additionMoney, setAdditionMoney] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <div className="max-w-lg mx-auto bg-white border px-8 pt-6 pb-8 mb-4">
  <div className="flex items-center mb-4">
    <FaInfo className="text-xl mr-2" />
    <h2 className="text-2xl font-bold">Salary Info</h2>
  </div>
  <form onSubmit={handleFormSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payDate">
        Pay Date
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
        id="payDate"
        type="date"
        placeholder="Pay Date"
        value={payDate}
        onChange={(e) => setPayDate(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedMonth">
        Select Month
      </label>
      <select
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
        id="selectedMonth"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Select Month</option>
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
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedYear">
        Select Year
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
        id="selectedYear"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Select Year</option>
        {Array.from({ length: 20 }, (_, i) => 2005 + i).map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedEmployee">
        Select Employee
      </label>
      <select
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
        id="selectedEmployee"
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(Number(e.target.value))}
      >
        <option value={0}>Select Employee</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 md:pr-2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monthlySalary">
          Monthly Salary
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
          id="monthlySalary"
          type="number"
          placeholder="Monthly Salary"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(Number(e.target.value))}
        />
      </div>
      <div className="w-full md:w-1/2 md:pl-2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additionMoney">
          Addition Money
        </label>
        <input
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
          id="additionMoney"
          type="number"
          placeholder="Addition Money"
          value={additionMoney}
          onChange={(e) => setAdditionMoney(Number(e.target.value))}
        />
      </div>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
        Note
      </label>
      <textarea
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
        id="note"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded "
        type="submit"
      >
        Save Information
      </button>
    </div>
  </form>
</div>
 );
};
export default SalaryForm;