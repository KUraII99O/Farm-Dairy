// EditStallForm component

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "../../Translator/Provider";

const EditStallForm = ({ stall, onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    stallNumber: "",
    details: "",
    status: "true", // Ensure default status is set to "true" for available
  });
  const { translate } = useTranslation();

  useEffect(() => {
    if (stall) {
      setFormData(stall);
    }
  }, [stall]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? value === "true" : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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

          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">
              {stall ? "Edit Stall" : "Add New Stall"}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="stallNumber"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("stallnumber")}:
              </label>
              <input
                type="text"
                name="stallNumber"
                value={formData.stallNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("details")}:
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {
              // Display status input only when adding new stall
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  {translate("status")}:
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="true">{translate("available")}</option>
                  <option value="false">{translate("booked")}</option>
                </select>
              </div>
            }
          
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
              >
                {stall ? translate("updatestall") : translate("addstall")}
              </button>
            </div>
          </form>
    </>
  );
};

export default EditStallForm;

