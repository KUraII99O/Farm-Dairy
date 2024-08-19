import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";
import Autocomplete from "../../autocomplete";

const EditEmployeeForm = ({ employee, onSubmit }) => {
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

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";
  return (
    <div className="flex justify-end">
     
      <form onSubmit={handleSubmit} className="w-96"> {/* Set a width for the form */}
      <h2 className="text-xl font-bold mb-4">
          {employee ? "Edit employee" : "Add New employee"}
        </h2>
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
  );
};

export default EditEmployeeForm;
