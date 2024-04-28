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
  
  async function addStall(newStall: Omit<Stall, 'id'>) {
    try {
      const id = stalls.length + 1;
      const StallWithId: Stall = { id, ...newStall };
  
      const response = await fetch('http://localhost:3000/Stalls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(StallWithId),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add routine Monitor');
      }
  
      const addedStall = await response.json();
  
      setStalls([...stalls, addedStall]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  async function editStall(id: number, updatedStall: Partial<Stall>): Promise<void> {
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
  
      const updatedStallData = await response.json();
  
      // Update the state with the edited stall data
      setStalls(prevStalls =>
        prevStalls.map(stall =>
          stall.id === id ? { ...stall, ...updatedStallData } : stall
        )
      );
  
      toast.success("Stall updated successfully!"); // Notify user about successful update
    } catch (error) {
      console.error("Error updating stall:", error.message);
      toast.error("An error occurred while updating stall.");
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
  
  async function deleteStall(id: number): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete stall");
      }
    } catch (error) {
      console.error("Error deleting stall:", error.message);
      throw error;
    }
  }
  
  export { StallService, Stall };
  