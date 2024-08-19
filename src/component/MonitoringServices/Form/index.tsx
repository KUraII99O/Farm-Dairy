import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMonitoringServiceForm = ({ service, onSubmit, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    serviceName: "",
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

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

  const handleCloseDrawer = () => {
    onClose(); // Call the onClose function passed from the parent component
    navigate("/manage-monitoring-service");
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
      {/* Edit monitoring service form */}
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
            <h2 className="text-xl font-bold mb-4">{service ? "Edit Monitoring Service" : "Add New Monitoring Service"}</h2>
            <div className="mb-4">
              <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">Service Name * :</label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
              >
                {service ? "Update Monitoring Service" : "Add Monitoring Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMonitoringServiceForm;
