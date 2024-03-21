// types.ts
export interface staffMember {
  id: number;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  joiningDate: string;
  grossSalary: number;
  status: 'Active' | 'Inactive';
  image:File;
} 
  
export interface User {
  image: string | undefined;
  id: number;
  userName: string;
  email: string;
  mobile: string;
  designation: string;
  userType: string; // Assuming this field represents the type of user (e.g., admin, regular user)
  joiningDate: string;
  status: 'Active' | 'Inactive';
}

export interface Employee {
  id: number;
  image: string;
  name: string;
  payDate: string; // Assuming payDate is a string representing a date
  month: string;
  year: number;
  salaryAmount: number;
  additionAmount: number;
  total: number;
}

export interface MilkRecord {
  id: number;

  Date: string;
  AccountNo: string;
  StallNo: string;
  AnimalID: string;
  Liter: number;
  Fate: string;
  Price: number;
  Total: number;
  CollectedFrom: string;
  AddedBy: string;
}