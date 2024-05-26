import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  features: string;
}
const Pricing: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
      fetchPlans();
  }, []);

  const fetchPlans = async () => {
      try {
          const response = await fetch('http://localhost:5000/plans');
          const data = await response.json();
          setPlans(data);
      } catch (error) {
          console.error(error);
      }
  };

  const handleSignIn = (plan: SubscriptionPlan) => {
      setSelectedPlan(plan);
      navigate('/Signup', { state: { plan } });
  };

  return (
      <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">User Interface</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map((plan: SubscriptionPlan) => (
                  <div key={plan.id} className="p-4 border border-gray-400 rounded shadow-md">
                      <p className="font-semibold text-lg">{plan.name}</p>
                      <p>Price: {plan.price}</p>
                      <p>Features: {plan.features}</p>
                      <button
                          onClick={() => handleSignIn(plan)}
                          className="mt-4 bg-blue-500 text-white p-2 rounded"
                      >
                          Sign In
                      </button>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default Pricing;
