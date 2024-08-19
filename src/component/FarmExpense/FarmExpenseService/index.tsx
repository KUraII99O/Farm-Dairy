import { v4 as uuidv4 } from 'uuid';

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  note: string;
  userId: string;
}

const ExpenseService = {
  fetchExpenses,
  addExpense,
  editExpense,
  deleteExpense
};

async function fetchExpenses(): Promise<Expense[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/expenses?userId=${user.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses data');
    }
    const expensesData: Expense[] = await response.json();
    return expensesData;
  } catch (error) {
    console.error('Error fetching expenses data:', error.message);
    return [];
  }
}

async function addExpense(newExpense: Omit<Expense, 'id' | 'userId'>): Promise<Expense> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const expenseWithId: Expense = { id: uuidv4(), userId: user.id, ...newExpense };

    const response = await fetch('http://localhost:3000/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add expense');
    }

    return expenseWithId;
  } catch (error) {
    console.error('Error adding expense:', error.message);
    throw error;
  }
}

async function editExpense(id: string, updatedExpense: Omit<Expense, 'id' | 'userId'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedExpense, userId: user.id }),
    });
    if (!response.ok) {
      throw new Error('Failed to update expense');
    }
  } catch (error) {
    console.error('Error updating expense:', error.message);
    throw error;
  }
}

async function deleteExpense(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/expenses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete expense');
    }
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    throw error;
  }
}

export { ExpenseService, Expense };