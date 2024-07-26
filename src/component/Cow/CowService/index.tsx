import { v4 as uuidv4 } from 'uuid';

interface Cow {
  id: string;
  userId: string;
  name: string;
  breed: string;
  birthDate: string;
  status: boolean;
  pregnantStatus: string;
  gender: string;
  image: string;
  stallNumber: string ;

}

const CowService = {
  fetchCows,
  addCow,
  editCow,
  toggleCowStatus,
  deleteCow
};

async function fetchCows(userId: string): Promise<Cow[]> {
  try {
    const response = await fetch(`http://localhost:3000/cows?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cow data');
    }
    const cowData: Cow[] = await response.json();
    return cowData;
  } catch (error) {
    console.error('Error fetching cow data:', error.message);
    return [];
  }
}

async function addCow(newCow: Omit<Cow, 'id' | 'userId'>): Promise<Cow> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const cowWithId: Cow = { id: uuidv4(), userId: user.id, ...newCow };

    // Log the cow data being sent for debugging
    console.log("Adding cow with data:", cowWithId);

    const response = await fetch('http://localhost:3000/cows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cowWithId),
    });

    if (!response.ok) {
      throw new Error(`Failed to add cow. Status: ${response.status}`);
    }

    return cowWithId;
  } catch (error) {
    console.error('Error adding cow:', error.message);
    throw error;
  }
}

async function editCow(id: string, updatedCow: Omit<Cow, 'id' | 'userId'>): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/cows/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCow),
    });
    if (!response.ok) {
      throw new Error('Failed to update cow');
    }
  } catch (error) {
    console.error('Error updating cow:', error.message);
    throw error;
  }
}

async function toggleCowStatus(id: string): Promise<Cow> {
  try {
    const response = await fetch(`http://localhost:3000/cows/${id}/toggle-status`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle cow status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error toggling cow status:', error.message);
    throw error;
  }
}

async function deleteCow(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/cows/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete cow');
    }
  } catch (error) {
    console.error('Error deleting cow:', error.message);
    throw error;
  }
}

export { CowService, Cow };
