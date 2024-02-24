import React, { createContext, useState, useContext } from 'react';

export const MilkSaleContext = createContext();

export const MilkSaleProvider = ({ children }) => {
  const [milkSales, setMilkSales] = useState([
    { 
      id: 1, 
      invoice: 'INV001',
      date: '2024-01-01', 
      accountNo: '123456', 
      name: 'John Doe', 
      contact: '123-456-7890',
      email: 'john@example.com',
      litre: 10, 
      price: 5, 
      total: 50,
      paid: 30,
      due: 20, 
      soldBy: 'Admin',
      address: 'Uttara Dhaka Bangladesh' // Added comma here
    },
    { 
      id: 2, 
      invoice: 'INV002',
      date: '2024-01-02', 
      accountNo: '789012', 
      name: 'Jane Smith', 
      contact: '987-654-3210',
      email: 'jane@example.com',
      litre: 12, 
      price: 5, 
      total: 60,
      paid: 60,
      due: 0, 
      soldBy: 'Manager',
      address: 'Uttara Dhaka Bangladesh' // Added comma here
    },
    { 
      id: 3, 
      invoice: 'INV003',
      date: '2024-01-03', 
      accountNo: '345678', 
      name: 'Alice Johnson', 
      contact: '111-222-3333',
      email: 'alice@example.com',
      litre: 8, 
      price: 6, 
      total: 48,
      paid: 48,
      due: 0, 
      soldBy: 'Supervisor',
      address: 'Uttara Dhaka Bangladesh' // Added comma here
    },
    // Add more mock data as needed
  ]);

  const addMilkSale = (newMilkSale) => {
    const maxId = Math.max(...milkSales.map(milkSale => milkSale.id), 0);
    const newMilkSaleWithId = { ...newMilkSale, id: maxId + 1 };
    setMilkSales([...milkSales, newMilkSaleWithId]);
  };

  const editMilkSale = (id, updatedMilkSale) => {
    const updatedMilkSaleList = milkSales.map(item => (item.id === id ? { ...item, ...updatedMilkSale } : item));
    setMilkSales(updatedMilkSaleList);
  };

  const deleteMilkSale = (id) => {
    const updatedMilkSales = milkSales.filter((milkSale) => milkSale.id !== id);
    setMilkSales(updatedMilkSales);
  };
  const getInvoiceById = (id) => {
    // Find and return the invoice with the given ID
    return milkSales.find((invoice) => invoice.id === id);
  };
  const value = {
    milkSales,
    addMilkSale,
    editMilkSale,
    deleteMilkSale,
    getInvoiceById,
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
