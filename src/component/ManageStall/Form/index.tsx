import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditStallForm = ({ stall, onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stallNumber: "",
    details: "",
    status: "available",
  });

  useEffect(() => {
    if (stall) {
      setFormData(stall);
    }
  }, [stall]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{stall ? "" : ""}</h2>
      <div className="mb-4">
        <label htmlFor="stallNumber" className="block text-sm font-medium text-gray-700">Stall Number * :</label>
        <input
          type="text"
          name="stallNumber"
          value={formData.stallNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details :</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        >
          {stall ? "Update Stall" : "Add Stall"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/manage-stall")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditStallForm;
