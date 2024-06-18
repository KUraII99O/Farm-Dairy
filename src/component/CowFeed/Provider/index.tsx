import React, { createContext, useState, useEffect, useContext } from "react";
import { CowFeed, CowFeedService } from "../CowFeedService";

export const ManageCowFeedContext = createContext<any>(null);

export const ManageCowFeedProvider: React.FC = ({ children }) => {
  const [cowFeedRecords, setCowFeedRecords] = useState<CowFeed[]>([]);

  useEffect(() => {
    const fetchCowFeedRecordsData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await CowFeedService.fetchCowFeedRecords();
        console.log("Cow feed records data:", data); // Log cow feed records data
        setCowFeedRecords(data || []);
      } catch (error) {
        console.error("Error fetching cow feed records:", error);
      }
    };
  
    fetchCowFeedRecordsData();
  }, []);

  const addCowFeedRecord = async (newCowFeedRecord: Omit<CowFeed, 'id'>) => {
    console.log("Adding cow feed record:", newCowFeedRecord);
    try {
      const data = await CowFeedService.addCowFeedRecord(newCowFeedRecord);
      console.log("Cow feed record added successfully:", data);
      setCowFeedRecords(prevCowFeedRecords => [...prevCowFeedRecords, data]);
    } catch (error) {
      console.error("Error adding cow feed record:", error);
    }
  };

  const editCowFeedRecord = async (id: string, updatedCowFeedRecord: Omit<CowFeed, 'id'>) => {
    try {
      await CowFeedService.editCowFeedRecord(id, updatedCowFeedRecord);
      setCowFeedRecords(prevCowFeedRecords =>
        prevCowFeedRecords.map(record => (record.id === id ? { ...record, ...updatedCowFeedRecord } : record))
      );
    } catch (error) {
      console.error("Error editing cow feed record:", error);
    }
  };

  const deleteCowFeedRecord = async (id: string) => {
    try {
      await CowFeedService.deleteCowFeedRecord(id);
      setCowFeedRecords(prevCowFeedRecords => prevCowFeedRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error("Error deleting cow feed record:", error);
    }
  };

  const value = {
    cowFeedRecords,
    addCowFeedRecord,
    editCowFeedRecord,
    deleteCowFeedRecord
  };

  return (
    <ManageCowFeedContext.Provider value={value}>
      {children}
    </ManageCowFeedContext.Provider>
  );
};

export const useManageCowFeed = () => {
  const context = useContext(ManageCowFeedContext);
  if (!context) {
    throw new Error("useManageCowFeed must be used within a ManageCowFeedProvider");
  }
  return context;
};
