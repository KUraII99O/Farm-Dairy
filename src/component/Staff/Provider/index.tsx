import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Staff, StaffService } from "../StaffService";

export const ManageStaffContext = createContext<any>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ManageStaffProvider: React.FC<ProviderProps> = ({ children }) => {
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await StaffService.fetchStaff();
        console.log("Staff data:", data); // Log staff data
        setStaff(data || []);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
  
    fetchStaffData();
  }, []);

  const addStaff = async (newStaff: Omit<Staff, 'id'>) => {
    console.log("Adding staff:", newStaff);
    try {
      const data = await StaffService.addStaff(newStaff);
      console.log("Staff added successfully:", data);
      setStaff(prevStaff => [...prevStaff, data]);
      return null; // Return null if there's no error
    } catch (error) {
      console.error("Error adding staff:", error);
      return error; // Return the error if there is one
    }
  };

  const editStaff = async (id: string, updatedStaff: Omit<Staff, 'id'>) => {
    try {
      setStaff(prevStaff =>
        prevStaff.map(member => (member.id === id ? { ...member, ...updatedStaff } : member))
      );
    } catch (error) {
      console.error("Error editing staff:", error);
    }
  };

  const toggleStaffStatus = async (id: string) => {
    try {
      setStaff(prevStaff =>
        prevStaff.map(member => (member.id === id ? { ...member, status: !member.status } : member))
      );
    } catch (error) {
      console.error("Error toggling staff status:", error);
    }
  };

  const deleteStaff = async (id: string) => {
    try {
      await StaffService.deleteStaff(id);
      setStaff(prevStaff => prevStaff.filter(member => member.id !== id));
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const value = {
    staff,
    addStaff,
    editStaff,
    deleteStaff,
    toggleStaffStatus
  };

  return (
    <ManageStaffContext.Provider value={value}>
      {children}
    </ManageStaffContext.Provider>
  );
};

export const useManageStaff = () => {
  const context = useContext(ManageStaffContext);
  if (!context) {
    throw new Error("useManageStaff must be used within a ManageStaffProvider");
  }
  return context;
};
