import React, { createContext, useState, useContext } from "react";

export const ManageBranchContext = createContext();

export const ManageBranchProvider = ({ children }) => {
  const [branches, setBranches] = useState([
    {
      id: 1,
      setupDate: "2024-03-12",
      branchName: "Branch A",
      builderName: "Builder X",
      phoneNumber: "123-456-7890",
      email: "brancha@example.com",
    },
    {
      id: 2,
      setupDate: "2024-03-12",
      branchName: "Branch B",
      builderName: "Builder Y",
      phoneNumber: "987-654-3210",
      email: "branchb@example.com",
    },
    // Add more branches as needed
  ]);

  const addBranch = (newBranch) => {
    const maxId = Math.max(...branches.map((branch) => branch.id), 0);
    const newBranchWithId = { ...newBranch, id: maxId + 1 };
    setBranches([...branches, newBranchWithId]);
  };

  const editBranch = (id, updatedBranch) => {
    setBranches((prevBranches) =>
      prevBranches.map((branch) => (branch.id === id ? { ...branch, ...updatedBranch } : branch))
    );
  };

  const deleteBranch = (id) => {
    const updatedBranches = branches.filter((branch) => branch.id !== id);
    setBranches(updatedBranches);
  };

  const getBranchById = (id) => {
    // Find and return the branch with the given ID
    return branches.find((branch) => branch.id === id);
  };

  const value = {
    branches,
    addBranch,
    editBranch,
    deleteBranch,
    getBranchById,
  };

  return (
    <ManageBranchContext.Provider value={value}>
      {children}
    </ManageBranchContext.Provider>
  );
};

export const useManageBranch = () => {
  const context = useContext(ManageBranchContext);
  if (!context) {
    throw new Error("useManageBranch must be used within a ManageBranchProvider");
  }
  return context;
};
