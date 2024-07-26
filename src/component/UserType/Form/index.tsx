import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { permissionCategories } from "../Permissions/permissions";

const EditUserTypeForm = ({ userType, onSubmit, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Initialize form data
  const initializeFormData = () => {
    const initialFormData = { typeName: "" };

    permissionCategories.forEach(category => {
      category.permissions.forEach(perm => {
        const key = perm
          .toLowerCase()
          .replace(/ /g, '')
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase());

        initialFormData[key] = false;
      });
    });

    return initialFormData;
  };

  const [formData, setFormData] = useState(initializeFormData);

  useEffect(() => {
    if (userType) {
      setFormData(prevData => ({
        ...prevData,
        ...userType
      }));
    } else {
      resetForm();
    }
  }, [userType]);

  const resetForm = () => {
    setFormData(initializeFormData());
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    resetForm();
  };

  const handleCloseDrawer = () => {
    onClose();
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
      <div
        className="fixed inset-0 bg-gray-200 bg-opacity-50 z-40"
        onClick={handleCloseDrawer}
      ></div>
      <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center p-4 sm:justify-end sm:p-0">
        <div className="w-full sm:w-96 bg-white h-full sm:h-auto shadow-lg p-6" ref={formRef}>
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
              {permissionCategories.map((category) => (
                <div key={category.category} className="mt-4">
                  <h3 className="font-semibold text-lg">{category.category}</h3>
                  {category.permissions.map((perm) => {
                    // Convert permission names to match the keys in formData
                    const key = perm
                      .toLowerCase()
                      .replace(/ /g, '')
                      .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase());

                    return (
                      <div className="mt-2" key={perm}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name={key}
                            checked={formData[key]}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-500"
                          />
                          <span className="ml-2">{perm}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              ))}
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
