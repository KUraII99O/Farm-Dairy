import { v4 as uuidv4 } from 'uuid';

interface Pregnancy {
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
  userId: string;
}

const PregnancyService = {
  fetchPregnancies,
  addPregnancy,
  editPregnancy,
  deletePregnancy
};

async function fetchPregnancies(): Promise<Pregnancy[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/pregnancies?userId='+ user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch pregnancy data');
    }
    const pregnanciesData: Pregnancy[] = await response.json();
    return pregnanciesData;
  } catch (error) {
    console.error('Error fetching pregnancy data:', error.message);
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

  const response = await fetch('http://localhost:3000/pregnancies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pregnancyWithId),
  });

  if (response.status === 403) {
    throw new Error('Limit has been reached');
  } else if (!response.ok) {
    throw new Error('Failed to add Pregnancy');
  }

  return pregnancyWithId;
} catch (error) {
  console.error('Error adding staff:', error.message);
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
    const response = await fetch(`http://localhost:3000/pregnancies/${id}`, {
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
    console.error('Error updating pregnancy:', error.message);
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
    const response = await fetch(`http://localhost:3000/pregnancies/${id}`, {
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
    console.error('Error deleting pregnancy:', error.message);
    throw error;
  }
}

export { PregnancyService, Pregnancy };