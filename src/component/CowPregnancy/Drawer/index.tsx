import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "../../Translator/Provider";

const EditPregnancyForm = ({ pregnancy, onAdd, onUpdate, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    stallNo: "",
    animalID: "",
    pregnancyType: "",
    semenType: "",
    semenPushDate: "",
    pregnancyStartDate: "",
    semenCost: "",
    otherCost: "",
    note: "",
    pregnancyStatus: "",
  });
  const { translate } = useTranslation();

  useEffect(() => {
    if (pregnancy) {
      setFormData(pregnancy);
    }
  }, [pregnancy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pregnancy) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
  };

  const handleCloseDrawer = () => {
    onClose();
    navigate("/Animal-Pregnancy");
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
      {/* Semi-transparent overlay */}
      <div
        className="fixed inset-0 bg-gray-200 bg-opacity-50 z-40"
        onClick={handleCloseDrawer}
      ></div>
      {/* Edit pregnancy form */}
      <div className="fixed inset-0 overflow-y-auto z-50 flex justify-end">
        <div className="w-96 bg-white h-full shadow-lg p-6" ref={formRef}>
          <button
            className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={handleCloseDrawer}
          >
            Close
          </button>
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">
              {pregnancy ? "Edit Pregnancy" : "Add New Pregnancy"}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="pregnancyType"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("pregnancyType")}:
              </label>
              <select
                name="pregnancyType"
                value={formData.pregnancyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required

              >
                <option value="">-- Select --</option>
              <option value="Automatic">Automatic</option>
              <option value="By Collected Semen">By Collected Semen</option>
            </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="semenType"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("semenType")}:
              </label>
              <select
                
                name="semenType"
                value={formData.semenType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">-- Select --</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
              <option value="Type 4">Type 4</option>
              <option value="Type 5">Type 5</option>
              <option value="Type 6">Type 6</option>
              <option value="Type 7">Type 7</option>
              <option value="Type 8">Type 8</option>
              {/* Populate options dynamically based on available semen types */}
            </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="semenPushDate"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("semenPushDate")}:
              </label>
              <input
                type="date"
                name="semenPushDate"
                value={formData.semenPushDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pregnancyStartDate"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("pregnancyStartDate")}:
              </label>
              <input
                type="date"
                name="pregnancyStartDate"
                value={formData.pregnancyStartDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="semenCost"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("semenCost")}:
              </label>
              <input
                type="text"
                name="semenCost"
                value={formData.semenCost}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="otherCost"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("otherCost")}:
              </label>
              <input
                type="text"
                name="otherCost"
                value={formData.otherCost}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pregnancyStatus"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("pregnancyStatus")}:
              </label>
              <input
                type="text"
                name="pregnancyStatus"
                value={formData.pregnancyStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("note")}:
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
              >
                {pregnancy ? translate("updatePregnancy") : translate("addPregnancy")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPregnancyForm;
