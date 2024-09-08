import React, { createContext, useState, useEffect, useContext } from "react";
import { Monitoring, MonitoringService } from "../MonitoringService"; // Updated import

interface ManageMonitoringContextProps {
  monitorings: Monitoring[];
  addMonitoring: (newMonitoring: Omit<Monitoring, 'id'>) => Promise<void>;
  editMonitoring: (id: string, updatedMonitoring: Partial<Omit<Monitoring, 'id'>>) => Promise<void>;
  deleteMonitoring: (id: string) => Promise<void>;
}

interface ManageMonitoringProviderProps {
  children: React.ReactNode;
}

export const ManageMonitoringContext = createContext<ManageMonitoringContextProps | null>(null);

export const ManageMonitoringProvider: React.FC<ManageMonitoringProviderProps> = ({ children }) => {
  const [monitorings, setMonitorings] = useState<Monitoring[]>([]);

  useEffect(() => {
    const fetchMonitoringData = async () => {
      try {
        const data = await MonitoringService.fetchMonitorings();
        setMonitorings(data || []);
      } catch (error) {
        console.error("Error fetching monitorings:", error);
      }
    };

    fetchMonitoringData();
  }, []);

  const addMonitoring = async (newMonitoring: Omit<Monitoring, 'id'>) => {
    try {
      const data = await MonitoringService.addMonitoring(newMonitoring);
      setMonitorings(prevMonitorings => [...prevMonitorings, data]);
    } catch (error) {
      console.error("Error adding monitoring:", (error as Error).message);
    }
  };

  const editMonitoring = async (id: string, updatedMonitoring: Partial<Omit<Monitoring, 'id'>>) => {
    try {
      const existingMonitoring = monitorings.find(monitoring => monitoring.id === id);
      if (!existingMonitoring) {
        throw new Error("Monitoring not found");
      }

      const mergedMonitoring = { ...existingMonitoring, ...updatedMonitoring };
      await MonitoringService.editMonitoring(id, mergedMonitoring);
      setMonitorings(prevMonitorings =>
        prevMonitorings.map(monitoring =>
          monitoring.id === id ? mergedMonitoring : monitoring
        )
      );
    } catch (error) {
      console.error("Error editing monitoring:", (error as Error).message);
    }
  };

  const deleteMonitoring = async (id: string) => {
    try {
      await MonitoringService.deleteMonitoring(id);
      setMonitorings(prevMonitorings => prevMonitorings.filter(monitoring => monitoring.id !== id));
    } catch (error) {
      console.error("Error deleting monitoring:", (error as Error).message);
    }
  };

  const value: ManageMonitoringContextProps = {
    monitorings,
    addMonitoring,
    editMonitoring,
    deleteMonitoring
  };

  return (
    <ManageMonitoringContext.Provider value={value}>
      {children}
    </ManageMonitoringContext.Provider>
  );
};

export const useMonitoring = () => {
  const context = useContext(ManageMonitoringContext);
  if (!context) {
    throw new Error("useMonitoring must be used within a ManageMonitoringProvider");
  }
  return context;
};
