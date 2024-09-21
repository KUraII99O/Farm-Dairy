import { v4 as uuidv4 } from 'uuid';

// Define the FoodUnit interface
export type FoodUnit = {
    id?: string;
    userId?: string;
    name: string;
};

// FoodUnitService object
const FoodUnitService = {
  fetchFoodUnits,
  addFoodUnit,
  editFoodUnit,
  deleteFoodUnit,
};

// Fetch FoodUnits function
async function fetchFoodUnits(): Promise<FoodUnit[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('https://auth-api-woad.vercel.app/api/food-units?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch Food Unit data');
    }
    const foodUnitsData: FoodUnit[] = await response.json();
    return foodUnitsData;
  } catch (error) {
    console.error('Error fetching Food Unit data:', error);
    return [];
  }
}

// Add FoodUnit function
async function addFoodUnit(newFoodUnit: Omit<FoodUnit, 'id' | 'userId'>): Promise<FoodUnit> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error('User not logged in or user data not found');
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error('User ID not found in user data');
  }

  try {
    const foodUnitWithId: FoodUnit = { id: uuidv4(), userId: user.id, ...newFoodUnit };
    const response = await fetch('https://auth-api-woad.vercel.app/api/food-units', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodUnitWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add food unit');
    }

    return foodUnitWithId;
  } catch (error) {
    console.error('Error adding food unit:', error);
    throw error;
  }
}

// Edit FoodUnit function
async function editFoodUnit(id: string, updatedFoodUnit: Omit<FoodUnit, 'id'>): Promise<void> {
  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/food-units/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFoodUnit),
    });
    if (!response.ok) {
      throw new Error('Failed to update food unit');
    }
  } catch (error) {
    console.error('Error updating food unit:', error);
    throw error;
  }
}

// Delete FoodUnit function
async function deleteFoodUnit(id: string): Promise<void> {
  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/food-units/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete food unit');
    }
  } catch (error) {
    console.error('Error deleting food unit:', error);
    throw error;
  }
}

export { FoodUnitService };
