import React, { createContext, useState, useContext } from 'react';

export const VaccineMonitorContext = createContext();

export const VaccineMonitorProvider = ({ children }) => {
  const [vaccineMonitors, setVaccineMonitors] = useState([
    { 
      id: 1, 
      date: '2024-01-01', 
      stallNo: 'A1', 
      CowNumber: 'A001',
      note: 'testets',
      reportedBy: 'John Doe', 
      informations: [
        { VaccineName: 'Anthrax - ( 120 Months )', Remarks: 'Done.', GivenTime: '10:20 AM' },
        { VaccineName: 'BDV - ( 60 Months )', Remarks: 'Done', GivenTime: '11:20 AM' },
        { VaccineName: 'Vitamin A - ( 60 Days )', Remarks: 'Done', GivenTime: '04:30 PM' },
        { VaccineName: 'PI3 - ( 120 Days )', Remarks: 'Done', GivenTime: '04:30 PM' },
        { VaccineName: 'BRSV - ( 365 Days )', Remarks: 'Done', GivenTime: '04:30 PM' },
        { VaccineName: 'BVD - ( 90 Days )', Remarks: 'Done', GivenTime: '04:30 PM' },
      ]
    },
    { 
      id: 2, 
      date: '2024-01-02', 
      stallNo: 'B2', 
      CowNumber: 'A002',
      note: 'test the testing note ',
      reportedBy: 'Jane Smith', 
      informations: [
        { VaccineName: 'Anthrax - ( 120 Months )', Remarks: 'Done.', GivenTime: '12:20 AM' },
        { VaccineName: 'BDV - ( 60 Months )', Remarks: 'not ', GivenTime: '10:20 AM' },
        { VaccineName: 'Vitamin A - ( 60 Days )', Remarks: 'Done', GivenTime: '04:30 PM' },
        { VaccineName: 'PI3 - ( 120 Days )', Remarks: 'Done', GivenTime: '14:30 PM' },
        { VaccineName: 'BRSV - ( 365 Days )', Remarks: 'Done', GivenTime: '14:20 PM' },
        { VaccineName: 'BVD - ( 90 Days )', Remarks: 'Done', GivenTime: '04:30 PM' },
      ]
    },
    // Add more mock data as needed
  ]);

  const addVaccineMonitor = (newVaccineMonitor) => {
    const maxId = Math.max(...vaccineMonitors.map(vaccineMonitor => vaccineMonitor.id), 0);
    const newVaccineMonitorWithId = { ...newVaccineMonitor, id: maxId + 1 };
    setVaccineMonitors([...vaccineMonitors, newVaccineMonitorWithId]);
  };

  const editVaccineMonitor = (id, updatedVaccineMonitor) => {
    const updatedVaccineMonitorList = vaccineMonitors.map(item => (item.id === id ? { ...item, ...updatedVaccineMonitor } : item));
    setVaccineMonitors(updatedVaccineMonitorList);
  };

  const deleteVaccineMonitor = (id) => {
    const updatedVaccineMonitors = vaccineMonitors.filter((vaccineMonitor) => vaccineMonitor.id !== id);
    setVaccineMonitors(updatedVaccineMonitors);
  };

  const getVaccineMonitorById = (id) => {
    // Find and return the vaccine monitor with the given ID
    return vaccineMonitors.find((vaccineMonitor) => vaccineMonitor.id === id);
  };

  const value = {
    vaccineMonitors,
    addVaccineMonitor,
    editVaccineMonitor,
    deleteVaccineMonitor,
    getVaccineMonitorById,
  };

  return <VaccineMonitorContext.Provider value={value}>{children}</VaccineMonitorContext.Provider>;
};

export const useVaccineMonitor = () => {
  const context = useContext(VaccineMonitorContext);
  if (!context) {
    throw new Error('useVaccineMonitor must be used within a VaccineMonitorProvider');
  }
  return context;
}
