import React, { createContext, useState, useContext } from 'react';

export const RoutineMonitorContext = createContext();

export const RoutineMonitorProvider = ({ children }) => {
  const [routineMonitors, setRoutineMonitors] = useState([
    { 
      id: 1, 
      date: '2024-01-01', 
      stallNo: 'A1', 
      animalID: 'A001',
      note:'testets' ,
      healthStatus: 'Healthy', 
      reportedBy: 'John Doe', 
      informations: [
        { ServiceName: 'Monitoring', Result: 'Done', MonitoringTime: '10:00' },
        { ServiceName: 'Monthly Tika', Result: 'Done', MonitoringTime: '10:00' },
        { ServiceName: 'Weekly Tika', Result: 'Done', MonitoringTime: '10:00' },
      ]
    },
    { 
      id: 2, 
      date: '2024-01-02', 
      stallNo: 'B2', 
      animalID: 'A002',
      note:'test the testing note '  ,
      healthStatus: 'Sick', 
      reportedBy: 'Jane Smith', 
      informations: [
        { ServiceName: 'Monitoring', Result: 'Done', MonitoringTime: '10:00' },
        { ServiceName: 'Monthly Tika', Result: 'Done', MonitoringTime: '10:00' },
        { ServiceName: 'Weekly Tika', Result: 'Done', MonitoringTime: '10:00' },
      ]
    },
    // Add more mock data as needed
    { 
      id: 3, 
      date: '2024-01-02', 
      stallNo: 'B2', 
      animalID: 'A002',
      note:'same testinfg test '  , 
      healthStatus: 'Sick', 
      reportedBy: 'Jane Smith', 
      informations: [
        { ServiceName: 'Monitoring', Result: 'Done', MonitoringTime: '10:00' },
        { ServiceName: 'Monthly Tika', Result: 'Done', MonitoringTime: '10:00' },
        { ServiceName: 'Weekly Tika', Result: 'Done', MonitoringTime: '10:00' },
      ]
    },
    // Add more mock data as needed
  ]);

  const addRoutineMonitor = (newRoutineMonitor) => {
    const maxId = Math.max(...routineMonitors.map(routineMonitor => routineMonitor.id), 0);
    const newRoutineMonitorWithId = { ...newRoutineMonitor, id: maxId + 1 };
    setRoutineMonitors([...routineMonitors, newRoutineMonitorWithId]);
  };

  const editRoutineMonitor = (id, updatedRoutineMonitor) => {
    const updatedRoutineMonitorList = routineMonitors.map(item => (item.id === id ? { ...item, ...updatedRoutineMonitor } : item));
    setRoutineMonitors(updatedRoutineMonitorList);
  };

  const deleteRoutineMonitor = (id) => {
    const updatedRoutineMonitors = routineMonitors.filter((routineMonitor) => routineMonitor.id !== id);
    setRoutineMonitors(updatedRoutineMonitors);
  };

  const getRoutineMonitorById = (id) => {
    // Find and return the routine monitor with the given ID
    return routineMonitors.find((routineMonitor) => routineMonitor.id === id);
  };

  const value = {
    routineMonitors,
    addRoutineMonitor,
    editRoutineMonitor,
    deleteRoutineMonitor,
    getRoutineMonitorById,
  };

  return <RoutineMonitorContext.Provider value={value}>{children}</RoutineMonitorContext.Provider>;
};

export const useRoutineMonitor = () => {
  const context = useContext(RoutineMonitorContext);
  if (!context) {
    throw new Error('useRoutineMonitor must be used within a RoutineMonitorProvider');
  }
  return context;
};
