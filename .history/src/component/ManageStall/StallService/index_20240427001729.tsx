import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Stall {
  id: number;
  stallNumber: string;
  status: boolean;
  details: string;
}

const fetchStalls = async (): Promise<Stall[]> => {
  try {
    const response = await fetch("http://localhost:3000/stalls");
    if (!response.ok) {
      throw new Error("Failed to fetch Stall data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Stall data:", error.message);
    throw error;
  }
};

const addStall = async (newStall: Omit<Stall, "id">): Promise<Stall> => {
  try {
    const stalls = await fetchStalls();
    const maxId = stalls.length > 0 ? Math.max(...stalls.map((stall) => stall.id)) : 0;
    const nextId = maxId + 1;

    const stallWithId: Stall = { id: nextId, ...newStall };

    const response = await fetch("http://localhost:3000/stalls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stallWithId),
    });

    if (!response.ok) {
      throw new Error("Failed to add stall");
    }

    return stallWithId;
  } catch (error) {
    console.error("Error adding stall:", error.message);
    throw error;
  }
};

const editStall = async (id: number, updatedStall: Partial<Stall>): Promise<void> => {
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

    toast.success("Stall updated successfully!");
  } catch (error) {
    console.error("Error updating stall:", error.message);
    toast.error("An error occurred while updating stall.");
    throw error;
  }
};

const toggleStallStatus = async (id: number): Promise<Stall> => {
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
};

const deleteStall = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/stalls/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete stall");
    }

    toast.success("Stall deleted successfully!");
  } catch (error) {
    console.error("Error deleting stall:", error.message);
    toast.error("An error occurred while deleting stall.");
    throw error;
  }
};

const StallService = {
  fetchStalls,
  addStall,
  editStall,
  toggleStallStatus,
  deleteStall,
};

export { StallService, Stall };
