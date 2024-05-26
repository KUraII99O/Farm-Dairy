import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import { UserService } from "../UserService";

interface UserContextType {
  users: User[];
  addUser: (newUser: Omit<User, "id">) => Promise<void>;
  editUser: (id: number, updatedUser: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  toggleStatus: (id: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { translate } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (newUser: Omit<User, "id">) => {
    try {
      const userWithId = await UserService.addUser(newUser);
      setUsers([...users, userWithId]);
      toast.success(translate("User added successfully"));
    } catch (error) {
      toast.error(translate("Failed to add user"));
    }
  };

  const editUser = async (id: number, updatedUser: User) => {
    try {
      await UserService.editUser(id, updatedUser);
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === id ? { ...user, ...updatedUser } : user))
      );
      toast.success(translate("User updated successfully"));
    } catch (error) {
      toast.error(translate("Failed to update user"));
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await UserService.deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      toast.success(translate("User deleted successfully"));
    } catch (error) {
      toast.error(translate("Failed to delete user"));
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const updatedUser = await UserService.toggleUserStatus(id);
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === id ? updatedUser : user))
      );
      toast.info(translate("User status updated successfully"), { autoClose: 1000, hideProgressBar: true });
    } catch (error) {
      toast.error(translate("Failed to toggle user status"), { autoClose: 2000, hideProgressBar: true });
    }
  };

  const value = useMemo(() => ({
    users,
    addUser,
    editUser,
    deleteUser,
    toggleStatus,
  }), [users]);

  if (loading) return <div>{translate("Loading...")}</div>;
  if (error) return <div>{translate("Error:")} {error}</div>;

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
