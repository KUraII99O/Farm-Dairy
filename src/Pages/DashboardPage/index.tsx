import React from 'react';
import Dashboard from '../../component/Dashboard';
import ExpenseHistory from '../../component/ExpenseHistoryTable';
import SaleHistory from '../../component/SaleHistoryTable';
import CowFeedChart from '../../component/CowFeed';




  const cowFeedChartData = [
    { stallNumber: 'Stall-001', grass: 'Quantity: 10.00 Gram Time: 8:00 AM', salt: 'Quantity: 1.00 Gram Time: 10:00 AM', water: 'Quantity: 5.00 KG Time: 10:30 AM' },
    { stallNumber: 'Stall-002', grass: 'Quantity: 10.00 KG Time: 8:00 AM', salt: 'Quantity: 1.00 KG Time: 04:30 PM', water: 'Quantity: 5.00 KG Time: 10:30 AM' },
    { stallNumber: 'Stall-003', grass: 'Quantity: 25.00 KG Time: 8:00 AM', salt: 'Quantity: 20.00 KG Time: 10:00 AM', water: '' },
    { stallNumber: 'Stall-004', grass: '', salt: '', water: 'Quantity: 10.00 KG Time: 10:30 AM' },
  ];
const DashboardPage: React.FC = () => (
  <div>
    <Dashboard />
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <ExpenseHistory  />
      </div>
      <div style={{ flex: 1 }}>
        <SaleHistory  />
      </div>

    </div>
    <CowFeedChart data={cowFeedChartData} />

  </div>
);

export default DashboardPage;
