import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCreditCard: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation for card number (16 digits), expiry date (MM/YY), and CVV (3 digits)
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      alert('Please enter a valid expiry date (MM/YY format).');
      return;
    }

    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
      alert('Please enter a valid 3-digit CVV.');
      return;
    }

    // Simulate sending data to backend (replace with actual backend call)
    setTimeout(() => {
      alert('Credit card saved successfully.');
      navigate('/payment-methods');
    }, 1000); // Simulating delay for async operation
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Credit Card</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              required
              placeholder="Enter your card number"
            />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block text-gray-700">Expiry Date (MM/YY)</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              required
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-gray-700">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              required
              placeholder="Enter CVV"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-300">
            Save Credit Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCreditCard;