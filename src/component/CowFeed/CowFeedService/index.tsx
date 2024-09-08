import { v4 as uuidv4 } from 'uuid';

export type CowFeed = {
  id: string;
  date: string; 
  StallNo: string;
  cowNumber: string;
  note: string;
  foodItem: string;
  quantity: string;
  userId: string;
  unit: string;
  feedingTime: string;
};

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching cow feed records data:', error.message);
    } else {
      console.error('Unknown error fetching cow feed records data');
    }
    return [];
  }
}

async function addCowFeedRecord(newCowFeedRecord: Omit<CowFeed, 'id'| 'userId'>): Promise<CowFeed> {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding cow feed record:', error.message);
    } else {
      console.error('Unknown error adding cow feed record');
    }
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
      body: JSON.stringify({...updatedCowFeedRecord, userId: user.id}),
    });
    if (!response.ok) {
      throw new Error('Failed to update cow feed record');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating cow feed record:', error.message);
    } else {
      console.error('Unknown error updating cow feed record');
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting cow feed record:', error.message);
    } else {
      console.error('Unknown error deleting cow feed record');
    }
    throw error;
  }
}

export { CowFeedService };
