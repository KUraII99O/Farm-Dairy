import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";

// Define an interface for users
interface User {
  id: number;
  username: string;
  password: string;
  type: string;
}

export const UserContext = createContext<any>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { translate } = useTranslation();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (newUser: Omit<User, "id">) => {
    try {
      // Generate a unique ID for the new user
      const id = users.length + 1;

      // Create the new user object with the generated ID
      const userWithId: User = { id, ...newUser };

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      // Update the client-side state with the new user
      setUsers([...users, userWithId]);

      toast.success("User added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add user");
    }
  };

  const editUser = async (id: number, updatedUser: User) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
  
      // No need to parse response JSON if there's no data returned
      // Assume the update was successful if response is OK
      // Update the client-side state with the updated user data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
  
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete user");
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/Users/${id}/toggle-status`, {
        method: "PUT",
      });
  
      if (!response.ok) {
        throw new Error("Failed to toggle User status");
      }
  
      const data = await response.json();
  
      setUsers((prevUser) =>
        prevUser.map((User) =>
          User.id === id ? { ...User, status: !User.status } : User
        )
      );
  
      toast.info(translate("Userstatusupdatedsuccessfully"), { autoClose: 1000, hideProgressBar: true });
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to toggle User status", { autoClose: 2000, hideProgressBar: true });
    }
  };

  const value = {
    users,
    addUser,
    editUser,
    deleteUser,
    toggleStatus,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
