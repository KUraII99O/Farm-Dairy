import React, { createContext, useState, useContext } from 'react';

export const CowFeedContext = createContext();

export const CowFeedProvider = ({ children }) => {
  const [cowFeeds, setCowFeeds] = useState([
    { 
      id: 1, 
      date: '2024-01-01', 
      stallNo: 'A1', 
      cowNumber: 'C001', 
      note: 'Morning feeding', 
      informations: [
        { foodItem: 'Grass', quantity: '2', unit: 'kg', feedingTime: '8:00 AM' },
        { foodItem: 'Salt', quantity: '100', unit: 'gram', feedingTime: '8:00 AM' },
        { foodItem: 'Water', quantity: '5', unit: 'liters', feedingTime: '8:00 AM' },
      ]
    },
    { 
      id: 2, 
      date: '2024-01-02', 
      stallNo: 'B2', 
      cowNumber: 'C002', 
      note: 'Afternoon feeding', 
      informations: [
        { foodItem: 'Grass', quantity: '2.5', unit: 'kg', feedingTime: '1:00 PM' },
        { foodItem: 'Salt', quantity: '120', unit: 'gram', feedingTime: '1:00 PM' },
        { foodItem: 'Water', quantity: '6', unit: 'liters', feedingTime: '1:00 PM' },
      ]
    },
    { 
      id: 3, 
      date: '2024-01-03', 
      stallNo: 'C3', 
      cowNumber: 'C003', 
      note: 'Evening feeding', 
      informations: [
        { foodItem: 'Grass', quantity: '3', unit: 'kg', feedingTime: '6:00 PM' },
        { foodItem: 'Salt', quantity: '150', unit: 'gram', feedingTime: '6:00 PM' },
        { foodItem: 'Water', quantity: '7', unit: 'liters', feedingTime: '6:00 PM' },
      ]
    },
    // Add more mock data as needed
  ]);

  const addCowFeed = (newCowFeed) => {
    const maxId = Math.max(...cowFeeds.map(cowFeed => cowFeed.id), 0);
    const newCowFeedWithId = { ...newCowFeed, id: maxId + 1 };
    setCowFeeds([...cowFeeds, newCowFeedWithId]);
  };

  const editCowFeed = (id, updatedCowFeed) => {
    const updatedCowFeedList = cowFeeds.map(item => (item.id === id ? { ...item, ...updatedCowFeed } : item));
    setCowFeeds(updatedCowFeedList);
  };

  const deleteCowFeed = (id) => {
    const updatedCowFeeds = cowFeeds.filter((cowFeed) => cowFeed.id !== id);
    setCowFeeds(updatedCowFeeds);
  };

  const getCowFeedById = (id) => {
    // Find and return the cow feed with the given ID
    return cowFeeds.find((cowFeed) => cowFeed.id === id);
  };

  const value = {
    cowFeeds,
    addCowFeed,
    editCowFeed,
    deleteCowFeed,
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
