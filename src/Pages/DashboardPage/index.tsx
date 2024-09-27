import React from 'react';
import Dashboard from '../../component/Dashboard';
import ExpenseHistory from '../../component/ExpenseHistoryTable';
import SaleHistory from '../../component/SaleHistoryTable';
import CowFeedChart from '../../component/CowFeedcharts';
import { useTranslation } from '../../component/Translator/Provider';

interface DashboardPageProps {
  visibleItems: number[]; // This prop is required
}

const DashboardPage: React.FC<DashboardPageProps> = ({ visibleItems }) => {
  const { translate } = useTranslation(); // Use the translation hook or context
  
  // Assuming you have a variable isRTL indicating right-to-left language direction
  const isRTL = false; // Set to true if the language is right-to-left

  const cowFeedChartData = [
    { 
      stallNumber: `${translate('Stall')}-001`, 
      grass: `${translate('Quantity')}: 10.00 ${translate('Gram')}`, 
      salt: `${translate('Quantity')}: 1.00 ${translate('Gram')}`, 
      water: `${translate('Quantity')}: 5.00 ${translate('KG')} ${translate('Time')}: 10:30 AM` 
    },
    { 
      stallNumber: `${translate('Stall')}-002`, 
      grass: `${translate('Quantity')}: 10.00 ${translate('KG')}`, 
      salt: `${translate('Quantity')}: 1.00 ${translate('KG')}`, 
      water: `${translate('Quantity')}: 5.00 ${translate('KG')} ${translate('Time')}: 10:30 AM` 
    },
    { 
      stallNumber: `${translate('Stall')}-003`, 
      grass: `${translate('Quantity')}: 25.00 ${translate('KG')}`, 
      salt: `${translate('Quantity')}: 20.00 ${translate('KG')}`, 
      water: '' 
    },
    { 
      stallNumber: `${translate('Stall')}-004`, 
      grass: '', 
      salt: '', 
      water: `${translate('Quantity')}: 10.00 ${translate('KG')} ${translate('Time')}: 10:30 AM` 
    },
  ];

  return (
    <div>
      <Dashboard visibleItems={visibleItems} /> {/* Pass visibleItems to Dashboard */}
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row space-y-4 md:space-y-0 lg:space-y-0 xl:space-y-0 space-x-0 md:space-x-4 lg:space-x-4 xl:space-x-4">
        <div className={`w-full md:w-1/2 lg:w-1/2 xl:w-1/2 ${isRTL ? 'md:order-2 lg:order-2 xl:order-2' : ''}`}>
          <ExpenseHistory className={isRTL ? 'pr-4' : 'pl-4'} />
        </div>
        <div className={`w-full md:w-1/2 lg:w-1/2 xl:w-1/2 ${isRTL ? 'md:order-1 lg:order-1 xl:order-1' : ''}`}>
          <SaleHistory className={isRTL ? 'pr-4' : 'pl-4'} />
        </div>
      </div>
      <CowFeedChart data={cowFeedChartData} />
    </div>
  );
};

// Default props for visibleItems
DashboardPage.defaultProps = {
  visibleItems: [1, 2, 3, 4, 5], // Default set of visible items
};

export default DashboardPage;
