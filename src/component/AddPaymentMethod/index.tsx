import React, { useState } from 'react';

interface CreditCardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface PayPalDetails {
  email: string;
}

interface BankDetails {
  accountNumber: string;
  bankName: string;
}

type PaymentMethodDetails = CreditCardDetails | PayPalDetails | BankDetails;

const AddPaymentMethod: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [methodDetails, setMethodDetails] = useState<Partial<PaymentMethodDetails>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(event.target.value);
    setMethodDetails({});
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMethodDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        throw new Error("User not logged in");
      }

      const user = JSON.parse(loggedInUser);
      if (!user || !user.id) {
        throw new Error("User ID not found");
      }

      let endpoint = '';
      switch (selectedMethod) {
        case 'creditCard':
          endpoint = `/users/${user.id}/payment-methods/credit-card`;
          break;
        case 'paypal':
          endpoint = `/users/${user.id}/payment-methods/paypal`;
          break;
        case 'bank':
          endpoint = `/users/${user.id}/payment-methods/bank`;
          break;
        default:
          throw new Error("Invalid payment method type");
      }

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(methodDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to add payment method");
      }

      // Redirect to payment methods page or display success message
      window.location.href = '/settings'; // Adjust this as needed
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (selectedMethod) {
      case 'creditCard':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="expiryDate" className="block text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cvv" className="block text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </>
        );
      case 'paypal':
        return (
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">PayPal Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        );
      case 'bank':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bankName" className="block text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Add Payment Method</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="payment-method" className="block text-gray-700 mb-2">Select Payment Method</label>
            <select
              id="payment-method"
              value={selectedMethod}
              onChange={handleMethodChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="" disabled>Select a payment method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          {renderFormFields()}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Add Payment Method'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
