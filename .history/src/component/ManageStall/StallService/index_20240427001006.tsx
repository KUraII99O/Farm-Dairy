interface Stall {
    id: number;
    stallNumber: string;
    status: boolean;
    details: string;
  }
  
  const StallService = {
    fetchStalls,
    addStall,
    editStall,
    toggleStallStatus,
    deleteStall
  };
  
  async function fetchStalls(): Promise<Stall[]> {
    try {
      const response = await fetch('http://localhost:3000/stalls');
      if (!response.ok) {
        throw new Error('Failed to fetch Stall data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Stall data:', error.message);
      return [];
    }
  }
  
  async function addStall(newStall: Omit<Stall, 'id'>): Promise<Stall> {
    try {
      const response = await fetch('http://localhost:3000/stalls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStall),
      });
      if (!response.ok) {
        throw new Error('Failed to add stall');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding stall:', error.message);
      throw error;
    }
  }
  
  async function editStall(id: number, updatedStall: Omit<Stall, 'id'>): Promise<Stall> {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStall),
      });
      if (!response.ok) {
        throw new Error("Failed to update stall record");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating stall:", error.message);
      throw error;
    }
  }
  
  async function toggleStallStatus(id: number): Promise<Stall> {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}/toggle-status`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to toggle stall status");
      }
      return await response.json();
    } catch (error) {
      console.error("Error toggling stall status:", error.message);
      throw error;
    }
  }
  
  async function deleteStall(id: number): Promise<number> {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete stall");
      }
      return id;
    } catch (error) {
      console.error("Error deleting stall:", error.message);
      throw error;
    }
  }
  
  export { StallService, Stall };
  