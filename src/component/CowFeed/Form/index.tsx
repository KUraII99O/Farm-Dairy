import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CowFeedContext } from "../Provider";
import { FaUserPlus } from "react-icons/fa";
import { PiForkKnifeBold } from "react-icons/pi";
import { IoInformationCircle } from "react-icons/io5";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    }, 2000); // Close the popup and navigate after 2 seconds
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <button
          style={{ width: "800px" }}
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : isEditMode ? "Save" : "Add Cow Feed"}
        </button>
      </form>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
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
            <tr>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="checkbox"
                  id="food1"
                  name="food1"
                  className="mr-2"
                />
                <label htmlFor="food1">Grass</label>
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder="Item Quantity"
                  name="itemQuantity1"
                  value={formData.itemQuantity1}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder="Unit"
                  name="unit1"
                  value={formData.unit1}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="date"
                  placeholder="Feeding Time"
                  name="feedingTime1"
                  value={formData.feedingTime1}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="checkbox"
                  id="food2"
                  name="food2"
                  className="mr-2"
                />
                <label htmlFor="food2">Salt</label>
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder="Item Quantity"
                  name="itemQuantity2"
                  value={formData.itemQuantity2}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder="Unit"
                  name="unit2"
                  value={formData.unit2}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="date"
                  placeholder="Feeding Time"
                  name="feedingTime2"
                  value={formData.feedingTime2}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="checkbox"
                  id="food3"
                  name="food3"
                  className="mr-2"
                />
                <label htmlFor="food3">Water</label>
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder="Item Quantity"
                  name="itemQuantity3"
                  value={formData.itemQuantity3}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="text"
                  placeholder="Unit"
                  name="unit3"
                  value={formData.unit3}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <input
                  type="date"
                  placeholder="Feeding Time"
                  name="feedingTime3"
                  value={formData.feedingTime3}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

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
