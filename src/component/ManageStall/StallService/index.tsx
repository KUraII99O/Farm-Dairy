import { v4 as uuidv4 } from 'uuid';


export type  Stall ={
    id?: string;
    stallNumber: string;
    status: boolean;
    details: string;
    userId?: string;

  }
  
  const StallService = {
    fetchStalls,
    addStall,
    editStall,
    toggleStallStatus,
    deleteStall
  };
  
  async function fetchStalls(): Promise<Stall[]> {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      throw new Error("User not logged in");
    }
  
    const user = JSON.parse(loggedInUser);
    if (!user || !user.id) {
      throw new Error("User ID not found");
    }
  
    try {
      const response = await fetch('https://auth-api-woad.vercel.app/api/stalls?userId=' + user.id);
      if (!response.ok) {
        throw new Error('Failed to fetch stall data');
      }
      const stallData: Stall[] = await response.json();
      return stallData;
    } catch (error) {
      console.error('Error fetching stall data:', error);
      return [];
    }
  }
  
  
  async function addStall(newStall: Omit<Stall, 'id' | 'userId'>): Promise<Stall> {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      throw new Error("User not logged in or user data not found");
    }
  
    const user = JSON.parse(loggedInUser);
    if (!user || !user.id) {
      throw new Error("User ID not found in user data");
    }
  
    try {
      const stallWithId: Stall = { id: uuidv4(), userId: user.id, ...newStall };
  
      const response = await fetch('https://auth-api-woad.vercel.app/api/stalls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stallWithId),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add cow');
      }
  
      return stallWithId;
    } catch (error) {
      console.error('Error adding stall:', error);
      throw error;
    }
  }
  
  async function editStall(id: string, updatedStall: Omit<Stall, 'id' | 'userId'>): Promise<void> {
    try {
      const response = await fetch(`https://auth-api-woad.vercel.app/api/stalls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStall),
      });
      if (!response.ok) {
        throw new Error('Failed to update stall');
      }
    } catch (error) {
      console.error('Error updating stall:', error);
      throw error;
    }
  }
  
  async function toggleStallStatus(id: string): Promise<Stall> {
    try {
      const response = await fetch(`https://auth-api-woad.vercel.app/api/stalls/${id}/toggle-status`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to toggle stall status");
      }
      return await response.json();
    } catch (error) {
      console.error("Error toggling stall status:", error);
      throw error;
    }
  }
  
  async function deleteStall(id: string): Promise<void> {
    try {
      const response = await fetch(`https://auth-api-woad.vercel.app/api/stalls/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete stall");
      }
    } catch (error) {
      console.error("Error deleting stall:", error);
      throw error;
    }
  }
  
  export { StallService };
  