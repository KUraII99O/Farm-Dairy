// src/components/DashboardSettings.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface DashboardItem {
  id: number;
  title: string;
}

const DashboardSettings: React.FC = () => {
  const [items, setItems] = useState<DashboardItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetch("https://auth-api-woad.vercel.app/api/dashboard-data") // Replace with your backend URL
      .then((response) => response.json())
      .then((data: DashboardItem[]) => {
        setItems(data);
        const initialVisibility = data.reduce((acc: { [key: number]: boolean }, item) => {
          acc[item.id] = true; // Set all items to visible by default
          return acc;
        }, {});
        setVisibleItems(initialVisibility);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  const handleCheckboxChange = (id: number) => {
    setVisibleItems((prev) => {
      const newVisibility = { ...prev, [id]: !prev[id] }; // Toggle visibility
      console.log("New Visibility State:", newVisibility); // Debugging line
      return newVisibility;
    });
  };

  const handleConfirm = () => {
    // Logic for confirming changes (e.g., save to backend)
    console.log("Confirmed Visibility Settings:", visibleItems);
    alert("Your settings have been saved!");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Dashboard Settings</h1>
      <div className="mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={visibleItems[item.id]} // Should reflect current state
              onChange={() => handleCheckboxChange(item.id)}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-lg">{item.title}</label>
          </div>
        ))}
      </div>
      <button 
        onClick={handleConfirm}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
      >
        Confirm Changes
      </button>
      <Link to="/dashboard" className="mt-4 inline-block ml-4 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default DashboardSettings;
