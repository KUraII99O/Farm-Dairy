import React, { useEffect, useState } from "react";

interface Branch {
  id: string;
  name: string;
  setupDate: Date; // Use Date type
  builderName: string;
  phoneNumber: string;
  email: string;
  userId: string;
  branchName: string;
}

interface EditBranchFormProps {
  branch?: Branch;
  onSubmit: (formData: Branch) => void;
  onClose: () => void;
}

const EditBranchForm: React.FC<EditBranchFormProps> = ({
  branch,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Branch>({
    id: "",
    name: "",
    setupDate: new Date(), // Initialize with current date or appropriate default
    builderName: "",
    phoneNumber: "",
    email: "",
    userId: "",
    branchName: "",
  });

  useEffect(() => {
    if (branch) {
      setFormData({
        ...branch,
        setupDate: branch.setupDate, // Use Date object directly
      });
    } else {
      setFormData({
        id: "",
        name: "",
        setupDate: new Date(), // Set default date
        builderName: "",
        phoneNumber: "",
        email: "",
        userId: "",
        branchName: "",
      });
    }
  }, [branch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "setupDate" ? new Date(value) : value, // Correctly handle the date input
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
          {branch ? "Edit Branch" : "Add New Branch"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Branch Name
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
        <div className="mb-4">
          <label
            htmlFor="setupDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Setup Date
          </label>
          <input
            type="date"
            id="setupDate"
            name="setupDate"
            value={formData.setupDate.toISOString().split('T')[0]} // Convert to string format
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="builderName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Builder Name
          </label>
          <input
            type="text"
            id="builderName"
            name="builderName"
            value={formData.builderName}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
            {branch ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBranchForm;
