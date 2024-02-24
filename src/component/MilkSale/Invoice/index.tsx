import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MilkSaleContext } from "../Provider";

const MilkSaleInvoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { milkSales } = useContext(MilkSaleContext);

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
    invoice: ""
  });

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen"> {/* Adjusted padding */}
      <div className="p-8 bg-white shadow-lg rounded-lg w-4/5"> {/* Increased width */}
        <h2 className="text-2xl font-bold mb-4">Milk Sale Invoice</h2> {/* Increased font size */}
        <div className="flex justify-between mb-4">
          <div>
            <h3>From:</h3>
            <p>KHAN DAIRY FARM</p>
            <p>Branch - 01</p>
            <p>Uttara, Dhaka, Bangladesh</p>
            <p>Email: akh01@gmail.com</p>
            <p>Phone: 017865567610</p>
          </div>
          <div>
            <h3>To:</h3>
            <p>Name: {formData.name}</p>
            <p>Contact: {formData.contact}</p>
            <p>Email: {formData.email}</p>
            <p>Address: {formData.address}</p>
          </div>
        </div>
        
        <div>
          <p className="font-bold">Invoice Number: {formData.invoice}</p>
        </div>
        
        {formData && (
          <table className="table-fixed w-full">
            <tbody>
              <tr>
                <td className="border px-4 py-2">Account Number:</td>
                <td className="border px-4 py-2">{formData.accountNo}</td>
                <td className="border px-4 py-2">Supplier:</td>
                <td className="border px-4 py-2">{formData.supplier}</td>
              </tr>
            
              <tr>
                <td className="py-2">Litre:</td>
                <td className="py-2">{formData.litre}</td>
                <td className="py-2">Price/Liter:</td>
                <td className="py-2">{formData.price}</td>
              </tr>
              <tr>
                <td className="py-2">Total:</td>
                <td className="py-2">{formData.total}</td>
                <td className="py-2">Paid:</td>
                <td className="py-2">{formData.paid}</td>
              </tr>
              <tr>
                <td className="py-2">Due:</td>
                <td className="py-2">{formData.due}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MilkSaleInvoice;
