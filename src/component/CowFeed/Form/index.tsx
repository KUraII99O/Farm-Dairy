import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PiForkKnifeBold } from "react-icons/pi";
import { IoInformationCircle } from "react-icons/io5";
import { useTranslation } from "../../Translator/Provider";
import { ManageCowFeedContext } from "../Provider";
import FormTable from "../FormTable";

const EditCowFeedForm = () => {
  const { id } = useParams<{ id: string }>();
  const { cowFeedRecords, addCowFeedRecord, editCowFeedRecord } = useContext(ManageCowFeedContext);
  const navigate = useNavigate();
  const { translate, language } = useTranslation();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    stallNo: "",
    cowNumber: "",
    date: "",
    note: "",
    informations: [
      { foodItem: "", quantity: "", unit: "", feedingTime: "" },
      { foodItem: "", quantity: "", unit: "", feedingTime: "" },
      { foodItem: "", quantity: "", unit: "", feedingTime: "" },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [, setSuccessPopup] = useState(false);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // Adjust the date format as needed
    setFormData((prevFormData) => ({ ...prevFormData, date: formattedDate }));
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const selectedCowFeed = cowFeedRecords.find((cowFeed: { id: string; }) => cowFeed.id === id);
      if (selectedCowFeed) {
        setFormData({
          stallNo: selectedCowFeed.stallNo,
          cowNumber: selectedCowFeed.cowNumber,
          date: selectedCowFeed.date, // Ensure this is the correct field name
          note: selectedCowFeed.note,
          informations: selectedCowFeed.informations || [
            { foodItem: "", quantity: "", unit: "", feedingTime: "" },
            { foodItem: "", quantity: "", unit: "", feedingTime: "" },
            { foodItem: "", quantity: "", unit: "", feedingTime: "" },
          ], // Ensure informations is an array
        });
      }
    }
  }, [id, isEditMode, cowFeedRecords]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    if (index === -1) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      const updatedInformations = [...formData.informations];
      updatedInformations[index] = {
        ...updatedInformations[index],
        [name]: value,
      };
      setFormData({
        ...formData,
        informations: updatedInformations,
      });
    }
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      informations: [
        ...formData.informations,
        { foodItem: "", quantity: "", unit: "", feedingTime: "" },
      ],
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editCowFeedRecord(id, formData);
    } else {
      await addCowFeedRecord(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/Cow-Feed");
    },0);
  };

  const handleRemoveRow = (indexToRemove: number) => {
    setFormData({
      ...formData,
      informations: formData.informations.filter((_, index) => index !== indexToRemove),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold  mb-4 flex items-center">
          <PiForkKnifeBold className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span>{translate("cowfeed")} </span>
        </h2>
        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span>{translate("basicinformation")} :</span>
        </h2>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">{translate("stallNo")}:</label>
          <input
            type="text"
            placeholder={translate("stallNo")}
            name="stallNo"
            value={formData.stallNo}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">{translate("cownumber")}:</label>
          <input
            type="text"
            placeholder={translate("cownumber")}
            name="cowNumber"
            value={formData.cowNumber}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">{translate("date")}:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">{translate("note")}:</label>
          <input
            type="text"
            placeholder={translate("note")}
            name="note"
            value={formData.note}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4 mb-4">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <PiForkKnifeBold className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
            <span>{translate("feedingdetails")}</span>
          </h2>
          <FormTable
            informations={formData.informations}
            handleChange={handleChange}
            handleRemoveRow={handleRemoveRow}
            handleAddRow={handleAddRow}
          />
        </div>
        <div className="flex justify-end ">
          <button
            type="submit"
            className={`px-6 py-2 rounded text-white ${
              loading ? "bg-gray-500 mt-6 cursor-not-allowed" : "bg-secondary hover:bg-primary mt-6"
            }`}
            disabled={loading}
          >
            {loading ? `${translate("saving")}...` : isEditMode ? translate("update") : translate("save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCowFeedForm;