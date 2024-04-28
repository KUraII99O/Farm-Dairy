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
      // Fetch the current stalls to determine the next ID
      const currentStalls = await fetchStalls();
      const maxId = currentStalls.length > 0 ? Math.max(...currentStalls.map(stall => stall.id)) : 0;
      const nextId = maxId + 1;
  
      // Assign the next ID to the new stall
      const stallWithId: Stall = { id: nextId, ...newStall };
  
      // Send the request to add the stall with the assigned ID
      const response = await fetch('http://localhost:3000/stalls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stallWithId),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add stall');
      }
  
      return stallWithId; // Return the added stall with the assigned ID
    } catch (error) {
      console.error('Error adding stall:', error.message);
      throw error;
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
  