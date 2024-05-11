import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 function from uuid

interface Staff {
  id: string;
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
  try {
    const response = await fetch('http://localhost:3000/staffs');
    if (!response.ok) {
      throw new Error('Failed to fetch Staff data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Staff data:', error.message);
    return [];
  }
}

async function addStaff(newStaff: Omit<Staff, 'id'>): Promise<Staff> {
  try {
    const currentStaff = await fetchStaff();
    // Generate a UUID for the new staff member
    const id = uuidv4();
    const staffWithId: Staff = { id, ...newStaff };

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

async function editStaff(id: string, updatedStaff: Omit<Staff, 'id'>): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/staffs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStaff),
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