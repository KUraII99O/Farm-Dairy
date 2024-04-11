import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SaleListContext } from "../provider";
import { IoInformationCircle } from "react-icons/io5";
import { useTranslation } from "../../Translator/Provider";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const EditSaleForm = () => {
  const { id } = useParams<{ id: string }>();
  const { sales, addSale, editSale } = useContext(SaleListContext);
  const [showCowDetails, setShowCowDetails] = useState(false);
  const [stallList, setStallList] = useState([]);
  const [cowList, setCowList] = useState([]);
  const [selectedImage] = useState<string | null>(null); // State to store selected image path
  const { translate, language } = useTranslation();

  const navigate = useNavigate();

  const isEditMode = !!id;
  const isArabic = language === "ar";
  const [formData, setFormData] = useState({
    invoice: "",
    date: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    totalPrice: "",
    totalPaid: "",
    due: "",
    note: "",
    AnimalType: "",
    information: {
      image: "",
      animalID: "",
      stallNumber: "",
      gender: "",
      weight: "",
      height: "",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const selectedSale = sales.find((sale) => sale.id === parseInt(id));
      if (selectedSale) {
        setFormData(selectedSale);
      }
    }
  }, [id, isEditMode, sales]);

  useEffect(() => {
    // Fetch stall data from the endpoint
    fetch("http://localhost:3000/stalls")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stall data");
        }
        return response.json();
      })
      .then((data) => {
        setStallList(data);
      })
      .catch((error) => {
        console.error("Error fetching stall data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch cow data from the endpoint
    fetch("http://localhost:3000/cows")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cow data");
        }
        return response.json();
      })
      .then((data) => {
        setCowList(data);
      })
      .catch((error) => {
        console.error("Error fetching cow data:", error);
      });
  }, []);

  useEffect(() => {
    if (
      formData.stallNo !== "" &&
      formData.animalID !== "" &&
      formData.animalType !== "" &&
      formData.image 
    ) {
      setShowCowDetails(true);
    } else {
      setShowCowDetails(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInformationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      information: {
        ...formData.information,
        [name]: value,
      },
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: URL.createObjectURL(file), // Store file path for preview
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await editSale(parseInt(id), formData);
    } else {
      await addSale(formData);
    }
    navigate("/Cow-Sale-List");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span>Information :</span>
        </h2>
        {/* Input fields for sale data */}
        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-full md:w-1/2">
            <label className="text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              placeholder="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 px-2 w-full md:w-1/2">
            <label className="text-sm font-medium text-gray-700">
              Customer Name:
            </label>
            <input
              type="text"
              placeholder="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-full md:w-1/2">
            <label className="text-sm font-medium text-gray-700">
              Customer Phone:
            </label>
            <input
              type="text"
              placeholder="Customer Phone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 px-2 w-full md:w-1/2">
            <label className="text-sm font-medium text-gray-700">
              Customer Email:
            </label>
            <input
              type="email"
              placeholder="Customer Email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="text-sm font-medium text-gray-700">Address:</label>
          <textarea
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="text-sm font-medium text-gray-700">Note:</label>
          <textarea
            placeholder="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </form>

      <div className="flex flex-col space-y-1">
        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle className="mr-2" />
          <span>Cow Selection</span>
        </h2>
        <table className="border-collapse w-full mb-6">
          <thead>
            <tr>
              <th className="border border-gray-400 px-3 py-2">Image</th>
              <th className="border border-gray-400 px-3 py-2">Animal Type</th>
              <th className="border border-gray-400 px-3 py-2">Animal ID</th>
              <th className="border border-gray-400 px-3 py-2">Stall No</th>
              <th className="border border-gray-400 px-3 py-2">Sell Price</th>
              <th className="border border-gray-400 px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-3 py-2">
                <div className="relative flex justify-center ">
                  <label
                    htmlFor="uploadInput"
                    className={`cursor-pointer border my-6 border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white hover:bg-gray-100 text-center ${
                      isArabic ? "" : ""
                    }`}
                    style={{
                      width: "100px", // Adjust width as needed
                      height: "100px", // Adjust height as needed
                      lineHeight: "100px", // Adjust line height to center content vertically
                    }}
                  >
                    {formData.image ? (
                      <img
                      
                        src={formData.image}
                        alt="Uploaded"
                        className="w-full h-full object-cover items-center"
                      />
                    ) : (
                      translate("image")
                    )}
                  </label>
                </div>
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <label className="text-sm font-medium text-gray-700"></label>
                <select
                  style={{ height: "2.5rem" }}
                  id="animalType"
                  name="animalType"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.animalType}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select --</option>
                  {cowList.map((cow) => (
                    <option key={cow.animalType} value={cow.animalType}>
                      {cow.animalType}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <label className="text-sm font-medium text-gray-700"></label>
                <select
                  style={{ height: "2.5rem" }}
                  id="stallNo"
                  name="stallNo"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.stallNumber}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select --</option>
                  {stallList.map((stall) => (
                    <option key={stall.id} value={stall.stallNumber}>
                      {stall.stallNumber}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <label className="text-sm font-medium text-gray-700"></label>
                <select
                  style={{ height: "2.5rem" }}
                  id="animalID"
                  name="animalID"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.animalID}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select --</option>
                  {cowList.map((cow) => (
                    <option key={cow.id} value={cow.id}>
                      {cow.id}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-400 px-3 py-2">
                <label className="text-sm font-medium text-gray-700"></label>
                <input
                  style={{ height: "2.5rem" }}
                  type="number"
                  placeholder="total Price"
                  name="totalPrice"
                  value={formData.totalPrice}
                  onChange={handleInformationChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </td>
              <td className="border border-gray-400 px-3 py-2 text-center">
                <div style={{ display: "flex" }}>
                  <FaMinusCircle
                    className="text-red-500 mr-2 cursor-pointer text-3xl ml-4"
                    onClick={() => handleMinusClick()}
                  />
                  <FaPlusCircle
                    className="text-green-500 cursor-pointer text-3xl text-center "
                    onClick={() => handlePlusClick()}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 className="text-xl font-bold mt-2 mb-6 flex items-center">
        <IoInformationCircle className="mr-2" />
        <span> Payment Information :</span>
      </h2>
      <form>
        <div className="flex justify-between">
          <div className="flex flex-col space-y-1" style={{ width: "30%" }}>
            <label className="text-sm font-medium text-gray-700">
              Total Price:
            </label>
            <input
              type="text"
              placeholder="Total Price"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              required
            />
          </div>
          <div
            className="flex flex-col space-y-1 ml-4"
            style={{ width: "30%" }}
          >
            <label className="text-sm font-medium text-gray-700">
              Total Paid:
            </label>
            <input
              type="text"
              placeholder="Total Paid"
              name="totalPaid"
              value={formData.totalPaid}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              required
            />
          </div>
          <div
            className="flex flex-col space-y-1 ml-4"
            style={{ width: "30%" }}
          >
            <label className="text-sm font-medium text-gray-700">Due:</label>
            <input
              type="text"
              placeholder="Due"
              name="due"
              value={formData.due}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
        >
          {isEditMode ? "Save" : "Add Sale"}
        </button>
      </form>
    </div>
  );
};

export default EditSaleForm;
