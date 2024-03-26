import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";

const EditMilkRecordForm = ({ MilkRecord, onSubmit, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { translate,language  } = useTranslation();

  const [formData, setFormData] = useState({
    accountNumber: "",
    stallNumber: "",
    animalID: "",
    liter: "",
    collectedfromName: "",
    Address: "",
    Fate : "",
    Priceliter: "",
    total: "",
  });

  useEffect(() => {
    if (MilkRecord) {
      setFormData({
        ...MilkRecord,
      });
    }
  }, [MilkRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call onSubmit (which is handleAddNewEmployee or handleUpdateEmployee)
  };

  const handleCloseDrawer = () => {
    onClose(); // Call the onClose function passed from the parent component
    navigate("/Collect-Milk");
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
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40"
        onClick={handleCloseDrawer}
      ></div>
      <div className="fixed inset-0  z-50 flex justify-end ">
        <div className="w-full max-w-md bg-white shadow-lg p-6" ref={formRef}>
          <button
            className="absolute top-0 start-auto m-2 text-gray-600 hover:text-gray-900 focus:outline-none"
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
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              {MilkRecord ? (
                <>
                  <MdEdit className="mr-2 ml-2" /> {translate("editemployee")}
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2 ml-2" /> {translate("addemployee")}
                </>
              )}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="payDate"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("payDate")} * :
              </label>
              <input
                type="date"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="month"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("month")} * :
              </label>
              <input
                type="text"
                name="stallNumber"
                value={formData.stallNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("year")}* :
              </label>
              <input
                type="number"
                name="animalID"
                value={formData.animalID}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="liter"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("selectemloyee")} * :
              </label>
              <input
                type="text"
                name="liter"
                value={formData.liter}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="collectedfromName"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("collectedfromName")}:
              </label>
              <input
                type="number"
                name="collectedfromName"
                value={formData.collectedfromName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Address"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("AdditionAmount")} :
              </label>
              <input
                type="number"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Fate"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("Fate")} :
              </label>
              <input
                type="text"
                name="Fate"
                value={formData.Fate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
              >
                {translate("Priceliter")} :
              </label>
              <input
                type="text"
                name="Priceliter"
                value={formData.Priceliter}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
              >
                {translate("total")} :
              </label>
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-secondary hover:primary text-white font-bold py-2 px-4 rounded"
            >
              {MilkRecord ? translate("editMilkRecord") : translate("addMilkRecord")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMilkRecordForm;
