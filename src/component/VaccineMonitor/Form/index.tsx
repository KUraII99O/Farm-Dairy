import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VaccineMonitorContext } from "../Provider";
import { PiForkKnifeBold } from "react-icons/pi";
import { IoInformationCircle } from "react-icons/io5";
import { TiMinus } from "react-icons/ti"; // Import TiMinus icon
import { FaRegEdit } from "react-icons/fa"; // Import FaRegEdit icon

const EditVaccineMonitorForm = () => {
  const { id } = useParams<{ id: string }>();
  const { vaccineMonitors, addVaccineMonitor, editVaccineMonitor } = useContext(
    VaccineMonitorContext
  );
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    stallNo: "",
    CowNumber: "",
    date: "",
    note: "",
    healthStatus: 50,
    informations: Array.from({ length: 3 }, () => ({
      VaccineName: "",
      Dose: "",
      Repeat: "",
      Remarks: "",
      GivenTime: "",
    })),
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const selectedVaccineMonitor = vaccineMonitors.find(
        (vaccineMonitor) => vaccineMonitor.id === parseInt(id)
      );
      if (selectedVaccineMonitor) {
        setFormData(selectedVaccineMonitor);
      }
    }
  }, [id, isEditMode, vaccineMonitors]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (index === -1) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      const updatedInformations = [...formData.informations];
      updatedInformations[index] = {
        ...updatedInformations[index],
        [name]: value,
      };
      setFormData({
        ...formData,
        informations: updatedInformations,
      });
    }
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      informations: [
        ...formData.informations,
        { VaccineName: "", Dose: "", Repeat: "", Remarks: "", GivenTime: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editVaccineMonitor(parseInt(id), formData);
    } else {
      await addVaccineMonitor(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/vaccine-monitor");
    }, 2000);
  };

  const handleRemoveRow = (indexToRemove) => {
    setFormData({
      ...formData,
      informations: formData.informations.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };
  const handleHealthStatusChange = (e) => {
    setFormData({
      ...formData,
      healthStatus: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <PiForkKnifeBold className="mr-2" />
          <span>Vaccine Monitor</span>
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
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Cow Number:
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="Cow Number"
            name="CowNumber"
            value={formData.CowNumber}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <FaRegEdit className="mr-2" />
          <span>Vaccine Date & Note :</span>
        </h2>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Date * :</label>
          <input
            style={{ width: "800px" }}
            type="date"
            placeholder="Date "
            name="date"
            value={formData.date}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Note ::</label>
          <textarea
            style={{ width: "800px", height: "50px" }}
            placeholder="note"
            name="note"
            value={formData.note}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <FaRegEdit className="mr-2" />
          <span> Vaccines List :</span>
        </h2>

        <div style={{ width: "800px" }}>
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 px-3 py-2">
                  Vaccine Name
                </th>
                <th className="border border-gray-400 px-3 py-2">Dose</th>
                <th className="border border-gray-400 px-3 py-2">Repeat</th>
                <th className="border border-gray-400 px-3 py-2">Remarks</th>
                <th className="border border-gray-400 px-3 py-2">Given Time</th>
              </tr>
            </thead>
            <tbody>
              {formData.informations.map((info, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder="Vaccine Name"
                      name="VaccineName"
                      value={info.VaccineName}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder="Dose"
                      name="Dose"
                      value={info.Dose}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder="Repeat"
                      name="Repeat"
                      value={info.Repeat}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder="Remarks"
                      name="Remarks"
                      value={info.Remarks}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder="Given Time"
                      name="GivenTime"
                      value={info.GivenTime}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      style={{ width: "100px" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="text-red-600 hover:text-red-800 ml-2 self-end"
                    >
                      <TiMinus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          style={{ width: "800px" }}
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : isEditMode ? "Save" : "Add Vaccine Monitor"}
        </button>
        <button
          style={{ width: "800px" }}
          type="button"
          onClick={handleAddRow}
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
        >
          Add Row
        </button>

        {successPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p>Information updated successfully!</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditVaccineMonitorForm;
