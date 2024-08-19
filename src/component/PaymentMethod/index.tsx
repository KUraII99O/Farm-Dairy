import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaPaypal, FaUniversity } from 'react-icons/fa';

interface PaymentMethodPopupProps {
  onClose: () => void;
  invoiceId: number;
}

interface PaymentMethod {
  method: string;
  type: string;
}

const PaymentMethodPopup: React.FC<PaymentMethodPopupProps> = ({ onClose, invoiceId }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
          throw new Error("User not logged in");
        }

        const user = JSON.parse(loggedInUser);
        if (!user || !user.id) {
          throw new Error("User ID not found");
        }

        const response = await fetch(`http://localhost:3000/users/${user.id}/payment-methods`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment methods");
        }

        const data = await response.json();
        setPaymentMethods(data.methods || []);
        if (data.methods && data.methods.length > 0) {
          setSelectedMethod(data.methods[0].method); // Select the first method initially
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handlePaymentSelection = (method: string) => {
    setSelectedMethod(method === selectedMethod ? null : method); // Toggle selection
  };

  const handlePayInvoice = async () => {
    if (selectedMethod) {
      try {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
          throw new Error("User not logged in");
        }

        const user = JSON.parse(loggedInUser);
        if (!user || !user.id) {
          throw new Error("User ID not found");
        }

        const response = await fetch(`http://localhost:3000/invoices/pay/${invoiceId}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ method: selectedMethod }),
        });

        if (!response.ok) {
          throw new Error("Failed to pay invoice");
        }

        console.log(`Paid invoice ${invoiceId} with ${selectedMethod}`);
        onClose();
      } catch (error) {
        console.error("Error paying invoice:", error);
        // Optionally handle and display error to user
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'creditCard':
        return <FaCreditCard className="w-6 h-6" />;
      case 'paypal':
        return <FaPaypal className="w-6 h-6" />;
      case 'bank':
        return <FaUniversity className="w-6 h-6" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-2 text-green-600">Select payment method</h2>
        <p className="text-sm text-gray-500 mb-4">Preferred method with secure transactions.</p>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 text-lg">&times;</button>
        {paymentMethods.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">You have no payment methods.</p>
            <button
              onClick={() => window.location.href = '/add-payment-method'}
              className="w-full bg-purple-500 text-white py-2 rounded-lg"
            >
              Add Payment Method
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {paymentMethods.map((method) => (
                <li key={method.method} className={`border rounded-lg ${selectedMethod === method.method ? 'border-purple-500' : 'border-gray-200'} hover:bg-gray-100 cursor-pointer`}>
                  <button
                    onClick={() => handlePaymentSelection(method.method)}
                    className="w-full flex items-center justify-between px-4 py-2"
                  >
                    <span className="flex items-center space-x-2">
                      {getIcon(method.type)}
                      <span className="text-gray-700">Pay with {method.method}</span>
                    </span>
                    {selectedMethod === method.method && <span className="text-purple-500">&#10003;</span>}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                onClick={handlePayInvoice}
                className="w-full bg-purple-500 text-white py-2 rounded-lg"
                disabled={!selectedMethod}
              >
                Pay
              </button>
              <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg mt-2">
                Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodPopup;
