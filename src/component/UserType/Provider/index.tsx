import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { UserType, UserTypeService } from "../UserTypeService";

// Define the context type
interface UserTypeContextType {
  userTypes: UserType[];
  addUserType: (newUserType: Omit<UserType, 'id'>) => Promise<void>;
  editUserType: (id: string, updatedUserType: Omit<UserType, 'id'>) => Promise<void>;
  deleteUserType: (id: string) => Promise<void>;
}

// Initialize context with default value as `null`
export const UserTypeContext = createContext<UserTypeContextType | null>(null);

// Define the props type for the provider component
interface UserTypeProviderProps {
  children: ReactNode;
}

export const UserTypeProvider: React.FC<UserTypeProviderProps> = ({ children }) => {
  const [userTypes, setUserTypes] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await UserTypeService.fetchUserTypes();
        console.log("UserTypes data:", data); // Log userTypes data
        setUserTypes(data || []);
      } catch (error) {
        console.error("Error fetching user types:", error);
      }
    };
  
    fetchUserTypes();
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
    throw new Error("useManageUserType must be used within a UserTypeProvider");
  }
  return context;
};
