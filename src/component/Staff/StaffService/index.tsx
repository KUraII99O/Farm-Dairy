import { v4 as uuidv4 } from 'uuid';

interface Staff {
  id: string;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  joiningDate: string;
  grossSalary: string;
  status: boolean;
  image: string;
}

const StaffService = {
  fetchStaff,
  addStaff,
  editStaff,
  toggleStaffStatus,
  deleteStaff
};

async function fetchStaff(): Promise<Staff[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/staffs?userId='+ user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch staff data');
    }
    const staffData: Staff[] = await response.json();
    return staffData
  } catch (error) {
    console.error('Error fetching staff data:', error.message);
    return [];
  }
}

async function addStaff(newStaff: Omit<Staff, 'id' | 'userId'>): Promise<Staff> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const staffWithId: Staff = { id: uuidv4(), userId: user.id, ...newStaff };

    const response = await fetch('http://localhost:3000/staffs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add staff');
    }

    return staffWithId;
  } catch (error) {
    console.error('Error adding staff:', error.message);
    throw error;
  }
}

async function editStaff(id: string, updatedStaff: Omit<Staff, 'id' | 'userId'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/staffs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedStaff, userId: user.id }),
    });
    if (!response.ok) {
      throw new Error('Failed to update staff');
    }
  } catch (error) {
    console.error('Error updating staff:', error.message);
    throw error;
  }
}

async function toggleStaffStatus(id: string): Promise<Staff> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/staffs/${id}/toggle-status`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle staff status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error toggling staff status:', error.message);
    throw error;
  }
}

async function deleteStaff(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/staffs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete staff');
    }
  } catch (error) {
    console.error('Error deleting staff:', error.message);
    throw error;
  }
}

export { StaffService, Staff };
