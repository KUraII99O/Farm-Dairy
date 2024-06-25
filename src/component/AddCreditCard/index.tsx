import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCreditCard: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simple validation for card number (16 digits), expiry date (MM/YY), and CVV (3 digits)
      if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        throw new Error('Please enter a valid 16-digit card number.');
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        throw new Error('Please enter a valid expiry date (MM/YY format).');
      }

      if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
        throw new Error('Please enter a valid 3-digit CVV.');
      }

      // Prepare data to send to the backend
      const creditCardData = {
        cardNumber,
        expiryDate,
        cvv,
      };

      const response = await fetch('http://localhost:3000/credit-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creditCardData),
      });

      if (!response.ok) {
        throw new Error('Failed to save credit card. Please try again.');
      }

      // If successful, notify user and navigate to payment methods page
      alert('Credit card saved successfully.');
      navigate('/settings');
    } catch (error) {
      console.error('Error saving credit card:', error.message);
      alert(error.message);
    }
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
