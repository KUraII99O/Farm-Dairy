import React, { createContext, useState, useEffect, useContext } from "react";
import { CowSales, CowSalesService } from "../CowSaleService";

export const ManageSalesContext = createContext<any>(null);

export const ManageSalesProvider: React.FC = ({ children }) => {
  const [sales, setSales] = useState<CowSales[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await CowSalesService.fetchSales();
        console.log("Sales data:", data); // Log sales data
        setSales(data || []);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
  
    fetchSalesData();
  }, []);

  const addSale = async (newSale: Omit<CowSales, 'id'>) => {
    console.log("Adding sale:", newSale);
    try {
      const data = await CowSalesService.addSale(newSale);
      console.log("Sale added successfully:", data);
      setSales(prevSales => [...prevSales, data]);
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  const editSale = async (id: string, updatedSale: Omit<CowSales, 'id'>) => {
    try {
      const data = await CowSalesService.editSale(id, updatedSale);
      setSales(prevSales =>
        prevSales.map(sale => (sale.id === id ? { ...sale, ...updatedSale } : sale))
      );
    } catch (error) {
      console.error("Error editing sale:", error);
    }
  };

  const deleteSale = async (id: string) => {
    try {
      await CowSalesService.deleteSale(id);
      setSales(prevSales => prevSales.filter(sale => sale.id !== id));
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  const toggleSaleStatus = async (id: string) => {
    try {
      const data = await CowSalesService.toggleSaleStatus(id);
      setSales(prevSales =>
        prevSales.map(sale => (sale.id === id ? { ...sale, status: !sale.status } : sale))
      );
    } catch (error) {
      console.error("Error toggling sale status:", error);
    }
  };

  const value = {
    sales,
    addSale,
    editSale,
    deleteSale,
    toggleSaleStatus
  };

  return (
    <ManageSalesContext.Provider value={value}>
      {children}
    </ManageSalesContext.Provider>
  );
};

export const useManageSales = () => {
  const context = useContext(ManageSalesContext);
  if (!context) {
    throw new Error("useManageSales must be used within a ManageSalesProvider");
  }
  return context;
};
