import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaPaypal, FaUniversity } from 'react-icons/fa';

interface PaymentMethodPopupProps {
  onClose: () => void;
  invoiceId: number;
}

const PaymentMethodPopup: React.FC<PaymentMethodPopupProps> = ({ onClose, invoiceId }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [hasPaymentMethod, setHasPaymentMethod] = useState<boolean>(false);

  useEffect(() => {
    const fetchPaymentMethodStatus = async () => {
      try {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
          throw new Error("User not logged in");
        }

        const user = JSON.parse(loggedInUser);
        if (!user || !user.id) {
          throw new Error("User ID not found");
        }

        const response = await fetch(`http://localhost:3000/users/${user.id}/payment-method`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment method status");
        }

        const data = await response.json();
        setHasPaymentMethod(data.hasPaymentMethod);
        if (data.hasPaymentMethod) {
          setSelectedMethod(data.method); // Set the existing payment method
        }
      } catch (error) {
        console.error("Error fetching payment method status:", error);
      }
    };

    fetchPaymentMethodStatus();
  }, []);

  const handlePaymentSelection = (method: string) => {
    setSelectedMethod(method);
  };

  const handleContinue = async () => {
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

        const response = await fetch(`http://localhost:3000/users/${user.id}/payment-method`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ method: selectedMethod }),
        });

        if (!response.ok) {
          throw new Error("Failed to save payment method");
        }

        console.log(`Processing ${selectedMethod} payment for invoice ID: ${invoiceId}`);
        onClose();
      } catch (error) {
        console.error("Error saving payment method:", error);
      }
    }
  };

  const paymentMethods = [
    { name: 'Credit Card', icon: <FaCreditCard className="w-6 h-6" /> },
    { name: 'PayPal', icon: <FaPaypal className="w-6 h-6" /> },
    { name: 'Bank Transfer', icon: <FaUniversity className="w-6 h-6" /> },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-2 text-green-600">Select payment method</h2>
        <p className="text-sm text-gray-500 mb-4">Preferred method with secure transactions.</p>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 text-lg">&times;</button>
        <ul className="space-y-4">
          {paymentMethods.map((method) => (
            <li key={method.name} className={`border rounded-lg ${selectedMethod === method.name ? 'border-purple-500' : 'border-gray-200'} hover:bg-gray-100 cursor-pointer`}>
              <button
                onClick={() => handlePaymentSelection(method.name)}
                className="w-full flex items-center justify-between px-4 py-2"
              >
                <span className="flex items-center space-x-2">
                  {method.icon}
                  <span className="text-gray-700">Pay with {method.name}</span>
                </span>
                {selectedMethod === method.name && <span className="text-purple-500">&#10003;</span>}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <button
            onClick={handleContinue}
            className="w-full bg-purple-500 text-white py-2 rounded-lg mb-2"
            disabled={!selectedMethod}
          >
            {hasPaymentMethod ? 'Continue' : 'Add Payment Method'}
          </button>
          <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPopup;
