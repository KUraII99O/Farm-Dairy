import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SaleListContext } from "../provider";
import { IoInformationCircle } from "react-icons/io5";

const EditSaleForm = () => {
  const { id } = useParams<{ id: string }>();
  const { sales, addSale, editSale } = useContext(SaleListContext);
  const navigate = useNavigate();

  const isEditMode = !!id;

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
    information: {
      image: "",
      cowNumber: "",
      stallNo: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await editSale(parseInt(id), formData);
    } else {
      await addSale(formData);
    }
    navigate("/sale-list");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span>Sale Information</span>
        </h2>
        {/* Input fields for sale data */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Invoice:</label>
          <input
            type="text"
            placeholder="Invoice"
            name="invoice"
            value={formData.invoice}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Add other input fields for sale data */}
        {/* Example: */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Customer Name:</label>
          <input
            type="text"
            placeholder="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Customer Phone:</label>
          <input
            type="text"
            placeholder="Customer Phone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Customer Email:</label>
          <input
            type="email"
            placeholder="Customer Email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Address:</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Total Price:</label>
          <input
            type="text"
            placeholder="Total Price"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Total Paid:</label>
          <input
            type="text"
            placeholder="Total Paid"
            name="totalPaid"
            value={formData.totalPaid}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Due:</label>
          <input
            type="text"
            placeholder="Due"
            name="due"
            value={formData.due}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Note:</label>
          <textarea
            placeholder="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <h2 className="text-xl font-bold mt-2 mb-4 flex items-center">
          <IoInformationCircle className="mr-2" />
          <span>Information</span>
        </h2>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Image:</label>
          <input
            type="text"
            placeholder="Image"
            name="image"
            value={formData.information.image}
            onChange={handleInformationChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Add other input fields for information */}
        {/* Example: */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Cow Number:</label>
          <input
            type="text"
            placeholder="Cow Number"
            name="cowNumber"
            value={formData.information.cowNumber}
            onChange={handleInformationChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Continue adding input fields for information as per your requirements */}
        {/* Example: */}
        {/* <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Gender:</label>
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={formData.information.gender}
            onChange={handleInformationChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div> */}

        {/* Add button to submit form */}
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
