import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";
import Autocomplete from "../../autocomplete";

const EditEmployeeForm = ({ employee, onSubmit, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { translate, language } = useTranslation();

  const [formData, setFormData] = useState({
    payDate: "",
    month: "",
    year: "",
    employeeName: "",
    monthlySalary: "",
    additionMoney: "",
    note: "",
    image: "",
  });

  const [staffList, setStaffList] = useState([]); // State to store staff data

  useEffect(() => {
    // Fetch staff data from the endpoint
    fetch("http://localhost:3000/staffs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch staff data");
        }
        return response.json();
      })
      .then((data) => {
        setStaffList(data);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, []);

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
      });
    }
  }, [employee]);

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
    navigate("/employee");
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
              {employee ? (
                <>
                  <MdEdit className="mr-2 ml-2" /> {translate("editemployee")}
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2 ml-2" />{" "}
                  {translate("addemployee")}
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
                name="payDate"
                value={formData.payDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-primary"
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
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-primary"
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
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="employeeName"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("selectemloyee")} * :
              </label>
              <Autocomplete
                options={staffList.map((staff) => staff.name)}
                onSelect={(value) =>
                  handleChange({ target: { name: "employeeName", value } })
                }
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="monthlySalary"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("monthlysalary")}:
              </label>
              <input
                type="number"
                name="monthlySalary"
                value={formData.monthlySalary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="additionMoney"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("AdditionAmount")} :
              </label>
              <input
                type="number"
                name="additionMoney"
                value={formData.additionMoney}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("note")} :
              </label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-secondary hover:primary text-white font-bold py-2 px-4 rounded"
            >
              {employee ? translate("editemployee") : translate("addemployee")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEmployeeForm;
