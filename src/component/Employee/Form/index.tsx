import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Translator/Provider";
import AutocompleteInput from "../../autocomplete";
import { Employee } from "../EmployeeService";
import ImageUpload from "../../ImageUpload";
import { FaImage } from "react-icons/fa";

interface Staff {
  id: string;
  name: string; // Ensure this matches the staff data field
}

interface EditEmployeeFormProps {
  employee?: Employee | null;
  onSubmit: (formData: Employee) => void;
}

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({
  employee,
  onSubmit,
}) => {
  const { translate, language } = useTranslation();

  const [formData, setFormData] = useState<Employee>({
    id: "",
    payDate: "",
    month: "",
    year: "",
    name: "",
    monthlySalary: "",
    additionMoney: "",
    total: "",
    image: "",
    userId: "",
  });

  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [, setInputValue] = useState<string>("");

  useEffect(() => {
    fetch("https://auth-api-woad.vercel.app/api/staffs")
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
      setFormData(employee);
      setInputValue(employee.name); // Initialize inputValue with the employee's name
    }
  }, [employee]);

  const handleImageUpload = (imageData: string) => {
    setFormData({
      ...formData,
      image: imageData,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectEmployee = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      employeeName: value,
    }));
    setInputValue(value); // Update inputValue for autocomplete
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  return (
    <div className="flex justify-end">
      <form onSubmit={handleSubmit} className={`w-96 ${formClass}`}>
        <h2 className="text-xl font-bold mb-4">
          {employee ? translate("editEmployee") : translate("addNewEmployee")}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="employeeName"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("selectEmployee")} * :
          </label>
          <AutocompleteInput
            options={staffList.map((staff) => staff.name)}
            onSelect={handleSelectEmployee}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="additionMoney"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("additionAmount")} :
          </label>
          <input
            type="number"
            name="additionMoney"
            value={formData.additionMoney}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="total"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("total")} :
          </label>
          <input
            type="text"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        >
          {employee ? translate("editEmployee") : translate("addEmployee")}
        </button>
        <div className="col-span-3 mb-4">
          <label className="text-xl font-bold mt-8 flex items-center">
            <FaImage className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
            {translate("profileImages")}:
          </label>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
