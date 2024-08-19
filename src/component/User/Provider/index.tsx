import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { User, UserService } from "../UserService";

// Define the prop type for children
type ProviderProps = {
  children: ReactNode;
};

export const ManageUserContext = createContext<any>(null);

export const ManageUserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await UserService.fetchUsers();
        console.log("User data:", data); // Log user data
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUserData();
  }, []);

  const addUser = async (newUser: Omit<User, 'id'>) => {
    console.log("Adding user:", newUser);
    try {
      const data = await UserService.addUser(newUser);
      console.log("User added successfully:", data);
      setUsers(prevUsers => [...prevUsers, data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const editUser = async (id: string, updatedUser: Omit<User, 'id'>) => {
    try {
      const data = await UserService.editUser(id, updatedUser);
      setUsers(prevUsers =>
        prevUsers.map(member => (member.id === id ? { ...member, ...updatedUser } : member))
      );
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const toggleUserStatus = async (id: string) => {
    try {
      const data = await UserService.toggleUserStatus(id);
      setUsers(prevUsers =>
        prevUsers.map(member => (member.id === id ? { ...member, status: !member.status } : member))
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await UserService.deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(member => member.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const value = {
    users,
    addUser,
    editUser,
    deleteUser,
    toggleUserStatus
  };

  return (
    <ManageUserContext.Provider value={value}>
      {children}
    </ManageUserContext.Provider>
  );
};

export const useManageUser = () => {
  const context = useContext(ManageUserContext);
  if (!context) {
    throw new Error("useManageUser must be used within a ManageUserProvider");
  }
  return context;
};
