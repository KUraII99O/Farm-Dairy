import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MilkSaleContext } from "../Provider";
import { FaUserPlus } from "react-icons/fa";

const EditMilkSale = () => {
  const { id } = useParams<{ id: string }>();
  const { milkSales, addMilkSale, editMilkSale } = useContext(MilkSaleContext);
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    accountNo: "",
    supplier : "",
    name : "",
    contact : "",
    email : "",
    address: "",
    litre: "",
    price: "",
    total: "",
    due: "",
    paid: "",
    
  });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  useEffect(() => {
    if (isEditMode) {
      const selectedMilkSale = milkSales.find((milkSale) => milkSale.id === parseInt(id));
      if (selectedMilkSale) {
        setFormData(selectedMilkSale);
      }
    }
  }, [id, isEditMode, milkSales]);

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
      await editMilkSale(parseInt(id), formData);
    } else {
      await addMilkSale(formData);
    }
    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/Milk-Sale");
    }, 2000); // Close the popup and navigate after 2 seconds
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <FaUserPlus className="mr-2" />
          <span>Milk Sale Information</span>
        </h2>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Account Number:
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="Account Number"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Add more fields */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
          Supplier :
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Add more fields */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
          name:
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Add more fields */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
          Contact :
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Add more fields */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
          Email * :
          </label>
          <input
            style={{ width: "800px" }}
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Address:
          </label>
          <input
            style={{ width: "800px" }}
            type="textarea"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
          Litre * :
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="litre"
            name="litre"
            value={formData.litre}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Price/Liter:
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="Price/Liter"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Total:
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="Total"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
          Paid :
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="paid"
            name="paid"
            value={formData.paid}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
          Due * :
          </label>
          <input
            style={{ width: "800px" }}
            type="text"
            placeholder="due"
            name="due"
            value={formData.due}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <button
        style={{ width: "800px" }}
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : isEditMode ? "Save" : "Add Milk Sale"}
        </button>
      </form>

      {successPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Information updated successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMilkSale;
