import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RoutineMonitorContext } from "../Provider";
import { PiForkKnifeBold } from "react-icons/pi";
import { IoInformationCircle } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

const EditRoutineMonitorForm = () => {
  const { id } = useParams<{ id: string }>();
  const { routineMonitors, addRoutineMonitor, editRoutineMonitor } = useContext(
    RoutineMonitorContext
  );
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    stallNo: "",
    animalID: "",
    updatedWeight: "",
    updatedHeight: "",
    milkPerDay: "",
    monitoringDate: "",
    note: "",
    healthStatus: 50, // Default health status
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const selectedRoutineMonitor = routineMonitors.find(
        (routineMonitor) => routineMonitor.id === parseInt(id)
      );
      if (selectedRoutineMonitor) {
        setFormData(selectedRoutineMonitor);
      }
    }
  }, [id, isEditMode, routineMonitors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleHealthStatusChange = (e) => {
    setFormData({
      ...formData,
      healthStatus: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editRoutineMonitor(parseInt(id), formData);
    } else {
      await addRoutineMonitor(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/routine-monitor");
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <PiForkKnifeBold className="mr-2" />
          <span>Routine Monitor</span>
        </h2>
        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle className="mr-2" />
          <span>Basic Information:</span>
        </h2>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Stall No:</label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="Stall No"
            name="stallNo"
            value={formData.stallNo}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Animal ID:
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="Animal ID"
            name="animalID"
            value={formData.animalID}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <FaRegEdit className="mr-2" />
          <span>Result and Note :</span>
        </h2>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Updated Weight (KG):
          </label>
          <input
            style={{ width: "800px" }}
            type="number"
            placeholder="Updated Weight"
            name="updatedWeight"
            value={formData.updatedWeight}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Updated Height (INCH):
          </label>
          <input
            style={{ width: "800px" }}
            type="number"
            placeholder="Updated Height"
            name="updatedHeight"
            value={formData.updatedHeight}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Milk Per Day (LTR):
          </label>
          <input
            style={{ width: "800px" }}
            type="number"
            placeholder="Milk Per Day"
            name="milkPerDay"
            value={formData.milkPerDay}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Monitoring Date:
          </label>
          <input
            style={{ width: "800px" }}
            type="date"
            placeholder="Monitoring Date"
            name="monitoringDate"
            value={formData.monitoringDate}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Reports:</label>
          <textarea
            style={{ width: "800px", height: "100px" }}
            placeholder="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-4 items-center">
          <label className="text-sm font-medium text-secondary">
            Health Status:
          </label>
          <div className="relative w-80">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleHealthStatusChange}
              className="appearance-none h-3 w-full bg-green-200 rounded-full outline-none focus:outline-none"
            />
            <div className="absolute top-0 left-0 h-3 w-full bg-gradient-to-r from-secondary to-primary rounded-full"></div>
            <div className="absolute top-0 left-0 h-3 w-1/3 bg-secondary rounded-full"></div>
            <span className="absolute top-0 right-0 -mt-6 text-secondary font-bold">
              {formData.healthStatus}%
            </span>
          </div>
        </div>

        <button
          style={{ width: "800px" }}
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : isEditMode ? "Save" : "Add Routine Monitor"}
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

export default EditRoutineMonitorForm;