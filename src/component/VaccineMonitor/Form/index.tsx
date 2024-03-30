import React, { useState, useContext, useEffect,useHistory } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VaccineMonitorContext } from "../Provider";
import { IoInformationCircle } from "react-icons/io5";
import { TiMinus } from "react-icons/ti"; // Import TiMinus icon
import { FaRegEdit } from "react-icons/fa"; // Import FaRegEdit icon
import { useTranslation } from "../../Translator/Provider";
import { PiMonitor } from "react-icons/pi";

const EditVaccineMonitorForm = () => {
  const { id } = useParams<{ id: string }>();
  const { vaccineMonitors, addVaccineMonitor, editVaccineMonitor } = useContext(
    VaccineMonitorContext
  );
  const [currentDate, setCurrentDate] = useState<string>("");
  const { translate, language } = useTranslation();

  const handleClick = () => {
    history.back();
  };
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setCurrentDate(formattedDate);
  }, []);
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    stallNo: "",
    CowNumber: "",
    date: currentDate,
    note: "",
    informations: Array.from({ length: 3 }, () => ({
      VaccineName: "",
      Dose: "",
      Repeat: "",
      Remarks: "",
      GivenTime: "",
    })),
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const selectedVaccineMonitor = vaccineMonitors.find(
        (vaccineMonitor) => vaccineMonitor.id === parseInt(id)
      );
      if (selectedVaccineMonitor) {
        setFormData(selectedVaccineMonitor);
      }
    }
  }, [id, isEditMode, vaccineMonitors]);

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
        { VaccineName: "", Dose: "", Repeat: "", Remarks: "", GivenTime: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editVaccineMonitor(parseInt(id), formData);
    } else {
      await addVaccineMonitor(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/vaccine-monitor");
    }, 2000);
  };

  const handleRemoveRow = (indexToRemove) => {
    setFormData({
      ...formData,
      informations: formData.informations.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <h2
          className={`text-xl font-bold mb-4 flex items-center ${
            language === "ar" ? "space-x-2" : ""
          }`}
        >
          <PiMonitor className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span>{translate("vaccinemonitor")}</span>
        </h2>
        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span>{translate("basicinformation")}:</span>
        </h2>
        <div className="flex flex-wrap -mx-2">

        <div className="flex flex-col space-y-1 px-2 w-1/2">
          <label className="text-sm font-medium text-gray-700">{translate("stallNo")}:</label>
          <input
           
            type="text"
            placeholder={translate("stallNo")}
            name="stallNo"
            value={formData.stallNo}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1 px-2 w-1/2">
          <label className="text-sm font-medium text-gray-700">
          {translate("cownumber")}:
          </label>
          <input
           
            type="text"
            placeholder={translate("cownumber")}
            name="CowNumber"
            value={formData.CowNumber}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        </div>

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <FaRegEdit className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span> {translate("vaccinedateandnote")} :</span>
        </h2>

        <div className="flex flex-wrap -mx-2">

        <div className="flex flex-col space-y-1 px-2 w-1/2">
          <label className="text-sm font-medium text-gray-700"> {translate("date")}:</label>
          <input
           
            type="date"
            placeholder= {translate("date")}
            name="date"
            value={formData.date}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1 px-2 w-1/2">
          <label className="text-sm font-medium text-gray-700">{translate("note")}:</label>
          <input
            placeholder={translate("note")}
            name="note"
            value={formData.note}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        </div>

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <FaRegEdit className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span> {translate("vaccineslist")} :</span>
        </h2>
        

        <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 px-3 py-2">
                {translate("vaccinename")}
                </th>
                <th className="border border-gray-400 px-3 py-2">{translate("dose")}</th>
                <th className="border border-gray-400 px-3 py-2">{translate("repeat")}</th>
                <th className="border border-gray-400 px-3 py-2">{translate("remark")}</th>
                <th className="border border-gray-400 px-3 py-2">{translate("giventime")}</th>
              </tr>
            </thead>
            <tbody>
              {formData.informations.map((info, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder={translate("vaccinename")}
                      name="VaccineName"
                      value={info.VaccineName}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                      required
                      
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder={translate("dose")}
                      name="Dose"
                      value={info.Dose}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                      required
                      
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder={translate("repeat")}
                      name="Repeat"
                      value={info.Repeat}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                      required
                      
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder={translate("remark")}
                      name="Remarks"
                      value={info.Remarks}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                      required
                      
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      type="text"
                      placeholder={translate("giventime")}
                      name="GivenTime"
                      value={info.GivenTime}
                      onChange={(e) => handleChange(e, index)}
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                      required
                      
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="text-red-600 hover:text-red-800 ml-2 self-end"
                    >
                      <TiMinus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
          <button
          style={{ width: "200px" }}
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary self-end"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : isEditMode
            ? translate("save")
            : translate("addvaccinemonotor")}
        </button>
        <button
          style={{ width: "200px" }}
          type="button"
          onClick={handleAddRow}
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary self-end"
        >
          {translate("addrow")}
        </button>

        
      </form>
      <button
        onClick={handleClick}
        className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
      >
        {translate("goback")}
      </button>

    </div>
  );
};

export default EditVaccineMonitorForm;
