import { v4 as uuidv4 } from 'uuid';

export type  User = {
  id: string;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  joiningDate: string;
  grossSalary: string;
  status: boolean;
  image: string;
}

const UserService = {
  fetchUsers,
  addUser,
  editUser,
  toggleUserStatus,
  deleteUser
};

async function fetchUsers(): Promise<User[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('https://auth-api-woad.vercel.app/api/users?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData: User[] = await response.json();
    return userData;
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error fetching user data:', errorMessage);
    return [];
  }
}

async function addUser(newUser: Omit<User, 'id' | 'userId'>): Promise<User> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const userWithId: User = { id: uuidv4(), userId: user.id, ...newUser };

    const response = await fetch('https://auth-api-woad.vercel.app/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add user');
    }

    return userWithId;
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error adding user:', errorMessage);
    throw error;
  }
}

async function editUser(id: string, updatedUser: Omit<User, 'id' | 'userId'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedUser, userId: user.id }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error updating user:', errorMessage);
    throw error;
  }
}

async function toggleUserStatus(id: string): Promise<User> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/users/${id}/toggle-status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to toggle user status: ${errorText}`);
    }

    const updatedUser: User = await response.json();
    return updatedUser;
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error toggling user status:', errorMessage);
    throw error;
  }
}

async function deleteUser(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error deleting user:', errorMessage);
    throw error;
  }
}

export { UserService };
