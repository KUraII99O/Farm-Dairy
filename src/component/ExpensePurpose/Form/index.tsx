import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { ExpensePurposeContext } from "../Provider";

const EditPurposeForm = ({ purpose, onSubmit, onClose }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (purpose) {
      setFormData({
        name: purpose.name,
      });
    }
  }, [purpose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call onSubmit function passed from parent component
  };

  const handleCloseDrawer = () => {
    onClose(); // Call the onClose function passed from the parent component
    navigate("/Purpose-List");
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
        className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40"
        onClick={handleCloseDrawer}
      ></div>
      {/* Edit purpose form */}
      <div className="fixed inset-0  z-50 flex justify-end ">
        <div className="w-full max-w-md bg-white shadow-lg p-6" ref={formRef}>
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
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              {purpose ? (
                <>
                  <MdEdit className="mr-2" /> Edit Purpose
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" /> Add Purpose
                </>
              )}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Purpose Name *:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex ">
              <button
                type="submit"
                className="bg-secondary hover:primary text-white font-bold py-2 px-4 rounded"
              >
                {purpose ? "Update Purpose" : "Add Purpose"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPurposeForm;
