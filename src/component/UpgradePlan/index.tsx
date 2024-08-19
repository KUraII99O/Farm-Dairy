import React, { useState } from 'react';

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

interface UpgradeDrawerProps {
  plan: Plan | null;
  onClose: () => void;
  allPlans: Plan[];
  onUpgrade: (selectedPlanId: number) => void; // Callback to handle upgrade
}

const UpgradeDrawer: React.FC<UpgradeDrawerProps> = ({ plan, onClose, allPlans, onUpgrade }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlanSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedPlanId(selectedId);
  };

  const handleUpgrade = () => {
    if (selectedPlanId !== null) {
      setIsLoading(true);
      try {
        // Perform any necessary client-side operations (e.g., updating state)
        onUpgrade(selectedPlanId); // Trigger the upgrade action (e.g., state change)
        setIsLoading(false);
        onClose(); // Close the drawer or handle UI state change
      } catch (error) {
        setIsLoading(false);
        setError('Failed to upgrade plan. Please try again later.');
        console.error('Error upgrading plan:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="bg-gray-900 bg-opacity-50 w-full" onClick={onClose}></div>
      <div className="bg-white w-96 h-full shadow-lg flex flex-col p-6 text-black relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Upgrade Plan</h2>
        <div className="mb-4">
          <label htmlFor="upgrade-plans" className="block text-sm font-medium text-gray-700 mb-2">
            Select a Plan to Upgrade:
          </label>
          <select
            id="upgrade-plans"
            name="upgrade-plans"
            value={selectedPlanId || ''}
            onChange={handlePlanSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select a plan...</option>
            {allPlans.map((p) => (
              p.id !== plan?.id && <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        {selectedPlanId && (
          <div className="mb-4">
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
        {isLoading ? (
          <p className="text-center my-4">Loading...</p>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={handleUpgrade}
              className="bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary transition duration-200"
              disabled={!selectedPlanId}
            >
              Upgrade to Selected Plan
            </button>
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default UpgradeDrawer;