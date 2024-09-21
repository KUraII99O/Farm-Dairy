import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageSalesContext } from "../provider";
import { IoInformationCircle } from "react-icons/io5";
import { useTranslation } from "../../Translator/Provider";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

interface CowSales {
  status: boolean;
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  totalPrice: String;
  totalPaid: string;
  due: String;
  note: string;
  collectedFrom: string;
  image: string;
  stallNo: string;
  cowNumber: string;
  gender: string;
  weight: string;
  height: string;
  userId: string;
}

interface Stall {
  id: string;
  stallNumber: string;
}

interface Cow {
  id: string;
  animalType: string;
}

const EditSaleForm = () => {
  const { id } = useParams<{ id: string }>();
  const { sales, addSale, editSale } = useContext(ManageSalesContext);
  const [stallList, setStallList] = useState<Stall[]>([]);
  const [cowList, setCowList] = useState<Cow[]>([]);
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
  });

  const [cowDetails, setCowDetails] = useState([
    {
      animalType: "",
      stallNumber: "",
      animalID: "",
      totalPrice: "",
      image: "",
    },
  ]);

  useEffect(() => {
    if (isEditMode) {
      const selectedSale = sales.find((sale: CowSales) => sale.id === id);
      if (selectedSale) {
        setFormData(selectedSale);
        setCowDetails(selectedSale.cowDetails || cowDetails);
      }
    }
  }, [id, isEditMode, sales]);

  useEffect(() => {
    // Fetch stall data from the endpoint
    fetch("https://auth-api-woad.vercel.app/api/stalls")
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
    fetch("https://auth-api-woad.vercel.app/api/cows")
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCowDetailsChange = (index: any, e: any) => {
    const { name, value } = e.target;
    const updatedCowDetails = cowDetails.map((detail, idx) =>
      idx === index ? { ...detail, [name]: value } : detail
    );
    setCowDetails(updatedCowDetails);
  };

  const handleFileChange = (index: any, e: any) => {
    const file = e.target.files[0];
    const updatedCowDetails = cowDetails.map((detail, idx) =>
      idx === index ? { ...detail, image: URL.createObjectURL(file) } : detail
    );
    setCowDetails(updatedCowDetails);
  };

  const handleAddRow = () => {
    setCowDetails([
      ...cowDetails,
      {
        animalType: "",
        stallNumber: "",
        animalID: "",
        totalPrice: "",
        image: "",
      },
    ]);
  };

  const handleRemoveRow = (index: any) => {
    setCowDetails(cowDetails.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newFormData = { ...formData, cowDetails };
    if (isEditMode) {
      await editSale(id, newFormData);
    } else {
      await addSale(newFormData);
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

        <div className="flex flex-col space-y-1">
          <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
            <IoInformationCircle className="mr-2" />
            <span>Cow Selection</span>
          </h2>
          <table className="border-collapse w-full mb-6">
            <thead>
              <tr>
                <th className="border border-gray-400 px-3 py-2">Image</th>
                <th className="border border-gray-400 px-3 py-2">
                  Animal Type
                </th>
                <th className="border border-gray-400 px-3 py-2">Stall No</th>
                <th className="border border-gray-400 px-3 py-2">Animal ID</th>
                <th className="border border-gray-400 px-3 py-2">Sell Price</th>
                <th className="border border-gray-400 px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cowDetails.map((detail, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-3 py-2">
                    <div className="relative flex justify-center">
                      <input
                        type="file"
                        id={`uploadInput-${index}`}
                        name="image"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`uploadInput-${index}`}
                        className={`cursor-pointer border my-6 border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white hover:bg-gray-100 text-center ${
                          isArabic ? "" : ""
                        }`}
                        style={{
                          width: "100px",
                          height: "100px",
                          lineHeight: "100px",
                        }}
                      >
                        {detail.image ? (
                          <img
                            src={detail.image}
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
                    <select
                      style={{ height: "2.5rem" }}
                      name="animalType"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={detail.animalType}
                      onChange={(e) => handleCowDetailsChange(index, e)}
                    >
                      <option value="">-- Select --</option>
                      <option value="Cow">Cow</option>
                      <option value="Calf">Calf</option>
                    </select>
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <select
                      style={{ height: "2.5rem" }}
                      name="stallNumber"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={detail.stallNumber}
                      onChange={(e) => handleCowDetailsChange(index, e)}
                    >
                      <option value="">-- Select --</option>
                      {stallList.map((stall: Stall) => (
                        <option key={stall.id} value={stall.stallNumber}>
                          {stall.stallNumber}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <select
                      style={{ height: "2.5rem" }}
                      name="animalID"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={detail.animalID}
                      onChange={(e) => handleCowDetailsChange(index, e)}
                    >
                      <option value="">-- Select --</option>
                      {cowList.map((cow: Cow) => (
                        <option key={cow.id} value={cow.id}>
                          {cow.id}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-400 px-3 py-2">
                    <input
                      style={{ height: "2.5rem" }}
                      type="number"
                      placeholder="Sell Price"
                      name="totalPrice"
                      value={detail.totalPrice}
                      onChange={(e) => handleCowDetailsChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-400 px-3 py-2 text-center">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FaMinusCircle
                        className="text-red-500 mr-2 cursor-pointer text-3xl ml-4"
                        onClick={() => handleRemoveRow(index)}
                      />
                      <FaPlusCircle
                        className="text-green-500 cursor-pointer text-3xl text-center "
                        onClick={handleAddRow}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-bold mt-2 mb-6 flex items-center">
          <IoInformationCircle className="mr-2" />
          <span>Payment Information :</span>
        </h2>
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
