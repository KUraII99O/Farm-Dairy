import React, { createContext, useState, useEffect, useContext } from "react";
import { MilkSales, MilkSaleService } from "../MilkSaleService";

export const ManageMilkSaleContext = createContext<any>(null);

export const ManageMilkSaleProvider: React.FC = ({ children }) => {
  const [milkSales, setMilkSales] = useState<MilkSales[]>([]);

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
        setMilkSales(data || []);
      } catch (error) {
        console.error("Error fetching milk sale records:", error);
      }
    };
  
    fetchMilkSaleRecordsData();
  }, []);

  const addMilkSaleRecord = async (newMilkSaleRecord: Omit<MilkSales, 'id'>) => {
    console.log("Adding milk sale record:", newMilkSaleRecord);
    try {
      const data = await MilkSaleService.addMilkSaleRecord(newMilkSaleRecord);
      console.log("Milk sale record added successfully:", data);
      setMilkSales(prevMilkSales => [...prevMilkSales, data]);
    } catch (error) {
      console.error("Error adding milk sale record:", error);
    }
  };

  const editMilkSaleRecord = async (id: number, updatedMilkSaleRecord: Omit<MilkSales, 'id'>) => {
    try {
      const data = await MilkSaleService.editMilkSaleRecord(id, updatedMilkSaleRecord);
      setMilkSales(prevMilkSales =>
        prevMilkSales.map(record => (record.id === id ? { ...record, ...updatedMilkSaleRecord } : record))
      );
    } catch (error) {
      console.error("Error editing milk sale record:", error);
    }
  };

  const deleteMilkSaleRecord = async (id: number) => {
    try {
      await MilkSaleService.deleteMilkSaleRecord(id);
      setMilkSales(prevMilkSales => prevMilkSales.filter(record => record.id !== id));
    } catch (error) {
      console.error("Error deleting milk sale record:", error);
    }
  };

  const getInvoiceById = (id: number) => {
    return milkSales.find(invoice => invoice.id === id);
  };

  const generateRandomInvoice = () => {
    const characters = '0123456789';
    let invoice = '';
    for (let i = 0; i < 4; i++) {
      invoice += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return invoice;
  };

  const value = {
    milkSales,
    addMilkSaleRecord,
    editMilkSaleRecord,
    deleteMilkSaleRecord,
    getInvoiceById,
    generateRandomInvoice
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
