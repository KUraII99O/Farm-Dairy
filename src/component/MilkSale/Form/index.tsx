import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MilkSaleContext } from "../Provider";
import { FaUserPlus } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";

const EditMilkSale = () => {
  const { id } = useParams<{ id: string }>();
  const { milkSales, addMilkSales, editMilkSales, generateRandomInvoice } =
    useContext(MilkSaleContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const [currentDate, setCurrentDate] = useState<string>("");
  const { translate } = useTranslation();

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
    date: currentDate,
    soldBy: user.name,
    invoice: "generateRandomInvoice",
  });

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users"); // Adjust the API endpoint accordingly
        if (response.ok) {
          const userData = await response.json();
          if (userData.length > 0) {
            const { username, email } = userData[0]; // Assuming you only have one user for now
            setUser({ name: username, email: email });
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  useEffect(() => {
    if (isEditMode) {
      const selectedMilkSale = milkSales.find(
        (milkSale) => milkSale.id === parseInt(id)
      );
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
  
    // Generate sequential invoice number
    const invoice = generateRandomInvoice();
  
    // Update formData with generated invoice number
    const updatedFormData = { ...formData, invoice };
  
    if (isEditMode) {
      await editMilkSales(parseInt(id), updatedFormData);
    } else {
      await addMilkSales(updatedFormData);
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
      <FaUserPlus className="mr-2" />
      <span>Milk Sale Information</span>
    </h2>
    <div className="flex flex-wrap -mx-2">
      <div className="flex flex-col space-y-1 px-2 w-1/2">
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

      <div className="flex flex-col space-y-1 px-2 w-1/2">
        <label className="text-sm font-medium text-gray-700">
          Supplier:
        </label>
        <input
          style={{ width: "800px" }}
          type="text"
          placeholder="Supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
    </div>

    <div className="flex flex-wrap -mx-2">
      <div className="flex flex-col space-y-1 px-2 w-1/2">
        <label className="text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          style={{ width: "800px" }}
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-1 px-2 w-1/2">
        <label className="text-sm font-medium text-gray-700">
          Contact:
        </label>
        <input
          style={{ width: "800px" }}
          type="text"
          placeholder="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
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
              required
            />
          </div>
        </div>

    <div className="flex flex-wrap -mx-2">
      <div className="flex flex-col space-y-1 px-2 w-1/2">
        <label className="text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          style={{ width: "800px" }}
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-1 px-2 w-1/2">
        <label className="text-sm font-medium text-gray-700">
          Litre *:
        </label>
        <input
          style={{ width: "800px" }}
          type="text"
          placeholder="Litre"
          name="litre"
          value={formData.litre}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
    </div>

    <div className="flex flex-wrap -mx-2">
      <div className="flex flex-col space-y-1 px-2 w-1/2">
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

      <div className="flex flex-col space-y-1 px-2 w-1/2">
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
    </div>

    <div className="flex flex-wrap -mx-2">
      <div className="flex flex-col space-y-1 px-2 w-1/2">
        <label className="text-sm font-medium text-gray-700">
          Paid:
        </label>
        <input
          style={{ width: "800px" }}
          type="text"
          placeholder="Paid"
          name="paid"
          value={formData.paid}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-1 px-2 w-1/2">
        <label className="text-sm font-medium text-gray-700">
          Due *:
        </label>
        <input
          style={{ width: "800px" }}
          type="text"
          placeholder="Due"
          name="due"
          value={formData.due}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary w-full"
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
