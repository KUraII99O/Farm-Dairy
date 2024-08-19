import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

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

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`http://localhost:3000/invoices/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch invoice details");
        }
        const data = await response.json();
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Invoice Details
      </h2>
      <div className="bg-gray-100 rounded-lg shadow-md p-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-semibold">User:</p>
            <p className="text-gray-800">{invoice.user}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Plan:</p>
            <p className="text-gray-800">{invoice.plan}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Price:</p>
            <p className="text-gray-800">${invoice.price}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Features:</p>
            <p className="text-gray-800">
              Description: {invoice.features.description}
              <br />
              Limitations:
              <ul className="list-disc ml-4">
                {Object.entries(invoice.features.limitations).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  )
                )}
              </ul>
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">Start Date:</p>
            <p className="text-gray-800">
              {format(new Date(invoice.startDate), "yyyy/MM/dd")}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">Due Date:</p>
            <p className="text-gray-800">
              {format(new Date(invoice.dueDate), "yyyy/MM/dd")}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">Payment Status:</p>
            <p
              className={`text-gray-800 ${
                invoice.paymentStatus === "paid"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {invoice.paymentStatus}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow mr-4"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default Details;
