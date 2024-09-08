import { v4 as uuidv4 } from 'uuid';

 export type MilkRecord = {
  id: string;
  Date: string;
  userId: string;
  AccountNo: string;
  StallNo: string;
  AnimalID: string;
  Liter: string;
  Fate: string;
  Price: string;
  Total: string;
  CollectedFrom: string;
  addedBy: string;
}

const MilkService = {
  fetchMilkRecords,
  addMilkRecord,
  editMilkRecord,
  deleteMilkRecord
};

async function fetchMilkRecords(): Promise<MilkRecord[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/milks?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch milk records data');
    }
    const milkRecordsData: MilkRecord[] = await response.json();
    return milkRecordsData;
  } catch (error) {
    console.error('Error fetching milk records data:', error);
    return [];
  }
}

async function addMilkRecord(newMilkRecord: Omit<MilkRecord, 'id' | 'userId'>): Promise<MilkRecord> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const milkRecordWithId: MilkRecord = { id: uuidv4(), userId: user.id, ...newMilkRecord };

    const response = await fetch('http://localhost:3000/milks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(milkRecordWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add milk record');
    }

    return milkRecordWithId;
  } catch (error) {
    console.error('Error adding milk record:', error);
    throw error;
  }
}

async function editMilkRecord(id: string, updatedMilkRecord: Omit<MilkRecord, 'id' | 'userId'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/milks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedMilkRecord, userId: user.id }),
    });
    if (!response.ok) {
      throw new Error('Failed to update milk record');
    }
  } catch (error) {
    console.error('Error updating milk record:', error);
    throw error;
  }
}

async function deleteMilkRecord(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/milks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete milk record');
    }
  } catch (error) {
    console.error('Error deleting milk record:', error);
    throw error;
  }
}

export { MilkService };
