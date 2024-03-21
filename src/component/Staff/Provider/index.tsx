import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";

// Define an interface for staff members
interface StaffMember {
  id: number;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  joiningDate: string;
  grossSalary: string;
  status: boolean;
  image: File; // Add image property
}

export const StaffContext = createContext<any>(null);

export const StaffProvider: React.FC = ({ children }) => {
  const [staff, setStaff,] = useState<StaffMember[]>([]);
  const { translate } = useTranslation();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("http://localhost:3000/staffs");
        if (!response.ok) {
          throw new Error("Failed to fetch staff data");
        }
        const data = await response.json();
        setStaff(data);
      } catch (error) {
        console.error("Error fetching staff data:", error.message);
      }
    };

    fetchStaff();
  }, []);

  const addStaff = async (newStaff: Omit<StaffMember, "id">) => {
    try {
      // Generate a unique ID for the new staff member
      const id = staff.length + 1;

      // Create the new staff member object with the generated ID
      const staffWithId: StaffMember = { id, ...newStaff };

      const response = await fetch("http://localhost:3000/staffs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staffWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to add staff");
      }

      // Update the client-side state with the new staff member
      setStaff([...staff, staffWithId]);

      toast.success("Staff added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add staff");
    }
  };

  const editStaff = async (id: number, updatedStaff: StaffMember) => {
    try {
      const response = await fetch(`http://localhost:3000/staffs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStaff),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update staff");
      }
  
      // No need to parse response JSON if there's no data returned
      // Assume the update was successful if response is OK
      // Update the client-side state with the updated staff data
      setStaff((prevStaff) =>
        prevStaff.map((staffMember) =>
          staffMember.id === id ? { ...staffMember, ...updatedStaff } : staffMember
        )
      );
  
      toast.success("Staff updated successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update staff");
    }
  };

  const deleteStaffMember = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/staffs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete staff member");
      }

      setStaff((prevStaff) => prevStaff.filter((staffMember) => staffMember.id !== id));

      toast.success("Staff member deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete staff member");
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/staffs/${id}/toggle-status`, {
        method: "PUT",
      });
  
      if (!response.ok) {
        throw new Error("Failed to toggle staff status");
      }
  
      const data = await response.json();
  
      setStaff((prevStaff) =>
        prevStaff.map((staffMember) =>
          staffMember.id === id ? { ...staffMember, status: !staffMember.status } : staffMember
        )
      );
  
      toast.info(translate("Staffstatusupdatedsuccessfully"), { autoClose: 1000, hideProgressBar: true });
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to toggle staff status", { autoClose: 2000, hideProgressBar: true });
    }
  };

  const value = {
    staff,
    addStaff,
    editStaff,
    deleteStaffMember,
    toggleStatus,
  };

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};
