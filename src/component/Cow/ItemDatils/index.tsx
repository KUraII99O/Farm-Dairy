import React, { useRef, useEffect } from "react";

const ItemDetailDrawer = ({ isOpen, onClose, cow }) => {
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

  return (
    <div
      className={`fixed inset-0 flex justify-end items-center z-50 transition-transform duration-500 ${
        isOpen ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      <div
        ref={drawerRef}
        className="bg-gray-100 w-1/2 max-w-md shadow-lg rounded-lg p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Cow Details</h2>
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
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 bg-gray-200">Attribute</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-200">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Stall No:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.stallNo}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Date of Birth:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.dateOfBirth}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Animal Age (Days):</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.animalAgeDays}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Weight (KG):</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.weight}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Height (INCH):</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.height}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Color:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.color}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">No of Pregnant (Previous Record):</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.numOfPregnant}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Next Pregnancy Approx Time:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.nextPregnancyApproxTime ? cow.informations.nextPregnancyApproxTime : "Not available"}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Buy From:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.buyFrom}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Previous Vaccine Done:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.prevVaccineDone}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Note:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.note}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">Created By:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.createdBy}</td>
              </tr>
            </tbody>
          </table>
        
        
      </div>
    </div>
  );
};

export default ItemDetailDrawer;
