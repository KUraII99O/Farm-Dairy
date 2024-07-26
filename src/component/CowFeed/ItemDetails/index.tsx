import React, { useRef, useEffect } from "react";
import { useTranslation } from "../../Translator/Provider";

interface CowFeedInfo {
  foodItem: string;
  quantity: string;
  feedingTime: string;
  unit: string;
}

interface CowFeed {
  informations: CowFeedInfo[];
}

interface ItemDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cowFeed: CowFeed;
}

const ItemDetailDrawer: React.FC<ItemDetailDrawerProps> = ({ isOpen, onClose, cowFeed }) => {
  const { translate } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div>
          <div>
            <div ref={ref} className="w-full max-w-md bg-white p-6">
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
              <table className="w-full mt-4">
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
