import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPaypal: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation and then send data to backend
    // Here you can call your backend endpoint to save the PayPal info

    navigate('/payment-methods');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Add PayPal</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">PayPal Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Save PayPal
        </button>
      </form>
    </div>
  );
};

export default AddPaypal;
