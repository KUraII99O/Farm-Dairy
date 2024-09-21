import { v4 as uuidv4 } from 'uuid';

// Define the FoodItem interface
export type FoodItem = {
    id: string;
    userId: string;
    name: string;
};


// FoodItemService object
const FoodItemService = {
    fetchFoodItems,
    addFoodItem,
    editFoodItem,
    deleteFoodItem,
  };
  
  // Fetch FoodItems function
  async function fetchFoodItems(): Promise<FoodItem[]> {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      throw new Error("User not logged in");
    }
  
    const user = JSON.parse(loggedInUser);
    if (!user || !user.id) {
      throw new Error("User ID not found");
    }
  
    try {
      const response = await fetch(`https://auth-api-woad.vercel.app/api/food-items?userId=${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Food Item data');
      }
      const foodItemsData: FoodItem[] = await response.json();
      return foodItemsData;
    } catch (error) {
      console.error('Error fetching Food Item data:', error);
      return [];
    }
  }
  
  // Add FoodItem function
  async function addFoodItem(newFoodItem: Omit<FoodItem, 'id' | 'userId' | 'date'>): Promise<FoodItem> {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      throw new Error('User not logged in or user data not found');
    }
  
    const user = JSON.parse(loggedInUser);
    if (!user || !user.id) {
      throw new Error('User ID not found in user data');
    }
  
    try {
      const foodItemWithId: FoodItem = { id: uuidv4(), userId: user.id,  ...newFoodItem };
      const response = await fetch('https://auth-api-woad.vercel.app/api/food-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodItemWithId),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add food item');
      }
  
      return foodItemWithId;
    } catch (error) {
      console.error('Error adding food item:', error);
      throw error;
    }
  }
  
  // Edit FoodItem function
  async function editFoodItem(id: string, updatedFoodItem: Omit<FoodItem, 'id' | 'userId' | 'date'>): Promise<void> {
    try {
      const response = await fetch(`https://auth-api-woad.vercel.app/api/food-items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFoodItem),
      });
      if (!response.ok) {
        throw new Error('Failed to update food item');
      }
    } catch (error) {
      console.error('Error updating food item:', error);
      throw error;
    }
  }
  
  // Delete FoodItem function
  async function deleteFoodItem(id: string): Promise<void> {
    try {
      const response = await fetch(`https://auth-api-woad.vercel.app/api/food-items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete food item');
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
      throw error;
    }
  }
  
  export { FoodItemService };
