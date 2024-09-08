import React, { useEffect, useState } from "react";
import { Vaccine } from "../VaccineService";

interface EditVaccineFormProps {
  vaccine?: Vaccine;
  onSubmit: (formData: Omit<Vaccine, "id">) => void;
  onClose: () => void;
}

const EditVaccineForm: React.FC<EditVaccineFormProps> = ({
  vaccine,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Vaccine>({
    vaccineName: "",
    periodDays: "",
    repeatVaccine: false,
    dose: "",
    note: "",
  });

  useEffect(() => {
    if (vaccine) {
      setFormData(vaccine);
    } else {
      setFormData({
        vaccineName: "",
        periodDays: "",
        repeatVaccine: false,
        dose: "",
        note: "",
      });
    }
  }, [vaccine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "repeatVaccine" ? value === "true" : value,
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
          {vaccine ? "Edit Vaccine" : "Add New Vaccine"}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="vaccineName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vaccine Name
          </label>
          <input
            type="text"
            id="vaccineName"
            name="vaccineName"
            value={formData.vaccineName}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="periodDays"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Period (Days)
          </label>
          <input
            type="text"
            id="periodDays"
            name="periodDays"
            value={formData.periodDays}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="repeatVaccine"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Repeat Vaccine
          </label>
          <select
            id="repeatVaccine"
            name="repeatVaccine"
            value={formData.repeatVaccine ? "true" : "false"}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dose"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dose
          </label>
          <input
            type="text"
            id="dose"
            name="dose"
            value={formData.dose}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Note
          </label>
          <input
            type="text"
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 w-full"
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
            {vaccine ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVaccineForm;
