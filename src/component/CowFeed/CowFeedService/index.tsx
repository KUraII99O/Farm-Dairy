import { v4 as uuidv4 } from 'uuid';

export interface CowFeed {
  id: string;
  date: string; 
  StallNo: string;
  cowNumber: string;
  note: number;
  foodItem: string;
  quantity: number;
  userId: string;
  unit: string;
  feedingTime: string;
}

const CowFeedService = {
  fetchCowFeedRecords,
  addCowFeedRecord,
  editCowFeedRecord,
  deleteCowFeedRecord
};

async function fetchCowFeedRecords(): Promise<CowFeed[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/cowfeeds?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch cow feed records data');
    }
    const cowFeedRecordsData: CowFeed[] = await response.json();
    return cowFeedRecordsData;
  } catch (error) {
    console.error('Error fetching cow feed records data:', error.message);
    return [];
  }
}

async function addCowFeedRecord(newCowFeedRecord: Omit<CowFeed, 'id'>): Promise<CowFeed> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const cowFeedRecordWithId: CowFeed = { id: uuidv4(), userId: user.id, ...newCowFeedRecord };

    const response = await fetch('http://localhost:3000/cowfeeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cowFeedRecordWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add cow feed record');
    }

    return cowFeedRecordWithId;
  } catch (error) {
    console.error('Error adding cow feed record:', error.message);
    throw error;
  }
}

async function editCowFeedRecord(id: string, updatedCowFeedRecord: Omit<CowFeed, 'id'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/cowfeeds/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...updatedCowFeedRecord, userId: user.id}), // Ensure userId is included
    });
    if (!response.ok) {
      throw new Error('Failed to update cow feed record');
    }
  } catch (error) {
    console.error('Error updating cow feed record:', error.message);
    throw error;
  }
}

async function deleteCowFeedRecord(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/cowfeeds/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete cow feed record');
    }
  } catch (error) {
    console.error('Error deleting cow feed record:', error.message);
    throw error;
  }
}

export { CowFeedService, CowFeed };
