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
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
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
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        setAllPlans(data);
      } catch (err) {
        setError('Failed to fetch all plans');
      }
    };

    fetchPlan();
    fetchAllPlans();
  }, []);

  const handleUpgrade = async (selectedPlanId: number) => {
    try {
      setLoading(true);
  
      const storedUser = localStorage.getItem('loggedInUser');
      if (!storedUser) {
        setError('No logged-in user found');
        setLoading(false);
        return;
      }
  
      const loggedInUser = JSON.parse(storedUser);
      const loggedInUserId = loggedInUser.id; // Adjust to how your user ID is stored
  
      const response = await fetch(`http://localhost:3000/upgrade/${loggedInUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId: selectedPlanId }),
      });
  
      if (response.ok) {
        const updatedPlan = allPlans.find(p => p.id === selectedPlanId);
        if (updatedPlan) {
          setPlan(updatedPlan); // Update local state with the new plan
          loggedInUser.plan = updatedPlan; // Optionally update logged-in user's plan
          localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser)); // Update localStorage
        }
        setIsUpgradeOpen(false); // Close upgrade drawer
      } else {
        const errorMessage = await response.text();
        if (response.status === 404 && errorMessage === 'User not found') {
          setError('User not found. Please log in again.');
        } else {
          setError(`Failed to upgrade plan: ${errorMessage}`);
        }
        console.error('Upgrade request failed:', response.status, errorMessage);
      }
    } catch (error) {
      setError('Failed to upgrade plan. Please try again later.');
      console.error('Error upgrading plan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-4">Your Subscription Plan</h1>
      <p className="text-lg text-black mb-4">Plan Name: <strong>{plan?.name}</strong></p>
      
      <button
        onClick={() => setIsCompareOpen(true)}
        className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition duration-200 mr-4"
      >
        Compare
      </button>
      <button
        onClick={() => setIsUpgradeOpen(true)}
        className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition duration-200 mr-4"
      >
        Upgrade
      </button>
      {isCompareOpen && (
        <CompareDrawer
          plan={plan}
          onClose={() => setIsCompareOpen(false)}
          allPlans={allPlans}
        />
      )}
      {isUpgradeOpen && (
        <UpgradeDrawer
          plan={plan}
          onClose={() => setIsUpgradeOpen(false)}
          allPlans={allPlans}
          onUpgrade={handleUpgrade}
        />
      )}
    </div>
  );
};

export default SubscriptionDetails;
