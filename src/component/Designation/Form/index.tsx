import React, { useEffect, useState } from "react";
import { Designation } from "../DesignationService";



interface EditDesignationFormProps {
  designation?: Designation | null; // Designation can be undefined or null
  onSubmit: (formData: Designation) => void;
  onClose: () => void;
}

const EditDesignationForm: React.FC<EditDesignationFormProps> = ({
  designation,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Designation>({
    name: "",
  });

  useEffect(() => {
    if (designation) {
      setFormData(designation);
    } else {
      setFormData({
        name: "",
      });
    }
  }, [designation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-end">
      <form onSubmit={handleSubmit} className="w-96">
        <h2 className="text-xl font-bold mb-4">
          {designation ? "Edit Designation" : "Add New Designation"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Designation Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          />
        </div>
       
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          >
            {designation ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDesignationForm;
