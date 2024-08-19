import React, { createContext, useState, useEffect, useContext,ReactNode } from "react";
import { Calf, CalfService } from "../CalfService"; // Assuming CalfService and Calf interface are defined

export const ManageCowCalfContext = createContext<any>(null);

type ProviderProps = {
  children: ReactNode;
};


export const ManageCowCalfProvider: React.FC<ProviderProps> = ({ children }) => {
  const [calves, setCalves] = useState<Calf[]>([]);

  useEffect(() => {
    const fetchCalfData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
  
        const data = await CalfService.fetchCalves(user.id);
        setCalves(data || []);
      } catch (error) {
        console.error("Error fetching calves:", error);
      }
    };
  
    fetchCalfData();
  }, []);

  const addCalf = async (newCalf: Omit<Calf, 'id'>) => {
    console.log("Adding calf:", newCalf);

    try {
      const data = await CalfService.addCalf(newCalf);
      setCalves(prevCalves => [...prevCalves, data]);
      return null; // Return null if there's no error

    } catch (error) {
      console.error("Error adding calf:", error);
      return error; // Return the error if there is one

    }
  };

  const editCalf = async (id: string, updatedCalf: Omit<Calf, 'id'>) => {
    try {
      await CalfService.editCalf(id, updatedCalf);
      setCalves(prevCalves =>
        prevCalves.map(calf => (calf.id === id ? { ...calf, ...updatedCalf } : calf))
      );
    } catch (error) {
      console.error("Error editing calf:", error);
    }
  };

  const toggleCalfStatus = async (id: string) => {
    try {
      await CalfService.toggleCalfStatus(id);
      setCalves(prevCalves =>
        prevCalves.map(calf => (calf.id === id ? { ...calf, status: !calf.status } : calf))
      );
    } catch (error) {
      console.error("Error toggling calf status:", error);
    }
  };

  const deleteCalf = async (id: string) => {
    try {
      await CalfService.deleteCalf(id);
      setCalves(prevCalves => prevCalves.filter(calf => calf.id !== id));
    } catch (error) {
      console.error("Error deleting calf:", error);
    }
  };

  const value = {
    calves,
    addCalf,
    editCalf,
    deleteCalf,
    toggleCalfStatus
  };

  return (
    <ManageCowCalfContext.Provider value={value}>
      {children}
    </ManageCowCalfContext.Provider>
  );
};

export const useManageCalves = () => {
  const context = useContext(ManageCowCalfContext);
  if (!context) {
    throw new Error("useManageCalves must be used within a ManageCowProvider");
  }
  return context;
};
