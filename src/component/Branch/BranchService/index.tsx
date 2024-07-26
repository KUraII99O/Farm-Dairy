import { v4 as uuidv4 } from 'uuid';

export interface Branch {
    id: string,
    name: string,
    userId: string,
    branchName: string,
    setupDate: Date,
    builderName: string,
    phoneNumber: string,
    email: string,
}

const BranchService = {
  fetchBranches,
  addBranch,
  editBranch,
  deleteBranch,
};

async function fetchBranches(): Promise<Branch[]> {
  try {
    const response = await fetch('http://localhost:3000/branches');
    if (!response.ok) {
      throw new Error('Failed to fetch branches data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching branches data:', error);
    return [];
  }
}

async function addBranch(newBranch: Omit<Branch, 'id' | 'userId'>): Promise<Branch> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error('User not logged in or user data not found');
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error('User ID not found in user data');
  }

  try {
    const branchWithId: Branch = { id: uuidv4(), userId: user.id, ...newBranch };
    const response = await fetch('http://localhost:3000/branches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(branchWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add branch');
    }

    return branchWithId;
  } catch (error) {
    console.error('Error adding branch:', error);
    throw error;
  }
}

async function editBranch(id: string, updatedBranch: Omit<Branch, 'id'>): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/branches/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBranch),
      });
      if (!response.ok) {
        throw new Error('Failed to update branch');
      }
    } catch (error) {
      console.error('Error updating branch:', error);
      throw error;
    }
  }

async function deleteBranch(id: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/branches/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete branch');
      }
    } catch (error) {
      console.error('Error deleting branch:', error);
      throw error;
    }
  }

export { BranchService, Branch };
