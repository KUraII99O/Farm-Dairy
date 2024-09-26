import React from "react";

interface DashboardSettingsProps {
  onToggle?: (itemId: number, isVisible: boolean) => void;
  visibleItems: number[];
}

const DashboardSettings: React.FC<DashboardSettingsProps> = ({ onToggle, visibleItems }) => {
  const items = [
    { id: 1, title: "Dashboard" },
    { id: 2, title: "Manage Cow" },
    { id: 3, title: "Manage Cow Calf" },
    { id: 4, title: "Suppliers" },
    { id: 5, title: "Manage Stall" },
    { id: 6, title: "Farm Expense" },
    { id: 7, title: "Collect Milk" },
    { id: 8, title: "Sale Milk" },
    { id: 9, title: "Today Collected Milk" },
    { id: 10, title: "Today Sold Milk" },
    { id: 11, title: "Today Collected Milk Amount" },
    { id: 12, title: "Today Sold Milk Amount" },
  ];

  const handleToggle = (itemId: number) => {
    const isCurrentlyVisible = visibleItems.includes(itemId);
    if (onToggle) {
      onToggle(itemId, !isCurrentlyVisible); // Toggle the visibility
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <label>
              <input 
                type="checkbox" 
                checked={visibleItems.includes(item.id)} 
                onChange={() => handleToggle(item.id)} 
              />
              {item.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSettings;
