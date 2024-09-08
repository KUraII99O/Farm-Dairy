import React, { useRef, useEffect } from "react";
import { useTranslation } from "../../Translator/Provider";

interface CowDetails {
  image: string;
  animalType: string;
  stallNumber: string;
  gender: string;
  weight: number;
  height: number;
}

interface Sale {
  id: string;
  cowDetails?: CowDetails;
  // Add other fields if necessary
}

interface ItemDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSale?: Sale;
}

const ItemDetailDrawer: React.FC<ItemDetailDrawerProps> = ({ isOpen, onClose, selectedSale }) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { translate } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div ref={drawerRef}>
          <div className="w-full max-w-md bg-white p-6">
            <h1 className="inline-block text-xl font-bold mb-4">
              {translate("itemdetails")}
            </h1>
            <button
              className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={onClose}
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.707 3.293a1 1 0 0 1 1.414 0L10 8.586l5.293-5.293a1 1 0 1 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 0 1-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L8.586 10 3.293 4.707a1 1 0 0 1 0-1.414z"
                />
              </svg>
            </button>
            {selectedSale && selectedSale.cowDetails && (
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Image:</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <img src={selectedSale.cowDetails.image} alt="information" className="w-24 h-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Animal Type:</td>
                    <td className="border border-gray-300 px-3 py-2">{selectedSale.cowDetails.animalType}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Stall No:</td>
                    <td className="border border-gray-300 px-3 py-2">{selectedSale.cowDetails.stallNumber}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Gender:</td>
                    <td className="border border-gray-300 px-3 py-2">{selectedSale.cowDetails.gender}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Weight (KG):</td>
                    <td className="border border-gray-300 px-3 py-2">{selectedSale.cowDetails.weight}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Height (INCH):</td>
                    <td className="border border-gray-300 px-3 py-2">{selectedSale.cowDetails.height}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetailDrawer;
