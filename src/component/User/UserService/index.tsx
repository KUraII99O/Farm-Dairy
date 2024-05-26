import { v4 as uuidv4 } from 'uuid';

interface User {
  id: number;
  username: string;
  password: string;
  type: string;
  status: boolean;
}

const UserService = {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
  toggleUserStatus,
};

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
}

async function addUser(newUser: Omit<User, "id">): Promise<User> {
  const id = uuidv4();
  const userWithId: User = { id, ...newUser };

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userWithId),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }
  return userWithId;
}

async function editUser(id: number, updatedUser: User): Promise<void> {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
}

async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}

async function toggleUserStatus(id: number): Promise<User> {
  const response = await fetch(`http://localhost:3000/users/${id}/toggle-status`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to toggle user status");
  }

  return response.json();
}

export { UserService, User };
