import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the interface for the subscription plan
interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  features: {
    description: string;
    limitations: {
      staffs: number;
      cows: number;
      usageHours: number;
    };
  };
}

const Pricing: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:3000/plans'); // Replace with your backend API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      setError('There was a problem fetching the subscription plans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = (plan: SubscriptionPlan) => {
    navigate('/Signup', { state: { plan } });
  };

  return (
    <div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-primary sm:text-3xl">
              Pricing
            </h2>
            <p className="mt-4 text-xl text-black-400">
              Simple, transparent pricing for your business needs.
            </p>
          </div>
          {loading ? (
            <div className="text-center">
              <p>Loading plans...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300 ${
                    plan.name === 'Free Plan' ? 'bg-green-500' : 'bg-secondary'
                  }`}
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                    <p className="mt-4 text-white">{plan.features.description}</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-3xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="text-xl font-medium text-white">/mo</span>
                  </div>
                  <ul className="mb-8 space-y-4 text-white">
                    <li className="flex items-center">
                      <svg
                        className="h-6 w-6 text-white mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Number of cows: {plan.features.limitations.cows}</span>
                      <span>Number of staffs: {plan.features.limitations.staffs}</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-6 w-6 text-white mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Usage hours: {plan.features.limitations.usageHours} hours</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handleSignUp(plan)}
                    className="block w-full py-3 px-6 text-center rounded-md text-black font-medium bg-white"
                  >
                    Sign Up
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
