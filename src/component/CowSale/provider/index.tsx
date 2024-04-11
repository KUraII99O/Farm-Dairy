import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "react-toastify";

interface CowSales {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  totalPrice: number;
  totalPaid: string;
  due: number;
  note: string;
  collectedFrom: string;
  image: string;
  stallNo: string;
  cowNumber: string;
  gender: string;
  weight: string;
  height: string;
}

export const SaleListContext = createContext<any>(null);

export const SaleListProvider = ({ children }) => {
  const [sales, setSales] = useState<CowSales[]>([]);

  useEffect(() => {
    const fetchCowSales = async () => {
      try {
        const response = await fetch("http://localhost:3000/sales");
        if (!response.ok) {
          throw new Error("Failed to fetch CowSales data");
        }
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error("Error fetching CowSales data:", error.message);
      }
    };

    fetchCowSales();
  }, []);

  const addCowSales = async (newCowSales: Omit<CowSales, "id">) => {
    try {
      const id = sales.length + 1;
      const cowSalesWithId: CowSales = { id, ...newCowSales };

      const response = await fetch("http://localhost:3000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cowSalesWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to add CowSales");
      }

      setSales([...sales, cowSalesWithId]);
      toast.success("CowSales added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add CowSales");
    }
  };

  const deleteSale = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/sales/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete CowSales");
      }

      const updatedSales = sales.filter((sale) => sale.id !== id);
      setSales(updatedSales);
      toast.success("CowSales deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete CowSales");
    }
  };

  const editSale = async (id: number, updatedSale: Partial<CowSales>) => {
    try {
      const response = await fetch(`http://localhost:3000/sales/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSale),
      });

      if (!response.ok) {
        throw new Error("Failed to edit CowSales");
      }

      const updatedSales = sales.map((sale) =>
        sale.id === id ? { ...sale, ...updatedSale } : sale
      );
      setSales(updatedSales);
      toast.success("CowSales edited successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to edit CowSales");
    }
  };

  const getSaleById = (id: number) => {
    return sales.find((sale) => sale.id === id);
  };

  const value = {
    sales,
    addCowSales,
    deleteSale,
    editSale,
    getSaleById,
  };

  return (
    <SaleListContext.Provider value={value}>
      {children}
    </SaleListContext.Provider>
  );
};

export const useSaleList = () => {
  const context = useContext(SaleListContext);
  if (!context) {
    throw new Error("useSaleList must be used within a SaleListProvider");
  }
  return context;
};
