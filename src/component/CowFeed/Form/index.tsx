import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CowFeedContext } from "../Provider";
import { PiForkKnifeBold } from "react-icons/pi";
import { IoInformationCircle } from "react-icons/io5";
import { TiMinus } from "react-icons/ti"; // Import TiMinus icon

const EditCowFeedForm = () => {
  const { id } = useParams<{ id: string }>();
  const { cowFeeds, addCowFeed, editCowFeed } = useContext(CowFeedContext);
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    stallNo: "",
    cowNumber: "",
    date: "",
    note: "",
    unit: "",
    informations: Array.from({ length: 3 }, () => ({
      foodItem: "",
      quantity: "",
      feedingTime: "",
    })), // Change: Initialize informations as an empty array
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const selectedCowFeed = cowFeeds.find(
        (cowFeed) => cowFeed.id === parseInt(id)
      );
      if (selectedCowFeed) {
        setFormData(selectedCowFeed);
      }
    }
  }, [id, isEditMode, cowFeeds]);

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
        { foodItem: "", quantity: "", unit: "", feedingTime: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editCowFeed(parseInt(id), formData);
    } else {
      await addCowFeed(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/Cow-Feed");
    }, 2000);
  };
  const handleRemoveRow = (indexToRemove) => {
    setFormData({
      ...formData,
      informations: formData.informations.filter((_, index) => index !== indexToRemove),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold  mb-4 flex items-center">
          <PiForkKnifeBold className="mr-2" />
          <span>Cow Feed </span>
        </h2>
        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle className="mr-2" />
          <span>Basic Information :</span>
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
            name="cowNumber"
            value={formData.cowNumber}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Date:</label>
          <input
            style={{ width: "800px" }}
            type="date"
            placeholder="Date"
            name="date"
            value={formData.date}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Note:</label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="Note"
            name="note"
            value={formData.note}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle className="mr-2" />
          <span>Feed Informations :</span>
        </h2>

        <table className="border-collapse w-full" style={{ width: "800px" }}>
          <thead>
            <tr>
              <th className="border border-gray-400 px-3 py-2">Food Item</th>
              <th className="border border-gray-400 px-3 py-2">
                Item Quantity
              </th>
              <th className="border border-gray-400 px-3 py-2">Unit</th>
              <th className="border border-gray-400 px-3 py-2">Feeding Time</th>
            </tr>
          </thead>
          <tbody>
            {formData.informations.map((info, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-3 py-2">
                  <input
                    type="string"
                    placeholder="Food Item"
                    name="foodItem"
                    value={info.foodItem}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  <input
                    type="string"
                    placeholder="Item Quantity"
                    name="quantity"
                    value={info.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  <select
                    name="unit"
                    value={info.unit}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="kg">Kg</option>
                    <option value="gram">Gram</option>
                    <option value="liters">Liters</option>
                  </select>
                </td>
                <td className="border border-gray-400 px-1 py-2 text-right">
                <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-600 hover:text-red-800 self-end"
                  >
                    <TiMinus />
                  </button>
                  <input
                    type="string"
                    placeholder="Feeding Time"
                    name="feedingTime"
                    value={info.feedingTime}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          style={{ width: "800px" }}
          type="button"
          onClick={handleAddRow}
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
        >
          Add Row
        </button>

        <button
          style={{ width: "800px" }}
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : isEditMode ? "Save" : "Add Cow Feed"}
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

export default EditCowFeedForm;
