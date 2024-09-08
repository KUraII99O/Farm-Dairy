import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Translator/Provider";
import { Stall } from "../StallService";


// Define the props for the EditStallForm component
interface EditStallFormProps {
  stall: Stall | null;
  onSubmit: (formData: Stall) => void;
}

const EditStallForm: React.FC<EditStallFormProps> = ({ stall, onSubmit }) => {
  const [formData, setFormData] = useState<Stall>({
    stallNumber: "",
    details: "",
    status: true, // Ensure default status is set to "true" for available
  });

  const { translate } = useTranslation();

  useEffect(() => {
    if (stall) {
      setFormData(stall);
    } else {
      // If stall is not provided (i.e., adding a new stall), reset formData
      setFormData({
        stallNumber: "",
        details: "",
        status: true,
      });
    }
  }, [stall]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? (value === "true" ? true : false) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-end"> {/* Move the form container to the right */}
      <form onSubmit={handleSubmit} className="w-96"> {/* Set a width for the form */}
        <h2 className="text-xl font-bold mb-4">
          {stall ? "Edit Stall" : "Add New Stall"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="stallNumber"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("stallnumber")}:
          </label>
          <input
            type="text"
            name="stallNumber"
            value={formData.stallNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("details")}:
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("status")}:
          </label>
          <select
            name="status"
            value={formData.status ? "true" : "false"}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="true">{translate("available")}</option>
            <option value="false">{translate("booked")}</option>
          </select>
        </div>
       
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
          >
            {stall ? translate("updatestall") : translate("addstall")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStallForm;
