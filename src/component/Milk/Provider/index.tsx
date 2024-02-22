import React, { createContext, useState, useContext } from 'react';

export const MilkContext = createContext();

export const MilkProvider = ({ children }) => {
  const [milks, setMilks] = useState([
    { 
      id: 1, 
      date: '2024-01-01', 
      accountNo: '123456', 
      stallNo: 'A1', 
      animalID: '001', 
      liter: 10, 
      fate: 'Good', 
      price: 5, 
      total: 50, 
      collectedFrom: 'Farm A', 
      addedBy: 'Admin'
    },
    { 
      id: 2, 
      date: '2024-01-02', 
      accountNo: '789012', 
      stallNo: 'B2', 
      animalID: '002', 
      liter: 12, 
      fate: 'Excellent', 
      price: 5, 
      total: 60, 
      collectedFrom: 'Farm B', 
      addedBy: 'Manager'
    },
    { 
      id: 3, 
      date: '2024-01-03', 
      accountNo: '345678', 
      stallNo: 'C3', 
      animalID: '003', 
      liter: 8, 
      fate: 'Good', 
      price: 6, 
      total: 48, 
      collectedFrom: 'Farm C', 
      addedBy: 'Supervisor'
    },
    // Add more mock data as needed
  ]);

  const addMilk = (newMilk) => {
    const maxId = Math.max(...milks.map(milk => milk.id), 0);
    const newMilkWithId = { ...newMilk, id: maxId + 1 };
    setMilks([...milks, newMilkWithId]);
  };

  const editMilk = (id, updatedMilk) => {
    const updatedMilkList = milks.map(item => (item.id === id ? { ...item, ...updatedMilk } : item));
    setMilks(updatedMilkList);
  };

  const deleteMilk = (id) => {
    const updatedMilks = milks.filter((milk) => milk.id !== id);
    setMilks(updatedMilks);
  };

  const value = {
    milks,
    addMilk,
    editMilk,
    deleteMilk,
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
