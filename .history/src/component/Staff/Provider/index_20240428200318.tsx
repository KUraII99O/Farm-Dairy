import React, { createContext, useState, useEffect, useContext } from "react";
import { Staff, StaffService } from "../StaffService";

export const ManageStaffContext = createContext<any>(null);

export const ManageStaffProvider: React.FC = ({ children }) => {
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const data = await StaffService.fetchStaff();
        setStaff(data || []);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaffData();
  }, []);

  const addStaff = async (newStaff: Omit<Staff, 'id'>) => {
    try {
      const data = await StaffService.addStaff(newStaff);
      setStaff(prevStaff => [...prevStaff, data]);
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  const editStaff = async (id: number, updatedStaff: Omit<Staff, 'id'>) => {
    try {
      const data = await StaffService.editStaff(id, updatedStaff);
      setStaff(prevStaff =>
        prevStaff.map(member => (member.id === id ? { ...member, ...updatedStaff } : member))
      );
    } catch (error) {
      console.error("Error editing staff:", error);
    }
  };

  const toggleStaffStatus = async (id: number) => {
    try {
      const data = await StaffService.toggleStaffStatus(id);
      setStaff(prevStaff =>
        prevStaff.map(member => (member.id === id ? { ...member, status: !member.status } : member))
      );
    } catch (error) {
      console.error("Error toggling staff status:", error);
    }
  };

  const deleteStaff = async (id: number) => {
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
