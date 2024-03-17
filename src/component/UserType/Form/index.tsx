import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUserTypeForm = ({ userType, onSubmit, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Retrieve logged-in user data from local storage
  const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUser"));
  const { saveAccess, updateAccess, deleteAccess } = loggedInUserData || {};

  const [formData, setFormData] = useState({
    typeName: "",
    "Animal Type List": false,
    "Animal Type Save Access": saveAccess || false,
    "Animal Type Update Access": updateAccess || false,
    "Animal Type Delete Access": deleteAccess || false
  });

  useEffect(() => {
    if (userType) {
      setFormData(userType);
    }
  }, [userType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkbox inputs, handle checked state
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      // For non-checkbox inputs (like the type name input), handle value
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCloseDrawer = () => {
    onClose(); // Call the onClose function passed from the parent component
    navigate("/User-Type-List");
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
      {/* Edit user type form */}
      <div className="fixed inset-0 overflow-y-auto z-50 flex justify-end">
        <div className="w-96 bg-white h-full shadow-lg p-6" ref={formRef}>
          <button
            className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900 focus:outline-none"
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
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">{userType ? "Edit User Type" : "Add New User Type"}</h2>
            <div className="mb-4">
              <label htmlFor="typeName" className="block text-sm font-medium text-gray-700">Type Name * :</label>
              <input
                type="text"
                name="typeName"
                value={formData.typeName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Access Permissions:</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="Animal Type List"
                    checked={formData["Animal Type List"]}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Animal Type List</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="Animal Type Save Access"
                    checked={formData["Animal Type Save Access"]}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Animal Type Save Access</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="Animal Type Update Access"
                    checked={formData["Animal Type Update Access"]}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Animal Type Update Access</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="Animal Type Delete Access"
                    checked={formData["Animal Type Delete Access"]}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Animal Type Delete Access</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
              >
                {userType ? "Update User Type" : "Add User Type"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserTypeForm;
