import React from 'react';

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
    <div className={`flex items-center bg-white border rounded-sm overflow-hidden shadow `} key={item.id}>
      <div className={`p-4 w-1/6 ${item.color} flex items-center justify-center `}>
        {item.icon && (
          <div className="h-16 w-16 text-white pt-5">
            {React.cloneElement(item.icon as React.ReactElement, {
              style: { transform: 'scale(2)' }, 
            })}
          </div>
        )}
      </div>
      
      
      <div className={`w-5/6 pl-4 ${isRTL ? 'text-right' : ''}`}> {/* Added conditional class for RTL */}
      <p className={`text-xl ${isRTL ? 'mr-2' : ''}`}>
        <div className="">{item.title}</div>
        
          <span className={`${isRTL ? 'mr-2' : ''}`}>{item.value}</span>
        </p> {/* Added conditional margin class for RTL */}
      </div>
    </div>
  );
};

export default DashboardItem;
