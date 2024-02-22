import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'dariues', 
      email: 'dariues@example.com', 
      mobile: '1234567890', 
      designation: 'Accountant', 
      userType: 'Admin', 
      joiningDate: '2024-01-01', 
      salary: 50000, 
      status: true, 
      image: 'path_to_image1', 
      presentAddress: 'test adress', 
      permanentAddress: 'same adress ', 
      basicSalary: 99877, 
      grossSalary: 87876, 
      nid: '675896754'
    },
    { 
      id: 2, 
      name: 'garen', 
      email: 'garen@example.com', 
      mobile: '9876543210', 
      designation: 'Executive', 
      userType: 'Accountant', 
      joiningDate: '2024-02-01', 
      salary: 60000, 
      status: true, 
      image: 'path_to_image2', 
      presentAddress: 'testest', 
      permanentAddress: 'random', 
      basicSalary: 98867565, 
      grossSalary: 98675, 
      nid: '23456Y7U8U  '
    },
    { 
      id: 3, 
      name: 'akali', 
      email: 'akali@example.com', 
      mobile: '5678901234', 
      designation: 'Executive', 
      userType: 'Marketing', 
      joiningDate: '2024-03-01', 
      salary: 70000, 
      status: true, 
      image: 'path_to_image3', 
      presentAddress: '', 
      permanentAddress: '', 
      basicSalary: 0, 
      grossSalary: 0, 
      nid: ''
    },
    // Add more mock data as needed
  ]);

  const addUser = (newUser) => {
    const maxId = Math.max(...users.map(s => s.id), 0);
    const newUserWithId = { ...newUser, id: maxId + 1 };
    setUsers([...users, newUserWithId]);
  };

  const editUser = (id, updatedUser) => {
    const updatedUserList = users.map(item => (item.id === id ? { ...item, ...updatedUser } : item));
    setUsers(updatedUserList);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const toggleStatus = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, status: !user.status };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const value = {
    users,
    addUser,
    editUser,
    deleteUser,
    toggleStatus,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
