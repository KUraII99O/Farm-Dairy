import React, { createContext, useState, useEffect, useContext } from "react";
import { Supplier, SupplierService } from "../SuppliersService";

interface ManageSupplierContextProps {
  suppliers: Supplier[];
  addSupplier: (newSupplier: Omit<Supplier, 'id'>) => Promise<void>;
  editSupplier: (id: string, updatedSupplier: Partial<Omit<Supplier, 'id'>>) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;
}

interface ManageSupplierProviderProps {
  children: React.ReactNode;
}

export const ManageSupplierContext = createContext<ManageSupplierContextProps | null>(null);

export const ManageSupplierProvider: React.FC<ManageSupplierProviderProps> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const data = await SupplierService.fetchSuppliers();
        setSuppliers(data || []);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSupplierData();
  }, []);

  const addSupplier = async (newSupplier: Omit<Supplier, 'id'>) => {
    try {
      const data = await SupplierService.addSupplier(newSupplier);
      setSuppliers(prevSuppliers => [...prevSuppliers, data]);
    } catch (error) {
      console.error("Error adding supplier:", (error as Error).message);
    }
  };

  const editSupplier = async (id: string, updatedSupplier: Partial<Omit<Supplier, 'id'>>) => {
    try {
      const existingSupplier = suppliers.find(supplier => supplier.id === id);
      if (!existingSupplier) {
        throw new Error("Supplier not found");
      }

      const mergedSupplier = { ...existingSupplier, ...updatedSupplier };
      await SupplierService.editSupplier(id, mergedSupplier);
      setSuppliers(prevSuppliers =>
        prevSuppliers.map(supplier =>
          supplier.id === id ? mergedSupplier : supplier
        )
      );
    } catch (error) {
      console.error("Error editing supplier:", (error as Error).message);
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      await SupplierService.deleteSupplier(id);
      setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== id));
    } catch (error) {
      console.error("Error deleting supplier:", (error as Error).message);
    }
  };

  const value: ManageSupplierContextProps = {
    suppliers,
    addSupplier,
    editSupplier,
    deleteSupplier
  };

  return (
    <ManageSupplierContext.Provider value={value}>
      {children}
    </ManageSupplierContext.Provider>
  );
};

export const useSupplier = () => {
  const context = useContext(ManageSupplierContext);
  if (!context) {
    throw new Error("useSupplier must be used within a ManageSupplierProvider");
  }
  return context;
};
