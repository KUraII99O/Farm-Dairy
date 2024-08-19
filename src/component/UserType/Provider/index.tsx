import React, { createContext, useState, useEffect, useContext } from "react";
import { UserType, UserTypeService } from "../UserTypeService";

export const UserTypeContext = createContext<any>(null);

export const UserTypeProvider = ({ children }) => {
  const [userTypes, setUserTypes] = useState<UserType[]>([]);

 

  useEffect(() => {
    const UserTypeProvider = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await UserTypeService.fetchUserTypes();
        console.log("UserTypes data:", data); // Log staff data
        setUserTypes(data || []);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
  
    UserTypeProvider();
  }, []);


  const addUserType = async (newUserType: Omit<UserType, 'id'>) => {
    try {
      const data = await UserTypeService.addUserType(newUserType);
      setUserTypes(prevUserTypes => [...prevUserTypes, data]);
    } catch (error) {
      console.error("Error adding user type:", error);
    }
  };

  const editUserType = async (id: string, updatedUserType: Omit<UserType, 'id'>) => {
    try {
      await UserTypeService.editUserType(id, updatedUserType);
      setUserTypes(prevUserTypes =>
        prevUserTypes.map(userType => (userType.id === id ? { ...userType, ...updatedUserType } : userType))
      );
    } catch (error) {
      console.error("Error editing user type:", error);
    }
  };

  const deleteUserType = async (id: string) => {
    try {
      await UserTypeService.deleteUserType(id);
      setUserTypes(prevUserTypes => prevUserTypes.filter(userType => userType.id !== id));
    } catch (error) {
      console.error("Error deleting user type:", error);
    }
  };

  const value = {
    userTypes,
    addUserType,
    editUserType,
    deleteUserType
  };

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useManageUserType = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error("useManageUserType must be used within a ManageUserTypeProvider");
  }
  return context;
};
