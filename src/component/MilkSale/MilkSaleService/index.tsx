import { v4 as uuidv4 } from 'uuid';

export interface MilkSales {
  id: number;
  Date: string;
  AccountNo: string;
  StallNo: string;
  AnimalID: string;
  Liter: number;
  Fate: string;
  Price: number;
  Total: number;
  CollectedFrom: string;
  AddedBy: string;
  invoice: string;
}

const MilkSaleService = {
  fetchMilkSaleRecords,
  addMilkSaleRecord,
  editMilkSaleRecord,
  deleteMilkSaleRecord
};

async function fetchMilkSaleRecords(): Promise<MilkSales[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/milksale?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch milk sale records data');
    }
    const milkSaleRecordsData: MilkSales[] = await response.json();
    return milkSaleRecordsData;
  } catch (error) {
    console.error('Error fetching milk sale records data:', error.message);
    return [];
  }
}

async function addMilkSaleRecord(newMilkSaleRecord: Omit<MilkSales, 'id'>): Promise<MilkSales> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const milkSaleRecordWithId: MilkSales = { id: uuidv4(), AddedBy: user.id, ...newMilkSaleRecord };

    const response = await fetch('http://localhost:3000/milksale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(milkSaleRecordWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add milk sale record');
    }

    return milkSaleRecordWithId;
  } catch (error) {
    console.error('Error adding milk sale record:', error.message);
    throw error;
  }
}

async function editMilkSaleRecord(id: number, updatedMilkSaleRecord: Omit<MilkSales, 'id'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/milksale/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMilkSaleRecord),
    });
    if (!response.ok) {
      throw new Error('Failed to update milk sale record');
    }
  } catch (error) {
    console.error('Error updating milk sale record:', error.message);
    throw error;
  }
}

async function deleteMilkSaleRecord(id: number): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  try {
    const response = await fetch(`http://localhost:3000/milksale/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete milk sale record');
    }
  } catch (error) {
    console.error('Error deleting milk sale record:', error.message);
    throw error;
  }
}

export { MilkSaleService, MilkSales };
