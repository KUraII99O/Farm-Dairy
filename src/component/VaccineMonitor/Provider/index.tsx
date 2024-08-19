import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { VaccineMonitor, VaccineService } from "../VaccineMonitorService";

// Define the context type
interface ManageVaccineMonitorContextType {
  vaccineRecords: VaccineMonitor[];
  addVaccineRecord: (newVaccineRecord: Omit<VaccineMonitor, 'id'>) => Promise<void>;
  editVaccineRecord: (id: string, updatedVaccineRecord: Omit<VaccineMonitor, 'id'>) => Promise<void>;
  deleteVaccineRecord: (id: string) => Promise<void>;
}

// Create context with a default value of undefined
export const ManageVaccineMonitorContext = createContext<ManageVaccineMonitorContextType | undefined>(undefined);

interface ManageVaccineMonitorProviderProps {
  children: ReactNode;
}

export const ManageVaccineMonitorProvider: React.FC<ManageVaccineMonitorProviderProps> = ({ children }) => {
  const [vaccineRecords, setVaccineRecords] = useState<VaccineMonitor[]>([]);

  useEffect(() => {
    const fetchVaccineRecordsData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await VaccineService.fetchVaccineRecords();
        console.log("Vaccine records data:", data); // Log vaccine records data
        setVaccineRecords(data || []);
      } catch (error) {
        console.error("Error fetching vaccine records:", error);
      }
    };
  
    fetchVaccineRecordsData();
  }, []);

  const addVaccineRecord = async (newVaccineRecord: Omit<VaccineMonitor, 'id'>) => {
    console.log("Adding vaccine record:", newVaccineRecord);
    try {
      const data = await VaccineService.addVaccineRecord(newVaccineRecord);
      console.log("Vaccine record added successfully:", data);
      setVaccineRecords(prevVaccineRecords => [...prevVaccineRecords, data]);
    } catch (error) {
      console.error("Error adding vaccine record:", error);
    }
  };

  const editVaccineRecord = async (id: string, updatedVaccineRecord: Omit<VaccineMonitor, 'id'>) => {
    try {
      await VaccineService.editVaccineRecord(id, updatedVaccineRecord);
      setVaccineRecords(prevRecords =>
        prevRecords.map(record => (record.id === id ? { ...record, ...updatedVaccineRecord } : record))
      );
    } catch (error) {
      console.error("Error editing vaccine record:", error);
    }
  };

  const deleteVaccineRecord = async (id: string) => {
    try {
      await VaccineService.deleteVaccineRecord(id);
      setVaccineRecords(prevVaccineRecords => prevVaccineRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error("Error deleting vaccine record:", error);
    }
  };

  const value = {
    vaccineRecords,
    addVaccineRecord,
    editVaccineRecord,
    deleteVaccineRecord
  };

  return (
    <ManageVaccineMonitorContext.Provider value={value}>
      {children}
    </ManageVaccineMonitorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useManageVaccine = () => {
  const context = useContext(ManageVaccineMonitorContext);
  if (!context) {
    throw new Error("useManageVaccine must be used within a ManageVaccineMonitorProvider");
  }
  return context;
};
