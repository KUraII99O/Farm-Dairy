import React from "react";
import { TiMinus } from "react-icons/ti"; // Import TiMinus icon
import { useTranslation } from "../../Translator/Provider";

interface FormTableProps {
  informations: Array<{
    ServiceName: string;
    Result: string;
    MonitoringTime: string;
  }>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void;
  handleRemoveRow: (indexToRemove: number) => void;
  handleAddRow: () => void;
}

const FormTable: React.FC<FormTableProps> = ({
  informations,
  handleChange,
  handleRemoveRow,
  handleAddRow,
}) => {
  const { translate } = useTranslation();

  return (
    <div>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-3 py-2">{translate("fooditem")}</th>
            <th className="border border-gray-400 px-3 py-2">{translate("itemquantity")}</th>
            <th className="border border-gray-400 px-3 py-2">{translate("feedingtime")}</th>
          </tr>
        </thead>
        <tbody>
          {informations.map((info, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder={translate("ServiceName")}
                  name="ServiceName"
                  value={info.ServiceName}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder={translate("Result")}
                  name="Result"
                  value={info.Result}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder={translate("MonitoringTime")}
                  name="MonitoringTime"
                  value={info.MonitoringTime}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </td>
             
              <td className="border border-gray-400 px-1 py-2 text-right">
                <button
                  type="button"
                  onClick={() => handleRemoveRow(index)}
                  className="text-red-600 hover:text-red-800 self-end"
                >
                  <TiMinus />
                </button>
                <input
                  type="text"
                  placeholder={translate("feedingtime")}
                  name="feedingTime"
                  value={info.feedingTime}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={handleAddRow}
        className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
      >
        {translate("addrow")}
      </button>
    </div>
  );
};

export default FormTable;