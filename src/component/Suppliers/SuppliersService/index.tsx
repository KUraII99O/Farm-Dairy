import { v4 as uuidv4 } from 'uuid';

// Define the Supplier interface
export type Supplier = {
  id: string;
  userId: string;
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  image: string;
};

// SupplierService object
const SupplierService = {
  fetchSuppliers,
  addSupplier,
  editSupplier,
  deleteSupplier,
};

// Fetch Suppliers function
async function fetchSuppliers(): Promise<Supplier[]> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch('http://localhost:3000/suppliers?userId=' + user.id);
    if (!response.ok) {
      throw new Error('Failed to fetch Supplier data');
    }
    const suppliersData: Supplier[] = await response.json();
    return suppliersData;
  } catch (error) {
    console.error('Error fetching Supplier data:', error);
    return [];
  }
}

// Add Supplier function
async function addSupplier(newSupplier: Omit<Supplier, 'id' | 'userId'>): Promise<Supplier> {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    throw new Error('User not logged in or user data not found');
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error('User ID not found in user data');
  }

  try {
    const supplierWithId: Supplier = { id: uuidv4(), userId: user.id, ...newSupplier };
    const response = await fetch('http://localhost:3000/suppliers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplierWithId),
    });

    if (!response.ok) {
      throw new Error('Failed to add supplier');
    }

    return supplierWithId;
  } catch (error) {
    console.error('Error adding supplier:', error);
    throw error;
  }
}

// Edit Supplier function
async function editSupplier(id: string, updatedSupplier: Omit<Supplier, 'id'>): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/suppliers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSupplier),
    });
    if (!response.ok) {
      throw new Error('Failed to update supplier');
    }
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
}

// Delete Supplier function
async function deleteSupplier(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/suppliers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete supplier');
    }
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
}

export { SupplierService };
