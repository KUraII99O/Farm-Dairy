import React, { createContext, useState, useEffect, useContext,ReactNode } from "react";
import { RoutineMonitor, RoutineService } from "../RoutineMonitorService";

export const ManageRoutineContext = createContext<any>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ManageRoutineProvider: React.FC <ProviderProps> = ({ children }) => {
  const [routineRecords, setRoutineRecords] = useState<RoutineMonitor[]>([]);

  useEffect(() => {
    const fetchRoutineRecordsData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await RoutineService.fetchRoutineRecords();
        console.log("Routine records data:", data); // Log routine records data
        setRoutineRecords(data || []);
      } catch (error) {
        console.error("Error fetching routine records:", error);
      }
    };
  
    fetchRoutineRecordsData();
  }, []);

  const addRoutineRecord = async (newRoutineRecord: Omit<RoutineMonitor, 'id'>) => {
    console.log("Adding routine record:", newRoutineRecord);
    try {
      const data = await RoutineService.addRoutineRecord(newRoutineRecord);
      console.log("Routine record added successfully:", data);
      setRoutineRecords(prevRoutineRecords => [...prevRoutineRecords, data]);
    } catch (error) {
      console.error("Error adding routine record:", error);
    }
  };

  const editRoutineRecord = async (id: string, updatedRoutineRecord: Omit<RoutineMonitor, 'id'>) => {
    try {
      await RoutineService.editRoutineRecord(id, updatedRoutineRecord);
      setRoutineRecords(prevRecords =>
        prevRecords.map(record => (record.id === id ? { ...record, ...updatedRoutineRecord } : record))
      );
    } catch (error) {
      console.error("Error editing routine record:", error);
    }
  };

  const deleteRoutineRecord = async (id: string) => {
    try {
      await RoutineService.deleteRoutineRecord(id);
      setRoutineRecords(prevRoutineRecords => prevRoutineRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error("Error deleting routine record:", error);
    }
  };

  const value = {
    routineRecords,
    addRoutineRecord,
    editRoutineRecord,
    deleteRoutineRecord
  };

  return (
    <ManageRoutineContext.Provider value={value}>
      {children}
    </ManageRoutineContext.Provider>
  );
};

export const useManageRoutine = () => {
  const context = useContext(ManageRoutineContext);
  if (!context) {
    throw new Error("useManageRoutine must be used within a ManageRoutineProvider");
  }
  return context;
};
