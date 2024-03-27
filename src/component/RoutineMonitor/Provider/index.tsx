import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export const RoutineMonitorContext = createContext<any>(null);

interface RoutineMonitor {
  id: number;
  date: string;
  StallNo: string;
  healthStatus: string;
  note: number;
  reportedBy: string;
  quantity: number;
  ServiceName: string;
  Result: string;
  MonitoringTime: string;
}

export const RoutineMonitorProvider: React.FC = ({ children }) => {
  const [routineMonitors, setRoutineMonitors] = useState<RoutineMonitor[]>([]);

  useEffect(() => {
    const fetchRoutineMonitors = async () => {
      try {
        const response = await fetch('http://localhost:3000/routineMonitors');
        if (!response.ok) {
          throw new Error('Failed to fetch routine Monitors data');
        }
        const data = await response.json();
        setRoutineMonitors(data);
      } catch (error) {
        console.error('Error fetching routine Monitors data:', error.message);
      }
    };

    fetchRoutineMonitors();
  }, []);

  const addRoutineMonitor = async (newRoutineMonitor: Omit<RoutineMonitor, 'id'>) => {
    try {
      const id = routineMonitors.length + 1;
      const routineMonitorWithId: RoutineMonitor = { id, ...newRoutineMonitor };

      const response = await fetch('http://localhost:3000/routineMonitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routineMonitorWithId),
      });

      if (!response.ok) {
        throw new Error('Failed to add routine Monitor');
      }

      setRoutineMonitors([...routineMonitors, routineMonitorWithId]);
      toast.success('Routine Monitor added successfully');
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to add Routine Monitor');
    }
  };

  const editRoutineMonitor = (id: number, updatedRoutineMonitor: Partial<RoutineMonitor>) => {
    const updatedRoutineMonitorList = routineMonitors.map(item =>
      item.id === id ? { ...item, ...updatedRoutineMonitor } : item
    );
    setRoutineMonitors(updatedRoutineMonitorList);
  };

  const deleteRoutineMonitor = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/routineMonitors/${id}`, {
        method: 'DELETE',
      });

      const updatedRoutineMonitors = routineMonitors.filter(routineMonitor => routineMonitor.id !== id);
      setRoutineMonitors(updatedRoutineMonitors);
      toast.success('Routine Monitor deleted successfully');
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to delete Routine Monitor');
    }
  };

  const getRoutineMonitorById = (id: number) => {
    // Find and return the routine monitor with the given ID
    return routineMonitors.find(routineMonitor => routineMonitor.id === id);
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
