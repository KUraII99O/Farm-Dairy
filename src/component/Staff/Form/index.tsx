import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StaffContext } from "../Provider";
import { FaUserPlus } from "react-icons/fa";

const EditStaff = () => {
  const { id } = useParams<{ id: string }>();
  const { staff, addStaff, editStaff } = useContext(StaffContext);
  const navigate = useNavigate();

  // Detect whether it's in "edit" or "add" mode based on the presence of the ID parameter
  const isEditMode = !!id;

  // State to hold form data
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    joiningDate: "",
    permanentAddress: "",
    nid: "",
    image: "",
    userType: "",
    presentAddress: "",
    basicSalary: "",
    grossSalary: "",
    resignDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  useEffect(() => {
    if (isEditMode) {
      const selectedStaff = staff.find((item) => item.id === parseInt(id));
      if (selectedStaff) {
        setFormData(selectedStaff);
      }
    }
  }, [id, isEditMode, staff]);

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle image changes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editStaff(parseInt(id), formData);
    } else {
      await addStaff(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/staff");
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
          <label className="text-sm font-medium text-gray-700">
            Full Name:
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="Name"
            name="name" // This should be "name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="emailAddress"
            className="text-sm font-medium text-gray-700"
          >
            Email Address:
          </label>
          <input
            style={{ width: "800px" }}
            type="email"
            id="emailAddress"
            name="email" // Corrected name attribute
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            style={{ width: "800px" }}
            type="tel"
            id="phoneNumber"
            name="mobile" // Corrected name attribute
            value={formData.mobile}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="nid" className="text-sm font-medium text-gray-700">
            NID:
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            id="nid"
            name="nid"
            value={formData.nid}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="designation"
            className="text-sm font-medium text-gray-700"
          >
            Designation:
          </label>
          <select
            style={{ width: "800px" }}
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">--Select--</option>
            <option value="Manager">Accountant</option>
            <option value="Supervisor">Executive</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="userType"
            className="text-sm font-medium text-gray-700"
          >
            User Type:
          </label>
          <select
            style={{ width: "800px" }}
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">--Select--</option>
            <option value="Admin">Accountant</option>
            <option value="Employee">Admin</option>
            <option value="Employee">Marketing Executive</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="presentAddress"
            className="text-sm font-medium text-gray-700"
          >
            Present Address:
          </label>
          <textarea
            style={{ width: "800px" }}
            id="presentAddress"
            name="presentAddress"
            value={formData.presentAddress}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="permanentAddress"
            className="text-sm font-medium text-gray-700"
          >
            Permanent Address:
          </label>
          <textarea
            style={{ width: "800px" }}
            id="permanentAddress"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="basicSalary"
            className="text-sm font-medium text-gray-700"
          >
            Basic Salary:
          </label>
          <input
            type="number"
            id="basicSalary"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ width: "800px" }}
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="grossSalary"
            className="text-sm font-medium text-gray-700"
          >
            Gross Salary:
          </label>
          <input
            type="number"
            id="grossSalary"
            name="grossSalary"
            value={formData.grossSalary}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ width: "800px" }}
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="joiningDate"
            className="text-sm font-medium text-gray-700"
          >
            Joining Date:
          </label>
          <input
            style={{ width: "800px" }}
            type="date"
            id="joiningDate"
            name="joiningDate"
            value={formData.joiningDate || ""}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="resignDate"
            className="text-sm font-medium text-gray-700"
          >
            Resign Date:
          </label>
          <input
            style={{ width: "800px" }}
            type="date"
            id="resignDate"
            name="resignDate"
            value={formData.resignDate || ""}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : isEditMode ? "Save" : "Add User"}
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
export default EditStaff;
