import React, { useState } from 'react';
import DashboardSettings from '../../component/DashboardSettings'; // Adjust the path as necessary

const DashboardSettingsPage: React.FC = () => {
  // Initialize the visibility state with all items visible
  const [visibleItems, setVisibleItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  // Function to toggle visibility of dashboard items
  const handleToggle = (itemId: number, isVisible: boolean) => {
    setVisibleItems((prev) => {
      if (isVisible) {
        return [...prev, itemId]; // Add item if checked
      } else {
        return prev.filter(id => id !== itemId); // Remove item if unchecked
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Settings</h1>
      <DashboardSettings
        visibleItems={visibleItems} // Pass the visibility state
        onToggle={handleToggle} // Pass the toggle function
      />
    </div>
  );
};

export default DashboardSettingsPage;
