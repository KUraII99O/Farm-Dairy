import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "react-toastify";

interface MilkSales {
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
  invoice: string;
}

export const MilkSaleContext = createContext<any>(null);

export const MilkSaleProvider = ({ children }) => {
  const [milkSales, setMilkSales] = useState<MilkSales[]>([]);

  useEffect(() => {
    const fetchMilkSale = async () => {
      try {
        const response = await fetch("http://localhost:3000/milksale");
        if (!response.ok) {
          throw new Error("Failed to fetch MilkSales data");
        }
        const data = await response.json();
        setMilkSales(data);
      } catch (error) {
        console.error("Error fetching MilkSales data:", error.message);
      }
    };

    fetchMilkSale();
  }, []);

  const addMilkSales = async (newMilkSales: Omit<MilkSales, "id">) => {
    try {
      const id = milkSales.length + 1;
      const MilkSalesWithId: MilkSales = { id, ...newMilkSales };

      const response = await fetch("http://localhost:3000/milksale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(MilkSalesWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to add MilkSales");
      }

      setMilkSales([...milkSales, MilkSalesWithId]);
      toast.success("MilkSales added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add MilkSales");
    }
  };

  const editMilkSale = async (id: number, updatedMilkSales: Omit<MilkSales, "id">) => {
    try {
      const response = await fetch(`http://localhost:3000/milksale/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMilkSales),
      });

      if (!response.ok) {
        throw new Error("Failed to update milk record");
      }

      setMilkSales(prevMilkSales =>
        prevMilkSales.map(milkSale =>
          milkSale.id === id ? { ...milkSale, ...updatedMilkSales } : milkSale
        )
      );

      toast.success("Milk record updated successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update milk record");
    }
  };

  const deleteMilkSale = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/milksale/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete milk record");
      }

      setMilkSales(prevMilkSales => prevMilkSales.filter(milkSale => milkSale.id !== id));
      toast.success("Milk record deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete milk record");
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
    addMilkSales,
    editMilkSale,
    deleteMilkSale,
    getInvoiceById,
    generateRandomInvoice
  };

  return <MilkSaleContext.Provider value={value}>{children}</MilkSaleContext.Provider>;
};

export const useMilkSale = () => {
  const context = useContext(MilkSaleContext);
  if (!context) {
    throw new Error('useMilkSale must be used within a MilkSaleProvider');
  }
  return context;
};
