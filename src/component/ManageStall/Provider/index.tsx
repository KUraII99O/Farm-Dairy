import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

export const ManageStallContext = createContext<any>(null);

interface Stall {
  id: number;
  stallNumber: string;
  status: boolean;
  details: string;

  
}


export const ManageStallProvider = ({ children }) => {
  const [stalls, setStalls] = useState<Stall[]>([]);

  useEffect(() => {
    const fetchStalls = async () => {
      try {
        const response = await fetch('http://localhost:3000/stalls');
        if (!response.ok) {
          throw new Error('Failed to fetch Stall data');
        }
        const data = await response.json();
        setStalls(data);
      } catch (error) {
        console.error('Error fetching Stall data:', error.message);
      }
    };

    fetchStalls();


  }, []);


  const addStall = async (newStall: Omit<Stall, 'id'>) => {
    try {
      const id = stalls.length + 1;
      const StallWithId: Stall = { id, ...newStall };

      const response = await fetch('http://localhost:3000/Stalls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(StallWithId),
      });

      if (!response.ok) {
        throw new Error('Failed to add routine Monitor');
      }

      setStalls([...stalls, StallWithId]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const editStall = async (id: number, updatedStall: Omit<Stall, "id">) => {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStall),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update Stall record");
      }
  
      setStalls((prevStalls) =>
        prevStalls.map((Stall) =>
          Stall.id === id ? { ...Stall, ...updatedStall } : Stall
        )
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}/toggle-status`, {
        method: "PUT",
      });
  
      if (!response.ok) {
        throw new Error("Failed to toggle stall status");
      }
  
      const data = await response.json();
  
      setStalls((prevstall) =>
        prevstall.map((stall) =>
          stall.id === id ? { ...stall, status: !stall.status } : stall
        )
      );
      toast.info("status toggle successfully", { autoClose: 2000, hideProgressBar: true });

    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to toggle stall status", { autoClose: 2000, hideProgressBar: true });

    }
  };



  const deletestall = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete milk record");
      }
  
      setStalls((prevstalls) =>
        prevstalls.filter((stall) => stall.id !== id)
      );
  
    } catch (error) {
      console.error("Error:", error.message);
    }
  };



  const getStallById = (id) => {
    // Find and return the stall with the given ID
    return stalls.find((stall) => stall.id === id);
  };

  const value = {
    stalls,
    addStall,
    editStall,
    deletestall,
    getStallById,
    toggleStatus
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
