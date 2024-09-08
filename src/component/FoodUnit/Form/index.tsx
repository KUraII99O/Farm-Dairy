import React, { useEffect, useState } from "react";
import { FoodUnit } from "../FoodUnitService";

interface EditFoodUnitFormProps {
  foodUnit?: FoodUnit | null; // Accept null to handle empty cases
  onSubmit: (formData: Omit<FoodUnit, 'id' | 'userId'>) => void;
  onClose: () => void;
}

const EditFoodUnitForm: React.FC<EditFoodUnitFormProps> = ({
  foodUnit,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Omit<FoodUnit, 'id' | 'userId'>>({
    name: "",
  });

  useEffect(() => {
    if (foodUnit) {
      setFormData({ name: foodUnit.name });
    } else {
      setFormData({ name: "" }); // Reset formData when foodUnit is not provided
    }
  }, [foodUnit]);

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
          {foodUnit ? "Edit Food Unit" : "Add New Food Unit"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
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
            {foodUnit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFoodUnitForm;
