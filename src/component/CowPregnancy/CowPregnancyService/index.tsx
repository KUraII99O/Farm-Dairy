import { v4 as uuidv4 } from 'uuid';

export type Pregnancy ={
  id: string;
  stallNumber: string;
  pregnancyType: string;
  semenType: string;
  semenPushDate: string;
  pregnancyStartDate: string;
  pregnancyStatus: string;
  semenCost: string;
  otherCost: string;
  note: string;
  animalAgeDays: string;
  userId: string;
  image: string;
  due: string;
  
}

const PregnancyService = {
  fetchPregnancies,
  addPregnancy,
  editPregnancy,
  deletePregnancy
};

async function fetchPregnancies(animalId: string): Promise<Pregnancy[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/pregnancies?userId=${user.id}&animalId=${animalId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pregnancy data');
    }
    const pregnanciesData: Pregnancy[] = await response.json();
    return pregnanciesData;
  } catch (error) {
    console.error('Error fetching pregnancy data:', error);
    return [];
  }
}

async function addPregnancy(newPregnancy: Omit<Pregnancy, 'id' | 'userId'>): Promise<Pregnancy> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

try {
  const pregnancyWithId: Pregnancy = { id: uuidv4(), userId: user.id, ...newPregnancy };

  const response = await fetch('https://auth-api-woad.vercel.app/api/pregnancies', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(pregnancyWithId),
  });
console.log("chpetin" )
  if (response.status === 403) {
    throw new Error('Limit has been reached');
  } else if (!response.ok) {
    throw new Error('Failed to add Pregnancy');
  }

  return pregnancyWithId;
} catch (error) {
  throw new Error ('Error adding staff:');
  throw error;
}
}


async function editPregnancy(id: string, updatedPregnancy: Omit<Pregnancy, 'id' | 'userId'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/pregnancies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedPregnancy, userId: user.id }),
    });
    if (!response.ok) {
      throw new Error('Failed to update pregnancy');
    }
  } catch (error) {
    throw new Error ('Error updating pregnancy:');
    throw error;
  }
}

async function deletePregnancy(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/pregnancies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.id }), // Ensure userId is passed
    });
    if (!response.ok) {
      throw new Error('Failed to delete pregnancy');
    }
  } catch (error) {
    throw new Error ('Error deleting pregnancy:');
    throw error;
  }
}

export { PregnancyService };