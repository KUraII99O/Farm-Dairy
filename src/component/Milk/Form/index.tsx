import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "../../Translator/Provider";
import { ManageMilkContext } from "../Provider";

interface MilkRecord {
  id: string;
  Date: string;
  userId: string;
  AccountNo: string;
  stallNumber: string;
  AnimalID: string;
  Liter: string;
  Fate: string;
  Price: string;
  Total: string;
  CollectedFrom: string;
  addedBy: string;
}

interface Stall {
  id: string;
  stallNumber: string;
}

const EditMilk = () => {
  const { id } = useParams<{ id: string }>();
  const { milkRecords, addMilkRecord, editMilkRecord } = useContext(ManageMilkContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    AccountNo: "",
    stallNumber: "",
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
  const [, setSuccessPopup] = useState(false);
  const { translate } = useTranslation();
  const [stalls, setStalls] = useState<Stall[]>([]); // State for stall options

  useEffect(() => {
    // Fetch stall options from API
    const fetchStalls = async () => {
      try {
        const response = await fetch('https://auth-api-woad.vercel.app/api/stalls');
        const data = await response.json();
        setStalls(data);
      } catch (error) {
        console.error("Error fetching stalls:", error);
      }
    };
    fetchStalls();
  }, []);

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
      const selectedMilk = milkRecords.find((milk: MilkRecord) => milk.id === id);
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await editMilkRecord(id, formData);
      } else {
        await addMilkRecord(formData);
      }
      setSuccessPopup(true);
      setSuccessPopup(false); // Immediately close the popup
      navigate("/milk?result=success"); // Navigate immediately
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
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

        {/* Stall No - Select Dropdown */}
        <label className="text-sm font-medium text-gray-700">{translate("stallNo")}</label>
        <select
          name="stallNumber"
          value={formData.stallNumber}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">{translate("selectStall")}</option>
          {stalls.map((stall: Stall) => (
            <option key={stall.id} value={stall.stallNumber}>
              {stall.stallNumber}
            </option>
          ))}
        </select>

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
