import React, { createContext, useState, useEffect, useContext } from "react";
import { StallService } from "../StallService";


export const ManageStallContext = createContext<any>(null);

export const ManageStallProvider = ({ children }) => {
  const [stalls, setStalls] = useState<Stall[]>([]);

  useEffect(() => {
    const fetchStallsData = async () => {
      const data = await StallService.fetchStalls();
      setStalls(data || []);
    };
    fetchStallsData();
  }, []);

  const addStall = async (newStall: Omit<Stall, 'id'>) => {
    const data = await StallService.addStall(newStall);
    setStalls(prevStalls => [...prevStalls, data]);
  };

  const editStall = async (id: number, updatedStall: Omit<Stall, 'id'>) => {
    const data = await StallService.editStall(id, updatedStall);
    setStalls(prevStalls => prevStalls.map(stall => (stall.id === id ? { ...stall, ...data } : stall)));
  };

  const toggleStallStatus = async (id: number) => {
    const data = await StallService.toggleStallStatus(id);
    setStalls(prevStalls =>
      prevStalls.map(stall => (stall.id === id ? { ...stall, status: !stall.status } : stall))
    );
  };

  const deleteStall = async (id: number) => {
    await StallService.deleteStall(id);
    setStalls(prevStalls => prevStalls.filter(stall => stall.id !== id));
  };

  const value = {
    stalls,
    addStall,
    editStall,
    deleteStall,
    toggleStallStatus
  };

  return (
    <ManageStallContext.Provider value={value}>
      {children}
    </ManageStallContext.Provider>
  );
};

export const useManageStall = () => {
  const context = useContext(ManageStallContext);
  if (!context) {
    throw new Error("useManageStall must be used within a ManageStallProvider");
  }
  return context;
};
