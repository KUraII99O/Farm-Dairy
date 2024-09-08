import React, { useRef, useEffect } from "react";
import { useTranslation } from "../../Translator/Provider";

// Define CowFeedInfo interface with appropriate fields
interface CowFeedInfo {
  foodItem: string;
  quantity: string;
  feedingTime: string;
  unit: string;
}


interface CowFeed {
  informations: CowFeedInfo[];
  // Add other CowFeed fields if necessary
}


interface Props {
  isOpen: boolean;
  onClose: () => void;
  cowFeed: CowFeed | null; // Update to allow null
}

const ItemDetailDrawer: React.FC<Props> = ({ isOpen, onClose, cowFeed }) => {
  const { translate } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ensure cowFeed and informations are defined
  if (!isOpen || !cowFeed || !Array.isArray(cowFeed.informations)) return null;

  return (
    <>
      {isOpen && (
        <div>
          <div>
            <div ref={ref} className="w-full max-w-md bg-white p-6 relative">
              <h1 className="inline-block text-xl font-bold mb-4">
                {translate("cowfeeddetails")}
              </h1>
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
                      {translate("quantity")}
                    </th>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("feedingtime")}
                    </th>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("unit")}
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
                        {info.quantity}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.feedingTime}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.unit}
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
