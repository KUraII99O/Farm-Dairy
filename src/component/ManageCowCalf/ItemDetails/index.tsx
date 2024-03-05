import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ItemDetailDrawer = ({ isOpen, onClose, calf }) => {
  if (!calf) return null; // Return null if calf is not provided

  const { id, gender, informations } = calf;
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleCloseDrawer = () => {
    onClose(); // Call the onClose function passed from the parent component
    navigate("/manage-cow-calf");
  };

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      handleCloseDrawer();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40"
        onClick={handleCloseDrawer}
      ></div>
      <div className="fixed inset-0  z-50 flex justify-end ">
        <div className="w-full max-w-md bg-white shadow-lg p-6" ref={formRef}>
          <h2 className="text-2xl font-semibold text-gray-800">
            Calf Details
          </h2>
          <button
            className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={handleCloseDrawer}
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
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 font-semibold">
                  Attribute
                </th>
                <th className="border border-gray-300 px-3 py-2 font-semibold">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">
                  ID:
                </td>
                <td className="border border-gray-300 px-3 py-2">{id}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">
                  Gender:
                </td>
                <td className="border border-gray-300 px-3 py-2">{gender}</td>
              </tr>
              {informations &&
                Object.entries(informations).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {key}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {value}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ItemDetailDrawer;
