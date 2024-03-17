// UserTypeProvider.js
import React, { createContext, useState, useContext } from "react";

export const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const [userTypes, setUserTypes] = useState([
    {
      id: 1,
      typeName: "Admin",
    },
    {
      id: 2,
      typeName: "User",
    },
    {
      id: 3,
      typeName: "Staff",
    },
  ]);

  const [loggedInUser, setLoggedInUser] = useState(null); // Add loggedInUser state

  const addUserType = (newType) => {
    const maxId = Math.max(...userTypes.map((type) => type.id), 0);
    const newTypeWithId = { ...newType, id: maxId + 1 };
    setUserTypes([...userTypes, newTypeWithId]);
  };

  const editUserType = (id, updatedType) => {
    setUserTypes((prevTypes) =>
      prevTypes.map((type) => (type.id === id ? { ...type, ...updatedType } : type))
    );
  };

  const deleteUserType = (id) => {
    const updatedTypes = userTypes.filter((type) => type.id !== id);
    setUserTypes(updatedTypes);
  };

  const getUserTypeById = (id) => {
    // Find and return the user type with the given ID
    return userTypes.find((type) => type.id === id);
  };

  const setUserAndLocalStorage = (user) => {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  // Here's where you should implement your login logic
  const handleLogin = (user) => {
    setUserAndLocalStorage(user);
    // Additional logic related to login, if any
  };

  // Update your context value to include the login function
  const value = {
    userTypes,
    addUserType,
    editUserType,
    deleteUserType,
    getUserTypeById,
    loggedInUser,
    handleLogin, // Add the login function to the context value
  };

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error("useUserType must be used within a UserTypeProvider");
  }
  return context;
};
