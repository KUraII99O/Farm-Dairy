import { v4 as uuidv4 } from 'uuid';

// Define the Employee interface
interface Employee {
  id: string;
  image: string;
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
  deleteEmployee,
  toggleEmployeeStatus,
};

async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch("http://localhost:3000/employees");
  if (!response.ok) {
    throw new Error("Failed to fetch employee data");
  }
  return response.json();
}

async function addEmployee(newEmployee: Omit<Employee, "id">): Promise<Employee> {
  const id = uuidv4();
  const employeeWithId: Employee = { id, ...newEmployee };

  const response = await fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeWithId),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }
  return employeeWithId;
}

async function editEmployee(id: string, updatedEmployee: Employee): Promise<void> {
  const response = await fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }
}

async function deleteEmployee(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
}

async function toggleEmployeeStatus(id: string): Promise<Employee> {
  const response = await fetch(`http://localhost:3000/employees/${id}/toggle-status`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to toggle employee status");
  }

  return response.json();
}

export default EmployeeService;
