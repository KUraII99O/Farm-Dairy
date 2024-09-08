import { v4 as uuidv4 } from 'uuid';

export type Vaccine = {
  id?: string;
  vaccineName: string;
  periodDays: string;
  repeatVaccine: boolean;
  dose: string;
  note: string;
  userId?: string|null;
}

const VaccineService = {
  fetchVaccines,
  addVaccine,
  editVaccine,
  deleteVaccine,
};

async function fetchVaccines(): Promise<Vaccine[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/vaccines?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch Vaccine data');
    }
    const vaccinesData: Vaccine[] = await response.json();
    return vaccinesData;
  } catch (error) {
    console.error('Error fetching Vaccine data:', error);
    return [];
  }
}

async function addVaccine(newVaccine: Omit<Vaccine, 'id' | 'userId'>): Promise<Vaccine> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error('User not logged in or user data not found');
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error('User ID not found in user data');
  }

  try {
    const vaccineWithId: Vaccine = { id: uuidv4(), userId: user.id, ...newVaccine };
    const response = await fetch('http://localhost:3000/vaccines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vaccineWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add vaccine');
    }

    return vaccineWithId;
  } catch (error) {
    console.error('Error adding vaccine:', error);
    throw error;
  }
}

async function editVaccine(id: string, updatedVaccine: Omit<Vaccine, 'id'>): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/vaccines/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVaccine),
    });
    if (!response.ok) {
      throw new Error('Failed to update vaccine');
    }
  } catch (error) {
    console.error('Error updating vaccine:', error);
    throw error;
  }
}

async function deleteVaccine(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/vaccines/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete vaccine');
    }
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    throw error;
  }
}

export { VaccineService };
