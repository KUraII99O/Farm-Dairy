import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditExpenseForm = ({ expense, onSubmit, onClose }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    Date: "",
    purposeName: "",
    details: "",
    totalAmount: "", // Make sure totalAmount field is included
    AddedBy: "",
  });


  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setFormData(prevState => ({
      ...prevState,
      Date: formattedDate,
    }));
  }, []);

  useEffect(() => {
    if (expense) {
      setFormData({ ...expense });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const { username } = userData;
      setFormData(prevState => ({
        ...prevState,
        AddedBy: username,
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCloseDrawer = () => {
    onClose();
    navigate("/Expense-List");
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
        className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40"
        onClick={handleCloseDrawer}
      ></div>
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
              {expense ? "Edit Expense" : "Add Expense"}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date:
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="purposeName"
                className="block text-sm font-medium text-gray-700"
              >
                Purpose Name:
              </label>
              <input
                type="text"
                name="purposeName"
                value={formData.purposeName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                Details:
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={+formData.rows} // Convert the value to a number
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="totalAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Total Amount:
              </label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="addedBy"
                className="block text-sm font-medium text-gray-700"
              >
                Added By:
              </label>
              <input
                type="text"
                name="addedBy"
                value={formData.addedBy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-secondary hover:primary text-white font-bold py-2 px-4 rounded"
              >
                {expense ? "Update Expense" : "Add Expense"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditExpenseForm;
