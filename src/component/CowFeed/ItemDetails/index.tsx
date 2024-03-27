import React from "react";
import { useTranslation } from "../../Translator/Provider";

const ItemDetailDrawer = ({ isOpen, onClose, cowFeed }) => {
  const { translate } = useTranslation();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40" >
          <div className="fixed inset-0  z-50 flex justify-end ">
            <div className="w-full max-w-md bg-white shadow-lg p-6">
              <h2>{translate("itemdetails")}</h2>
              <button
                className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={onClose}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <table className="w-full border-collapse mt-4">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("fooditem")}
                    </th>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("itemquantity")}
                    </th>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("feedingtime")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cowFeed.informations.map((info, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.foodItem}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.quantity} {info.unit}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.feedingTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={onClose}
                className="mt-4 bg-secondary hover:primary text-white py-2 px-4 rounded"
              >
                {translate("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetailDrawer;
