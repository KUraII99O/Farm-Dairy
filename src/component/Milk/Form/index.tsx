import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MilkContext } from "../Provider";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";

const EditMilk = () => {
  const { id } = useParams<{ id: string }>();
  const { milks, addMilkRecord, editMilkRecord } = useContext(MilkContext);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const isEditMode = !!id;
  const { translate, language } = useTranslation();

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const { username, email } = userData;
          setUser({ name: username, email: email });
        } else {
          console.error("No user data found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user data from local storage:", error);
      }
    };

    fetchUserData();
  }, []);

  const [formData, setFormData] = useState({
    accountNo: "",
    stallNo: "",
    animalID: "",
    liter: "",
    collectedFrom: "", // New field
    address: "", // New field
    fate: "", // New field
    price: "", // New field
    total: "",
    AddedBy: "",
    date: currentDate,
  });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  useEffect(() => {
    if (isEditMode) {
      const selectedMilk = milks.find((milk) => milk.id === parseInt(id));
      if (selectedMilk) {
        setFormData(selectedMilk);
      }
    }
  }, [id, isEditMode, milks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEditMode) {
      await editMilkRecord(parseInt(id), formData);
    } else {
      await addMilkRecord(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/milk");
    }, 1000); // Close the popup and navigate after 2 seconds
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2
          className={`text-xl font-bold text-gray-700 mb-4 flex items-center ${
            language === "ar" ? "space-x-2" : ""
          }`}
        >
          <FaUserPlus className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span>{translate("milkInformation")}</span>
        </h2>
        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("accountNo")}
            </label>
            <input
              type="text"
              placeholder={translate("accountNo")}
              name="accountNo"
              value={formData.accountNo}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("stallNo")}
            </label>
            <input
              type="text"
              placeholder={translate("stallNo")}
              name="stallNo"
              value={formData.stallNo}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("animalID")}
            </label>
            <input
              type="text"
              placeholder={translate("animalID")}
              name="animalID"
              value={formData.animalID}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {" "}
              {translate("liter")}
            </label>
            <input
              type="text"
              placeholder={translate("liter")}
              name="liter"
              value={formData.liter}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              {translate("address")}:
            </label>
            <textarea
              style={{ height: "150px" }}
              placeholder={translate("address")}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("fat")}:
            </label>
            <input
              type="text"
              placeholder={translate("fat")}
              name="fate"
              value={formData.fate}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("price")}/{translate("liter")}:
            </label>
            <input
              type="text"
              placeholder={`${translate("price")}/${translate("liter")}`}
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("total")}:
            </label>
            <input
              type="text"
              placeholder={translate("total")}
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("collectedFrom")}
            </label>
            <input
              type="text"
              placeholder={translate("collectedFrom")}
              name="collectedFrom"
              value={formData.collectedFrom}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary  w-full "
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : isEditMode
            ? translate("save")
            : translate("addmilk")}
        </button>
      </form>
    </div>
  );
};

export default EditMilk;
