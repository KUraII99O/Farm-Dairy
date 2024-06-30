import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import PaymentMethodPopup from "../../component/PaymentMethod";

interface Invoice {
  id: number;
  user: string;
  plan: string;
  price: string;
  features: {
    description: string;
    limitations: {
      [key: string]: number;
    };
  };
  startDate: string;
  dueDate: string;
  paymentStatus: string;
}

const Invoice: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "yyyy/MM/dd");
  };

  const fetchInvoices = async () => {
    try {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        throw new Error("User not logged in");
      }

      const user = JSON.parse(loggedInUser);
      if (!user || !user.id) {
        throw new Error("User ID not found");
      }

      console.log(`Fetching invoices for user ID: ${user.id}`);
      const response = await fetch(
        `http://localhost:3000/users/${user.id}/invoices`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const invoiceData = await response.json();
      console.log("Fetched invoices:", invoiceData);
      setInvoices(invoiceData);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDetails = (invoiceId: number) => {
    navigate(`/details/${invoiceId}`);
  };

  const handlePay = (invoiceId: number) => {
    setSelectedInvoiceId(invoiceId);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedInvoiceId(null);
  };

  if (invoices.length === 0) {
    return <div>Loading...</div>; // Handle initial loading state
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Invoices</h2>
      <p>You are on a free plan, no invoices available.</p>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded ml-2 mt-4"
        onClick={() => navigate("/pricing")}
      >
        Upgrade
      </button>{" "}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              User
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              Plan
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              Price
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              Features
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              Start Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              Due Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              Payment Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-700">
                {invoice.user}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {invoice.plan}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                ${invoice.price}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                Cows: {invoice.features.limitations.cows}, Hours:{" "}
                {invoice.features.limitations.usageHours}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {formatDate(invoice.startDate)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {formatDate(invoice.dueDate)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {invoice.paymentStatus}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <button
                  className={`px-2 py-1 rounded mr-2 ${
                    invoice.paymentStatus === "paid"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={() =>
                    invoice.paymentStatus !== "paid" && handlePay(invoice.id)
                  }
                  disabled={invoice.paymentStatus === "paid"}
                >
                  Pay
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => handleDetails(invoice.id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && selectedInvoiceId !== null && (
        <PaymentMethodPopup
          onClose={closePopup}
          invoiceId={selectedInvoiceId}
        />
      )}
    </div>
  );
};

export default Invoice;
