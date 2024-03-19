import React from "react";
import { useTranslation } from "../Translator/Provider"; // Assuming you have a translation context or hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const expenses = [
  { dateKey: "jan082023", purposeKey: "shareProfit", amount: "TND.100.00" },
  { dateKey: "nov292022", purposeKey: "officeRent", amount: "TND.200.00" },
  { dateKey: "jan282021", purposeKey: "officeRent", amount: "TND.500.00" },
  { dateKey: "mar242021", purposeKey: "materials", amount: "TND.5,000.00" },
  { dateKey: "feb282020", purposeKey: "shareProfit", amount: "TND.2,000.00" },
];

interface SaleHistoryProps {
  className?: string;
}

const SaleHistory: React.FC<SaleHistoryProps> = ({ className }) => {
  const { translate, language } = useTranslation(); // Assuming you have a translate function and language from your translation hook or context

  const isArabic = language === "ar"; // Check if language is Arabic

  return (
    <div className={`p-4 border border-green-500 mt-6 ${isArabic ? 'mr-4' : ' ml-0'} ${className}`}>
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mr-2" />
        <div className={`text-center ${language === "ar" ? "mr-2" : "mb-0"}`}>
      <h1 className="text-xl">
        {translate("LastFiveMilkSaleHistory")}
      </h1>
    </div> 
    
         </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 border">{translate("date")}</th> {/* Translate table headers */}
              <th className="p-2 border">{translate("expensePurpose")}</th>
              <th className="p-2 border">{translate("amount")}</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className="p-2 border">{translate(expense.dateKey)}</td> {/* Translate date */}
                <td className="p-2 border">{translate(expense.purposeKey)}</td> {/* Translate purpose */}
                <td className="p-2 border">{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleHistory;