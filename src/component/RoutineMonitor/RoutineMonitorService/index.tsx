import { v4 as uuidv4 } from 'uuid';

export type Information = {
  ServiceName: string;
  Result: string;
  MonitoringTime: string;
};

export type RoutineMonitor = {
  id: string;
  date: string;
  stallNo: string;
  healthStatus: string;
  note: string;
  reportedBy: string;
  userId: string;
  updatedWeight: string;
  updatedHeight: string;
  milkPerDay: string;
  animalID: string;
  monitoringDate: string;
  reports: string;
  informations: Information[];
};

const RoutineService = {
  fetchRoutineRecords,
  addRoutineRecord,
  editRoutineRecord,
  deleteRoutineRecord
};

async function fetchRoutineRecords(): Promise<RoutineMonitor[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/routines?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch routine records data');
    }
    const routineRecordsData: RoutineMonitor[] = await response.json();
    return routineRecordsData;
  } catch (error) {
    console.error('Error fetching routine records data:', (error as Error).message);
    return [];
  }
}

async function addRoutineRecord(newRoutineRecord: Omit<RoutineMonitor, 'id' | 'userId'>): Promise<RoutineMonitor> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const routineRecordWithId: RoutineMonitor = { id: uuidv4(), userId: user.id, ...newRoutineRecord };

    const response = await fetch('http://localhost:3000/routines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routineRecordWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add routine record');
    }

    return routineRecordWithId;
  } catch (error) {
    console.error('Error adding routine record:', (error as Error).message);
    throw error;
  }
}

async function editRoutineRecord(id: string, updatedRoutineRecord: Omit<RoutineMonitor, 'id'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/routines/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRoutineRecord),
    });
    if (!response.ok) {
      throw new Error('Failed to update routine record');
    }
  } catch (error) {
    console.error('Error updating routine record:', (error as Error).message);
    throw error;
  }
}

async function deleteRoutineRecord(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/routines/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete routine record');
    }
  } catch (error) {
    console.error('Error deleting routine record:', (error as Error).message);
    throw error;
  }
}

export { RoutineService };
