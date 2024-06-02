import React, { createContext, useState, useEffect, useContext } from "react";
import { MilkRecord, MilkService } from "../MilkService";

export const ManageMilkContext = createContext<any>(null);

export const ManageMilkProvider: React.FC = ({ children }) => {
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);

  useEffect(() => {
    const fetchMilkRecordsData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await MilkService.fetchMilkRecords();
        console.log("Milk records data:", data); // Log milk records data
        setMilkRecords(data || []);
      } catch (error) {
        console.error("Error fetching milk records:", error);
      }
    };
  
    fetchMilkRecordsData();
  }, []);

  const addMilkRecord = async (newMilkRecord: Omit<MilkRecord, 'id'>) => {
    console.log("Adding milk record:", newMilkRecord);
    try {
      const data = await MilkService.addMilkRecord(newMilkRecord);
      console.log("Milk record added successfully:", data);
      setMilkRecords(prevMilkRecords => [...prevMilkRecords, data]);
    } catch (error) {
      console.error("Error adding milk record:", error);
    }
  };

  const editMilkRecord = async (id: string, updatedMilkRecord: Omit<MilkRecord, 'id'>) => {
    try {
      const data = await MilkService.editMilkRecord(id, updatedMilkRecord);
      setMilkRecords(prevMilkRecords =>
        prevMilkRecords.map(record => (record.id === id ? { ...record, ...updatedMilkRecord } : record))
      );
    } catch (error) {
      console.error("Error editing milk record:", error);
    }
  };

  const deleteMilkRecord = async (id: string) => {
    try {
      await MilkService.deleteMilkRecord(id);
      setMilkRecords(prevMilkRecords => prevMilkRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error("Error deleting milk record:", error);
    }
  };

  const value = {
    milkRecords,
    addMilkRecord,
    editMilkRecord,
    deleteMilkRecord
  };

  return (
    <ManageMilkContext.Provider value={value}>
      {children}
    </ManageMilkContext.Provider>
  );
};

export const useManageMilk = () => {
  const context = useContext(ManageMilkContext);
  if (!context) {
    throw new Error("useManageMilk must be used within a ManageMilkProvider");
  }
  return context;
};
