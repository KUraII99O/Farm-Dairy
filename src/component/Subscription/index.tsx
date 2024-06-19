import React, { useState, useEffect } from 'react';
import CompareDrawer from '../ComparePlan';
import UpgradeDrawer from '../UpgradePlan';

interface Plan {
  id: number;
  name: string;
  price: string;
  features: {
    description: string;
    limitations: {
      cows: number;
      usageHours: number;
    };
  };
}

const SubscriptionDetails: React.FC = () => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

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

    const fetchAllPlans = async () => {
      try {
        const response = await fetch('http://localhost:3000/plans');
        const data = await response.json();
        setAllPlans(data);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
      }
    };

    fetchPlan();
    fetchAllPlans();
  }, []);

  const toggleCompareDrawer = () => setCompareOpen(!compareOpen);
  const toggleUpgradeDrawer = () => setUpgradeOpen(!upgradeOpen);

  const handleUpgrade = (selectedPlanId: number) => {
    alert(`Upgrade to plan with ID: ${selectedPlanId}`);
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-4">Your Subscription Plan</h1>
      <p className="text-lg text-black mb-4">Plan Name: <strong>{plan?.name}</strong></p>
      <div className="text-left mb-4 text-black">
        <ul className="list-disc pl-4">
          <li>Description: {plan?.features.description}</li>
          <li>Number of cows: {plan?.features.limitations.cows}</li>
          <li>Usage hours: {plan?.features.limitations.usageHours} hours</li>
        </ul>
      </div>
      <button
        onClick={toggleCompareDrawer}
        className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition duration-200 mr-4"
      >
        Compare
      </button>
      <button
        onClick={toggleUpgradeDrawer}
        className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition duration-200 mr-4"
      >
        Upgrade Plan
      </button>
      {compareOpen && <CompareDrawer plan={plan} onClose={toggleCompareDrawer} allPlans={allPlans} />}
      {upgradeOpen && <UpgradeDrawer plan={plan} onClose={toggleUpgradeDrawer} allPlans={allPlans} onUpgrade={handleUpgrade} />}
    </div>
  );
};

export default SubscriptionDetails;
