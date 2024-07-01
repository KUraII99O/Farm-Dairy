import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserPlus, FaImage } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";
import ImageUpload from "../../ImageUpload";
import { ManageUserContext } from "../Provider";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { users, addUser, editUser } = useContext(ManageUserContext);
  const { translate, language } = useTranslation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store selected image path

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    joiningDate: "",
    permanentAddress: "",
    nid: "",
    image: "", // This will hold the image data
    userType: "",
    presentAddress: "",
    basicSalary: "",
    grossSalary: "",
    resignDate: "",
    status: "true",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id && users.length > 0) {
      const selectedUser = users.find((item) => item.id === id); // Ensure id is of the same type as item.id
      if (selectedUser) {
        setFormData(selectedUser);
      }
    }
  }, [id, isEditMode, users]);

  const handleImageUpload = (imageData: string) => {
    // Update the formData with the image data received from the ImageUpload component
    setFormData({
      ...formData,
      image: imageData,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      // Convert the selected value to boolean
      const statusValue = value === "true"; // Convert string value to boolean
      setFormData({
        ...formData,
        [name]: statusValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await editUser(id, formData); // Parse `id` to a number
      } else {
        await addUser(formData);
      }
      navigate("/User?result=success");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 mb-4">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaUserPlus className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
              <span>{translate("basicInformation")}</span>
            </h2>
            <h2 className="text-sm mb-4">{translate("fullName")}* :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("emailAddress")} * :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("phoneNumber")} * :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("nid")} :</h2>
            <input
              style={{ height: "2.5rem" }}
              name="nid"
              value={formData.nid}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("designation")} * :</h2>
            <select
              style={{ height: "2.5rem" }}
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            >
              <option value="">{translate("select")}</option>
              <option value="Manager">Accountant</option>
              <option value="Supervisor">Executive</option>
            </select>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("userType")}:</h2>
            <select
              style={{ height: "2.5rem" }}
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            >
              <option value="">{translate("select")}</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="Marketing Executive">Marketing Executive</option>
            </select>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("presentAddress")}:</h2>
            <input
              style={{ height: "2.5rem" }}
              type="text"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("permanentAddress")} :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("basicSalary")} * :</h2>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-700">
                $
              </span>
              <input
                style={{ height: "2.5rem" }}
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                className="pl-8 w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("grossSalary")} * :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="number"
              name="grossSalary"
              value={formData.grossSalary}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("joiningDate")}* :</h2>
            <input
              type="date"
              style={{ height: "2.5rem" }}
              name="joiningDate"
              value={formData.joiningDate || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("resignDate")} :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="date"
              name="resignDate"
              value={formData.resignDate || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("status")} :</h2>
            <select
              style={{ height: "2.5rem" }}
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            >
              <option value="true">{translate("active")}</option>
              <option value="false">{translate("inactive")}</option>
            </select>
          </div>

          <div className="col-span-3 mb-4">
            <label className="text-xl font-bold mt-8 flex items-center">
              <FaImage className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
              {translate("profileImages")}:
            </label>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          disabled={loading}
        >
          {isEditMode ? translate("update") : translate("add")}
          {translate("user")}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
