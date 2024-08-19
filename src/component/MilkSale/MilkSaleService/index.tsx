import { v4 as uuidv4 } from 'uuid';

export interface MilkSaleRecord {
  id: string;
  Date: string;
  userId: string;
  AccountNo: string;
  StallNo: string;
  AnimalID: string;
  Liter: number;
  Fate: string;
  Price: number;
  Total: number;
  CollectedFrom: string;
  addedBy: string;
}

const MilkSaleService = {
  fetchMilkSaleRecords,
  addMilkSaleRecord,
  editMilkSaleRecord,
  deleteMilkSaleRecord
};

async function fetchMilkSaleRecords(): Promise<MilkSaleRecord[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/milksales?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch milk sale records data');
    }
    const milkSaleRecordsData: MilkSaleRecord[] = await response.json();
    return milkSaleRecordsData;
  } catch (error) {
    console.error('Error fetching milk sale records data:', error.message);
    return [];
  }
}

async function addMilkSaleRecord(newMilkSaleRecord: Omit<MilkSaleRecord, 'id' | 'userId'>): Promise<MilkSaleRecord> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const milkSaleRecordWithId: MilkSaleRecord = { id: uuidv4(), userId: user.id, ...newMilkSaleRecord };

    const response = await fetch('http://localhost:3000/milksales', {
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

async function editMilkSaleRecord(id: string, updatedMilkSaleRecord: Omit<MilkSaleRecord, 'id' | 'userId'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/milksales/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedMilkSaleRecord, userId: user.id }),
    });
    if (!response.ok) {
      throw new Error('Failed to update milk sale record');
    }
  } catch (error) {
    console.error('Error updating milk sale record:', error.message);
    throw error;
  }
}

async function deleteMilkSaleRecord(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/milksales/${id}`, {
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

export { MilkSaleService, MilkSaleRecord };
