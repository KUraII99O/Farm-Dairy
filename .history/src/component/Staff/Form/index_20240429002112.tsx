import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageStaffContext } from "../Provider";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";
import ImageUpload from "../../ImageUpload";

const EditStaff = () => {
  const { id } = useParams<{ id: string }>();
  const { staff, addStaff, editStaff } = useContext(ManageStaffContext);
  const { translate, language } = useTranslation();
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState("");

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    joiningDate: "",
    permanentAddress: "",
    nid: "",
    image: "", // Updated to hold file object for photo
    userType: "",
    presentAddress: "",
    basicSalary: "",
    grossSalary: "",
    resignDate: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (isEditMode && id && staff.length > 0) {
      const selectedStaff = staff.find((item) => item.id === id); // Ensure id is of the same type as item.id
      if (selectedStaff) {
        setFormData(selectedStaff);
      }
    }
  }, [id, isEditMode, staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editStaff(parseInt(id), formData);
    } else {
      await addStaff(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/staff");
    }, 0);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <h2
              className={`text-xl font-bold text-gray-700 mb-4 flex items-center ${
                language === "ar" ? "space-x-2" : ""
              }`}
            >
              <FaUserPlus
                className={`mr-2 ${language === "ar" ? "ml-2" : ""}`}
              />
              <span>{translate("profileInformation")}</span>
            </h2>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                {translate("fullName")}:
              </label>
              <input
                style={{ width: "800px" }}
                type="text"
                placeholder={translate("name")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="emailAddress"
                className="text-sm font-medium text-gray-700"
              >
                {translate("emailAddress")}:
              </label>
              <input
                style={{ width: "800px" }}
                type="email"
                id="emailAddress"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700"
              >
                {translate("phoneNumber")}:
              </label>
              <input
                style={{ width: "800px" }}
                type="tel"
                id="phoneNumber"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="nid"
                className="text-sm font-medium text-gray-700"
              >
                {translate("nid")}:
              </label>
              <input
                style={{ width: "800px" }}
                type="text"
                id="nid"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="designation"
                className="text-sm font-medium text-gray-700"
              >
                {translate("designation")}:
              </label>
              <select
                style={{ width: "800px" }}
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">{translate("select")}</option>
                <option value="Manager">Accountant</option>
                <option value="Supervisor">Executive</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="userType"
                className="text-sm font-medium text-gray-700"
              >
                {translate("userType")}:
              </label>
              <select
                style={{ width: "800px" }}
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">{translate("select")}</option>
                <option value="Admin">Accountant</option>
                <option value="Employee">Admin</option>
                <option value="Employee">Marketing Executive</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="presentAddress"
                className="text-sm font-medium text-gray-700"
              >
                {translate("presentAddress")}:
              </label>
              <textarea
                style={{ width: "800px" }}
                id="presentAddress"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="permanentAddress"
                className="text-sm font-medium text-gray-700"
              >
                {translate("permanentAddress")}:
              </label>
              <textarea
                style={{ width: "800px" }}
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="basicSalary"
                className="text-sm font-medium text-gray-700"
              >
                {translate("basicSalary")}:
              </label>
              <input
                type="number"
                id="basicSalary"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ width: "800px" }}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="grossSalary"
                className="text-sm font-medium text-gray-700"
              >
                {translate("grossSalary")}:
              </label>
              <input
                type="number"
                id="grossSalary"
                name="grossSalary"
                value={formData.grossSalary}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ width: "800px" }}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="joiningDate"
                className="text-sm font-medium text-gray-700"
              >
                {translate("joiningDate")}:
              </label>
              <input
                style={{ width: "800px" }}
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={formData.joiningDate || ""}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="resignDate"
                className="text-sm font-medium text-gray-700"
              >
                {translate("resignDate")}:
              </label>
              <input
                style={{ width: "800px" }}
                type="date"
                id="resignDate"
                name="resignDate"
                value={formData.resignDate || ""}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("status")}:
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="true">{translate("acitive")}</option>
                <option value="false">{translate("inactive")}</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
              disabled={loading}
            >
              {isEditMode ? translate("update") : translate("add")}
              {translate("staff")}
            </button>
          </form>
        </div>

        <ImageUpload setImagePath={setImagePath} />
      </div>
    </div>
  );
};
export default EditStaff;
