import React, { useEffect, useState } from "react";
import { Monitoring } from "../MonitoringService";



interface EditMonitoringFormProps {
  monitoring?: Monitoring | null; // Accept null to handle empty cases
  onSubmit: (formData: Omit<Monitoring, 'id' | 'userId'>) => void;
  onClose: () => void;
}

const EditMonitoringForm: React.FC<EditMonitoringFormProps> = ({
  monitoring,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Omit<Monitoring, 'id' | 'userId'>>({
    serviceName: "",
  });

  useEffect(() => {
    if (monitoring) {
      setFormData({ serviceName: monitoring.serviceName });
    } else {
      setFormData({ serviceName: "" }); // Reset formData when monitoring is not provided
    }
  }, [monitoring]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          {monitoring ? "Edit Monitoring" : "Add New Monitoring"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            service Name
          </label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            value={formData.serviceName}
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
            {monitoring ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMonitoringForm;
