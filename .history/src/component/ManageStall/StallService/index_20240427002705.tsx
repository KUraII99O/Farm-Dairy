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
  
  async function editStall(id: number, updatedStall: Omit<Stall, "id">) {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStall),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update Stall record");
      }
  
      const updatedData = await response.json();
  
      setStalls((prevStalls) =>
        prevStalls.map((stall) =>
          stall.id === id ? { ...stall, ...updatedData } : stall
        )
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  async function toggleStatus(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}/toggle-status`, {
        method: "PUT",
      });
  
      if (!response.ok) {
        throw new Error("Failed to toggle stall status");
      }
  
      const data = await response.json();
  
      setStalls((prevstall) =>
        prevstall.map((stall) =>
          stall.id === id ? { ...stall, status: !stall.status } : stall
        )
      );
  
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  async function deletestall(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/stalls/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete milk record");
      }
  
      setStalls((prevstalls) =>
        prevstalls.filter((stall) => stall.id !== id)
      );
  
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  async function getStallById(id) {
    try {
      // Fetch stall data by ID
      const response = await fetch(`http://localhost:3000/stalls/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stall by ID");
      }
      const stall = await response.json();
      return stall;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  export { StallService, Stall };
  