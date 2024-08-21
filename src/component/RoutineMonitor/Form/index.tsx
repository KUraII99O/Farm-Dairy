import React, { useState, useContext, useEffect, ChangeEvent, MouseEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PiMonitor } from "react-icons/pi";
import { IoInformationCircle } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa"; // Import FaRegEdit icon
import { useTranslation } from "../../Translator/Provider";
import { ManageRoutineContext } from "../Provider";
import FormTable from "../TableForm";

// Define the RoutineMonitorInfo type
interface RoutineMonitorInfo {
  ServiceName: string;
  Result: string;
  MonitoringTime: string;
  unit?: string; // Add if unit is used
}



const EditRoutineMonitorForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { routineRecords, addRoutineRecord, editRoutineRecord } =
    useContext(ManageRoutineContext);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>("");
  const { translate, language } = useTranslation();
  const isEditMode = !!id;

  const handleClick = () => {
    navigate(-1); // Use navigate for backward navigation
  };

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // Adjust the date format as needed
    setCurrentDate(formattedDate);
    setFormData((prevFormData) => ({ ...prevFormData, date: formattedDate }));
  }, []);

  const [formData, setFormData] = useState({
    stallNo: "",
    animalID: "",
    date: currentDate,
    note: "",
    reportedby: "",
    healthStatus: 50,
    informations: [
      { ServiceName: "", Result: "", MonitoringTime: "" },
      { ServiceName: "", Result: "", MonitoringTime: "" },
      { ServiceName: "", Result: "", MonitoringTime: "" },
    ],
    updatedWeight: "",
    updatedHeight: "",
    milkPerDay: "",
    monitoringDate: "",
    reports: "",
  });

  const [loading, setLoading] = useState(false);
  const [, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const selectedRoutineRecord = routineRecords.find(
        (routineRecord: { id: string; }) => routineRecord.id === id
      );
      if (selectedRoutineRecord) {
        setFormData({
          stallNo: selectedRoutineRecord.StallNo,
          animalID: "", // Initialize as needed
          date: selectedRoutineRecord.date,
          note: selectedRoutineRecord.note,
          reportedby: selectedRoutineRecord.reportedBy,
          healthStatus: selectedRoutineRecord.healthStatus,
          informations: selectedRoutineRecord.informations ||  [
            { ServiceName: "", Result: "", MonitoringTime: "" },
            { ServiceName: "", Result: "", MonitoringTime: "" },
            { ServiceName: "", Result: "", MonitoringTime: "" },
          ],
          updatedWeight: selectedRoutineRecord.updatedWeight,
          updatedHeight: selectedRoutineRecord.updatedHeight,
          milkPerDay: selectedRoutineRecord.milkPerDay,
          monitoringDate: selectedRoutineRecord.monitoringDate,
          reports: selectedRoutineRecord.reports,
        });
      }
    }
  }, [id, isEditMode, routineRecords]);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const { username } = userData;
      setFormData((prevState) => ({
        ...prevState,
        reportedby: username,
      }));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index === undefined) {
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
        { ServiceName: "", Result: "", MonitoringTime: "" },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await editRoutineRecord(id, formData);
      } else {
        await addRoutineRecord(formData);
      }
      setSuccessPopup(true);
      setTimeout(() => {
        setSuccessPopup(false);
        navigate("/routine-monitor");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRow = (indexToRemove: number) => {
    setFormData({
      ...formData,
      informations: formData.informations.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  function handleHealthStatusChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2
          className={`text-xl font-bold mb-4 flex items-center ${
            language === "ar" ? "space-x-2" : ""
          }`}
        >
          <PiMonitor className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span>{translate("cowmonitor")}</span>
        </h2>
        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle
            className={`mr-2 ${language === "ar" ? "ml-2" : ""}`}
          />
          <span>{translate("basicinformation")}:</span>
        </h2>
        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("stallNo")}
            </label>
            <input
              type="text"
              placeholder={translate("stallNo")}
              name="stallNo"
              value={formData.stallNo}
              onChange={(e) => handleChange(e, -1)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("animalID")}:
            </label>
            <input
              // Adjusted width as needed
              type="text"
              placeholder={translate("animalID")}
              name="animalID"
              value={formData.animalID}
              onChange={(e) => handleChange(e, -1)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <FaRegEdit className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span> {translate("resultandnote")} :</span>
        </h2>

        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700 ">
              {translate("updatedweight")}:
            </label>
            <input
              type="number"
              placeholder={translate("updatedweight")}
              name="updatedWeight"
              value={formData.updatedWeight}
              onChange={(e) => handleChange(e, -1)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("updatedheight")}:
            </label>
            <input
              // Adjusted width as needed
              type="number"
              placeholder={translate("updatedheight")}
              name="updatedHeight"
              value={formData.updatedHeight}
              onChange={(e) => handleChange(e, -1)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700 ">
              {translate("milkperday")}:
            </label>
            <input
              // Adjusted width as needed
              type="number"
              placeholder={translate("milkperday")}
              name="milkPerDay"
              value={formData.milkPerDay}
              onChange={(e) => handleChange(e, -1)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("monitoringdate")}:
            </label>
            <input
              // Adjusted width as needed
              type="date"
              placeholder={translate("monitoringdate")}
              name="monitoringDate"
              value={formData.monitoringDate}
              onChange={(e) => handleChange(e, -1)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            {translate("reports")}:
          </label>
          <textarea
            style={{ height: "100px" }}
            placeholder={translate("reports")}
            name="note"
            value={formData.note}
            onChange={(e) => handleChange(e, -1)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <FaRegEdit className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span> {translate("monitorinformations")} :</span>
        </h2>

        <div className="flex flex-col space-y-4 ">
          <label className="text-xl font-medium text-secondary text-center ">
            {translate("healthstatus")}:
          </label>
          <div
            className={`relative w-full ${
              language ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleHealthStatusChange}
              className="appearance-none h-3 w-full bg-green-200 rounded-full outline-none focus:outline-none"
              style={{
                direction: language ? "rtl" : "ltr",
                background: `linear-gradient(to ${
                  language ? "left" : "right"
                }, #32CD32 ${formData.healthStatus}%, #D3D3D3 0%)`,
              }}
            />
            <span
              className={`absolute top-0 ${
                language ? "left-0" : "right-0"
              } -mt-6 text-secondary font-bold`}
            >
              {formData.healthStatus}%
            </span>
          </div>
        </div>

        <FormTable
            informations={formData.informations}
            handleChange={handleChange}
            handleRemoveRow={handleRemoveRow}
            handleAddRow={handleAddRow}
          />

        <button
          style={{ width: "200px" }}
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary self-end "
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : isEditMode
            ? translate("save")
            : translate("addroutinemonitor")}
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

export default EditRoutineMonitorForm;
