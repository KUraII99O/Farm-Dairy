import React from 'react';
import { Tooltip } from 'flowbite-react'; // Import the Tooltip from Flowbite

interface DashboardItemProps {
  item: {
    id: number;
    title: string;
    icon?: React.ReactNode;
    color: string;
    value: string;
  };
  isRTL: boolean; // Added prop to indicate RTL language
}

const DashboardItem: React.FC<DashboardItemProps> = ({ item, isRTL }) => {
  return (
    <div className={`flex items-center bg-white border rounded-sm overflow-hidden shadow`} key={item.id}>
      <div className={`p-4 w-1/6 ${item.color} flex items-center justify-center`}>
        {item.icon && (
          <div className="h-16 w-16 text-white pt-5">
            {React.cloneElement(item.icon as React.ReactElement, {
              style: { transform: 'scale(2)' },
            })}
          </div>
        )}
      </div>
      
      <div className={`w-5/6 pl-4 ${isRTL ? 'text-right' : ''}`}>
        <p className={`text-xl ${isRTL ? 'mr-2' : ''}`}>
          <Tooltip content={`More info about ${item.title}`} style="light">
            <span>{item.title}</span>
          </Tooltip>
          <span className={`${isRTL ? 'mr-2' : ''}`}>{item.value}</span>
        </p>
      </div>
    </div>
  );
};

export default DashboardItem;
