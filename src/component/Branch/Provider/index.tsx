import React, { createContext, useState, useEffect, useContext } from "react";
import { Branch, BranchService } from "../BranchService"; // Updated import

export const ManageBranchContext = createContext<any>(null); // Updated context name

export const ManageBranchProvider = ({ children }) => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranchesData = async () => {
      try {
        const data = await BranchService.fetchBranches(); // Updated service call
        setBranches(data || []);
      } catch (error) {
        console.error("Error fetching branches:", (error as Error).message);
      }
    };

    fetchBranchesData();
  }, []);

  const addBranch = async (newBranch: Omit<Branch, 'id'>) => {
    try {
      const data = await BranchService.addBranch(newBranch); // Updated service call
      setBranches(prevBranches => [...prevBranches, data]);
    } catch (error) {
      console.error("Error adding branch:", (error as Error).message);
    }
  };

  const editBranch = async (id: string, updatedBranch: Omit<Branch, 'id' | 'userId'>) => {
    try {
      await BranchService.editBranch(id, updatedBranch); // Updated service call
      setBranches(prevBranches =>
        prevBranches.map(branch =>
          branch.id === id ? { ...branch, ...updatedBranch } : branch
        )
      );
    } catch (error) {
      console.error("Error editing branch:", (error as Error).message);
    }
  };

  const deleteBranch = async (id: string) => {
    try {
      await BranchService.deleteBranch(id); // Updated service call
      setBranches(prevBranches => prevBranches.filter(branch => branch.id !== id));
    } catch (error) {
      console.error("Error deleting branch:", (error as Error).message);
    }
  };

  const value = {
    branches,
    addBranch,
    editBranch,
    deleteBranch
  };

  return (
    <ManageBranchContext.Provider value={value}> {/* Updated context name */}
      {children}
    </ManageBranchContext.Provider>
  );
};

export const useBranch = () => { // Updated hook name
  const context = useContext(ManageBranchContext);
  if (!context) {
    throw new Error("useBranch must be used within a BranchProvider"); // Updated error message
  }
  return context;
};
