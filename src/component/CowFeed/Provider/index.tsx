import React, { createContext, useState, useContext,useEffect } from 'react';
import { toast } from "react-toastify";

export const CowFeedContext = createContext<any>(null);



interface cowFeed {
  id: number;
  date: string; 
  StallNo: string;
  cowNumber: string;
  note: number;
  foodItem: string;
  quantity: number;
  unit: string;
  feedingTime: string;
}

export const CowFeedProvider = ({ children }) => {
  const [cowFeeds, setCowFeeds] = useState<cowFeed[]>([]);

  useEffect(() => {
    const fetchcowFeed = async () => {
      try {
        const response = await fetch("http://localhost:3000/cowFeeds");
        if (!response.ok) {
          throw new Error("Failed to fetch cowFeeds data");
        }
        const data = await response.json();
        setCowFeeds(data);
      } catch (error) {
        console.error("Error fetching cowFeeds data:", error.message);
      }
    };

    fetchcowFeed();
  }, []);



  const addcowFeed = async (newcowFeed: Omit<cowFeed, "id">) => {
    try {
      const id = cowFeeds.length + 1;
      const cowFeedWithId: cowFeed = { id, ...newcowFeed };
  
      const response = await fetch("http://localhost:3000/cowFeeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cowFeedWithId),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add cowFeed");
      }
  
      setCowFeeds([...cowFeeds, cowFeedWithId]); // Corrected variable name here
      toast.success("cowFeed added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add cow Feed");
    }
  };


  const editcowFeed = async (id: number, updatedcowFeed: Omit<cowFeed, "id">) => {
    try {
      const response = await fetch(`http://localhost:3000/cowFeeds/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedcowFeed),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update cow Feed record");
      }
  
      setCowFeeds((prevcowFeeds) =>
        prevcowFeeds.map((cowFeed) =>
          cowFeed.id === id ? { ...cowFeed, ...updatedcowFeed } : cowFeed
        )
      );
  
      toast.success(" cow Feed updated successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update  cow Feed");
    }
  };

  const deletecowFeed = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/cowFeeds/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete milk record");
      }
  
      setCowFeeds((prevcowFeeds) =>
        prevcowFeeds.filter((cowFeed) => cowFeed.id !== id)
      );
  
      toast.success(" cow Feed deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete  cow Feed");
    }
  };
  const getCowFeedById = (id) => {
    // Find and return the cow feed with the given ID
    return cowFeeds.find((cowFeed) => cowFeed.id === id);
  };

  const value = {
    cowFeeds,
    addcowFeed,
    editcowFeed,
    deletecowFeed,
    getCowFeedById,
  };

  return <CowFeedContext.Provider value={value}>{children}</CowFeedContext.Provider>;
};

export const useCowFeed = () => {
  const context = useContext(CowFeedContext);
  if (!context) {
    throw new Error('useCowFeed must be used within a CowFeedProvider');
  }
  return context;
};
