import { v4 as uuidv4 } from 'uuid';

export type Employee ={
  id?: string;
  image: string;
  userId?: string;
  name: string;
  payDate: string; // Assuming payDate is a string representing a date
  month: string;
  year: string;
  monthlySalary: string;
  additionMoney: string;
  total: string;
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
    const response = await fetch(`https://auth-api-woad.vercel.app/api/employees?userId=${user.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employee data');
    }
    const employeeData: Employee[] = await response.json();
    return employeeData;
  } catch (error) {
    throw new Error ('Error fetching employee data:');
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

    const response = await fetch('https://auth-api-woad.vercel.app/api/employees', {
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
    throw new Error ('Error adding employee:');
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
    const response = await fetch(`https://auth-api-woad.vercel.app/api/employees/${id}`, {
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
    throw new Error ('Error updating employee:');
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
    const response = await fetch(`https://auth-api-woad.vercel.app/api/employees/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
  } catch (error) {
    throw new Error ('Error deleting employee:');
    throw error;
  }
}

export { EmployeeService };
