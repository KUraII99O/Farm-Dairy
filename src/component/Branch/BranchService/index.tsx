import { v4 as uuidv4 } from 'uuid';

export type Branch = {
  id?: string;
  name: string;
  userId?: string;
  branchName: string;
  setupDate: Date;
  builderName: string;
  phoneNumber: string;
  email: string;
}

const BranchService = {
    fetchBranches,
    addBranch,
    editBranch,
    deleteBranch,
};

async function fetchBranches(): Promise<Branch[]> {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        throw new Error("User not logged in");
    }

    const user = JSON.parse(loggedInUser);
    if (!user || !user.id) {
        throw new Error("User ID not found");
    }

    try {
        const response = await fetch(`https://auth-api-woad.vercel.app/api/api/branches?userId=${user.id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Branch data');
        }
        const branchesData: Branch[] = await response.json();
        return branchesData;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching Branch data:', error.message);
        } else {
            console.error('Unexpected error fetching Branch data');
        }
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
        const response = await fetch('https://auth-api-woad.vercel.app/api/api/branches', {
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
        if (error instanceof Error) {
            console.error('Error adding branch:', error.message);
        } else {
            console.error('Unexpected error adding branch');
        }
        throw error;
    }
}

async function editBranch(id: string, updatedBranch: Omit<Branch, 'id'>): Promise<void> {
    try {
        const response = await fetch(`https://auth-api-woad.vercel.app/api/api/branches/${id}`, {
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
        if (error instanceof Error) {
            console.error('Error updating branch:', error.message);
        } else {
            console.error('Unexpected error updating branch');
        }
        throw error;
    }
}

async function deleteBranch(id: string): Promise<void> {
    try {
        const response = await fetch(`https://auth-api-woad.vercel.app/api/api/branches/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete branch');
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting branch:', error.message);
        } else {
            console.error('Unexpected error deleting branch');
        }
        throw error;
    }
}

export { BranchService };  

