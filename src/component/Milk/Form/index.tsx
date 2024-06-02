import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";
import { ManageMilkContext } from "../Provider";

const EditMilk = () => {
  const { id } = useParams<{ id: string }>();
  const { milkRecords, addMilkRecord, editMilkRecord } = useContext(ManageMilkContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    AccountNo: "",
    StallNo: "",
    AnimalID: "",
    Liter: "",
    CollectedFrom: "",
    Fate: "",
    Price: "",
    Total: "",
    Date: "",
    AddedBy: "", // AddedBy field added here
  });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const { translate, language } = useTranslation();

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setFormData(prevState => ({
      ...prevState,
      Date: formattedDate,
    }));
  }, []);

  useEffect(() => {
    if (id && milkRecords.length > 0) {
      const selectedMilk = milkRecords.find(milk => milk.id === id);
      if (selectedMilk) {
        setFormData(selectedMilk);
      }
    }
  }, [id, milkRecords]);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const { username } = userData;
      setFormData(prevState => ({
        ...prevState,
        AddedBy: username,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await editMilkRecord(id, formData);
      } else {
        await addMilkRecord(formData);
      }
      setSuccessPopup(true);
      setTimeout(() => {
        setSuccessPopup(false);
        navigate("/milk");
      }, 1000); // Close the popup and navigate after 1 second
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        {/* Form fields */}
        {/* Account No */}
        <label className="text-sm font-medium text-gray-700">{translate("accountNo")}</label>
        <input
          type="text"
          placeholder={translate("accountNo")}
          name="AccountNo"
          value={formData.AccountNo}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Stall No */}
        <label className="text-sm font-medium text-gray-700">{translate("stallNo")}</label>
        <input
          type="text"
          placeholder={translate("stallNo")}
          name="StallNo"
          value={formData.StallNo}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Animal ID */}
        <label className="text-sm font-medium text-gray-700">{translate("animalID")}</label>
        <input
          type="text"
          placeholder={translate("animalID")}
          name="AnimalID"
          value={formData.AnimalID}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Liter */}
        <label className="text-sm font-medium text-gray-700">{translate("liter")}</label>
        <input
          type="text"
          placeholder={translate("liter")}
          name="Liter"
          value={formData.Liter}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Collected From */}
        <label className="text-sm font-medium text-gray-700">{translate("collectedFrom")}</label>
        <input
          type="text"
          placeholder={translate("collectedFrom")}
          name="CollectedFrom"
          value={formData.CollectedFrom}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Fate */}
        <label className="text-sm font-medium text-gray-700">{translate("fate")}</label>
        <input
          type="text"
          placeholder={translate("fate")}
          name="Fate"
          value={formData.Fate}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Price */}
        <label className="text-sm font-medium text-gray-700">{translate("price")}</label>
        <input
          type="text"
          placeholder={translate("price")}
          name="Price"
          value={formData.Price}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Total */}
        <label className="text-sm font-medium text-gray-700">{translate("total")}</label>
        <input
          type="text"
          placeholder={translate("total")}
          name="Total"
          value={formData.Total}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary w-full"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : id
            ? translate("save")
            : translate("addMilk")}
        </button>
      </form>
    </div>
  );
};

export default EditMilk;
