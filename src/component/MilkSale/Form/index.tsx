import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageMilkSaleContext, } from "../Provider";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";

const EditMilkSale = () => {
  const { id } = useParams<{ id: string }>();
  const { MilkSales, addMilkSaleRecord, editMilkSaleRecord, generateRandomInvoice } =
    useContext(ManageMilkSaleContext);
  const navigate = useNavigate();
  

  const [currentDate, setCurrentDate] = useState<string>("");
  const { translate, language } = useTranslation();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    accountNo: "",
    supplier: "",
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
    invoice: "generateRandomInvoice",
  });

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setFormData(prevState => ({
      ...prevState,
      Date: formattedDate,
    }));
  }, []);

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

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);


  useEffect(() => {
    if (id && MilkSales.length > 0) {
      const selectedMilkSale = MilkSales.find(sale => sale.id === id);
      if (selectedMilkSale) {
        // Update the formData state with the selected milk sale record
        setFormData(selectedMilkSale);
      }
    }
  }, [id, MilkSales]);

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

    // Generate sequential invoice number
    const invoice = generateRandomInvoice();

    // Update formData with generated invoice number
    const updatedFormData = { ...formData, invoice };

    if (isEditMode) {
      await editMilkSaleRecord(parseInt(id), updatedFormData);
    } else {
      await addMilkSaleRecord(updatedFormData);
    }

    setLoading(false);
    setSuccessPopup(true);
    setTimeout(() => {
      setSuccessPopup(false);
      navigate("/Milk-Sale");
    }, 1000); // Close the popup and navigate after 2 seconds
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <FaUserPlus className={`mr-2 ${language === "ar" ? "ml-2" : ""}`} />
          <span>{translate("milksaleInformation")}</span>
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
              
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("suppliers")} :
            </label>
            <input
              type="text"
              placeholder={translate("suppliers")}
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("name")} :
            </label>
            <input
              type="text"
              placeholder={translate("name")}
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("contact")}:
            </label>
            <input
              type="text"
              placeholder={translate("contact")}
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              
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
              
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("email")} :
            </label>
            <input
              type="email"
              placeholder={translate("email")}
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("liter")}*:
            </label>
            <input
              type="text"
              placeholder={translate("liter")}
              name="litre"
              value={formData.litre}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
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
              
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("total")} :
            </label>
            <input
              type="text"
              placeholder={translate("total")}
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("paid")} :
            </label>
            <input
              type="text"
              placeholder={translate("paid")}
              name="paid"
              value={formData.paid}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              
            />
          </div>

          <div className="flex flex-col space-y-1 px-2 w-1/2">
            <label className="text-sm font-medium text-gray-700">
              {translate("due")}*:
            </label>
            <input
              type="text"
              placeholder={translate("due")}
              name="due"
              value={formData.due}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary w-full"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : isEditMode
            ? translate("save")
            : translate("addmilksale")}
        </button>
      </form>
    </div>
  );
};

export default EditMilkSale;
