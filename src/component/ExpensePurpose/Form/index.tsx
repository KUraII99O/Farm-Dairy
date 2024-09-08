import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Translator/Provider";
import { ExpensePurpose } from "../ExpensePurposeService";

interface EditPurposeFormProps {
  purpose?: ExpensePurpose ;
  onSubmit: (formData: ExpensePurpose) => void; 
}

const EditPurposeForm: React.FC<EditPurposeFormProps> = ({ purpose, onSubmit }) => {
  const [formData, setFormData] = useState<ExpensePurpose>({
    name: "",
    description: "",
  });

  const { translate } = useTranslation();

  useEffect(() => {
    if (purpose) {
      setFormData(purpose);
    } else {
      // If purpose is not provided (i.e., adding a new purpose), reset formData
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [purpose]);

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
    <div className="flex justify-end"> {/* Move the form container to the right */}
      <form onSubmit={handleSubmit} className="w-96"> {/* Set a width for the form */}
        <h2 className="text-xl font-bold mb-4">
          {purpose ? translate("editPurpose") : translate("addNewPurpose")}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {translate("purposeName")}:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
          >
            {purpose ? translate("updatePurpose") : translate("addPurpose")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPurposeForm;
