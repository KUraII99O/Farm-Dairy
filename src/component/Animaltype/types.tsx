export interface AnimalType {
    id: number;
    name: string;
  }
  
  export interface ManageAnimalTypeContextType {
    animalTypes: AnimalType[];
    deleteAnimalType: (id: number) => Promise<void>;
    addAnimalType: (animalType: AnimalType) => Promise<void>;
    editAnimalType: (id: number, animalType: AnimalType) => Promise<void>;
  }