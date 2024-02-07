import React from 'react';

interface DashboardItemProps {
  item: {
    id: number;
    title: string;
    icon?: React.ReactNode;
    color: string;
    value: string;
  };
}

const DashboardItem: React.FC<DashboardItemProps> = ({ item }) => {
  return (
    <div className={`flex items-center bg-white border rounded-sm overflow-hidden shadow`} key={item.id}>
      <div className={`p-4 w-1/6 ${item.color} flex items-center justify-center`}>
        {item.icon && (
          <div className="h-16 w-16 text-white item-center">
            {React.cloneElement(item.icon as React.ReactElement, {
              style: { transform: 'scale(2)' }, 
            })}
          </div>
        )}
      </div>
      <div className="w-5/6 pl-4 bg-white">
        <div className="font-bold">{item.title}</div>
        <p className="text-3xl">{item.value}</p>
      </div>
    </div>
  );
};

export default DashboardItem;
