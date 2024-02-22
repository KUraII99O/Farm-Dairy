import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../Provider";
import { FaUserPlus } from "react-icons/fa";

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const { employees, addEmployee, editEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    PayDate: "",
    employee: "",
    Month: "",
    Year: "",
    SalaryAmount: "",
    AdditionAmount: "",
    Note: "",
    
   
   
    
  });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  useEffect(() => {
    if (isEditMode) {
      const selectedEmployee = employees.find(
        (employee) => employee.id === parseInt(id)
      );
      if (selectedEmployee) {
        setFormData(selectedEmployee);
      }
    }
  }, [id, isEditMode, employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editEmployee(parseInt(id), formData);
    } else {
      await addEmployee(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/employee");
    }, 2000); // Close the popup and navigate after 2 seconds
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <FaUserPlus className="mr-2" />
          <span>Profile Information</span>
        </h2>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Pay Date</label>
          <input
            style={{ width: "800px" }}
            type="text"
          
            name="PayDate" // This should be "name"
            value={formData.PayDate}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Select Month * :
          </label>
          <select
            style={{ width: "800px" }}
            id="Month"
            name="Month"
            value={formData.Month}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Month --</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="year" className="text-sm font-medium text-gray-700">
            Select Year * :
          </label>
          <select
            style={{ width: "800px" }}
            id="Year"
            name="Year"
            value={formData.Year}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Year --</option>
            {/* Generate options from 2010 to 2024 */}
            {Array.from({ length: 15 }, (_, index) => {
              const year = 2010 + index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="employee"
            className="text-sm font-medium text-gray-700"
          >
            Select Employee * :
          </label>
          <select
            style={{ width: "800px" }}
            id="employee"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Employee --</option>
            {/* Map over employee data to generate options */}
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="userType"
            className="text-sm font-medium text-gray-700"
          >
            Monthly Salary :
          </label>
          <input
            style={{ width: "800px" }}
            id="SalaryAmount"
            name="SalaryAmount"
            value={formData.SalaryAmount}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            
        </div>
        
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="basicSalary"
            className="text-sm font-medium text-gray-700"
          >
           Addition Money :
          </label>
          <input
            type="number"
            id="AdditionAmount"
            name="AdditionAmount"
            value={formData.AdditionAmount}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ width: "800px" }}
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="permanentAddress"
            className="text-sm font-medium text-gray-700"
          >
           Note
          </label>
          <textarea
            style={{ width: "800px" }}
            id="Note"
            name="Note"
            value={formData.Note}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        

        
        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : isEditMode ? "Save" : "Add Employee"}
        </button>
      </form>

      {successPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Information updated successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEmployee;
