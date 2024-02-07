import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
const expenses = [
  { date: "Jan 08, 2023", purpose: "Share Profit", amount: "Rs.100.00" },
  { date: "Nov 29, 2022", purpose: "Office Rent", amount: "Rs.200.00" },
  { date: "Jan 28, 2021", purpose: "Office Rent", amount: "Rs.500.00" },
  { date: "Mar 24, 2021", purpose: "Materials", amount: "Rs.5,000.00" },
  { date: "Feb 28, 2020", purpose: "Share Profit", amount: "Rs.2,000.00" },
];
const ExpenseHistory: React.FC = () => {
  return (
    <div className="p-4 border border-green-500 mt-6 ">
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mr-2" />
        <h1 className="text-xl">Last Five Expense History</h1>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Expense Purpose</th>
            <th className="p-2 border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td className="p-2 border">{expense.date}</td>
              <td className="p-2 border">{expense.purpose}</td>
              <td className="p-2 border">{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ExpenseHistory;
