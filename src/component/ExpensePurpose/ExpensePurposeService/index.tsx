import { v4 as uuidv4 } from 'uuid';

export type ExpensePurpose ={
  id?: string;
  name: string;
  description: string;
  userId?: string;
}

const ExpensePurposeService = {
  fetchExpensePurposes,
  addExpensePurpose,
  editExpensePurpose,
  deleteExpensePurpose,
};



async function fetchExpensePurposes(): Promise<ExpensePurpose[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('https://auth-api-woad.vercel.app/api/expense-purposes?userId='+ user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch staff data');
    }
    const expensepurposesData: ExpensePurpose[] = await response.json();
    return expensepurposesData
  } catch (error) {
    throw new Error('Error fetching Expense Purpose data:');
    return [];
  }
}

async function addExpensePurpose(newExpensePurpose: Omit<ExpensePurpose, 'id'| 'userId'>): Promise<ExpensePurpose> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error('User not logged in or user data not found');
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error('User ID not found in user data');
  }

  try {
    const expensePurposeWithId: ExpensePurpose = { id: uuidv4(), userId: user.id, ...newExpensePurpose };
    const response = await fetch('https://auth-api-woad.vercel.app/api/expense-purposes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expensePurposeWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add expense purpose');
    }

    return expensePurposeWithId;
  } catch (error) {
    console.error('Error adding expense purpose:', error);
    throw error;
  }
}

async function editExpensePurpose(id: string, updatedExpensePurpose: Omit<ExpensePurpose, 'id' | 'userId'>): Promise<void> {
  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/expense-purposes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExpensePurpose),
    });
    if (!response.ok) {
      throw new Error('Failed to update expense purpose');
    }
  } catch (error) {
    console.error('Error updating expense purpose:', error);
    throw error;
  }
}

async function deleteExpensePurpose(id: string): Promise<void> {
  try {
    const response = await fetch(`https://auth-api-woad.vercel.app/api/expense-purposes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete expense purpose');
    }
  } catch (error) {
    console.error('Error deleting expense purpose:', error);
    throw error;
  }
}

export { ExpensePurposeService };
