import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageCowContext } from "../Provider";
import { IoInformationCircle } from "react-icons/io5";
import ProfileImageUploader from "../../FileUpload";
import { FaBriefcaseMedical, FaImage } from "react-icons/fa";

// Modified Checkbox component to handle checked state and onChange event
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
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    image: "",
    animalType: "",
    buyDate: "",
    buyingPrice: "",
    pregnantStatus: "",
    milkPerDay: "",
    animalStatus: "",
    gender: "",
    informations: {
      stallNo: "",
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
      createdBy: "",
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
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (imageUrl) => {
    setSelectedImage(imageUrl);
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
    if (isEditMode) {
      await editCow(parseInt(id), formData);
    } else {
      await addCow(formData);
    }
    navigate("/manage-cow");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 mb-4">
          <h2 className="text-xl font-bold  mb-4 flex items-center">
            <IoInformationCircle className="mr-2" />
            <span>Animal Basic Information </span>
          </h2>
          <h2 className="text-xl font-bold mb-4">Date of Birth * :</h2>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.informations.dateOfBirth}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Weight (KG) * :</h2>
          <input
            type="number"
            name="weight"
            value={formData.informations.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            required
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Height (INCH) * :</h2>
          <input
            type="number"
            name="height"
            value={formData.informations.height}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            required
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Gender :</h2>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Animal Type * :</h2>
          <input
            type="text"
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            required
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Pregnant Status :</h2>
          <select
            name="pregnantStatus"
            value={formData.pregnantStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
          >
            <option value="">Select Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Milk Per Day (LTR) :</h2>
          <input
            type="number"
            name="milkPerDay"
            value={formData.milkPerDay}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Buy From :</h2>
          <input
            type="text"
            name="buyFrom"
            value={formData.informations.buyFrom}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Buying Price * :</h2>
          <input
            type="text" // Change type to text to allow dollar sign
            name="buyingPrice"
            value={"$ " + formData.buyingPrice} // Concatenate dollar sign with formData.buyingPrice
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            required
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Buy Date * :</h2>
          <input
            type="date"
            name="buyDate"
            value={formData.buyDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            required
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Stall No * :</h2>
          <input
            type="text"
            name="stallNo"
            value={formData.informations.stallNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            required
          />
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Previous Vaccine Done :</h2>
          <input
            name="prevVaccineDone"
            value={formData.informations.prevVaccineDone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
          ></input>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">animalAge(365) :</h2>
          <input
            name="animalAgeDays"
            value={formData.informations.animalAgeDays}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
          ></input>
        </div>

        <div className="col-span-3">
          <h2 className="text-xl font-bold mb-4">Note :</h2>
          <textarea
            name="note"
            value={formData.informations.note}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
          />
        </div>
        <div className="col-span-3">
          <h2 className="text-xl font-bold mt-8 flex items-center">
            <FaBriefcaseMedical className="mr-2" />
            <span>Select Previouse Vaccine Done</span>
          </h2>
          <div className="flex flex-wrap mt-4">
            <div className="flex flex-col mr-8">
              <Checkbox
                label="BDV - (60 Days)"
                checked={formData.vaccinations.BDV}
                onChange={(isChecked) => handleCheckboxChange("BDV", isChecked)}
              />
              <Checkbox
                label="BVD - (90 Days)"
                checked={formData.vaccinations.BVD}
                onChange={(isChecked) => handleCheckboxChange("BVD", isChecked)}
              />
            </div>
            <div className="flex flex-col mr-8">
              <Checkbox
                label="PI3 - (120 Days)"
                checked={formData.vaccinations.PI3}
                onChange={(isChecked) => handleCheckboxChange("PI3", isChecked)}
              />
              <Checkbox
                label="BRSV - (365 Days)"
                checked={formData.vaccinations.BRSV}
                onChange={(isChecked) =>
                  handleCheckboxChange("BRSV", isChecked)
                }
              />
            </div>
            <div className="flex flex-col">
              <Checkbox
                label="Vitamin A - (60 Days)"
                checked={formData.vaccinations.VitaminA}
                onChange={(isChecked) =>
                  handleCheckboxChange("VitaminA", isChecked)
                }
              />
              <Checkbox
                label="Anthrax - (120 Days)"
                checked={formData.vaccinations.Anthrax}
                onChange={(isChecked) =>
                  handleCheckboxChange("Anthrax", isChecked)
                }
              />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold mt-8 flex items-center">
          <FaImage className="mr-2" />
          <span>Animal Images</span>
        </h2>

        <div className="col-span-3">
          <ProfileImageUploader onImageChange={handleImageChange} />;
        </div>

        <div className="col-span-3">
          <button
            type="submit"
            className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded mt-4"
          >
            {isEditMode ? "Update Cow" : "Add Cow"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditCowForm;
