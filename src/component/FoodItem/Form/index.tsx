import React, { useEffect, useState } from "react";

interface FoodItem {
  id: string;
  name: string;
  userId: string;
}

interface EditFoodItemFormProps {
  foodItem?: FoodItem | null; // Accept null to handle empty cases
  onSubmit: (formData: Omit<FoodItem, 'id' | 'userId'>) => void;
  onClose: () => void;
}

const EditFoodItemForm: React.FC<EditFoodItemFormProps> = ({
  foodItem,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Omit<FoodItem, 'id' | 'userId'>>({
    name: "",
  });

  useEffect(() => {
    if (foodItem) {
      setFormData({ name: foodItem.name });
    } else {
      setFormData({ name: "" }); // Reset formData when foodItem is not provided
    }
  }, [foodItem]);

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
          {foodItem ? "Edit Food Item" : "Add New Food Item"}
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
            {foodItem ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFoodItemForm;
