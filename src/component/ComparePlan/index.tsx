import React, { useState, useEffect } from 'react';

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

interface CompareDrawerProps {
  plan: Plan | null;
  onClose: () => void;
  allPlans: Plan[];
}

const CompareDrawer: React.FC<CompareDrawerProps> = ({ plan, onClose, allPlans }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const handlePlanSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedPlanId(selectedId);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).id === 'compare-drawer-overlay') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div id="compare-drawer-overlay" className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 text-black w-full max-w-4xl mx-auto flex relative">
        <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 hover:text-gray-900 transition duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-bold mb-4">Compare Plans</h2>
          <label htmlFor="compare-plans" className="block text-sm font-medium text-gray-700 mb-2">
            Select a Plan to Compare:
          </label>
          <select
            id="compare-plans"
            name="compare-plans"
            value={selectedPlanId || ''}
            onChange={handlePlanSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select a plan...</option>
            {allPlans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {selectedPlanId && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Selected Plan Details:</h3>
              <p>Plan Name: <strong>{allPlans.find(p => p.id === selectedPlanId)?.name}</strong></p>
              <p>Price: ${allPlans.find(p => p.id === selectedPlanId)?.price}</p>
              <p>Description: {allPlans.find(p => p.id === selectedPlanId)?.features.description}</p>
              <p>Limitations:</p>
              <ul className="list-disc pl-4">
                <li>Number of cows: {allPlans.find(p => p.id === selectedPlanId)?.features.limitations.cows}</li>
                <li>Usage hours: {allPlans.find(p => p.id === selectedPlanId)?.features.limitations.usageHours} hours</li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-1/2 pl-4 border-l border-gray-300">
          <h2 className="text-xl font-bold mb-4">Current Plan</h2>
          <p className="text-lg mb-4">Plan Name: <strong>{plan?.name}</strong></p>
          <p className="text-lg mb-4">Price: ${plan?.price}</p>
          <p className="text-lg mb-4">Features:</p>
          <ul className="list-disc pl-4 mb-4">
            <li>Description: {plan?.features.description}</li>
            <li>Limitations:</li>
            <ul className="list-disc pl-4">
              <li>Number of cows: {plan?.features.limitations.cows}</li>
              <li>Usage hours: {plan?.features.limitations.usageHours} hours</li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompareDrawer;
