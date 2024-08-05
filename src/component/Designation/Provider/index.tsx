import React, { createContext, useState, useEffect, useContext } from "react";
import { Designation, DesignationService } from "../DesignationService";

export const ManageDesignationContext = createContext<any>(null);

export const ManageDesignationProvider = ({ children }) => {
  const [designations, setDesignations] = useState<Designation[]>([]);



  useEffect(() => {
    const fetchDesignationsData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await DesignationService.fetchDesignations();
        console.log("Designation data:", data); // Log staff data
        setDesignations(data || []);
      } catch (error) {
        console.error("Error fetching Designation:", error);
      }
    };
  
    fetchDesignationsData();
  }, []);

  

  const addDesignation = async (newDesignation: Omit<Designation, 'id'>) => {
    try {
      const data = await DesignationService.addDesignation(newDesignation);
      setDesignations(prevDesignations => [...prevDesignations, data]);
    } catch (error) {
      console.error("Error adding designation:", error);
    }
  };

  const editDesignation = async (id: string, updatedDesignation: Omit<Designation, 'id'>) => {
    try {
      await DesignationService.editDesignation(id, updatedDesignation);
      setDesignations(prevDesignations =>
        prevDesignations.map(designation => (designation.id === id ? { ...designation, ...updatedDesignation } : designation))
      );
    } catch (error) {
      console.error("Error editing designation:", error);
    }
  };

  const toggleDesignationStatus = async (id: string) => {
    try {
      const data = await DesignationService.toggleDesignationStatus(id);
      setDesignations(prevDesignations =>
        prevDesignations.map(designation => (designation.id === id ? { ...designation, status: !designation.status } : designation))
      );
    } catch (error) {
      console.error("Error toggling designation status:", error);
    }
  };

  const deleteDesignation = async (id: string) => {
    try {
      await DesignationService.deleteDesignation(id);
      setDesignations(prevDesignations => prevDesignations.filter(designation => designation.id !== id));
    } catch (error) {
      console.error("Error deleting designation:", error);
    }
  };

  const value = {
    designations,
    addDesignation,
    editDesignation,
    deleteDesignation,
    toggleDesignationStatus
  };

  return (
    <ManageDesignationContext.Provider value={value}>
      {children}
    </ManageDesignationContext.Provider>
  );
};

export const useManageDesignation = () => {
  const context = useContext(ManageDesignationContext);
  if (!context) {
    throw new Error("useManageDesignation must be used within a ManageDesignationProvider");
  }
  return context;
};
