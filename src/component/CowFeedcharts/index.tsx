import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "../Translator/Provider";

interface CowFeedChartProps {
  data: {
    stallNumber: string;
    grass: string;
    salt: string;
    water: string;
  }[];
}

const CowFeedChart: React.FC<CowFeedChartProps> = ({ data }) => {
  const { translate, language } = useTranslation();

  return (
    <div className="p-4 border border-green-500 mt-6  ${className}">
      <div className={`${language === "ar" ? "mb-4" : "mb-0"}`}>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon
            icon={faUtensils}
            className="text-blue-500 mr-2 "
          />
          <div className={`text-center ${language === "ar" ? "mr-2" : "mb-0"}`}>
            <h1 className="text-xl">{translate('CowFeedChart')}</h1>
          </div>
        </div>
      </div>
      <table className="min-w-full bg-white ">
        <thead>
          <tr>
            <th className="p-2 border">{translate("StallNumber")}</th>{" "}
            {/* Translate table headers */}
            <th className="p-2 border">{translate("Grass")}</th>
            <th className="p-2 border">{translate("Salt")}</th>
            <th className="p-2 border">{translate("Water")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.stallNumber}>
              <td className="p-2 border">{item.stallNumber}</td>
              <td className="p-2 border">
                <span className="flex items-center">🌱 {item.grass}</span>
              </td>
              <td className="p-2 border">
                <span className="flex items-center">🧂 {item.salt}</span>
              </td>
              <td className="p-2 border">
                <span className="flex items-center">💧 {item.water}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-secondary text-black py-2 px-4 rounded hover:bg-primary">
        {translate("SetFeedChart")} {/* Translate the button text */}
      </button>
    </div>
  );
};

export default CowFeedChart;
