import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageCowContext } from "../Provider";
import { IoInformationCircle } from "react-icons/io5";
import { FaBriefcaseMedical, FaImage } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";

const Checkbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <label className="inline-flex items-center mx-2">
      <input
        type="checkbox"
        className="form-checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

const EditCowForm = () => {
  const { id } = useParams<{ id: string }>();
  const { addCow, editCow, getCowById } = useContext(ManageCowContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store selected image path
  const navigate = useNavigate();
  const { translate, language } = useTranslation();
  const [user, setUser] = useState<{ name: string }>({
    name: "",
  });

  const [stallList, setStallList] = useState([]); // State to store staff data

  const isEditMode = !!id;
  const isArabic = language === "ar"; // Assuming 'ar' represents Arabic language

  const [formData, setFormData] = useState({
    image: "",
    animalType: "",
    buyDate: "",
    buyingPrice: "",
    pregnantStatus: "",
    milkPerDay: "",
    animalStatus: false,
    gender: "",
    informations: {
      stallNumber: "",
      dateOfBirth: "",
      animalAgeDays: "",
      weight: "",
      height: "",
      color: "",
      numOfPregnant: "",
      nextPregnancyApproxTime: "",
      buyFrom: "",
      prevVaccineDone: "",
      note: "",
      CreatedBy: "",
    },
    vaccinations: {
      BDV: false,
      BVD: false,
      PI3: false,
      BRSV: false,
      VitaminA: false,
      Anthrax: false,
    },
  });

  // Define setSelectedImages state setter function

  async function fetchBlobData(blobURL) {
    const response = await fetch(blobURL);
    const blob = await response.blob();
    return blob;
  }
  async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const blobURL = URL.createObjectURL(file); // Create blob URL for preview
  
    // Create a new Image object
    const img = new Image();
  
    // Once the image has loaded, check the dimensions
    img.onload = async function (this: HTMLImageElement) {
      if (this.width > 1024 || this.height > 1024) {
        alert("Image too large, choose another one");
        URL.revokeObjectURL(blobURL); // Revoke blob URL to prevent memory leaks
      } else {
        setSelectedImage(blobURL); // Store blob URL for preview in state
  
        try {
          const blob = await fetchBlobData(blobURL);
          const base64Data = await blobToBase64(blob); // Convert blob to base64
  
          setFormData({
            ...formData,
            image: base64Data, // Store base64-encoded string in form data
          });
        } catch (error) {
          console.error("Error handling file change:", error);
          // Handle error if fetching blob data or converting to base64 fails
        } finally {
          URL.revokeObjectURL(blobURL); // Revoke blob URL to prevent memory leaks
        }
      }
    };
  
    // Set the source of the image to the blob URL
    img.src = blobURL;
  };

  const handleClick = () => {
    history.back();
  };

  useEffect(() => {
    if (isEditMode) {
      const selectedCow = getCowById(parseInt(id));
      if (selectedCow) {
        // Merge selectedCow with formData, ensuring all fields are filled
        const mergedFormData = {
          ...formData,
          ...selectedCow,
          informations: {
            ...formData.informations,
            ...selectedCow.informations,
          },
        };
        setFormData(mergedFormData);
      }
    }
  }, [id, isEditMode, getCowById]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const { username } = userData;
          setUser({ name: username });
          console.log("Username fetched successfully:", username);
  
          // Update the formData with the logged-in user's username
          setFormData(prevFormData => ({
            ...prevFormData,
            informations: {
              ...prevFormData.informations,
              CreatedBy: username
            }
          }));
        } else {
          console.error("No user data found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user data from local storage:", error);
      }
    };
  
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchStallData = async () => {
      try {
        const response = await fetch("http://localhost:3000/stalls");
        if (!response.ok) {
          throw new Error("Failed to fetch stall data");
        }
        const data = await response.json();
        setStallList(data);
      } catch (error) {
        console.error("Error fetching stall data:", error);
      }
    };

    fetchStallData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.informations) {
      setFormData({
        ...formData,
        informations: {
          ...formData.informations,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (name: string, isChecked: boolean) => {
    setFormData({
      ...formData,
      vaccinations: {
        ...formData.vaccinations,
        [name]: isChecked,
      },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include selectedImage in formData if it exists
    const formDataToSend = { ...formData };
    if (selectedImage) {
      //formDataToSend.image = selectedImage;
    }

    try {
      if (isEditMode) {
        await editCow(parseInt(id), formDataToSend);
      } else {
        await addCow(formDataToSend);
      }
      navigate("/manage-cow");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4  ">
          <div className="col-span-3 mb-4 ">
            <h2 className="text-xl font-bold  mb-4 flex items-center ">
              <IoInformationCircle
                className={`mr-2 ${language === "ar" ? "ml-2" : ""}`}
              />
              <span> {translate("Aaimalbasicinformation")}</span>
            </h2>
            <h2 className="text-sm mb-4   ">{translate("dateofbirth")}* :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="date"
              name="dateOfBirth"
              value={formData.informations.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("weight")} * :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="number"
              name="weight"
              value={formData.informations.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
              required
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("height")} * :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="number"
              name="height"
              value={formData.informations.height}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
              required
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("gender")} :</h2>
            <select
              style={{ height: "2.5rem" }}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            >
              <option value="">{translate("selectgender")}</option>
              <option value="Male">{translate("male")}</option>
              <option value="Female">{translate("female")}</option>
            </select>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("animalType")} * :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="text"
              name="animalType"
              value={formData.animalType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
              required
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("pregnantStatus")}:</h2>
            <select
              style={{ height: "2.5rem" }}
              name="pregnantStatus"
              value={formData.pregnantStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            >
              <option value="">{translate("selectstatus")}</option>
              <option value="Pregnant">{translate("pregnant")}</option>
              <option value="Not Pregnant">{translate("notpregnant")} </option>
            </select>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("milkPerDay")}:</h2>
            <input
              style={{ height: "2.5rem" }}
              type="number"
              name="milkPerDay"
              value={formData.milkPerDay}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("buyfrom")} :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="text"
              name="buyFrom"
              value={formData.informations.buyFrom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("buyingPrice")} * :</h2>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-700">
                $
              </span>
              <input
                style={{ height: "2.5rem" }}
                type="text"
                name="buyingPrice"
                value={formData.buyingPrice} // Use formData.buyingPrice directly
                onChange={handleChange}
                className="pl-8 w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm  mb-4">{translate("buyDate")} * :</h2>
            <input
              style={{ height: "2.5rem" }}
              type="date"
              name="buyDate"
              value={formData.buyDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
              required
            />
          </div>

          <div className="col-span-1">
            <h2 className="text-sm  mb-4">{translate("stallNo")}* :</h2>
            <select
              style={{ height: "2.5rem" }}
              name="stallNumber"
              value={formData.informations.stallNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 -md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
              required
            >
              <option value="">{translate("selectStallNumber")}</option>
              {stallList.map((stall) => (
                <option key={stall.id} value={stall.stallNumber}>
                  {stall.stallNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("prevVaccineDone")} :</h2>
            <input
              style={{ height: "2.5rem" }}
              name="prevVaccineDone"
              value={formData.informations.prevVaccineDone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            ></input>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("animalage")} :</h2>
            <input
              style={{ height: "2.5rem" }}
              name="animalAgeDays"
              value={formData.informations.animalAgeDays}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            ></input>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("color")} :</h2>
            <input
              style={{ height: "2.5rem" }}
              name="color"
              value={formData.informations.color}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            ></input>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm mb-4">
              {translate("nextpregnancyapproxtime")} :
            </h2>
            <input
              style={{ height: "2.5rem" }}
              type="date"
              name="nextPregnancyApproxTime"
              value={formData.informations.nextPregnancyApproxTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            ></input>
          </div>
          <div className="col-span-1">
            <h2 className="text-sm mb-4">{translate("numofpregnant")} :</h2>
            <input
              style={{ height: "2.5rem" }}
              name="numOfPregnant"
              value={formData.informations.numOfPregnant}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            ></input>
          </div>

          <div className="col-span-3">
            <h2 className="text-sm mb-4">{translate("note")} :</h2>
            <textarea
              name="note"
              value={formData.informations.note}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
          </div>
          <div className="col-span-3">
            <h2 className="text-xl font-bold mt-8 flex items-center">
              <FaBriefcaseMedical
                className={`mr-2 ${language === "ar" ? "ml-2" : ""}`}
              />
              <span>{translate("selectpreviousevaccinedone")}</span>
            </h2>
            <div className="flex flex-wrap mt-4 border p-6">
              <div
                className={`flex flex-col mr-8 ${
                  language === "ar" ? "ml-64" : ""
                }`}
              >
                <Checkbox
                  label={`BVD - (60 ${translate("days")})`}
                  checked={formData.vaccinations.BDV}
                  onChange={(isChecked) =>
                    handleCheckboxChange("BDV", isChecked)
                  }
                />
                <Checkbox
                  label={`BVD - (90 ${translate("days")})`}
                  checked={formData.vaccinations.BVD}
                  onChange={(isChecked) =>
                    handleCheckboxChange("BVD", isChecked)
                  }
                />
              </div>
              <div className="flex flex-col ml-64	">
                <Checkbox
                  label={`PI3 - (120 ${translate("days")})`}
                  checked={formData.vaccinations.PI3}
                  onChange={(isChecked) =>
                    handleCheckboxChange("PI3", isChecked)
                  }
                />
                <Checkbox
                  label={`BRSV - (365 ${translate("days")})`}
                  checked={formData.vaccinations.BRSV}
                  onChange={(isChecked) =>
                    handleCheckboxChange("BRSV", isChecked)
                  }
                />
              </div>
              <div className="flex flex-col ml-64		">
                <Checkbox
                  label={`VitaminA - (60 ${translate("days")})`}
                  checked={formData.vaccinations.VitaminA}
                  onChange={(isChecked) =>
                    handleCheckboxChange("VitaminA", isChecked)
                  }
                />
                <Checkbox
                  label={`Anthrax - (120 ${translate("days")})`}
                  checked={formData.vaccinations.Anthrax}
                  onChange={(isChecked) =>
                    handleCheckboxChange("Anthrax", isChecked)
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <label
              className={`text-xl font-bold mt-8 flex items-center ${
                language === "ar" ? "mr-2" : "mb-0"
              }`}
            >
              <FaImage className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
              {translate("Animalmages")}:
            </label>
            <div className="relative">
              <label
                htmlFor="uploadInput"
                className={`cursor-pointer border my-6 border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white hover:bg-gray-100 text-center ${
                  isArabic ? "" : ""
                }`}
                style={{
                  width: "300px", // Adjust width as needed
                  height: "300px", // Adjust height as needed
                  display: "inline-block",
                  lineHeight: "200px", // Adjust line height to center content vertically
                }}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  translate("selectImage")
                )}
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="hidden"
                id="uploadInput"
                accept="image/jpeg"
                capture="environment"
              />
            </div>
          </div>
        </div>
      </form>

      <button
        onClick={handleClick}
        className="bg-secondary text-white px-4 py-2  hover:bg-primary mr-8"
      >
        {translate("goback")}
      </button>
      <button
        onClick={handleSubmit}
        style={{ width: "150px" }}
        type="submit"
        className="bg-secondary text-white px-4 py-2  hover:bg-primary ml-6"
      >
        {isEditMode ? translate("Update Cow") : translate("Add Cow")}
      </button>
    </div>
  );
};

export default EditCowForm;