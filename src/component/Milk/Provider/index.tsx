import React, { createContext, useState, useContext,useEffect } from 'react';
import { toast } from "react-toastify";



interface MilkRecord {
  id: number;
  Date: string;
  AccountNo: string;
  StallNo: string;
  AnimalID: string;
  Liter: number;
  Fate: string;
  Price: number;
  Total: number;
  CollectedFrom: string;
  AddedBy: string;
}





export const MilkContext = createContext<any>(null);

export const MilkProvider = ({ children }) => {
  const [milks, setMilks] = useState<MilkRecord[]>([]);

  useEffect(() => {
    const fetchMilkRecord = async () => {
      try {
        const response = await fetch("http://localhost:3000/milks");
        if (!response.ok) {
          throw new Error("Failed to fetch MilkRecord data");
        }
        const data = await response.json();
        setMilks(data);
      } catch (error) {
        console.error("Error fetching MilkRecord data:", error.message);
      }
    };

    fetchMilkRecord();
  }, []);

  const addMilkRecord = async (newMilkRecord: Omit<MilkRecord, "id">) => {
    try {
      const id = milks.length + 1;
      const MilkRecordWithId: MilkRecord = { id, ...newMilkRecord };
  
      const response = await fetch("http://localhost:3000/Milks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(MilkRecordWithId),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add MilkRecord");
      }
  
      setMilks([...milks, MilkRecordWithId]); // Corrected variable name here
      toast.success("MilkRecord added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add MilkRecord");
    }
  };

  const editMilkRecord = async (id: number, updatedMilkRecord: Omit<MilkRecord, "id">) => {
    try {
      const response = await fetch(`http://localhost:3000/milks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMilkRecord),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update milk record");
      }
  
      setMilks((prevMilks) =>
        prevMilks.map((milkRecord) =>
          milkRecord.id === id ? { ...milkRecord, ...updatedMilkRecord } : milkRecord
        )
      );
  
      toast.success("Milk record updated successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update milk record");
    }
  };
  

  const deleteMilkRecord = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/milks/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete milk record");
      }
  
      setMilks((prevMilks) =>
        prevMilks.filter((milkRecord) => milkRecord.id !== id)
      );
  
      toast.success("Milk record deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete milk record");
    }
  };

  const value = {
    milks,
    addMilkRecord,
    editMilkRecord,
    deleteMilkRecord,
  };

  return <MilkContext.Provider value={value}>{children}</MilkContext.Provider>;
};

export const useMilk = () => {
  const context = useContext(MilkContext);
  if (!context) {
    throw new Error('useMilk must be used within a MilkProvider');
  }
  return context;
};