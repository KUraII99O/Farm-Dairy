import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";
import { ManageMilkSaleContext } from "../Provider";

const EditMilkSale = () => {
  const { id } = useParams<{ id: string }>();
  const { milkSaleRecords, addMilkSaleRecord, editMilkSaleRecord } = useContext(ManageMilkSaleContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountNo: "",
    supplier: "",
    userId: "",
    name: "",
    contact: "",
    email: "",
    address: "",
    litre: "",
    price: "",
    total: "",
    due: "",
    paid: "",
    date: "",
    soldBy: "",
    invoice: ""
  });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const { translate, language } = useTranslation();

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setFormData(prevState => ({
      ...prevState,
      date: formattedDate,
    }));
  }, []);

  useEffect(() => {
    if (id && milkSaleRecords.length > 0) {
      const selectedMilkSale = milkSaleRecords.find(milkSale => milkSale.id === id);
      if (selectedMilkSale) {
        setFormData(selectedMilkSale);
      }
    }
  }, [id, milkSaleRecords]);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const { username } = userData;
      setFormData(prevState => ({
        ...prevState,
        soldBy: username,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await editMilkSaleRecord(id, formData);
      } else {
        await addMilkSaleRecord(formData);
      }
      setSuccessPopup(true);
      setTimeout(() => {
        setSuccessPopup(false);
        navigate("/milk-sale");
      }, 1000); // Close the popup and navigate after 1 second
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        {/* Form fields */}
        {/* Account No */}
        <label className="text-sm font-medium text-gray-700">{translate("accountNo")}</label>
        <input
          type="text"
          placeholder={translate("accountNo")}
          name="accountNo"
          value={formData.accountNo}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Supplier */}
        <label className="text-sm font-medium text-gray-700">{translate("supplier")}</label>
        <input
          type="text"
          placeholder={translate("supplier")}
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Name */}
        <label className="text-sm font-medium text-gray-700">{translate("name")}</label>
        <input
          type="text"
          placeholder={translate("name")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Contact */}
        <label className="text-sm font-medium text-gray-700">{translate("contact")}</label>
        <input
          type="text"
          placeholder={translate("contact")}
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Email */}
        <label className="text-sm font-medium text-gray-700">{translate("email")}</label>
        <input
          type="email"
          placeholder={translate("email")}
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Address */}
        <label className="text-sm font-medium text-gray-700">{translate("address")}</label>
        <input
          type="text"
          placeholder={translate("address")}
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Litre */}
        <label className="text-sm font-medium text-gray-700">{translate("litre")}</label>
        <input
          type="text"
          placeholder={translate("litre")}
          name="litre"
          value={formData.litre}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Price */}
        <label className="text-sm font-medium text-gray-700">{translate("price")}</label>
        <input
          type="text"
          placeholder={translate("price")}
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Total */}
        <label className="text-sm font-medium text-gray-700">{translate("total")}</label>
        <input
          type="text"
          placeholder={translate("total")}
          name="total"
          value={formData.total}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
        />

        {/* Due */}
        <label className="text-sm font-medium text-gray-700">{translate("due")}</label>
        <input
          type="text"
          placeholder={translate("due")}
          name="due"
          value={formData.due}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          
          />
  
          {/* Paid */}
          <label className="text-sm font-medium text-gray-700">{translate("paid")}</label>
          <input
            type="text"
            placeholder={translate("paid")}
            name="paid"
            value={formData.paid}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            
          />
  
          {/* Invoice */}
          <label className="text-sm font-medium text-gray-700">{translate("invoice")}</label>
          <input
            type="text"
            placeholder={translate("invoice")}
            name="invoice"
            value={formData.invoice}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            
          />
  
          {/* Submit button */}
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary w-full"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : id
              ? translate("save")
              : translate("addMilkSale")}
          </button>
        </form>
      </div>
    );
  };
  
  export default EditMilkSale;