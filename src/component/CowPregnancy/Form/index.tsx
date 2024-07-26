import React, { useState, useEffect, useRef, useContext } from "react";
import PregnancyRecordsList from "../PregnancyRecords";
import CowDetails from "../List";
import { useParams } from "react-router-dom";
import { useTranslation } from "../../Translator/Provider";
import { ManagePregnancyContext } from "../Provider";
import { PregnancyService } from "../CowPregnancyService";

// Define TypeScript interfaces
interface FormData {
  stallNo: string;
  animalId: string;
  pregnancyType: string;
  semenType: string;
  semenPushDate: string;
  pregnancyStartDate: string;
  semenCost: string;
  otherCost: string;
  note: string;
  pregnancyStatus: string;
}

interface Stall {
  id: string;
  stallNumber: string;
}

interface Cow {
  id: string;
  animalId: string;
}

const CowPregnancyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { addPregnancy } = useContext(ManagePregnancyContext);
  const { fetchPregnancies } = PregnancyService;
  const { translate } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    stallNo: "",
    animalId: "",
    pregnancyType: "",
    semenType: "",
    semenPushDate: "",
    pregnancyStartDate: "",
    semenCost: "",
    otherCost: "",
    note: "",
    pregnancyStatus: "",
  });
  const [showCowDetails, setShowCowDetails] = useState(false);
  const [stallList, setStallList] = useState<Stall[]>([]);
  const [cowList, setCowList] = useState<Cow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const editFormRef = useRef<HTMLDivElement>(null);

  const PREGNANCY_DURATION = 283; // Total pregnancy duration in days

  useEffect(() => {
    const fetchStallData = async () => {
      try {
        const response = await fetch("http://localhost:3000/stalls");
        if (!response.ok) {
          throw new Error("Failed to fetch stall data");
        }
        const data: Stall[] = await response.json();
        setStallList(data);
      } catch (error) {
        console.error("Error fetching stall data:", error);
        setError(error.message);
      }
    };

    fetchStallData();
  }, []);

  const fetchCowData = async (stallNumber: string) => {
    if (!stallNumber) {
      console.warn("No Stall Number provided for fetching cow data.");
      setCowList([]);
      return;
    }

    console.log(`Fetching cow data for Stall Number: ${stallNumber}`);

    try {
      const response = await fetch(`http://localhost:3000/cows?stallNumber=${stallNumber}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch cow data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Log the raw data

      if (!data || data.length === 0) {
        console.warn("Received empty cow data.");
        setCowList([]);
      } else {
        setCowList(data);
      }
    } catch (error) {
      console.error("Error fetching cow data:", error.message);
      setError(`An error occurred while fetching cow data: ${error.message}`);
    }
  };

  useEffect(() => {
    if (formData.stallNo !== "") {
      fetchCowData(formData.stallNo);
    }
  }, [formData.stallNo]);

  useEffect(() => {
    if (formData.stallNo !== "" && formData.animalId !== "") {
      setShowCowDetails(true);
      fetchPregnancies(formData.animalId);
    } else {
      setShowCowDetails(false);
    }
  }, [formData.animalId]);

  useEffect(() => {
    if (formData.pregnancyStartDate) {
      const calculateProgress = () => {
        const startDate = new Date(formData.pregnancyStartDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const progressPercentage = Math.min((diffDays / PREGNANCY_DURATION) * 100, 100);
        setProgress(progressPercentage);
      };
      
      calculateProgress();
    }
  }, [formData.pregnancyStartDate]);

  const handleStallChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      animalId: "", // Reset animalId when stallNo changes
    }));
    fetchCowData(value);
  };

  const handleAnimalIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      await addPregnancy(formData);
      // Optionally, reset form data or show success message
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stallNo" className="block mb-1 text-sm">
            {translate("stallNo")} *:
          </label>
          <select
            style={{ height: "2.5rem" }}
            id="stallNo"
            name="stallNo"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.stallNo}
            onChange={handleStallChange}
            required
          >
            <option value="">-- {translate("select")} --</option>
            {stallList.map((stall) => (
              <option key={stall.id} value={stall.stallNumber}>
                {stall.stallNumber}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="animalId" className="block mb-1 text-sm">
            {translate("animalID")} *:
          </label>
          <select
            style={{ height: "2.5rem" }}
            id="animalId"
            name="animalId"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.animalId}
            onChange={handleAnimalIdChange}
            required
          >
            <option value="">-- {translate("select")} --</option>
            {cowList.map((cow) => (
              <option key={cow.id} value={cow.id}>
                {cow.id}
              </option>
            ))}
          </select>
        </div>
      </form>

      {showCowDetails && <CowDetails formData={formData} cowList={cowList} />}
      {showCowDetails && <PregnancyRecordsList />}

      <div ref={editFormRef}>
        <div className="col-span-3">
          <h2 className="text-xl font-bold mb-4">{translate("animalpregnancydetails")}:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="pregnancyType" className="block mb-1 text-sm">
                {translate("pregnancytype")}*:
              </label>
              <select
                style={{ height: "2.5rem" }}
                name="pregnancyType"
                value={formData.pregnancyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">-- {translate("select")} --</option>
                <option value="Automatic">{translate("Automatic")}</option>
                <option value="Manual">{translate("Manual")}</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="semenType" className="block mb-1 text-sm">
                {translate("semenType")}*:
              </label>
              <select
                style={{ height: "2.5rem" }}
                name="semenType"
                value={formData.semenType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">-- {translate("select")} --</option>
                <option value="Bull">{translate("Bull")}</option>
                <option value="Cow">{translate("Cow")}</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="semenPushDate" className="block mb-1 text-sm">
                {translate("semenPushDate")}*:
              </label>
              <input
                type="date"
                name="semenPushDate"
                value={formData.semenPushDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pregnancyStartDate" className="block mb-1 text-sm">
                {translate("pregnancyStartDate")}*:
              </label>
              <input
                type="date"
                name="pregnancyStartDate"
                value={formData.pregnancyStartDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="semenCost" className="block mb-1 text-sm">
                {translate("semenCost")}*:
              </label>
              <input
                type="text"
                name="semenCost"
                value={formData.semenCost}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="otherCost" className="block mb-1 text-sm">
                {translate("otherCost")}*:
              </label>
              <input
                type="text"
                name="otherCost"
                value={formData.otherCost}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="note" className="block mb-1 text-sm">
                {translate("note")}*:
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pregnancyStatus" className="block mb-1 text-sm">
                {translate("pregnancyStatus")}*:
              </label>
              <select
                style={{ height: "2.5rem" }}
                name="pregnancyStatus"
                value={formData.pregnancyStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">-- {translate("select")} --</option>
                <option value="Pending">{translate("Pending")}</option>
                <option value="Confirmed">{translate("Confirmed")}</option>
                <option value="Failed">{translate("Failed")}</option>
              </select>
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? translate("loading") : translate("submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      {formData.pregnancyStartDate && (
        <div className="progress-bar-container">
          <label>{translate("Pregnancy Progress")}</label>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
};

export default CowPregnancyForm;
