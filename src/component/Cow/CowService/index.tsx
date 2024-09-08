import { v4 as uuidv4 } from 'uuid';

export type  Cow ={

    id: string,
    image: string,
    userId: string,
    animal: string,
    buyDate: string,
    stallNumber: string,
    buyingPrice: string,
    dateAdded: string,
    pregnantStatus: string,
    milkPerDay: string,
    status: boolean,
    gender: string,
    informations: {
      stallNumber: string,
      dateOfBirth: string,
      animalAgeDays: string,
      weight: string,
      height: string,
      color: string,
      numOfPregnant: string,
      nextPregnancyApproxTime: string,
      buyFrom: string,
      prevVaccineDone: string,
      note: string,
      createdBy: string,
    },
    vaccinations: {
      BDV: boolean,
      PI3: boolean,
      BRSV: boolean,
      BVD: boolean,
      VitaminA: boolean,
      Anthrax: boolean,
    },
  };


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
    if (error instanceof Error) {
      console.error('Error fetching cow data:', error.message);
    } else {
      console.error('Unknown error occurred while fetching cow data');
    }
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
    if (error instanceof Error) {
      console.error('Error adding cow:', error.message);
    } else {
      console.error('Unknown error occurred while adding cow');
    }
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
    if (error instanceof Error) {
      console.error('Error updating cow:', error.message);
    } else {
      console.error('Unknown error occurred while updating cow');
    }
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
    if (error instanceof Error) {
      console.error('Error toggling cow status:', error.message);
    } else {
      console.error('Unknown error occurred while toggling cow status');
    }
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
    if (error instanceof Error) {
      console.error('Error deleting cow:', error.message);
    } else {
      console.error('Unknown error occurred while deleting cow');
    }
    throw error;
  }
}

export { CowService };
