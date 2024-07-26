import { v4 as uuidv4 } from 'uuid';

interface UserType {
  id: string;
  typeName: string;
  description: string;
  userId: string;
}

const UserTypeService = {
  fetchUserTypes,
  addUserType,
  editUserType,
  deleteUserType
};

async function fetchUserTypes(): Promise<UserType[]> {
  try {
    const response = await fetch('http://localhost:3000/userTypes');
    if (!response.ok) {
      throw new Error('Failed to fetch UserType data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching UserType data:', error.message);
    return [];
  }
}

async function addUserType(newUserType: Omit<UserType, 'id' | 'userId'>): Promise<UserType> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const userTypeWithId: UserType = { id: uuidv4(), userId: user.id, ...newUserType };

    const response = await fetch('http://localhost:3000/userTypes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userTypeWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add user type');
    }

    return userTypeWithId;
  } catch (error) {
    console.error('Error adding user type:', error.message);
    throw error;
  }
}

async function editUserType(id: string, updatedUserType: Omit<UserType, 'id' | 'userId'>): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/userTypes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserType),
    });
    if (!response.ok) {
      throw new Error('Failed to update user type');
    }
  } catch (error) {
    console.error('Error updating user type:', error.message);
    throw error;
  }
}

async function deleteUserType(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/userTypes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user type");
    }
  } catch (error) {
    console.error("Error deleting user type:", error.message);
    throw error;
  }
}

export { UserTypeService, UserType };
