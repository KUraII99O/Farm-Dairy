import React, { useEffect, useState } from "react";

interface AnimalType {
  id: string;
  name: string;
  userId: string;
}

interface EditAnimalTypeFormProps {
  animalType?: AnimalType;
  onSubmit: (formData: AnimalType) => void;
  onClose: () => void;
}

const EditAnimalTypeForm: React.FC<EditAnimalTypeFormProps> = ({
  animalType,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<AnimalType>({
    id: "",
    name: "",
    userId: "",
  });

  useEffect(() => {
    if (animalType) {
      setFormData(animalType);
    } else {
      setFormData({
        id: "",
        name: "",
        userId: "",
       
      }); // Reset formData when animalType is not provided
    }
  }, [animalType]);

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
          {animalType ? "Edit Animal Type" : "Add New Animal Type"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Animal Type Name
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
            {animalType ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAnimalTypeForm;
