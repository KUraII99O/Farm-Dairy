import React, { useState, useEffect } from 'react';

interface Plan {
  id: number;
  name: string;
  price: string;
  features: string;
}

const Subscription: React.FC = () => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = () => {
      try {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
          const loggedInUser = JSON.parse(storedUser);
          if (loggedInUser && loggedInUser.plan) {
            setPlan(loggedInUser.plan);
          } else {
            setError('No plan found for the logged-in user');
          }
        } else {
          setError('No logged-in user found');
        }
      } catch (err) {
        setError('Failed to fetch subscription plan');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  const handleUpgrade = () => {
    // Add upgrade logic here
    alert('Upgrade button clicked!');
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Your Subscription Plan</h1>
      <p className="text-lg mb-2">Plan Name: <strong>{plan?.name}</strong></p>
      <p className="text-lg mb-2">Price: <strong>${plan?.price}</strong></p>
      <p className="text-lg mb-4">Features: <strong>{plan?.features}</strong></p>
      <button
        onClick={handleUpgrade}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Upgrade
      </button>
    </div>
  );
};

export default Subscription;
