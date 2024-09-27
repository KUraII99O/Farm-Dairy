import React from 'react';

interface DashboardSettingsProps {
  visibleItems: number[];
  handleToggle: (itemId: number, isVisible: boolean) => void;
}

const DashboardSettings: React.FC<DashboardSettingsProps> = ({ visibleItems, handleToggle }) => {
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Settings</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={visibleItems.includes(item.id)}
                onChange={(e) => handleToggle(item.id, e.target.checked)}
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
