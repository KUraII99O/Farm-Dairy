import React, { createContext, useState, useEffect, useContext } from "react";
import { Vaccine, VaccineService } from "../VaccineService"; // Updated import

interface ManageVaccineContextProps {
  vaccines: Vaccine[];
  addVaccine: (newVaccine: Omit<Vaccine, 'id'>) => Promise<void>;
  editVaccine: (id: string, updatedVaccine: Partial<Omit<Vaccine, 'id'>>) => Promise<void>;
  deleteVaccine: (id: string) => Promise<void>;
}

interface ManageVaccineProviderProps {
  children: React.ReactNode;
}

export const ManageVaccineContext = createContext<ManageVaccineContextProps | null>(null);

export const ManageVaccineProvider: React.FC<ManageVaccineProviderProps> = ({ children }) => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);

  useEffect(() => {
    const fetchVaccineData = async () => {
      try {
        const data = await VaccineService.fetchVaccines();
        setVaccines(data || []);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    };

    fetchVaccineData();
  }, []);

  const addVaccine = async (newVaccine: Omit<Vaccine, 'id'>) => {
    try {
      const data = await VaccineService.addVaccine(newVaccine);
      setVaccines(prevVaccines => [...prevVaccines, data]);
    } catch (error) {
      console.error("Error adding vaccine:", (error as Error).message);
    }
  };

  const editVaccine = async (id: string, updatedVaccine: Partial<Omit<Vaccine, 'id'>>) => {
    try {
      const existingVaccine = vaccines.find(vaccine => vaccine.id === id);
      if (!existingVaccine) {
        throw new Error("Vaccine not found");
      }

      const mergedVaccine = { ...existingVaccine, ...updatedVaccine };
      await VaccineService.editVaccine(id, mergedVaccine);
      setVaccines(prevVaccines =>
        prevVaccines.map(vaccine =>
          vaccine.id === id ? mergedVaccine : vaccine
        )
      );
    } catch (error) {
      console.error("Error editing vaccine:", (error as Error).message);
    }
  };

  const deleteVaccine = async (id: string) => {
    try {
      await VaccineService.deleteVaccine(id);
      setVaccines(prevVaccines => prevVaccines.filter(vaccine => vaccine.id !== id));
    } catch (error) {
      console.error("Error deleting vaccine:", (error as Error).message);
    }
  };

  const value: ManageVaccineContextProps = {
    vaccines,
    addVaccine,
    editVaccine,
    deleteVaccine
  };

  return (
    <ManageVaccineContext.Provider value={value}>
      {children}
    </ManageVaccineContext.Provider>
  );
};

export const useVaccine = () => {
  const context = useContext(ManageVaccineContext);
  if (!context) {
    throw new Error("useVaccine must be used within a ManageVaccineProvider");
  }
  return context;
};
