import { v4 as uuidv4 } from 'uuid';

export interface AnimalType {
    id: string;
    name: string;
    userId: string;
}

const AnimalTypeService = {
  fetchAnimalTypes,
  addAnimalType,
  editAnimalType,
  deleteAnimalType,
};

async function fetchAnimalTypes(): Promise<AnimalType[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/api/animal-types?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch AnimalType data');
    }
    const animalTypesData: AnimalType[] = await response.json();
    return animalTypesData;
  } catch (error) {
    console.error('Error fetching AnimalType data:', error);
    return [];
  }
}

async function addAnimalType(newAnimalType: Omit<AnimalType, 'id' | 'userId'>): Promise<AnimalType> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error('User not logged in or user data not found');
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error('User ID not found in user data');
  }

  try {
    const animalTypeWithId: AnimalType = { id: uuidv4(), userId: user.id, ...newAnimalType };
    const response = await fetch('http://localhost:3000/api/animal-types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animalTypeWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add animal type');
    }

    return animalTypeWithId;
  } catch (error) {
    console.error('Error adding animal type:', error);
    throw error;
  }
}

async function editAnimalType(id: string, updatedAnimalType: Omit<AnimalType, 'id'>): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/api/animal-types/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAnimalType),
    });
    if (!response.ok) {
      throw new Error('Failed to update animal type');
    }
  } catch (error) {
    console.error('Error updating animal type:', error);
    throw error;
  }
}

async function deleteAnimalType(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/api/animal-types/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete animal type');
    }
  } catch (error) {
    console.error('Error deleting animal type:', error);
    throw error;
  }
}

export { AnimalTypeService };
