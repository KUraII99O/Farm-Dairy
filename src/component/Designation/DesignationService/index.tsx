import { v4 as uuidv4 } from 'uuid';

export type Designation = {
  id?: string;
  name: string; // Assuming you have a similar field for designations
  userId?: string;
}

const DesignationService = {
  fetchDesignations,
  addDesignation,
  editDesignation,
  deleteDesignation
};


async function fetchDesignations(): Promise<Designation[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/designations?userId='+ user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch Designation data');
    }
    const designationsData: Designation[] = await response.json();
    return designationsData
  } catch (error) {
   throw new Error ('Error fetching Designation data:');
    return [];
  }
}


async function addDesignation(newDesignation: Omit<Designation, 'id' | 'userId'>): Promise<Designation> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const designationWithId: Designation = { id: uuidv4(), userId: user.id, ...newDesignation };

    const response = await fetch('http://localhost:3000/designations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(designationWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add designation');
    }

    return designationWithId;
  } catch (error) {
   throw new Error ('Error adding designation:');
    throw error;
  }
}

async function editDesignation(id: string, updatedDesignation: Omit<Designation, 'id' | 'userId'>): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/designations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDesignation),
    });
    if (!response.ok) {
      throw new Error('Failed to update designation');
    }
  } catch (error) {
   throw new Error ('Error updating designation:');
    throw error;
  }
}



async function deleteDesignation(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/designations/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete designation");
    }
  } catch (error) {
   throw new Error ("Error deleting designation:");
    throw error;
  }
}

export { DesignationService };
