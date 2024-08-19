import { v4 as uuidv4 } from 'uuid';

export interface Employee {
  id: string;
  image: string;
  userId: string;
  name: string;
  payDate: string; // Assuming payDate is a string representing a date
  month: string;
  year: number;
  salaryAmount: number;
  additionAmount: number;
  total: number;
}

const EmployeeService = {
  fetchEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee
};

async function fetchEmployees(): Promise<Employee[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/employees?userId=${user.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employee data');
    }
    const employeeData: Employee[] = await response.json();
    return employeeData;
  } catch (error) {
    console.error('Error fetching employee data:', error.message);
    return [];
  }
}

async function addEmployee(newEmployee: Omit<Employee, 'id' | 'userId'>): Promise<Employee> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in or user data not found");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found in user data");
  }

  try {
    const employeeWithId: Employee = { id: uuidv4(), userId: user.id, ...newEmployee };

    const response = await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    return employeeWithId;
  } catch (error) {
    console.error('Error adding employee:', error.message);
    throw error;
  }
}

async function editEmployee(id: string, updatedEmployee: Omit<Employee, 'id'>): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    });
    if (!response.ok) {
      throw new Error('Failed to update employee');
    }
  } catch (error) {
    console.error('Error updating employee:', error.message);
    throw error;
  }
}

async function deleteEmployee(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/employees/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    throw error;
  }
}

export { EmployeeService, Employee };
