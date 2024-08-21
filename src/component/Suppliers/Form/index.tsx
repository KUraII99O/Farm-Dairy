import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileImageUploader from "../../FileUpload";
import { MdEdit } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";

interface Supplier {
  id: string;
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  image: string;
}

interface EditSupplierFormProps {
  supplier: Supplier | null;
  onSubmit: (formData: Supplier) => void;
  onClose: () => void;
}

const EditSupplierForm: React.FC<EditSupplierFormProps> = ({ supplier, onSubmit, onClose }) => {
  useParams<{ id: string; }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<Supplier>({
    id: "",
    name: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        ...supplier,
        image: supplier.image || "",
      });
    }
  }, [supplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (image: string) => {
    setFormData({
      ...formData,
      image,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData); // Call onSubmit (which is handleAddNewSupplier or handleUpdateSupplier)
  };

  const handleCloseDrawer = () => {
    onClose(); // Call the onClose function passed from the parent component
    navigate("/suppliers");
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      handleCloseDrawer();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40"
        onClick={handleCloseDrawer}
      ></div>
      {/* Edit supplier form */}
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="w-full max-w-md bg-white shadow-lg p-6" ref={formRef}>
          <button
            className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={handleCloseDrawer}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              {supplier ? (
                <>
                  <MdEdit className="mr-2" /> Edit Supplier
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" /> Add Supplier
                </>
              )}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name:
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image:
              </label>
              {formData.image !== null && (
                <ProfileImageUploader
                  onImageChange={handleImageChange}
                  image={formData.image}
                />
              )}
            </div>
            <div className="flex">
              <button
                type="submit"
                className="bg-secondary hover:primary text-white font-bold py-2 px-4 rounded"
              >
                {supplier ? "Update Supplier" : "Add Supplier"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSupplierForm;
