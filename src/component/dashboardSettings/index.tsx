import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define an interface for the dashboard items
interface DashboardItem {
  id: number;
  title: string;
  // Add other properties as needed
}

const DashboardSettings: React.FC = () => {
  const [items, setItems] = useState<DashboardItem[]>([]); // Define the type here
  const [visibleItems, setVisibleItems] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // Fetch data from the backend
    fetch("https://auth-api-woad.vercel.app/api/dashboard-data") // Replace with your backend URL
      .then((response) => response.json())
      .then((data: DashboardItem[]) => { // Specify the type for data
        setItems(data);
        // Initialize all items as visible
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
    setVisibleItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle visibility
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard Settings</h1>
      <div>
        {items.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={visibleItems[item.id]}
              onChange={() => handleCheckboxChange(item.id)}
              className="mr-2"
            />
            <label>{item.title}</label>
          </div>
        ))}
      </div>
      <Link to="/dashboard" className="mt-4 inline-block bg-blue-500 text-white p-2 rounded">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default DashboardSettings;
