import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Translator/Provider";
import { Employee } from "../EmployeeService"; // Adjust the import based on your actual Employee type
import ImageUpload from "../../ImageUpload";
import {  FaImage } from "react-icons/fa";

// Define the props for the EditEmployeeForm component
interface EditEmployeeFormProps {
  employee: Employee | null;
  onSubmit: (formData: Employee) => void;
}

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({ employee, onSubmit }) => {
  const [formData, setFormData] = useState<Employee>({
    payDate: "",
    month: "",
    year: "",
    name: "",
    monthlySalary: "",
    additionMoney: "",
    total: "",
    image: "",
  });

  const { translate, language } = useTranslation();

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      // If employee is not provided (i.e., adding a new employee), reset formData
      setFormData({
        payDate: "",
        month: "",
        year: "",
        name: "",
        monthlySalary: "",
        additionMoney: "",
        total: "",
        image: "",
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleImageUpload = (imageData: string) => {
    setFormData({
      ...formData,
      image: imageData,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-end"> {/* Move the form container to the right */}
      <form onSubmit={handleSubmit} className="w-96"> {/* Set a width for the form */}
        <h2 className="text-xl font-bold mb-4">
          {employee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("name")}:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="payDate"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("payDate")}:
          </label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("month")}:
          </label>
          <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("year")}:
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="monthlySalary"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("monthlySalary")}:
          </label>
          <input
            type="number"
            name="monthlySalary"
            value={formData.monthlySalary}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="additionMoney"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("additionMoney")}:
          </label>
          <input
            type="number"
            name="additionMoney"
            value={formData.additionMoney}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="total"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("total")}:
          </label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-3 mb-4">
            <label className="text-xl font-bold mt-8 flex items-center">
              <FaImage className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
              {translate("profileImages")}:
            </label>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
          >
            {employee ? translate("updateEmployee") : translate("addEmployee")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
