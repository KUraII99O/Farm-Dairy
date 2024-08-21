import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Branch, BranchService } from "../BranchService"; // Updated import

interface ManageBranchContextProps {
  branches: Branch[];
  addBranch: (newBranch: Omit<Branch, 'id'>) => Promise<void>;
  editBranch: (id: string, updatedBranch: Omit<Branch, 'id' | 'userId'>) => Promise<void>;
  deleteBranch: (id: string) => Promise<void>;
}

export const ManageBranchContext = createContext<ManageBranchContextProps | undefined>(undefined);

interface ManageBranchProviderProps {
  children: ReactNode;
}

export const ManageBranchProvider: React.FC<ManageBranchProviderProps> = ({ children }) => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID

        const data = await BranchService.fetchBranches();
        console.log("Branch data:", data); // Log branch data
        setBranches(data || []);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranchData();
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
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      const branchWithUserId = { ...updatedBranch, userId: loggedInUser.id };
      
      await BranchService.editBranch(id, branchWithUserId);
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
    <ManageBranchContext.Provider value={value}>
      {children}
    </ManageBranchContext.Provider>
  );
};

export const useBranch = () => {
  const context = useContext(ManageBranchContext);
  if (!context) {
    throw new Error("useBranch must be used within a ManageBranchProvider");
  }
  
  return context;
};
