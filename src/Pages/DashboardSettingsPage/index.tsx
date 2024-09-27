import React, { useState } from 'react';
import DashboardSettings from '../../component/DashboardSettings';

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
    <DashboardSettings
      visibleItems={visibleItems} // Pass the visibility state
      handleToggle={handleToggle} // Pass the correct prop
      />
  );
};

export default DashboardSettingsPage;
