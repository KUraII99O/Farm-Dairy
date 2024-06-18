import React, { createContext, useState, useEffect, useContext } from "react";
import { MilkSaleRecord, MilkSaleService } from "../MilkSaleService";

export const ManageMilkSaleContext = createContext<any>(null);

export const ManageMilkSaleProvider: React.FC = ({ children }) => {
  const [milkSaleRecords, setMilkSaleRecords] = useState<MilkSaleRecord[]>([]);

  useEffect(() => {
    const fetchMilkSaleRecordsData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await MilkSaleService.fetchMilkSaleRecords();
        console.log("Milk sale records data:", data); // Log milk sale records data
        setMilkSaleRecords(data || []);
      } catch (error) {
        console.error("Error fetching milk sale records:", error);
      }
    };
  
    fetchMilkSaleRecordsData();
  }, []);

  const addMilkSaleRecord = async (newMilkSaleRecord: Omit<MilkSaleRecord, 'id'>) => {
    console.log("Adding milk sale record:", newMilkSaleRecord);
    try {
      const data = await MilkSaleService.addMilkSaleRecord(newMilkSaleRecord);
      console.log("Milk sale record added successfully:", data);
      setMilkSaleRecords(prevMilkSaleRecords => [...prevMilkSaleRecords, data]);
    } catch (error) {
      console.error("Error adding milk sale record:", error);
    }
  };

  const editMilkSaleRecord = async (id: string, updatedMilkSaleRecord: Omit<MilkSaleRecord, 'id'>) => {
    try {
      const data = await MilkSaleService.editMilkSaleRecord(id, updatedMilkSaleRecord);
      setMilkSaleRecords(prevMilkSaleRecords =>
        prevMilkSaleRecords.map(record => (record.id === id ? { ...record, ...updatedMilkSaleRecord } : record))
      );
    } catch (error) {
      console.error("Error editing milk sale record:", error);
    }
  };

  const deleteMilkSaleRecord = async (id: string) => {
    try {
      await MilkSaleService.deleteMilkSaleRecord(id);
      setMilkSaleRecords(prevMilkSaleRecords => prevMilkSaleRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error("Error deleting milk sale record:", error);
    }
  };

  const value = {
    milkSaleRecords,
    addMilkSaleRecord,
    editMilkSaleRecord,
    deleteMilkSaleRecord
  };

  return (
    <ManageMilkSaleContext.Provider value={value}>
      {children}
    </ManageMilkSaleContext.Provider>
  );
};

export const useManageMilkSale = () => {
  const context = useContext(ManageMilkSaleContext);
  if (!context) {
    throw new Error("useManageMilkSale must be used within a ManageMilkSaleProvider");
  }
  return context;
};
