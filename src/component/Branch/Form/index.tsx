import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Translator/Provider";

const EditBranchForm = ({ branch, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    setupDate: "",
    builderName: "",
    phoneNumber: "",
    email: "",
  });
  const { translate } = useTranslation();

  useEffect(() => {
    if (branch) {
      setFormData(branch);
    } else {
      // If branch is not provided (i.e., adding a new branch), reset formData
      setFormData({
        name: "",
        setupDate: "",
        builderName: "",
        phoneNumber: "",
        email: "",
      });
    }
  }, [branch]);

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
    <div className="flex justify-end"> {/* Move the form container to the right */}
      <form onSubmit={handleSubmit} className="w-96"> {/* Set a width for the form */}
        <h2 className="text-xl font-bold mb-4">
          {branch ? translate("editBranch") : translate("addNewBranch")}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("branchName")}:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="setupDate"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("setupDate")}:
          </label>
          <input
            type="date"
            name="setupDate"
            value={formData.setupDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="builderName"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("builderName")}:
          </label>
          <input
            type="text"
            name="builderName"
            value={formData.builderName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("phoneNumber")}:
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("email")}:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded mr-2"
          >
            {branch ? translate("updateBranch") : translate("addBranch")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            {translate("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBranchForm;
