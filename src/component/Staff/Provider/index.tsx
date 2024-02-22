import React, { createContext, useState, useContext } from 'react';

export const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([
    { id: 1, name: 'dariues', email: 'dariues@example.com', mobile: '1234567890', designation: 'Manager', joiningDate: '2024-01-01', GrossSalary: 50000, status: true , image: 'path_to_image1' },
    { id: 2, name: 'garen', email: 'garen@example.com', mobile: '9876543210', designation: 'Developer', joiningDate: '2024-02-01', GrossSalary: 60000, status: true , image: 'path_to_image2'  },
    { id: 3, name: 'akali', email: 'akali@example.com', mobile: '5678901234', designation: 'Designer', joiningDate: '2024-03-01', GrossSalary: 70000, status: true , image: 'path_to_image3' },
    { id: 4, name: 'zed', email: 'zed@example.com', mobile: '1234567890', designation: 'Manager', joiningDate: '2024-01-01', GrossSalary: 50000, status: true  , image: 'path_to_image4'},
    { id: 5, name: 'rammus', email: 'rammus@example.com', mobile: '9876543210', designation: 'Developer', joiningDate: '2024-02-01', GrossSalary: 60000, status: true , image: 'path_to_image5'},
    { id: 6, name: 'evelyn', email: 'evelyn@example.com', mobile: '5678901234', designation: 'Designer', joiningDate: '2024-03-01', GrossSalary: 70000, status: true , image: 'path_to_image6'},
    { id: 7, name: 'kayn', email: 'kayn@example.com', mobile: '1234567890', designation: 'Manager', joiningDate: '2024-01-01', GrossSalary: 50000, status: true , image: 'path_to_image7'},
    { id: 8, name: 'aatrox', email: 'aatrox@example.com', mobile: '9876543210', designation: 'Developer', joiningDate: '2024-02-01', GrossSalary: 60000, status: true , image: 'path_to_image8'},
    { id: 9, name: 'lulu', email: 'lulu@example.com', mobile: '5678901234', designation: 'Designer', joiningDate: '2024-03-01', GrossSalary: 70000, status: true , image: 'path_to_image9'},
    // Add more mock data as needed
  ])  ;

  const addStaff = (newStaff) => {
    const maxId = Math.max(...staff.map(s => s.id), 0);
    const newStaffWithId = { ...newStaff, id: maxId + 1 };
    setStaff([...staff, newStaffWithId]);
  };

  const editStaff = (id, updatedStaff) => {
    const updatedStaffList = staff.map(item => (item.id === id ? { ...item, ...updatedStaff } : item));
    setStaff(updatedStaffList);
  };

  const deleteStaffMember = (id) => {
    const updatedStaff = staff.filter((staffMember) => staffMember.id !== id);
    setStaff(updatedStaff);
  };

  const toggleStatus = (id) => {
    const updatedStaff = staff.map((staffMember) => {
      if (staffMember.id === id) {
        return { ...staffMember, status: !staffMember.status };
      }
      return staffMember;
    });
    setStaff(updatedStaff);
  };

  const value = {
    staff,
    addStaff,
    editStaff,
    deleteStaffMember,
    toggleStatus,
  };

  return <StaffContext.Provider value={value}>{children}</StaffContext.Provider>;
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};
