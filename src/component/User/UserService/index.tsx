import { v4 as uuidv4 } from 'uuid';

interface User {
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
    const response = await fetch('http://localhost:3000/users?userId='+ user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData: User[] = await response.json();
    return userData
  } catch (error) {
    console.error('Error fetching user data:', error.message);
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

    const response = await fetch('http://localhost:3000/users', {
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
    console.error('Error adding user:', error.message);
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
    const response = await fetch(`http://localhost:3000/users/${id}`, {
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
    console.error('Error updating user:', error.message);
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
    const response = await fetch(`http://localhost:3000/users/${id}/toggle-status`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle user status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error toggling user status:', error.message);
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
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
}

export { UserService, User };
