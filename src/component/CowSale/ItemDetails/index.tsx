import React, { useRef, useEffect } from "react";

const ItemDetailDrawer = ({ isOpen, onClose, selectedSale }) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Log selectedSale to console to verify its content
  console.log("selectedSale:", selectedSale);

  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 transition-transform duration-500 ${
        isOpen ? "transform translate-x-0 bg-gray-200 bg-opacity-50" : "transform translate-x-full bg-transparent"
      }`}
    >
      <div
        ref={drawerRef}
        className="bg-white w-1/2 max-w-md shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Sale Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
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
        </div>
        {selectedSale && selectedSale.information && (
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Image:</td>
                <td className="border border-gray-300 px-3 py-2">
                  <img src={selectedSale.information.image} alt="information" className="w-24 h-auto" />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">information Number:</td>
                <td className="border border-gray-300 px-3 py-2">{selectedSale.information.cowNumber}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Stall No:</td>
                <td className="border border-gray-300 px-3 py-2">{selectedSale.information.stallNo}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Gender:</td>
                <td className="border border-gray-300 px-3 py-2">{selectedSale.information.gender}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Weight (KG):</td>
                <td className="border border-gray-300 px-3 py-2">{selectedSale.information.weight}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Height (INCH):</td>
                <td className="border border-gray-300 px-3 py-2">{selectedSale.information.height}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ItemDetailDrawer;
