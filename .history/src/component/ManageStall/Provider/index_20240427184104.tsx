import React, { createContext, useState, useEffect, useContext } from "react";
import { Stall, StallService } from "../StallService";

export const ManageStallContext = createContext<any>(null);

export const ManageStallProvider = ({ children }) => {
  const [stalls, setStalls] = useState<Stall[]>([]);

  useEffect(() => {
    const fetchStallsData = async () => {
      try {
        const data = await StallService.fetchStalls();
        setStalls(data || []);
      } catch (error) {
        console.error("Error fetching stalls:", error);
      }
    };

    fetchStallsData();
  }, []);

  const addStall = async (newStall: Omit<Stall, 'id'>) => {
    try {
      const data = await StallService.addStall(newStall);
      setStalls(prevStalls => [...prevStalls, data]);
    } catch (error) {
      console.error("Error adding stall:", error);
    }
  };

  const editStall = async (id: number, updatedStall: Omit<Stall, 'id'>) => {
    try {
      const data = await StallService.editStall(id, updatedStall);
      setStalls(prevStalls =>
        prevStalls.map(stall => (stall.id === id ? { ...stall, ...data } : stall))
      );
    } catch (error) {
      console.error("Error editing stall:", error);
    }
  };

  const toggleStallStatus = async (id: number) => {
    try {
      const data = await StallService.toggleStallStatus(id);
      setStalls(prevStalls =>
        prevStalls.map(stall => (stall.id === id ? { ...stall, status: !stall.status } : stall))
      );
    } catch (error) {
      console.error("Error toggling stall status:", error);
    }
  };

  const deleteStall = async (id: number) => {
    try {
      await StallService.deleteStall(id);
      setStalls(prevStalls => prevStalls.filter(stall => stall.id !== id));
    } catch (error) {
      console.error("Error deleting stall:", error);
    }
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
