import { v4 as uuidv4 } from 'uuid';

interface Calf {
    id: string;
    image: File; // Add image property
    gender: string;
    animalType: string;
    buyDate: Date;
    buyingPrice: number;
    milkPerDay: string;
    status: boolean;
    stallNumber: string;
    dateOfBirth: Date;
    animalAgeDays: string;
    weight: string;
    height: string;
    color: string;
    numOfPregnant: string;
    buyFrom: string;
    prevVaccineDone: string;
    note: string;
    CreatedBy: string;
    userId: string;
  }

const CalfService = {
  fetchCalves,
  addCalf,
  editCalf,
  toggleCalfStatus,
  deleteCalf
};

async function fetchCalves(userId: string): Promise<Calf[]> {
  try {
    const response = await fetch(`http://localhost:3000/calves?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch calf data');
    }
    const calfData: Calf[] = await response.json();
    return calfData;
  } catch (error) {
    console.error('Error fetching calf data:', error.message);
    return [];
  }
}

async function addCalf(newCalf: Omit<Calf, 'id' | 'userId'>): Promise<Calf> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const calfWithId: Calf = { id: uuidv4(), userId: user.id, ...newCalf };

    const response = await fetch('http://localhost:3000/calves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(calfWithId),
    });

    if (response.status === 403) {
      throw new Error('Limit has been reached');
    } else if (!response.ok) {
      throw new Error('Failed to add staff');
    }


    return calfWithId;
  } catch (error) {
    console.error('Error adding calf:', error.message);
    throw error;
  }
}

async function editCalf(id: string, updatedCalf: Omit<Calf, 'id' | 'userId'>): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/calves/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCalf),
    });
    if (!response.ok) {
      throw new Error('Failed to update calf');
    }
  } catch (error) {
    console.error('Error updating calf:', error.message);
    throw error;
  }
}

async function toggleCalfStatus(id: string): Promise<Calf> {
  try {
    const response = await fetch(`http://localhost:3000/calves/${id}/toggle-status`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle calf status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error toggling calf status:', error.message);
    throw error;
  }
}

async function deleteCalf(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/calves/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete calf');
    }
  } catch (error) {
    console.error('Error deleting calf:', error.message);
    throw error;
  }
}

export { CalfService, Calf };
