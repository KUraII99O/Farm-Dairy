// DashboardSettingsPage.tsx
import React, { useState } from 'react';
import DashboardSettings from '../../component/DashboardSettings';
import DashboardPage from '../DashboardPage';

const DashboardSettingsPage: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  const handleToggle = (itemId: number, isVisible: boolean) => {
    setVisibleItems((prev) => {
      if (isVisible) {
        return [...prev, itemId];
      } else {
        return prev.filter(id => id !== itemId);
      }
    });
  };

  return (
    <div>
      <DashboardSettings
        visibleItems={visibleItems}
        handleToggle={handleToggle}
      />
      <DashboardPage visibleItems={visibleItems} /> {/* Pass visibleItems to DashboardPage */}
    </div>
  );
};

export default DashboardSettingsPage;
