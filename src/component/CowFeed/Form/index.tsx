import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PiForkKnifeBold } from "react-icons/pi";
import { IoInformationCircle } from "react-icons/io5";
import { TiMinus } from "react-icons/ti"; // Import TiMinus icon
import { useTranslation } from "../../Translator/Provider";
import { ManageCowFeedContext } from "../Provider";

const EditCowFeedForm = () => {
  const { id } = useParams<{ id: string }>();
  const { cowFeedRecords, addCowFeedRecord, editCowFeedRecord } = useContext(ManageCowFeedContext);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>("");
  const { translate, language } = useTranslation();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    stallNo: "",
    cowNumber: "",
    date: currentDate,
    note: "",
    informations: Array.from({ length: 3 }, () => ({
      foodItem: "",
      quantity: "",
      feedingTime: "",
      unit: "",
    })),
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // Adjust the date format as needed
    setCurrentDate(formattedDate);
    setFormData((prevFormData) => ({ ...prevFormData, date: formattedDate }));
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const selectedCowFeed = cowFeedRecords.find((cowFeed) => cowFeed.id === id);
      if (selectedCowFeed) {
        setFormData({
          stallNo: selectedCowFeed.stallNo  ,
          cowNumber: selectedCowFeed.cowNumber,
          date: selectedCowFeed.formattedDate,
          note: selectedCowFeed.note,
          informations: selectedCowFeed.informations,
        });
      }
    }
  }, [id, isEditMode, cowFeedRecords]);

  const handleChange = (e, index) => {
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

  const handleSubmit = async (e) => {
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
    }, 1000);
  };

  const handleRemoveRow = (indexToRemove) => {
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
          <label className="text-sm font-medium text-gray-700">{translate("cownumber")}</label>
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
            placeholder={translate("date")}
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

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span>{translate("feedinformation")} :</span>
        </h2>

        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-3 py-2">{translate("fooditem")}</th>
              <th className="border border-gray-400 px-3 py-2">{translate("itemquantity")}</th>
              <th className="border border-gray-400 px-3 py-2">{translate("unit")}</th>
              <th className="border border-gray-400 px-3 py-2">{translate("feedingtime")}</th>
            </tr>
          </thead>
          <tbody>
            {formData.informations.map((info, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-3 py-2">
                  <input
                    type="string"
                    placeholder={translate("fooditem")}
                    name="foodItem"
                    value={info.foodItem}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  <input
                    type="string"
                    placeholder={translate("itemquantity")}
                    name="quantity"
                    value={info.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-400 px-3 py-2">
                  <select
                    name="unit"
                    value={info.unit}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="kg">{translate("kg")}</option>
                    <option value="gram">{translate("gram")}</option>
                    <option value="liters">{translate("liters")}</option>
                  </select>
                </td>
                <td className="border border-gray-400 px-1 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-600 hover:text-red-800 self-end"
                  >
                    <TiMinus />
                  </button>
                  <input
                    type="string"
                    placeholder={translate("feedingtime")}
                    name="feedingTime"
                    value={info.feedingTime}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={handleAddRow}
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
        >
          {translate("addrow")}
        </button>

        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary w-full"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : isEditMode
            ? translate("save")
            : translate("addcowfeed")}
        </button>
      </form>
    </div>
  );
};

export default EditCowFeedForm;
