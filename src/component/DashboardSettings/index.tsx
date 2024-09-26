import React from 'react';

interface DashboardSettingsProps {
  visibleItems: number[]; // Accept visibleItems prop
  onToggle: (itemId: number, isVisible: boolean) => void; // Accept onToggle prop
}

const DashboardSettings: React.FC<DashboardSettingsProps> = ({ visibleItems, onToggle }) => {
  const items = [
    { id: 1, title: 'Dashboard' },
    { id: 2, title: 'Manage Cow' },
    { id: 3, title: 'Manage Cow Calf' },
    { id: 4, title: 'Suppliers' },
    { id: 5, title: 'Manage Stall' },
    { id: 6, title: 'Farm Expense' },
    { id: 7, title: 'Collect Milk' },
    { id: 8, title: 'Sale Milk' },
    { id: 9, title: 'Today Collected Milk' },
    { id: 10, title: 'Today Sold Milk' },
    { id: 11, title: 'Today Collected Milk Amount' },
    { id: 12, title: 'Today Sold Milk Amount' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="mt-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`item-${item.id}`}
              onChange={(e) => onToggle(item.id, e.target.checked)}
              checked={visibleItems.includes(item.id)} // Check if item is visible
            />
            <label htmlFor={`item-${item.id}`} className="ml-2">
              {item.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSettings;
