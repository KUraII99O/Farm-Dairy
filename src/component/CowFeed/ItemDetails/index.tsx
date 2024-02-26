import React from "react";

const ItemDetailDrawer = ({ isOpen, onClose, cowFeed }) => {
  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-white w-1/2 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Item Details</h2>
        {isOpen && (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-400 px-3 py-2">Food Item</th>
                <th className="border border-gray-400 px-3 py-2">Quantity</th>
                <th className="border border-gray-400 px-3 py-2">Feeding Time</th>
              </tr>
            </thead>
            <tbody>
              {cowFeed.informations.map((info, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-3 py-2">{info.foodItem}</td>
                  <td className="border border-gray-400 px-3 py-2">{info.quantity} {info.unit}</td> {/* Display quantity with unit */}
                  <td className="border border-gray-400 px-3 py-2">{info.feedingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={onClose} className="mt-4 bg-secondary hover:primary text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemDetailDrawer;
