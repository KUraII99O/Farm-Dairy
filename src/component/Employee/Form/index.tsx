import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Translator/Provider";
import { Employee } from "../EmployeeService";
import ImageUpload from "../../ImageUpload";
import { FaImage } from "react-icons/fa";

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
    employeeName: "",
    monthlySalary: "",
    additionMoney: "",
    total: "",
    image: "",
  });

  const [staffs, setStaffs] = useState<{ id: string; employeeName: string }[]>([]); // State to store fetched staff data
  const { translate, language } = useTranslation();

  // Fetch all staff members
  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await fetch('https://auth-api-woad.vercel.app/api/staffs');
        const data = await response.json();
        setStaffs(data); // Store the staff data in the state
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };

    fetchStaffs(); // Fetch the data when the component mounts
  }, []);

  // Update the form with employee data if editing an employee
  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        payDate: "",
        month: "",
        year: "",
        employeeName: "",
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
    <div className="flex justify-end">
      <form onSubmit={handleSubmit} className="w-96">
        <h2 className="text-xl font-bold mb-4">
          {employee ? translate("editEmployee") : translate("addEmployee")}
        </h2>

        {/* Employee Name as Select Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("name")}:
          </label>
          <select
            name="name"
            value={formData.employeeName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">{translate("selectStaff")}</option>
            {staffs.map((staff) => (
              <option key={staff.id} value={staff.employeeName}>
                {staff.employeeName}
              </option>
            ))}
          </select>
        </div>

        {/* Other Fields */}
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
