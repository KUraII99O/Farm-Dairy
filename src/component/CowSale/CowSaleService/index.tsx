import { v4 as uuidv4 } from 'uuid';

interface CowSales {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  totalPrice: number;
  totalPaid: string;
  due: number;
  note: string;
  collectedFrom: string;
  image: string;
  stallNo: string;
  cowNumber: string;
  gender: string;
  weight: string;
  height: string;
  userId: string;
}

const CowSalesService = {
  fetchSales,
  addSale,
  editSale,
  deleteSale
};

async function fetchSales(): Promise<CowSales[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/sales?userId=${user.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }
    const salesData: CowSales[] = await response.json();
    return salesData;
  } catch (error) {
    console.error('Error fetching sales data:', error.message);
    return [];
  }
}

async function addSale(newSale: Omit<CowSales, 'id' | 'userId'>): Promise<CowSales> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const saleWithId: CowSales = { id: uuidv4(), userId: user.id, ...newSale };

    const response = await fetch('http://localhost:3000/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add sale');
    }

    return saleWithId;
  } catch (error) {
    console.error('Error adding sale:', error.message);
    throw error;
  }
}

async function editSale(id: string, updatedSale: Omit<CowSales, 'id' | 'userId'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/sales/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedSale, userId: user.id }),
    });
    if (!response.ok) {
      throw new Error('Failed to update sale');
    }
  } catch (error) {
    console.error('Error updating sale:', error.message);
    throw error;
  }
}

async function deleteSale(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/sales/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete sale');
    }
  } catch (error) {
    console.error('Error deleting sale:', error.message);
    throw error;
  }
}

export { CowSalesService, CowSales };
