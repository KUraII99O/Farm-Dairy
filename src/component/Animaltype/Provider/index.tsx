import React, { createContext, useState, useEffect, useContext } from "react";
import { AnimalType, AnimalTypeService } from "../AnimaltypeService";




interface ManageAnimalTypeContextProps {
  animalTypes: AnimalType[];
  addAnimalType: (newAnimalType: Omit<AnimalType, 'id'>) => Promise<void>;
  editAnimalType: (id: string, updatedAnimalType: Partial<Omit<AnimalType, 'id'>>) => Promise<void>;
  deleteAnimalType: (id: string) => Promise<void>;
}

interface ManageAnimalTypeProviderProps {
  children: React.ReactNode;
}




export const ManageAnimalTypeContext = createContext<ManageAnimalTypeContextProps | null>(null);

export const ManageAnimalTypeProvider: React.FC<ManageAnimalTypeProviderProps> = ({ children }) => {
  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);

  useEffect(() => {
    const fetchAnimalTypeData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID

        const data = await AnimalTypeService.fetchAnimalTypes();
        console.log("Animal type data:", data); // Log animal type data
        setAnimalTypes(data || []);
      } catch (error) {
        console.error("Error fetching animal types:", error);
      }
    };

    fetchAnimalTypeData();
  }, []);

  const addAnimalType = async (newAnimalType: Omit<AnimalType, 'id'>) => {
    try {
      const data = await AnimalTypeService.addAnimalType(newAnimalType);
      setAnimalTypes(prevAnimalTypes => [...prevAnimalTypes, data]);
    } catch (error) {
      console.error("Error adding animal type:", (error as Error).message);
    }
  };

  const editAnimalType = async (id: string, updatedAnimalType: Partial<Omit<AnimalType, 'id'>>) => {
    try {
      await AnimalTypeService.editAnimalType(id, updatedAnimalType);
      setAnimalTypes(prevAnimalTypes =>
        prevAnimalTypes.map(animalType =>
          animalType.id === id ? { ...animalType, ...updatedAnimalType } : animalType
        )
      );
    } catch (error) {
      console.error("Error editing animal type:", (error as Error).message);
    }
  };

  const deleteAnimalType = async (id: string) => {
    try {
      await AnimalTypeService.deleteAnimalType(id);
      setAnimalTypes(prevAnimalTypes => prevAnimalTypes.filter(animalType => animalType.id !== id));
    } catch (error) {
      console.error("Error deleting animal type:", (error as Error).message);
    }
  };

  const value: ManageAnimalTypeContextProps = {
    animalTypes,
    addAnimalType,
    editAnimalType,
    deleteAnimalType
  };

  return (
    <ManageAnimalTypeContext.Provider value={value}>
      {children}
    </ManageAnimalTypeContext.Provider>
  );
};

export const useAnimalType = () => {
  const context = useContext(ManageAnimalTypeContext);
  if (!context) {
    throw new Error("useAnimalType must be used within a ManageAnimalTypeProvider");
  }
  return context;

};
