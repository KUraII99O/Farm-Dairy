import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageCowCalfContext } from "../Provider";
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

const EditCalfForm = () => {
  const { id } = useParams<{ id: string }>();
  const { addCalf, editCalf, getCalfById } = useContext(ManageCowCalfContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    image: "",
    animalType: "",
    buyDate: "",
    buyingPrice: "",
    motherID: "",
    gender: "",
    informations: {
      stallNo: "",
      dateOfBirth: "",
      animalAgeDays: "",
      weight: "",
      height: "",
      color: "",
      nextPregnancyApproxTime: "",
      buyFrom: "",
      prevVaccineDone: "",
      note: "",
      createdBy: "",
    },
  });

  const handleImageChange = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  useEffect(() => {
    if (isEditMode) {
      const selectedCalf = getCalfById(parseInt(id));
      if (selectedCalf) {
        const mergedFormData = {
          ...formData,
          ...selectedCalf,
          informations: {
            ...formData.informations,
            ...selectedCalf.informations,
          },
        };
        setFormData(mergedFormData);
      }
    }
  }, [id, isEditMode, getCalfById]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = { ...formData };
    if (selectedImage) {
      formDataToSend.image = selectedImage;
    }

    try {
      if (isEditMode) {
        await editCalf(parseInt(id), formDataToSend);
      } else {
        await addCalf(formDataToSend);
      }
      navigate("/manage-cow-calf");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
            type="text"
            name="buyingPrice"
            value={formData.buyingPrice}
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
          <h2 className="text-xl font-bold mb-4">Mother ID :</h2>
          <input
            type="text"
            name="motherID"
            value={formData.motherID}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
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
              {/* Include your Checkbox components here */}
            </div>
            {/* Include more Checkbox groups if needed */}
          </div>
        </div>
        <h2 className="text-xl font-bold mt-8 flex items-center">
          <FaImage className="mr-2" />
          <span>Animal Images</span>
        </h2>

        <div className="col-span-3">
          <ProfileImageUploader
            onImageChange={handleImageChange}
            image={null}
          />
        </div>

        <div className="col-span-3">
          <button
            type="submit"
            className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded mt-4"
          >
            {isEditMode ? "Update Calf" : "Add Calf"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditCalfForm;
